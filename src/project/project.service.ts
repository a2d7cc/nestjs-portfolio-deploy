import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.create(createProjectDto)
    project.slug = this.getSlug(project.title)
    return await this.projectRepository.save(project)
  }

  async findAll(searchTerm?: string): Promise<Project[]> {
    let projects;
    if(searchTerm) {
      projects = this.projectRepository.findBy({
        title: ILike(`%${searchTerm}%`)
      })
    } else {
      projects = await this.projectRepository.find()
    }

    return projects;

  }

  async findOne(id: number) {
    return await this.projectRepository.findOneBy({id})
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({id})
    project.slug = this.getSlug(project.title)
    return this.projectRepository.save({...project, ...updateProjectDto})
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOneBy({id})
    return this.projectRepository.remove(project)
  }


	private getSlug(title: string): string {
		return (
			slugify(title, { lower: true }) +
			'-' +
			((Math.random() * Math.pow(36, 6)) | 0).toString(36)
		)
	}
}

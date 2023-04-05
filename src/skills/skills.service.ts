import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { ILike, Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const skill = await this.skillRepository.create(createSkillDto)
    skill.slug = this.getSlug(skill.title)
    return await this.skillRepository.save(skill)
  }

  async findAll(searchTerm?: string): Promise<Skill[]> {
    let skills;
    if(searchTerm) {
      skills = this.skillRepository.findBy({
        title: ILike(`%${searchTerm}%`)
      })
    } else {
      skills = await this.skillRepository.find()
    }

    return skills;

  }

  async findOne(id: number) {
    return await this.skillRepository.findOneBy({id})
  }

  async update(id: number, updateskillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOneBy({id})
    skill.slug = this.getSlug(skill.title)
    return this.skillRepository.save({...skill, ...updateskillDto})
  }

  async remove(id: number) {
    const skill = await this.skillRepository.findOneBy({id})
    return this.skillRepository.remove(skill)
  }

  private getSlug(title: string): string {
		return (
			slugify(title, { lower: true }) +
			'-' +
			((Math.random() * Math.pow(36, 6)) | 0).toString(36)
		)
	}
}

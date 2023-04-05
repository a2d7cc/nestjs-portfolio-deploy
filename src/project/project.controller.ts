import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Auth('admin')
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll(
    @Query('searchTerm') searchTerm?: string
  ) {
    return this.projectService.findAll(searchTerm);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Auth('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Auth('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}

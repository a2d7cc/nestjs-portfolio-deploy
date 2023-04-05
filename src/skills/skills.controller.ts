import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Auth('admin')
  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  findAll(
    @Query('searchTerm') searchTerm?: string
  ) {
    return this.skillsService.findAll(searchTerm);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(+id);
  }

  @Auth('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @Auth('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(+id);
  }
}

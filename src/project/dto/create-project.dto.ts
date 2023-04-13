import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

class TagDto {
	@IsString()
	name: string;
  }

export class CreateProjectDto {
	@IsNotEmpty()
	@IsString()
	readonly title: string

	@IsNotEmpty()
	@IsString()
	readonly subTitle: string

	@IsNotEmpty()
	@IsString()
	readonly body: string

	@IsNotEmpty()
	@IsString()
	readonly poster: string

	@IsNotEmpty()
	@IsString()
	readonly bigPoster: string

	@IsNotEmpty()
	@IsString()
	readonly git: string

	@IsOptional()
	@IsString()
	tags: string;

	
}

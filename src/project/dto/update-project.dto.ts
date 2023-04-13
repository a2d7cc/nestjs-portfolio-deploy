import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'

class TagDto {
	@IsString()
	name: string;
  }

export class UpdateProjectDto {
	@IsOptional()
	@IsString()
	readonly title: string

	@IsOptional()
	@IsString()
	readonly subTitle: string

	@IsOptional()
	@IsString()
	readonly body: string

	@IsOptional()
	@IsString()
	readonly poster: string

	@IsOptional()
	@IsString()
	readonly bigPoster: string


	@IsOptional()
	@IsString()
	tags: string;
}

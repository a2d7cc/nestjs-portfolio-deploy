import { IsOptional, IsString } from 'class-validator'

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
}

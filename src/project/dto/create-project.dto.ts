import { IsNotEmpty, IsString } from 'class-validator'

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
}

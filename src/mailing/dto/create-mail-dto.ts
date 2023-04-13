import { IsNotEmpty, IsString } from 'class-validator'

export class CreateMailDto {
	@IsNotEmpty()
	@IsString()
	readonly name: string

	@IsNotEmpty()
	@IsString()
	readonly email: string

	@IsNotEmpty()
	@IsString()
	readonly body: string
}

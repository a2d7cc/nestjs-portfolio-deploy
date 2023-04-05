import { IsNotEmpty, IsString } from "class-validator"

export class CreateSkillDto {
    @IsNotEmpty()
	@IsString()
	readonly title: string

	@IsNotEmpty()
	@IsString()
	readonly subTitle: string

	@IsNotEmpty()
	@IsString()
	readonly body: string
}

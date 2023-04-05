import { IsOptional, IsString } from 'class-validator';

export class UpdateSkillDto {
    @IsOptional()
	@IsString()
	readonly title: string

	@IsOptional()
	@IsString()
	readonly subTitle: string

	@IsOptional()
	@IsString()
	readonly body: string
}

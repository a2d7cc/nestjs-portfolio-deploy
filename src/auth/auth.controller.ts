import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { refreshToken } from './dto/refreshToken.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('registration')
	async registration(@Body() dto: AuthDto) {
		const user = await this.authService.createUser(dto)
		const userResponse = await this.authService.buildUserResponse(user)
		return userResponse
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const user = await this.authService.login(dto)
		const userResponse = await this.authService.buildUserResponse(user)
		return userResponse
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(@Body() dto: refreshToken) {
		const user = await this.authService.getNewTokens(dto)
		const userResponse = await this.authService.buildUserResponse(user)
		return userResponse
	}
}

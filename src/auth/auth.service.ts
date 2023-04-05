import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { Repository } from 'typeorm'
import {
	ALREADY_REGISTRED_ERROR,
	DONT_HAVE_ACCESS_ERROR,
	USER_NOT_FOUND_ERROR,
	WRONG_PASSWORD_ERROR,
} from './auth.constants'
import { AuthDto } from './dto/auth.dto'
import { refreshToken } from './dto/refreshToken.dto'
import { User } from '../user/entities/user.entity'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService
	) {}

	async createUser({ email, password }: AuthDto): Promise<User> {
		const existingUser = await this.userRepository.findOne({
			where: { email },
		})
		if (existingUser) {
			throw new BadRequestException(ALREADY_REGISTRED_ERROR)
		}

		const salt = await genSalt(5)
		const hashPassword = await hash(password, salt)

		const user = this.userRepository.create({
			email,
			hashPassword,
		})
		return await this.userRepository.save(user)
	}

	async login({ email, password }: AuthDto): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { email },
		})
		if (!user) {
			throw new BadRequestException(USER_NOT_FOUND_ERROR)
		}

		const isValidPass = await compare(password, user.hashPassword)
		if (!isValidPass) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
		}

		return user
	}

	async issueTokenPair({ id }: User) {
		const refreshToken = await this.jwtService.signAsync(
			{ id },
			{
				expiresIn: '15d',
			}
		)

		const accessToken = await this.jwtService.signAsync(
			{ id },
			{
				expiresIn: '1h',
			}
		)

		return {
			refreshToken,
			accessToken,
		}
	}

	async buildUserResponse(user: User) {
		const tokens = await this.issueTokenPair(user)

		return {
			user,
			...tokens,
		}
	}

	async getNewTokens({ refreshToken }: refreshToken) {
		if (!refreshToken) {
			throw new UnauthorizedException(DONT_HAVE_ACCESS_ERROR)
		}

		const result = await this.jwtService.verifyAsync(refreshToken)
		
		if (!result) {
			throw new UnauthorizedException()
		}
		const user = await this.userRepository.findOne({
			where: { id: result.id },
		})

		if (!user) {
			throw new BadRequestException(
				'User with this payload from JWT not founded'
			)
		}

		return user;
	}
}

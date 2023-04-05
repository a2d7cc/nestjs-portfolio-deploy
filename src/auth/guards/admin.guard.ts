import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '../../user/entities/user.entity'


export class OnlyAdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user

		if (!user.isAdmin) {
			throw new BadRequestException('Dont have access')
		}

		return user.isAdmin
	}
}

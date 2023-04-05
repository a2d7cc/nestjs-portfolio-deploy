import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeormConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => {
	return {
		type: 'postgres',
		host: configService.get('POSTGRES_HOST'),
		port: configService.get('POSTGRES_PORT'),
		username: configService.get('POSTGRES_LOGIN'),
		password: configService.get('POSTGRES_PASS'),
		database: configService.get('POSTGRES_DATABASE'),
		entities: [__dirname + '/../**/*.entity{.ts,.js}'],
		synchronize: true,
	}
}

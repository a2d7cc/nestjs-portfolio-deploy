import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeormConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ProjectModule } from './project/project.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeormConfig,
		}),
    UserModule,
    AuthModule,
    FileModule,
    ProjectModule,
    SkillsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

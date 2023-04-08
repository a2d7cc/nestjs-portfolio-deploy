import {
	Controller,
	Get,
	Header,
	HttpCode,
	Post,
	Query,
	StreamableFile,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from '..//auth/decorators/auth.decorator'
import { FileElementResponce } from './file.responce'
import { FileService } from './file.service'
import path, { join } from 'path'
import { createReadStream, fstat } from 'fs'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post('')
	@HttpCode(200)
	@Auth('admin')
	@UseInterceptors(FileInterceptor('file'))
	async saveFiles(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	): Promise<FileElementResponce[]> {
		return this.fileService.saveFiles([file], folder)
	}

	@Get('resume')
	@Header('Content-Type', 'application/pdf')
	@Header('Content-Disposition', 'attachment; filename="Resume.pdf"')
	getStaticFile(): StreamableFile {
	  const file = createReadStream(join(process.cwd(), 'uploads/resume/Resume.pdf'));
	  return new StreamableFile(file);
	}  
}
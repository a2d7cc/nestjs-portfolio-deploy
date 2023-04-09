import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailDto } from './dto/create-project.dto';

@Injectable()
export class MailingService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}


  public async sendMail({email, name, body}: CreateMailDto) {
    return await this.mailerService.sendMail({
      to: 'chukrii.alex@gmail.com',
      from: 'mailservice0xx@gmail.com', // override default from
      subject: 'Offer from chukrii.com',
      template: './letter', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        email,
        name,
        body
      },
    });
  }
}
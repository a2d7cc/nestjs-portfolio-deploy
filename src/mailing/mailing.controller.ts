import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { CreateMailDto } from './dto/create-project.dto';

@Controller('mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) {}
  @Post('send-mail')
  public sendMail(
    @Body() createMailDto: CreateMailDto
  ) {
    return this.mailingService.sendMail(createMailDto);
  }
}
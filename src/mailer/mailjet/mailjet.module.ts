import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import mailjetConfig from '../../config/mailjet.config';
import { MailjetMailerService } from './mailjet.mailer.service';

@Module({
  imports: [ConfigModule.forFeature(mailjetConfig), HttpModule],
  providers: [MailjetMailerService],
  exports: [MailjetMailerService]
})
export class MailjetModule {}
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import mailgunConfig from '../../config/mailgun.config';
import { MailgunMailerService } from './mailgun.mailer.service';

@Module({
  imports: [ConfigModule.forFeature(mailgunConfig), HttpModule],
  providers: [MailgunMailerService],
  exports: [MailgunMailerService]
})
export class MailgunModule {}
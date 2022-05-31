import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailgunModule } from './mailgun/mailgun.module';
import { MailjetModule } from './mailjet/mailjet.module';


@Module({
  imports: [MailgunModule, MailjetModule],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}

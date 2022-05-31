import { Module } from '@nestjs/common';
import { MailerModule } from '../mailer/mailer.module';
import { EmailController } from './email.controller';

@Module({
  controllers: [EmailController],
  imports: [MailerModule]
})
export class EmailModule {}

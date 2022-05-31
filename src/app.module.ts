import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './mailer/mailer.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ConfigModule.forRoot(), MailerModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

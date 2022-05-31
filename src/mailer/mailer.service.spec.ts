import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';
import { MailgunModule } from './mailgun/mailgun.module';
import { MailjetModule } from './mailjet/mailjet.module';

describe('MailerService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailjetModule, MailgunModule],
      providers: [MailerService],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MailgunMailerService } from './mailgun.mailer.service';

describe('MailgunService', () => {
  let service: MailgunMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [MailgunMailerService, {
        provide: ConfigService,
        useValue: {get: jest.fn((key: string) => {
          return null;
        })
      }}],
    }).compile();

    service = module.get<MailgunMailerService>(MailgunMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

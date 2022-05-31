import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MailjetMailerService } from './mailjet.mailer.service';

describe('MailjetService', () => {
  let service: MailjetMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [MailjetMailerService, {
        provide: ConfigService,
        useValue: {get: jest.fn((key: string) => {
          return null;
        })
      }}],
    }).compile();

    service = module.get<MailjetMailerService>(MailjetMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

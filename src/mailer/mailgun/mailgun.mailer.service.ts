import { HttpService, HttpModuleOptions } from '@nestjs/axios';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable } from 'rxjs';
import { EmailInput } from '../../email/model/email.input';
import EmailRecipient from '../../email/model/email.recipient';
import EmailRecipients from '../../email/model/email.recipients';
import * as qs from 'qs';
import { assert } from 'console';

@Injectable()
export class MailgunMailerService {
    private config: HttpModuleOptions;

    constructor(private configService: ConfigService, private httpService: HttpService) {
        this.config = {
            auth: {
                username: this.configService.get<string>('mailgun.username'),
                password: this.configService.get<string>('mailgun.secret'),
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    }

  /**
   * Sends an email
   */
  sendEmail(emailInput: EmailInput): any {
    console.log('Recieved request to send email using MailGun');

    if (!emailInput || !emailInput.recipients) throw new BadRequestException('Invalid input data supplied');
    
    const request = {
        from: EmailRecipient.getDisplayString(emailInput.from),
        to: emailInput.recipients ? EmailRecipients.getDisplayString(emailInput.recipients.to) : undefined,
        cc: emailInput.recipients ? EmailRecipients.getDisplayString(emailInput.recipients.cc) : undefined,
        bcc: emailInput.recipients ? EmailRecipients.getDisplayString(emailInput.recipients.bcc) : undefined,
        subject: emailInput.subject,
        text: emailInput.message
    }
    
    return this.httpService.post(this.configService.get<string>('mailgun.url'), qs.stringify(request), this.config)
    .pipe(
        map((response) => {
            console.log('Submitted the email request to MailGun');
            return response.data
        }),
        catchError((e) => {
            console.log('Error sending mail using MailGun - ', e.response ? e.response.data : '');
            throw new HttpException(e.response.data, e.response.status);
        }));
  }
}


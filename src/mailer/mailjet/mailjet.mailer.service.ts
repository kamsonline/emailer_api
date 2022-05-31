import { HttpService, HttpModuleOptions } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs';
import { EmailInput } from '../../email/model/email.input';

@Injectable()
export class MailjetMailerService {

    private config: HttpModuleOptions;

    constructor(private configService: ConfigService, private httpService: HttpService) {
        this.config = {
            auth: {
                username: this.configService.get<string>('mailjet.username'),
                password: this.configService.get<string>('mailjet.secret'),
            },
            headers: {
                'content-type': 'application/json'
            }
        }
    }

  /**
   * Sends an email
   */
  sendEmail(emailInput: EmailInput): any {
    console.log('Recieved request to send email using MailJet ', JSON.stringify(emailInput));
    const request = {
        messages: [
            {
                from: emailInput.from,
                to: emailInput.recipients.to,
                cc: emailInput.recipients.cc ? emailInput.recipients.cc : [],
                bcc: emailInput.recipients.bcc ? emailInput.recipients.bcc : [],
                subject: emailInput.subject,
                htmlpart: emailInput.message,
                customid: emailInput.reference
            }
        ]
    }

    return this.httpService.post(this.configService.get<string>('mailjet.url'), request, this.config)
    .pipe(
        map((response) => {
            console.log('Submitted the email request to MailJet ', JSON.stringify(response.data));
            return response.data
        }),
        catchError((e) => {
            console.log('Error sending mail using MailJet - ', e.response ? e.response.data : '');
            throw new HttpException(e.response.data, e.response.status);
        }));
  }
}
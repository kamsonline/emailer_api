import { Injectable } from '@nestjs/common';
import { catchError } from 'rxjs';
import { EmailInput } from '../email/model/email.input';
import { MailgunMailerService } from './mailgun/mailgun.mailer.service';
import { MailjetMailerService } from './mailjet/mailjet.mailer.service';

@Injectable()
export class MailerService {
  constructor(private mailjetMailerService: MailjetMailerService, private mailgunMailerService: MailgunMailerService) {}
  
  /**
   * Sends an email
   */
  sendEmail(emailInput: EmailInput): any {

    console.log('Using Email using MailGun');
    return this.mailgunMailerService.sendEmail(emailInput).pipe(
        catchError((error) => {
            console.log('Using MailJet since MailGun failed. Sending email using MailJet');
            return this.mailjetMailerService.sendEmail(emailInput);
        }
    ));
  }
}

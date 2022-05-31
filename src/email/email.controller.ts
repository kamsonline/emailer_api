import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { MailerService } from '../mailer/mailer.service';
import { EmailInput } from './model/email.input';
import EmailResponse from './model/email.response';
import EmailResponseStatus from './model/email.response.status';

@ApiTags('email')
@Controller('email')
export class EmailController {

  constructor(private readonly mailerService: MailerService) {}

  /**
   * API endpoint implementation for POST /email
   * @param emailInput the email input data
   * @returns success message if successfull.
   */
  @ApiResponse({
      status: 400,
      description: 'Bad request'
  })
  @ApiResponse({
      status: 500,
      description: 'Unable to send the email. Please contact support'
  })
  @ApiResponse({
    status: 201,
    description: 'Email sent successfully'
  })
  @ApiConsumes('application/json')
  @Post()
  sendEmail(@Body() emailInput: EmailInput): EmailResponse {
    return this.mailerService.sendEmail(emailInput).pipe(
        map((response) => {
            return Promise.resolve(new EmailResponse(EmailResponseStatus.SUCCESS));
        }),
        catchError((error) => {
            // TODO: Handle the error to provide additional error message related to failure in sending email.
            // return Promise.resolve(new EmailResponse(EmailResponseStatus.FAILED));
            throw new InternalServerErrorException('Unable to send the email. Please contact the support.');
        }
    ));
  }
}

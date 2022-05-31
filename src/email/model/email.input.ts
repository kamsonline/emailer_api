import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import EmailRecipient from './email.recipient';
import EmailRecipients from './email.recipients';

class EmailInput {
    @ValidateNested() // Ensures nested objects
    @IsNotEmptyObject() // Ensure Object is not empty
    @Type(() => EmailRecipients)
    @ApiProperty({
        type: EmailRecipients,
        description: 'The recipients data containing list of to, cc and bcc.'
    })
    recipients: EmailRecipients;

    @ValidateNested() // Ensures nested objects
    @IsNotEmptyObject() // Ensure Object is not empty
    @Type(() => EmailRecipient)
    @ApiProperty({
        type: EmailRecipient,
        description: 'The person sending the email. This contains email and name.'
    })
    from: EmailRecipient;

    @IsNotEmpty() // Validates that this field is not empty
    @ApiProperty({
        type: String,
        description: 'The subject of the email.'
    })
    subject: string;

    @IsNotEmpty()  // Validates that this field is not empty
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The message of the email. Currently this accepts only plain text.'
    })
    message: string;


    @ApiPropertyOptional({
        type: String,
        description: 'Unique reference that we can use it to associate this email. This is optional.'
    })
    reference: string;
}

export { EmailInput }

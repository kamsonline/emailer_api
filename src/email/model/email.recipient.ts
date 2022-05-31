import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

class EmailRecipient {
    @IsNotEmpty() // Validates that this field is not empty
    @ApiPropertyOptional({
        type: String,
        description: 'The name of the email recipient.'
    })
    name: string;

    @IsEmail() // Validates that this field is an email
    @ApiProperty({
        type: String,
        description: 'The email containing a valid email address.'
    })
    email: string;

    static getDisplayString(recipient: EmailRecipient): string {
        if (!recipient) return undefined;
        return (recipient.name ? recipient.name + ' ' : '') + ('<' + recipient.email + '>');
    }
}

export default EmailRecipient;
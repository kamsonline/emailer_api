import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import EmailRecipient from "./email.recipient";

class EmailRecipients {
    @ValidateNested({ each: true }) // Ensures nested objects and since the nested object is an array, ensure each item in array is validated
    @ArrayNotEmpty() // Ensure Object is not empty
    @Type(() => EmailRecipient)
    @ApiProperty({ type: [EmailRecipient] })
    to: EmailRecipient[];

    @ValidateNested({ each: true }) // Ensures nested objects and since the nested object is an array, ensure each item in array is validated
    @Type(() => EmailRecipient)
    @ApiPropertyOptional({ type: [EmailRecipient] })
    cc: EmailRecipient[];

    @ValidateNested({ each: true }) // Ensures nested objects and since the nested object is an array, ensure each item in array is validated
    @Type(() => EmailRecipient)
    @ApiPropertyOptional({ type: [EmailRecipient] })
    bcc: EmailRecipient[];

    static getDisplayString(list: EmailRecipient[]): string {
        return list ? list.map(recipient => EmailRecipient.getDisplayString(recipient)).join(',') : undefined;
    }
}

export default EmailRecipients;
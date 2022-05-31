import { registerAs } from '@nestjs/config';

export default registerAs('mailjet', () => ({
  username: process.env.MAILJET_USERNAME || '35fdd77dec5e809f71a99b1754dd42a5',
  secret: process.env.MAILJET_SECRET || '', // Update the secret while running locally or set in environment in production
  authType: process.env.MAILJET_AUTH_TYPE || 'basic',
  url: process.env.MAILJET_URL || 'https://api.mailjet.com/v3.1/send',
}));
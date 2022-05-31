import { registerAs } from '@nestjs/config';

export default registerAs('mailgun', () => ({
  username: process.env.MAILGUN_USERNAME || 'api',
  secret: process.env.MAILGUN_SECRET || '', // Upddate the secret while running locally or set in environment in production
  authType: process.env.MAILGUN_AUTH_TYPE || 'basic',
  url: process.env.MAILGUN_URL || 'https://api.mailgun.net/v3/sandbox37312aa538ab476b8d6ae7843ed7de77.mailgun.org/messages',
}));
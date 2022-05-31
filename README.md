## Description

This is a test emailer api which will send email with option of failover delivery option. This is currently configured to use mailgun. If delivery fails with mailgun, then it will try using mailjet.

This API is built using NodeJS ([Nest](https://github.com/nestjs/nest)), Express, Typescript and deployed to Heroku

Here is the link to the API [swagger](https://kamesh-emailer-api.herokuapp.com/v1/api/)

Here is the link to the API deployed to [Heroku](https://kamesh-emailer-api.herokuapp.com/v1/api/email)

Please NOTE: Inorder to test this API in Heroku, the recipient email id need to be preconfigured in Mailgun and MailJet. Otherwise, this API can be run locally with custom configuration to Mailgun and Mailjet.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Setting up the Email provider

### MailGun

Update `mailgun.config.ts` file with details

- clientId in the username field or set environment variable `MAILGUN_USERNAME`
- secret field or set environment variable `MAILGUN_SECRET`
- No changes to auth type.
- url for the mailgun account created or set environment variable `MAILGUN_URL`.

NOTE: Do not store the secret information in the git repository. It's likely that the mailgun account will be blocked.

### MailJet

Update `mailjet.config.ts` file with details

- clientId in the username field or set environment variable `MAILJET_USERNAME`.
- secret field or set environment variable `MAILJET_SECRET`.
- Auth type or set environment variable `MAILGUN_AUTH_TYPE`.
- url for the mailgun account created or set environment variable `MAILJET_URL`.

NOTE: Do not store the secret information in the git repository.

## TODO

- Introduce Queue between API handler and the email provider which will help with failure retries and ability for the api to scale and respond quickly. 
- Current integration with email providers is very minimal and have potential to improve the email integration. e.g. templating, campaign etc.
- Improve the email functonality to include HTML emails and predefined support for email templates.
- Improve the configuration with ability to have environment specific configuration.
- Allow ability to configure the precedence of which email provider to use first and which one to use if others failed.
- Improve error handling and logging. 
- Add further unit test. Basic unit test is added.
- Add further integration/e2e test. Basic e2e test testing just one scenario. 


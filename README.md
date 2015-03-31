# Email Boilerplate Generator

> [Yeoman](http://yeoman.io) generator

## Getting Started

The following software needs to be installed if you want to use Email Boilerplate Generator. These installations need to be done just once so you can skip this section if you have the software already installed.

#### Node.js
Install [Node.js](http://nodejs.org/) so you can work with `npm`, Node package manager.

#### Premailer Gem
The [Premailer](https://github.com/premailer/premailer) gem is needed for Email Boilerplate Generator to run correctly.

```bash
gem install premailer
```

#### Grunt with Grunt CLI
Then install [Grunt](http://gruntjs.com/)'s command line interface (CLI) globally:

```bash
npm install -g grunt-cli
```

#### Yeoman
Email Boilerplate Generator is a [Yeoman](http://yeoman.io/) generator, so obviously it depends on it. You can easily install Yeoman with the following command:

```bash
npm install -g yo
```

#### Email Boilerplate Generator
To install generator-email-boilerplate from npm, run:

```bash
npm install -g generator-email-boilerplate
```

Congratulations, you are now ready to use Email Boilerplate Generator!

## Usage

Finally, initiate the generator:

```bash
yo email-boilerplate
```

## Sensitive Information
During project generation process a file `secrets.json` will be created. In that file we store all of secret credentials needed for additional services used in Email Boilerplate Generator.

By default this file will be ignored from git repository. We encourage you __not__ to store sensitive data in your git repo. If you must, please look into [git-encrypt](https://github.com/shadowhand/git-encrypt) or some other method of encrypting your configuration secrets.

The secret file will look like this:

```json
{
  "mailgun": {
    "api_key": "YOUR MG PRIVATE API KEY",
    "sender": "E.G. POSTMASTER@YOURDOMAIN.COM",
    "recipient": "WHO YOU WANT TO SEND THE EMAIL TO",
    "subject": "DEFAULT SUBJECT OF YOUR EMAILS"
  },
  "litmus": {
    "username": "LITMUS USERNAME",
    "password": "LITMUS PASS",
    "company": "LITMUS COMPANY/API SUBDOMAIN NAME"
  },
  "aws": {
    "accessKey": "AWS ACCESS KEY ID",
    "secretKey": "AWS SECRET KEY",
    "region": "S3 BUCKET REGION",
    "bucket": "S3 BUCKET NAME"
  }
}
```

## Credits

Email Boilerplate Generator is inspired by [XH Generator](https://github.com/xhtmlized/generator-xh) and [Grunt Email Design Workflow](https://github.com/leemunroe/grunt-email-workflow).

## License

Email Boilerplate Generator is licensed under [MIT License](LICENSE).

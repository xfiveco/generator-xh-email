XH Email Generator [![Build Status](https://travis-ci.org/xhtmlized/generator-xh-email.svg?branch=master)](https://travis-ci.org/xhtmlized/generator-xh-email) [![NPM version](https://badge.fury.io/js/generator-xh-email.svg)](http://badge.fury.io/js/generator-xh-email) [![NPM dependiencies](https://david-dm.org/xhtmlized/generator-xh-email.svg)](https://david-dm.org/xhtmlized/generator-xh-email)
============

> XH Generator is a [Yeoman](http://yeoman.io) generator for scaffolding email templates.

[![NPM](https://nodei.co/npm/generator-xh-email.png?downloads=true)](https://nodei.co/npm/generator-xh-email/)

XH Email is suitable for client work when you deliver a completed project to your client for further review and development.

## Getting Started

The following software needs to be installed if you want to use XH Email Generator. These installations need to be done just once so you can skip this section if you have the software already installed.

#### Node.js
Install [Node.js](http://nodejs.org/) so you can work with `npm`, Node package manager.

#### Premailer Gem
The [Premailer](https://github.com/premailer/premailer) gem is needed for XH Email Generator to run correctly.

```
gem install premailer
```

#### Grunt with Grunt CLI
Then install [Grunt](http://gruntjs.com/)'s command line interface (CLI) globally:

```
npm install -g grunt-cli
```

#### Yeoman
XH Email Generator is a [Yeoman](http://yeoman.io/) generator, so obviously it depends on it. You can easily install Yeoman with the following command:

```
npm install -g yo
```

#### XH Email Generator
To install generator-xh-email from npm, run:

```
npm install -g generator-xh-email
```

Congratulations, you are now ready to use XH Email Generator!

## Usage

Finally, initiate the generator:

```
yo xh-email
```

## Sensitive Information
During project generation process a file `secrets.json` will be created. In that file we store all of secret credentials needed for additional services used in XH Email Generator.

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

XH Email Generator is inspired by [XH Generator](https://github.com/xhtmlized/generator-xh) and [Grunt Email Design Workflow](https://github.com/leemunroe/grunt-email-workflow).

## License

XH Email Generator is licensed under [MIT License](LICENSE).

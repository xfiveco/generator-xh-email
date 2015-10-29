XH Email Generator [![Build Status](https://travis-ci.org/xhtmlized/generator-xh-email.svg?branch=master)](https://travis-ci.org/xhtmlized/generator-xh-email) [![NPM version](https://badge.fury.io/js/generator-xh-email.svg)](http://badge.fury.io/js/generator-xh-email) [![NPM dependiencies](https://david-dm.org/xhtmlized/generator-xh-email.svg)](https://david-dm.org/xhtmlized/generator-xh-email)
============

> XH Generator is a [Yeoman](http://yeoman.io) generator for scaffolding email templates.

[![NPM](https://nodei.co/npm/generator-xh-email.png?downloads=true)](https://nodei.co/npm/generator-xh-email/)

XH Email is suitable for client work when you deliver a completed project to your client for further review and development.

## Features
- Custom project name
- Responsive project index with a list of templates
- CSS Preprocessing with [Sass](http://http://sass-lang.com/)
- Live reload and browsers syncing with [BrowserSync](http://www.browsersync.io/)
- Consistent coding style supported by [.editorconfig](http://editorconfig.org/)
- Inlining styles and CSS validation using Premailer
- Ability to modularize templates by using Handlebars.js
- Sending emails to test templates on real email client using Mailgun
- Cross-client testing using Litmus service
- Uploading images to AWS S3 automatically

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

### 1) Project scaffolding

To create a project with XH Generator, create a new folder, open a command line in it and type:

```
yo xh-email
```

You will be presented with a welcome screen and project scaffolding options. Answer the generator questions according your project needs.

Once done, the generator will create the required files and folders and install all NPM dependencies for you.

### 2) Development

When you have the basic setup done, you can start development. Run the grunt build command to generate preview files in the dist folder:

```
grunt build
```

If everything went ok, the preview files will be generated and you will be able to check your work in the `dist` folder.

To re-compile HTML / SCSS file in real time you can use default task. Type:

```
grunt
```

and this will start a task that will watch for changes in files and recompile them as needed. A development server will be started using BrowserSync script.

To rebuild the whole project, use the grunt build task again:

```
grunt build
```

### 3) Extra tools

#### Mailgun

XH Email Genearator is using [Mailgun](https://mailgun.com) to send emails through mailgun as part of your build. It's a terrific tool created to test your email templates on real email client.

You can set the Mailgun option during project generation and you will be asked to provide API key and task details. After that you can easily send yourself your emails by:

```
grunt send --template=index
```

where `index` is your template name. After that you can check your inbox for new message. Please remember to use this command after you build the project.

#### Litmus

Another great tool that you can use is [Litmus](https://litmus.com) which allows you to build, test, and monitor your email templates.

Similarly, you can check the Litmus option during generation and you will be prompted to provide the test email address. You can send your templates to Litmus by typing:

```
grunt test --template=index
```

where `index` is your template name. After that you can check your Litmus account where your templates will land one by one in a variety of different email clients.

#### AWS S3 CDN

You can also easily push your images to [S3 Content Delivery Network](https://aws.amazon.com/s3). If you select S3 option during project generation you'll be asked to put your account API keys and bucket name and special task will be added to your main build workflow.

You just put the image name in your image `src` attribute without any path, place the image in your `img` folder and the grunt tasks do the rest.

```
<img src="test-image.jpg" alt="" />
```

#### Handlebars templates

The main build architecture is created using [Assemble](http://assemble.io) plugin which allows you to use all of it's fearures as well as Handlebars templating system.

Right after the project is generated you'll be able to use default email layout for your templates and basic Index template for starters. The initial HTML structure will look like this:

- **layouts**
  - default.hbs
- **templates**
  - index.hbs

Each file in the `templates` folder should contain some basic information at the top of the file:

```
---
layout: default.hbs
subject: Index email template
---
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

'use strict';

var Prompts = {
  questions: [
    {
      name: 'projectName',
      message: 'Please enter project\'s name',
      validate: function (input) {
        return !!input;
      }
    }, {
      type: 'confirm',
      name: 'useBranding',
      message: 'Do you want to use XHTMLized branding?',
      default: true
    }, {
      when: function (response) {
        return !response.useBranding;
      },
      type: 'input',
      name: 'authorName',
      message: 'Enter your name'
    }, {
      type: 'confirm',
      name: 'isMailgun',
      message: 'Use Mailgun to send test emails? (require mailgun.com account)',
      default: true
    }, {
      when: function (response) {
        return response.isMailgun === true;
      },
      name: 'mailgunKey',
      message: 'Enter Mailgun Api Key (will be stored secretly and ignored from Git repo)',
      validate: function (input) {
        return !!input;
      }
    }, {
      when: function (response) {
        return response.isMailgun === true;
      },
      name: 'mailgunSubject',
      message: 'Enter Mailgun email subject',
      default: 'This is a test email',
      validate: function (input) {
        return !!input;
      }
    }, {
      when: function (response) {
        return response.isMailgun === true;
      },
      name: 'mailgunSender',
      message: 'Enter Mailgun sender email',
      validate: function (input) {
        return !!input;
      }
    }, {
      when: function (response) {
        return response.isMailgun === true;
      },
      name: 'mailgunRecipient',
      message: 'Enter Mailgun recipient email',
      validate: function (input) {
        return !!input;
      }
    }, {
      type: 'confirm',
      name: 'isLitmus',
      message: 'Use Litmus to test your emails on various clients? (require Litmus account)',
      default: true
    }, {
      when: function (response) {
        return response.isLitmus === true;
      },
      name: 'litmusUsername',
      message: 'Enter Litmus account username (will be stored secretly and ignored from Git repo)',
      validate: function (input) {
        return !!input;
      }
    }, {
      when: function (response) {
        return response.isLitmus === true;
      },
      name: 'litmusPassword',
      message: 'Enter Litmus account password (will be stored secretly and ignored from Git repo)',
      validate: function (input) {
        return !!input;
      }
    }, {
      when: function (response) {
        return response.isLitmus === true;
      },
      name: 'litmusCompany',
      message: 'Enter Litmus company name',
      validate: function (input) {
        return !!input;
      }
    }, {
      type: 'confirm',
      name: 'isS3',
      message: 'Use Amazon AWS S3 to upload image files to remote CDN? (require Amazon S3 account)',
      default: true
    }, {
      when: function (response) {
        return response.isS3 === true;
      },
      name: 'awsAccessKey',
      message: 'Enter AWS S3 Access Key (will be stored secretly and ignored from Git repo)',
      validate: function (input) {
        return !!input;
      }
    }, {
      when: function (response) {
        return response.isS3 === true;
      },
      name: 'awsSecretKey',
      message: 'Enter AWS S3 Secret Key (will be stored secretly and ignored from Git repo)',
      validate: function (input) {
        return !!input;
      }
    }, {
      when: function (response) {
        return response.isS3 === true;
      },
      name: 's3Region',
      message: 'Enter AWS S3 Region code',
      default: 'eu-west-1',
      validate: function (input) {
        return !!input;
      }
    }, {
      when: function (response) {
        return response.isS3 === true;
      },
      name: 's3Bucket',
      message: 'Enter AWS S3 Bucket ID',
      validate: function (input) {
        return !!input;
      }
    }
  ],

  setAnswers: function (answers) {
    this.prompts = {};
    this.prompts.projectName = answers.projectName;
    this.prompts.authorName = answers.useBranding ? 'XHTMLized' : answers.authorName;
    this.prompts.useBranding = answers.useBranding;

    this.prompts.isMailgun = answers.isMailgun;
    this.prompts.mailgunKey = answers.mailgunKey;
    this.prompts.mailgunSubject = answers.mailgunSubject;
    this.prompts.mailgunSender = answers.mailgunSender;
    this.prompts.mailgunRecipient = answers.mailgunRecipient;

    this.prompts.isS3 = answers.isS3;
    this.prompts.awsAccessKey = answers.awsAccessKey;
    this.prompts.awsSecretKey = answers.awsSecretKey;
    this.prompts.s3Region = answers.s3Region;
    this.prompts.s3Bucket = answers.s3Bucket;

    this.prompts.isLitmus = answers.isLitmus;
    this.prompts.litmusUsername = answers.litmusUsername;
    this.prompts.litmusPassword = answers.litmusPassword;
    this.prompts.litmusCompany = answers.litmusCompany;
  }
};

module.exports = Prompts;

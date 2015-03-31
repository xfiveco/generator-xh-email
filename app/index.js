'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log('');
    this.log(chalk.cyan(' ***********************************************************') + '\n');
    this.log(chalk.cyan('  Welcome to'), chalk.white.bgRed.bold(' Email Boilerplate ') + '\n');
    this.log(chalk.white('  A Yeoman generator for creating email templates') + '\n');
    this.log(chalk.cyan(' ***********************************************************') + '\n');

    var prompts = [{
        name: 'projectName',
        message: 'Please enter project\'s name',
        validate: function (input) {
          return !!input;
        }
      }, {
        name: 'projectAuthor',
        message: 'Please enter project\'s author',
        validate: function (input) {
          return !!input;
        }
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
        name: 'mailgunSenderEmail',
        message: 'Enter Mailgun sender email',
        validate: function (input) {
          return !!input;
        }
      }, {
        when: function (response) {
          return response.isMailgun === true;
        },
        name: 'mailgunRecipientEmail',
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
      }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectAuthor = props.projectAuthor;

      this.isMailgun = props.isMailgun;
      this.mailgunKey = props.mailgunKey;
      this.mailgunSubject = props.mailgunSubject;
      this.mailgunSenderEmail = props.mailgunSenderEmail;
      this.mailgunRecipientEmail = props.mailgunRecipientEmail;

      this.isS3 = props.isS3;
      this.awsAccessKey = props.awsAccessKey;
      this.awsSecretKey = props.awsSecretKey;
      this.s3Region = props.s3Region;
      this.s3Bucket = props.s3Bucket;

      this.isLitmus = props.isLitmus;
      this.litmusUsername = props.litmusUsername;
      this.litmusPassword = props.litmusPassword;
      this.litmusCompany = props.litmusCompany;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_package.json', 'package.json');
      this.template('_config.json', 'config.json');
    },

    projectFiles: function () {
      this.copy('editorconfig', '.editorconfig');
      this.copy('gitignore', '.gitignore');
      this.copy('Gemfile');
      this.template('Gruntfile.js');
    },

    projectIndex: function () {
      this.template('_index.html', 'index.html');
    },

    templateFiles: function () {
      this.template('src/layouts/_default.hbs', 'src/layouts/default.hbs');
      this.template('src/templates/_index.hbs', 'src/templates/index.hbs');
    },

    styleFiles: function () {
      this.template('src/scss/_main.scss', 'src/scss/main.scss');
      this.template('src/scss/_reset.scss', 'src/scss/_reset.scss');
    },

    structureFiles: function () {
      this.copy('src/img/keep', 'src/img/.keep');
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

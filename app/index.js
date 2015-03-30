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
      }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectAuthor = props.projectAuthor;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_package.json', 'package.json');
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
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

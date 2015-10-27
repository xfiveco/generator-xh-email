'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var prompts = require('./prompts');
var generate = require('./generate');

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log('');
    this.log(chalk.cyan(' ***********************************************************') + '\n');
    this.log(chalk.cyan('  Welcome to'), chalk.white.bgRed.bold(' Email Boilerplate ') + '\n');
    this.log(chalk.white('  A Yeoman generator for creating email templates') + '\n');
    this.log(chalk.cyan(' ***********************************************************') + '\n');

    this.prompt(prompts.questions, function (answers) {
      prompts.setAnswers.apply(this, [answers]);
      done();
    }.bind(this));
  },

  configuring: function () {
    generate.config.call(this);
  },

  writing: function () {
    // Config files
    generate.app.call(this);

    // Dotfiles
    generate.projectFiles.call(this);

    // Project index
    generate.projectIndex.call(this);

    // Template files
    generate.templateFiles.call(this);

    // Style files
    generate.styleFiles.call(this);

    // Assets directories
    generate.assets.call(this);
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

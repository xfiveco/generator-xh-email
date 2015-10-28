'use strict';

var _ = require('lodash');

var helpers = {
  copy: function (template, destination, context) {
    if (context && Object.keys(context).length) {
      context._ = {
        kebabCase: _.kebabCase,
        camelCase: _.camelCase,
        capitalize: _.capitalize
      };

      this.fs.copyTpl(this.templatePath(template), this.destinationPath(destination), context);
    } else {
      this.fs.copy(this.templatePath(template), this.destinationPath(destination));
    }
  }
};

var generate = {
  config: function () {
    this.config.set('config', this.prompts);
  },

  app: function () {
    helpers.copy.call(this, '_package.json', 'package.json', this.prompts);

    if (this.prompts.isMailgun || this.prompts.isS3 || this.prompts.isLitmus) {
      helpers.copy.call(this, '_secrets.json', 'secrets.json', this.prompts);
    }
  },

  projectFiles: function () {
    helpers.copy.call(this, 'editorconfig', '.editorconfig');
    helpers.copy.call(this, 'gitignore', '.gitignore');
    helpers.copy.call(this, 'Gruntfile.js', 'Gruntfile.js', this.prompts);
  },

  projectIndex: function () {
    helpers.copy.call(this, '_index.html', 'index.html', this.prompts);
  },

  templateFiles: function () {
    helpers.copy.call(this, 'src/layouts/_default.hbs', 'src/layouts/default.hbs', this.prompts);
    helpers.copy.call(this, 'src/templates/_index.hbs', 'src/templates/index.hbs', this.prompts);
  },

  styleFiles: function () {
    helpers.copy.call(this, 'src/scss/_main.scss', 'src/scss/main.scss', this.prompts);
    helpers.copy.call(this, 'src/scss/_reset.scss', 'src/scss/_reset.scss', this.prompts);
  },

  assets: function () {
    helpers.copy.call(this, 'src/img/keep', 'src/img/.keep');
  }
};

module.exports = generate;

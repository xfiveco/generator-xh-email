module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.exists('secrets.json') ? grunt.file.readJSON('secrets.json') : {},

    // Paths
    paths: {
      src: 'src',
      dist: 'dist',
      layouts: 'layouts',
      templates: 'templates',
      tmp: '.tmp'
    },

    notify: {
      options: {
        title: '<%= projectName %>'
      }<% if (isMailgun) { %>,
      mailgun: {
        options: {
          message: 'Email successfully sent to <%%= config.mailgun.recipient %>'
        }
      }<% } %>,
      build: {
        options: {
          message: 'Build completed'
        }
      }
    },

    // Takes your scss files and compiles them to css
    sass: {
      dist: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          '<%%= paths.tmp %>/css/main.css': '<%%= paths.src %>/scss/main.scss'
        }
      }
    },

    // Assembles your email content with html layout
    assemble: {
      options: {
        layoutdir: '<%%= paths.src %>/<%%= paths.layouts %>',
        flatten: true
      },
      pages: {
        src: ['<%%= paths.src %>/<%%= paths.templates %>/*.hbs'],
        dest: '<%%= paths.dist %>/'
      }
    },

    // Inlines your css
    premailer: {
      html: {
        options: {
          removeComments: true
        },
        files: [{
            expand: true,
            src: ['<%%= paths.dist %>/*.html'],
            dest: ''
        }]
      },

      txt: {
        options: {
          mode: 'txt'
        },
        files: [{
            expand: true,
            src: ['<%%= paths.dist %>/*.html'],
            dest: '',
            ext: '.txt'
        }]
      }
    },<% if (isMailgun || isLitmus) { %>

    // Use Mailgun option if you want to email the design to your inbox or to something like Litmus
    mailgun: {<% if (isMailgun) { %>
      mailer: {
        options: {
          key: '<%%= config.mailgun.apiKey %>',
          sender: '<%%= config.mailgun.sender %>',
          recipient: '<%%= config.mailgun.recipient %>',
          subject: '<%%= config.mailgun.subject %>'
        },
        src: ['<%%= paths.dist %>/' + grunt.option('template') + '.html']
      }<% } %><% if (isMailgun && isLitmus) { %>,<% } %><% if (isLitmus) { %>
      litmus: {
        options: {
          key: '<%%= config.mailgun.apiKey %>',
          sender: '<%%= config.mailgun.sender %>',
          recipient: '<%%= config.litmus.email %>',
          subject: '<%%= config.mailgun.subject %>'
        },
        src: ['<%%= paths.dist %>/' + grunt.option('template') + '.html']
      }<% } %>
    },<% } %><% if (isS3) { %>

    // Use Amazon S3 storage if you're using images in your email
    aws_s3: {
      options: {
        accessKeyId: '<%%= config.aws.accessKey %>',
        secretAccessKey: '<%%= config.aws.secretKey %>',
        region: '<%%= config.aws.region %>',
        uploadConcurrency: 5,
        downloadConcurrency: 5
      },
      prod: {
        options: {
          bucket: '<%%= config.aws.bucket %>',
          differential: true,
          gzipRename: 'ext'
        },
        files: [{
          expand: true,
          cwd: '<%%= paths.src %>/img',
          src: ['*'],
          dest: '/<%%= pkg.name %>'
        }]
      }
    },

    // CDN will replace local paths with your Cloud CDN path
    cdn: {
      options: {
        cdn: 'https://s3-<%%= config.aws.region %>.amazonaws.com/<%%= config.aws.bucket %>/<%= pkg.name %>',
        flatten: true,
        supportedTypes: 'html'
      },
      dist: {
        cwd: './<%%= paths.dist %>',
        src: ['*.html'],
        dest: './<%%= paths.dist %>'
      }
    },<% } %>

    // Watches for changes and reloads a connected browsers
    browserSync: {
      bsFiles: {
        src: [
          '<%%= paths.dist %>/*'
        ]
      },

      options: {
        watchTask: true,
        server: {
          baseDir: './',
          port: 3000
        },
        notify: false
      }
    },

    // Watches for changes to css or email templates then runs grunt tasks
    watch: {
      options: {
        dot: true,
        spawn: false,
        interrupt: true
      },

      compileCSS: {
        files: ['<%%= paths.src %>/**/*'],
        tasks: ['build']
      }
    }
  });<% if (isMailgun) { %>

  // Use grunt send if you want to actually send the email to your inbox
  // grunt send --template=index
  grunt.registerTask('send', ['mailgun:mailer', 'notify:mailgun']);<% } %><% if (isLitmus) { %>

  // Test email templates using Litmus
  // grunt test --template=index
  grunt.registerTask('test', ['mailgun:litmus', 'notify:litmus']);<% } %>

  // Main build task where actually all of the magic happen
  grunt.registerTask('build', ['sass', 'assemble', 'premailer'<% if (isS3) { %>, 'aws_s3', 'cdn'<% } %>, 'notify:build']);

  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['browserSync', 'watch']);
};

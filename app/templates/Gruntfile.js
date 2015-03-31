module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('config.json'),

    // Paths
    paths: {
      src: 'src',
      dist: 'dist',
      layouts: 'layouts',
      templates: 'templates',
      tmp: '.tmp'
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
    },<% if (isMailgun) { %>

    // Use Mailgun option if you want to email the design to your inbox or to something like Litmus
    mailgun: {
      mailer: {
        options: {
          key: '<%%= config.MailgunApiKey %>',
          sender: '<%= mailgunSenderEmail %>',
          recipient: '<%= mailgunRecipientEmail %>',
          subject: '<%= mailgunSubject %>'
        },
        src: ['<%%= paths.dist %>/' + grunt.option('template')]
      }
    },<% } %><% if (isS3) { %>

    // Use Amazon S3 storage if you're using images in your email
    aws_s3: {
      options: {
        accessKeyId: '<%%= config.AWSAccessKeyId %>',
        secretAccessKey: '<%%= config.AWSSecretKey %>',
        region: '<%= s3Region %>',
        uploadConcurrency: 5,
        downloadConcurrency: 5
      },
      prod: {
        options: {
          bucket: '<%= s3Bucket %>',
          differential: true,
          gzipRename: 'ext'
        },
        files: [{
          expand: true,
          cwd: '<%%= paths.src %>/img/',
          src: ['**'],
          dest: '/'
        }]
      }
    },

    // CDN will replace local paths with your Cloud CDN path
    cdn: {
      options: {
        cdn: 'https://s3-<%= s3Region %>.amazonaws.com/<%= s3Bucket %>',
        flatten: true,
        supportedTypes: 'html'
      },
      dist: {
        cwd: './<%%= paths.dist %>/',
        src: ['*.html'],
        dest: './<%%= paths.dist %>/'
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
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browser-sync');<% if (isMailgun) { %>
  grunt.loadNpmTasks('grunt-mailgun');<% } %>
  grunt.loadNpmTasks('grunt-premailer');<% if (isS3) { %>
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-cdn');<% } %>
  grunt.loadNpmTasks('grunt-litmus');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('assemble');<% if (isMailgun) { %>

  // Use grunt send if you want to actually send the email to your inbox
  // grunt send --template=index.html
  grunt.registerTask('send', ['mailgun']);<% } %><% if (isS3) { %>

  // Upload images to our CDN on Rackspace Cloud Files
  grunt.registerTask('cdnify', ['build', 'aws_s3', 'cdn']);<% } %>

  // Main build task where actually all of the magic happen
  grunt.registerTask('build', ['sass', 'assemble', 'premailer']);

  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['browserSync', 'watch']);
};

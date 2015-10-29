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
      }<% } %><% if (isLitmus) { %>,
      litmus: {
        options: {
          message: 'Email tests successfully sent to Litmus'
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
    },<% if (isMailgun) { %>

    // Use Mailgun option if you want to email the design to your inbox or to something like Litmus
    mailgun: {
      mailer: {
        options: {
          key: '<%%= config.mailgun.apiKey %>',
          sender: '<%%= config.mailgun.sender %>',
          recipient: '<%%= config.mailgun.recipient %>',
          subject: '<%%= config.mailgun.subject %>'
        },
        src: ['<%%= paths.dist %>/' + grunt.option('template') + '.html']
      }
    },<% } %><% if (isLitmus) { %>

    // Send your email template to Litmus for testing
    litmus: {
      test: {
        options: {
          username: '<%%= config.litmus.username %>',
          password: '<%%= config.litmus.password %>',
          url: 'https://<%%= config.litmus.company %>.litmus.com',

          // https://<%%= config.litmus.company %>.litmus.com/emails/clients.xml
          clients: [
            'android22',          // Android 2.2
            'android4',           // Android 4
            'appmail7',           // Apple Mail 7
            'appmail8',           // Apple Mail 8
            'iphone5s',           // iPhone 5s (iOS 7)
            'iphone6',            // iPhone 6 (iOS 8)
            'iphone6plus',        // iPhone 6 Plus
            'ipadmini',           // iPad Mini
            'ipad',               // iPad (Retina)
            'notes8',             // Lotus Notes 8
            'notes85',            // Lotus Notes 8.5
            'ol2007',             // Outlook 2007
            'ol2010',             // Outlook 2010
            'ol2011',             // Outlook 2011
            'ol2013',             // Outlook 2013
            'thunderbirdlatest',  // Thunderbird 31
            'windowsphone8',      // Windows Phone 8
            'androidgmailapp',    // Gmail (Android)
            'gmailnew',           // Gmail (Explorer)
            'ffgmailnew',         // Gmail (Firefox)
            'chromegmailnew',     // Gmail (Chrome)
            'aolonline',          // AOL Mail (Explorer)
            'ffaolonline',        // AOL Mail (Firefox)
            'chromeaolonline',    // AOL Mail (Chrome)
            'outlookcom',         // Outlook.com (Explorer)
            'ffoutlookcom',       // Outlook.com (Firefox)
            'chromeoutlookcom',   // Outlook.com (Chrome)
            'yahoo',              // Yahoo! Mail (Explorer)
            'ffyahoo',            // Yahoo! Mail (Firefox)
            'chromeyahoo'         // Yahoo! Mail (Chrome)
          ]
        },
        src: ['<%%= paths.dist %>/' + grunt.option('template') + '.html']
      }
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
        cdn: 'https://s3-<%%= config.aws.region %>.amazonaws.com/<%%= config.aws.bucket %>',
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
  grunt.registerTask('send', ['mailgun', 'notify:mailgun']);<% } %><% if (isLitmus) { %>

  // Test email templates using Litmus
  // grunt test --template=index
  grunt.registerTask('test', ['litmus', 'notify:litmus']);<% } %>

  // Main build task where actually all of the magic happen
  grunt.registerTask('build', ['sass', 'assemble', 'premailer'<% if (isS3) { %>, 'aws_s3', 'cdn'<% } %>, 'notify:build']);

  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['browserSync', 'watch']);
};

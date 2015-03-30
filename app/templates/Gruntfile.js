module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Configs
    config: {
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
          '<%%= config.tmp %>/css/main.css': '<%%= config.src %>/scss/main.scss'
        }
      }
    },

    // Assembles your email content with html layout
    assemble: {
      options: {
        layoutdir: '<%%= config.src %>/<%%= config.layouts %>',
        flatten: true
      },
      pages: {
        src: ['<%%= config.src %>/<%%= config.templates %>/*.hbs'],
        dest: '<%%= config.dist %>/'
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
            src: ['<%%= config.dist %>/*.html'],
            dest: ''
        }]
      },

      txt: {
        options: {
          mode: 'txt'
        },
        files: [{
            expand: true,
            src: ['<%%= config.dist %>/*.html'],
            dest: '',
            ext: '.txt'
        }]
      }
    },

    // Watches for changes and reloads a connected browsers
    browserSync: {
      bsFiles: {
        src: [
          '<%%= config.dist %>/*.txt'
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
        files: ['<%%= config.src %>/**/*'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-mailgun');
  grunt.loadNpmTasks('grunt-premailer');
  grunt.loadNpmTasks('grunt-cloudfiles');
  grunt.loadNpmTasks('grunt-cdn');
  grunt.loadNpmTasks('grunt-litmus');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('assemble');

  // Main build task where actually all of the magic happen
  grunt.registerTask('build', ['sass', 'assemble', 'premailer']);

  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['browserSync', 'watch']);

  // Use grunt send if you want to actually send the email to your inbox
  // grunt.registerTask('send', ['mailgun']);

  // Upload images to our CDN on Rackspace Cloud Files
  // grunt.registerTask('cdnify', ['default','cloudfiles','cdn']);
};

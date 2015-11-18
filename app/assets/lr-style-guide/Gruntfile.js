module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Clean
    clean: ['lr-styleguide/css/*.css', 'lr-styleguide/js/styleguide.js'],

    // Builds Sass
    sass: {
      dist: {
        options: {
          style: 'compressed',
          loadPath: [
            'node_modules/govuk_frontend_toolkit/stylesheets'
          ],
          sourcemap: "none"
        },
        files: [{
          expand: true,
          cwd: "lr-styleguide/sass",
          src: ["*.scss"],
          dest: "lr-styleguide/css",
          ext: ".css"
        }]
      }
    },

    // Concatenate JS files
    concat: {
      dist: {
        src: [
          'node_modules/govuk_frontend_toolkit/javascripts/vendor/polyfills/bind.js',
          'lr-styleguide/js/vendor/polyfills/details.polyfill.js',
          'lr-styleguide/js/vendor/jquery/jquery-1.11.3.js',
          'node_modules/govuk_frontend_toolkit/javascripts/govuk/selection-buttons.js',
          'node_modules/govuk_frontend_toolkit/javascripts/govuk/stick-at-top-when-scrolling.js',
          'node_modules/govuk_frontend_toolkit/javascripts/govuk/stop-scrolling-at-footer.js',
          'lr-styleguide/js/components/buttons-actions.js',
          'lr-styleguide/js/components/case-list.js',
          'lr-styleguide/js/components/inits.js'
        ],
        dest: 'lr-styleguide/js/styleguide.js'
      },
    },

    uglify: {
      my_target: {
        files: {
          'lr-styleguide/js/styleguide.min.js': ['lr-styleguide/js/styleguide.js']
        }
      }
    },

    // Copies templates and assets from external modules and dirs
    copy: {
      main: {
        options: {
          timestamp: true
        },
        files: [{
          expand: true,
          cwd: 'node_modules/govuk_frontend_toolkit/images',
          src: ['**/*'],
          dest: 'lr-styleguide/images/'
        }]
      },
    },

  });

  [
    'grunt-contrib-clean',
    'grunt-contrib-concat',
    'grunt-contrib-copy',
    'grunt-contrib-sass',
    'grunt-contrib-uglify',
    'grunt-contrib-watch'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });

  grunt.registerTask('default', [
    'clean',
    'copy',
    'concat',
    'sass',
    'uglify'
  ]);

};

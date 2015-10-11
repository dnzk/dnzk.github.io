module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      dev: {
        options: {
          port: 9001,
          hostname: '0.0.0.0',
          livereload: true,
          open: {
            target: 'http://localhost:9001'
          }
        }
      }
    },
    less: {
      dev: {
        files: {
          'app/styles/main.css': 'app/styles/main.less'
        }
      },
      prod: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'app/styles/main.css': 'app/styles/main.less'
        }
      }
    },
    uglify: {
      prod: {
        options: {
          mangle: false
        },
        files: {
          'app/script.min.js': [
            'bower_components/angular/angular.js',
            'bower_components/restangular/dist/restangular.js',
            'bower_components/lodash/lodash.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/sprintf/src/sprintf.js',
            'app/app.js',
            'app/characters/characters.controller.js',
            'app/characters/characters.service.js',
            'app/directives/custom-overlay/custom-overlay.directive.js',
            'app/directives/custom-overlay/custom-overlay.service.js'
          ]
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['**/*.html']
      },
      js: {
        files: ['app/**/*.js']
      },
      less: {
        files: ['app/**/*.less'],
        tasks: ['less:dev']
      }
    }
  });
  grunt.registerTask('dev', ['less:dev', 'connect:dev', 'watch']);
  grunt.registerTask('build', ['less:prod', 'uglify:prod']);
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};
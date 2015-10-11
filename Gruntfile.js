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
        options: {
          // compress: true,
          // yuicompress: true,
          // optimization: 2
        },
        files: {
          'app/styles/main.css': 'app/styles/main.less'
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
};
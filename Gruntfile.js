module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist/*.js'],
    jshint: {
      all: ['src/*.js'],
      options: {
			devel:true,
			reporter: 'jslint',
    		reporterOutput: "jshint-output.xml"
		},
    },
    concat: {
      build: {
        files: {
          'dist/<%= pkg.name %>.js': ['src/*.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
	compass: {                 
    dist: {                  
      options: {              
        sassDir: 'src/sass',
        cssDir: 'dist/css'
      }
    }
	},
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'clean']);
  grunt.registerTask('jenkins', ['jshint', 'clean', 'concat', 'uglify', 'compass']);

};

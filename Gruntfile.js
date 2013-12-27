module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	 variables:{
		dist : 'dist',
		src : 'src',
		test : 'test'
	 },
    pkg: grunt.file.readJSON('package.json'),
    clean: ['<%= variables.dist %>/*'],
    jshint: {
      all: ['<%= variables.src %>/*.js'],
      options: {
			devel:true,
			reporter: 'jslint',
    		reporterOutput: "jshint-output.xml"
		},
    },
    concat: {
      build: {
        files: {
          '<%= variables.dist %>/<%= pkg.name %>.js': ['<%= variables.src %>/*.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= variables.dist %>/<%= pkg.name %>.js',
        dest: '<%= variables.dist %>/<%= pkg.name %>.min.js'
      }
    },
	compass: {                 
    dist: {                  
      options: {              
        sassDir: '<%= variables.src %>/sass',
        cssDir: '<%= variables.dist %>/css',
		  environment: 'production'
      }
    },
	dev: {                  
      options: {              
        sassDir: '<%= variables.src %>/sass',
        cssDir: '<%= variables.dist %>/css'
      }
    }
	},
	protractor: {
    options: {
      configFile: "node_modules/protractor/referenceConf.js", // Default config file
      keepAlive: true, // If false, the grunt process stops when the test fails.
      noColor: false, // If true, protractor will not use colors in its output.
    },
 	test: {
      options: {
        configFile: "protractorConfigFile.js",
        args: {} // Target-specific arguments
      }
    }
  },
	connect: {
		options: {
		     port: 9000,
		     base: '<%= variables.dist %>'
		 },
	  	serverTest: {
		 options: {
		     base: '<%= variables.test %>'
		   }
		}
  },
	copy: {
	  main: {
		 files: [
		   // includes files within path
		   {expand: true,flatten: true, src: ['<%= variables.src %>/html/*.html'], dest: '<%= variables.dist %>/html', filter: 'isFile'},
		 ]
	  }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'clean']);
  grunt.registerTask('dev', ['jshint', 'clean', 'concat', 'uglify', 'compass:dev', 'copy']);
  grunt.registerTask('jenkins', ['jshint', 'clean', 'concat', 'uglify', 'compass:dist', 'copy','connect:serverTest', 'protractor:test']);

};

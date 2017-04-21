module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Set up env
    env: {
      dev: {
        NODE_ENV: 'development',
        DEST: 'dev'
      },
      prod: {
        NODE_ENV: 'production',
        DEST: 'dist'
      }
    },

    // So sassy...
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dev/css/styles.css': 'dev/css/sass/main.scss'
        }
      }
    },

    // Concat build files
    concat: {
      js: {
        src: 'dev/js/scripts/*.js',
        dest: 'dev/js/scripts.js'
      }
    },

    // JSHint
    jshint: {
      dev: ['dev/js/scripts/cards.js','dev/js/scripts/map.js']
      //prod: 'dist/js/scripts.min.js'
    },

    // Preprocess HTML
    preprocess: {
      dev: {
        src: 'dev/html/index.html',
        dest: 'dev/index.html'
      },
      prod: {
        src: 'dev/html/index.html',
        dest: 'dist/index.html'
      }
    },

    // Minify css
    cssmin: {
      target:{
        files: {
          'dist/css/styles.min.css': 'dev/css/styles.css'
        }
      }
    },

    // Uglify JS
    uglify: {
      build: {
        src: 'dev/js/scripts.js',
        dest: 'dist/js/scripts.min.js'
      }
    },
    
    // Copy stuff
	copy: {
	  prod: {
		files: [
		  // includes files within path
		  {
		    expand: true,
		    cwd: 'dev/',
		    src: ['data/*'], 
		    dest: 'dist/'
		  },

		  // includes files within path and its sub-directories
		  {
		    expand: true,
		    cwd: 'dev/',
		    src: ['media/*.png'], 
		    dest: 'dist/'
		  }
		],
	  },
	},
    
    // Watch it...
    watch: {
      scripts: {
        files: ['dev/html/*','dev/*/*/*'],
        tasks: ['env:dev','jshint:dev','sass','concat','preprocess:dev']
      }
    },
    
    // S3
    keys: grunt.file.readJSON('aws-keys.json'),
	
	aws_s3: {
		options: {
			accessKeyId: '<%= keys.AWSAccessKeyId %>',
			secretAccessKey: '<%= keys.AWSSecretKey %>',
			region: 'us-west-2'
		},
		push: {
			options: {
				bucket: 'cloud.registerguard.com',
				differential: true,
				access: 'public-read'
			},
			files: [
				{
					expand: true,
					cwd: 'dist',
					src: '**/**',
					dest: '/marijuana-shops/'
				}
			]
		}
	}

  });

  //
  // Load packages
  // Sass
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // JS
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // HTML
  grunt.loadNpmTasks('grunt-preprocess');
  // Other
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-aws-s3');

  //
  // Set up tasks
  grunt.registerTask('default', ['dev'] );
  grunt.registerTask('dev', ['env:dev','jshint:dev','sass','concat','preprocess:dev'] );
  grunt.registerTask('prod', ['env:prod','sass','concat','preprocess:prod','cssmin','uglify','copy:prod'] );
  grunt.registerTask('push', ['aws_s3:push']);

};

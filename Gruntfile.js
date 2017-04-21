module.exports = function(grunt){

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // ---------------------------------------------------------------------------------
    // --------------------------------------(ENV)--------------------------------------
    // ---------------------------------------------------------------------------------
    // Set up environment
    // @see: https://www.npmjs.com/package/grunt-env
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },

    // ---------------------------------------------------------------------------------
    // --------------------------------------(SASS)-------------------------------------
    // ---------------------------------------------------------------------------------
    // So Sassy...
    // @see: https://www.npmjs.com/package/grunt-sass
    sass: {
      options: {
        sourceMap: true
      },
      dev: {
        files: {
          'dev/css/styles.css': 'dev/css/sass/main.scss'
        }
      }
    },

    // ---------------------------------------------------------------------------------
    // -----------------------------------(PREPROCESS)----------------------------------
    // ---------------------------------------------------------------------------------
    // Preprocess HTML
    // @see: https://www.npmjs.com/package/grunt-preprocess
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

    // ---------------------------------------------------------------------------------
    // -------------------------------------(JSHINT)------------------------------------
    // ---------------------------------------------------------------------------------
    // Lint my js
    // @see: https://www.npmjs.com/package/grunt-contrib-jshint
    jshint: {
      dev: ['dev/js/scripts/cards.js','dev/js/scripts/map.js']
    },
    
    // ---------------------------------------------------------------------------------
    // ------------------------------------(CONCAT)-------------------------------------
    // ---------------------------------------------------------------------------------
    // Collect js files in dev
    // @see: https://www.npmjs.com/package/grunt-contrib-concat
    concat: {
      dev: {
        src: 'dev/js/scripts/*.js',
        dest: 'dev/js/scripts.js'
      }
    },

    // ---------------------------------------------------------------------------------
    // ------------------------------------(CSSMIN)-------------------------------------
    // ---------------------------------------------------------------------------------
    // Minify css
    // @see: https://www.npmjs.com/package/grunt-contrib-cssmin
    cssmin: {
      prod:{
        files: {
          // Move to: From where
          'dist/css/styles.min.css': 'dev/css/styles.css'
        }
      }
    },

    // ---------------------------------------------------------------------------------
    // ------------------------------------(UGLIFY)-------------------------------------
    // ---------------------------------------------------------------------------------
    // Uglify JS
    // @see: https://www.npmjs.com/package/grunt-contrib-uglify
    uglify: {
      prod: {
        src: 'dev/js/scripts.js',
        dest: 'dist/js/scripts.min.js'
      }
    },

    // ---------------------------------------------------------------------------------
    // -------------------------------------(COPY)--------------------------------------
    // ---------------------------------------------------------------------------------
    // Copy stuff
    // @see: https://www.npmjs.com/package/grunt-contrib-copy
    copy: {
      prod: {
        files: [
          {
            expand: true,
            cwd: 'dev/',
            src: 'data/*', 
            dest: 'dist/'
          },
          {
            expand: true,
            cwd: 'dev/',
            src: 'media/*.png', 
            dest: 'dist/'
          }
        ],
      },
    },

    // ---------------------------------------------------------------------------------
    // ------------------------------------(AWS-S3)-------------------------------------
    // ---------------------------------------------------------------------------------
    // Push it to S3
    // @see: https://www.npmjs.com/package/grunt-aws-s3
    // First, get keys
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
            src: ['**/*'],
            dest: '/mapcard/'
          }
        ]
      }
    },

    // ---------------------------------------------------------------------------------
    // -------------------------------------(WATCH)-------------------------------------
    // ---------------------------------------------------------------------------------
    // Watch it...
    // @see: https://www.npmjs.com/package/grunt-contrib-watch
    watch: {
      scripts: {
        files: ['dev/*/*/*'],
        tasks: ['dev']
      }
    }

  // Close initConfig()
  });

  // -------------------------------------------------------------------------------------

  // Load packages
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // -------------------------------------------------------------------------------------

  // Set up tasks
  grunt.registerTask('default', ['dev'] );
  grunt.registerTask('dev', ['env:dev','sass:dev','preprocess:dev','jshint:dev','concat:dev'] );
  grunt.registerTask('prod', ['dev','env:prod','cssmin:prod','preprocess:prod','uglify:prod','copy:prod'] );
  grunt.registerTask('push', ['aws_s3:push']);
  grunt.registerTask('fire', ['prod','push']);

};

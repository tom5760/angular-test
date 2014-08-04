'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    version: '1.0.0',

    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Current application environment
  // Can specify with the --env flag, names correspond to JSON files in config
  // directory.
  var configEnv = grunt.option('env');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/**/*.less'],
        tasks: ['less:development', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      config: {
        files: ['config/*.json'],
        tasks: ['config']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 3000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Generates CSS from LESS files
    less: {
      development: {
        options: {
          sourceMap: true,
          sourceMapFilename: '.tmp/styles/app.less.map',
          sourceMapURL: 'app.less.map',
          sourceMapRootpath: '/'
        },
        files: {
          '.tmp/styles/app.less.css': '<%= yeoman.app %>/app.less'
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 versions'],
        map: {
          prev: '.tmp/styles',
        }
      },
      dist: {
        files: {
          '.tmp/styles/app.css': '.tmp/styles/app.less.css'
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/**/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/**.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ngAnnotate tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'components/**/*.html',
            'images/**/*.{webp}',
            'fonts/**/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>',
        dest: '.tmp/styles/app',
        src: '**/*.less'
      }
    },

    // Concatenates templates into a single JS file.
    ngtemplates: {
      options: {
        module: 'test.app',
        append: true,
        htmlmin: '<%= htmlmin.dist.options %>'
      },
      dist: {
        expand: false,
        cwd: '<%= yeoman.app %>',
        src: 'components/**/*.html',
        dest: '.tmp/concat/scripts/scripts.js'
      }
    },

    // Generates Angular constants definitions
    ngconstant: {
      options: {
        name: 'test.config',
        dest: '.tmp/config.js',
      },
      development: {
        options: {
          constants: {
            config: grunt.file.readJSON('config/development.json'),
            build: {
              version: '<%= yeoman.version %>',
              commit: '<%= meta.revision %>',
              env: 'development'
            }
          }
        }
      },
      production: {
        options: {
          constants: {
            config: grunt.file.readJSON('config/production.json'),
            build: {
              version: '<%= yeoman.version %>',
              commit: '<%= meta.revision %>',
              env: 'production'
            }
          }
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'config',
        'copy:styles'
      ],
      test: [
        'config',
        'copy:styles'
      ],
      dist: [
        'config',
        'imagemin',
        'svgmin'
      ]
    },

    // Unit test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    // End-to-end test settings
    protractor: {
      options: {
        configFile: 'test/protractor.conf.js',
        args: {
          baseUrl: 'http://localhost:<%= connect.test.options.port %>'
        }
      },
      test: {},
      sauce: {
        options: {
          configFile: 'test/protractor-sauce.conf.js'
        }
      },
      debug: {
        options: {
          debug: true
        }
      }
    }
  });

  grunt.registerTask('config', function () {
    if (typeof(configEnv) === 'undefined') {
      configEnv = 'development';
    }

    return grunt.task.run('revision', 'ngconstant:' + configEnv);
  });

  grunt.registerTask('server', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      if (typeof(configEnv) === 'undefined') {
        configEnv = 'production';
      }
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'less:development',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'less:development',
    'autoprefixer',
    'connect:test',

    'karma',
    'protractor:test'
  ]);

  grunt.registerTask('test:unit', [
    'clean:server',
    'concurrent:test',
    'less:development',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('test:e2e', function (target) {
    grunt.task.run([
      'clean:server',
      'concurrent:test',
      'less:development',
      'autoprefixer',
      'connect:test',
    ]);

    switch (target) {
    case 'debug':
      grunt.task.run('protractor:debug');
      break;

    case 'sauce':
      grunt.task.run('protractor:sauce');
      break;

    default:
      grunt.task.run('protractor:test');
      break;
    }
  });

  grunt.registerTask('build', function () {
    if (typeof(configEnv) === 'undefined') {
      configEnv = 'production';
    }

    grunt.task.run([
      'clean:dist',
      'revision',
      'useminPrepare',
      'concurrent:dist',
      'less:development',
      'autoprefixer',
      'concat',
      'ngtemplates:dist',
      'ngAnnotate',
      'copy:dist',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'htmlmin'
    ]);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};

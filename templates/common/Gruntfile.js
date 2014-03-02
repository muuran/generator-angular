// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
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

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      src: require('./bower.json').appPath || 'src',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {<% if (coffee) { %>
      coffee: {
        files: ['<%%= yeoman.src %>/app/**/*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:test', 'karma']
      },<% } else { %>
      js: {
        files: ['<%%= yeoman.src %>/app/**/*.js'],
        tasks: ['newer:jshint:all', 'sails-linker'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },<% } %><% if (compass) { %>
      compass: {
        files: ['<%%= yeoman.src %>/app/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },<% } else { %>
      styles: {
        files: ['<%%= yeoman.src %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },<% } %>
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yeoman.src %>/{,*/}*.html',
          '<%%= yeoman.src %>/app/**/*.tpl.html',
          '.tmp/styles/{,*/}*.css',<% if (coffee) { %>
          '.tmp/scripts/{,*/}*.js',<% } %>
          '<%%= yeoman.src %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yeoman.src %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%%= yeoman.src %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js'<% if (!coffee) { %>,
        '<%%= yeoman.src %>/app/**/*.js'<% } %>
      ]<% if (!coffee) { %>,
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }<% } %>
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        html: '<%%= yeoman.src %>/index.html',
        ignorePath: '<%%= yeoman.src %>/'
      }
    },

<% if (coffee) { %>
    // Compiles CoffeeScript to JavaScript
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.src %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },<% } %>

<% if (compass) { %>
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%%= yeoman.src %>/app',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%%= yeoman.src %>/assets/images',
        javascriptsDir: '<%%= yeoman.src %>/app',
        fontsDir: '<%%= yeoman.src %>/assets/fonts',
        importPath: '<%%= yeoman.src %>/bower_components',
        httpImagesPath: '/assets/images',
        httpGeneratedImagesPath: '/assets/images/generated',
        httpFontsPath: '/assets/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n',
        require: 'sass-globbing'
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yeoman.dist %>/assets/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },<% } %>

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/app/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%%= yeoman.src %>/index.html',
      options: {
        dest: '<%%= yeoman.dist %>',
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

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html', '<%%= yeoman.dist %>/app/**/*.tpl.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        root: '<%%= yeoman.src %>'
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.src %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%%= yeoman.dist %>/assets/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.src %>/asset/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/assets/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: ['*.html', 'app/**/*.html'],
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/app',
          src: '*.js',
          dest: '.tmp/concat/app'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.src %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'app/**/*.tpl.html',
            'assets/images/{,*/}*.{webp}',
            'assets/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%%= yeoman.dist %>/assets/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.src %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      serve: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.src %>/bower_components/sass-bootstrap',
          src: ['fonts/*'],
          dest: '<%%= yeoman.src %>/assets'
        }, {
          expand: true,
          cwd: '<%%= yeoman.src %>/bower_components/sass-bootstrap/lib',
          src: '_variables.scss',
          dest: '<%%= yeoman.src %>/app',
          filter: function(filepath) {
            var path = require('path');
            var dest = path.join(
              grunt.config('copy.serve.files.1.dest'),
              path.basename(filepath)
            );
            return !(grunt.file.exists(dest));
          }
        }, {
          expand: true,
          cwd: '<%%= yeoman.src %>/bower_components/font-awesome',
          src: ['fonts/*'],
          dest: '<%%= yeoman.src %>/assets'
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [<% if (coffee) { %>
        'coffee:dist',<% } %><% if (compass) { %>
        'compass:server'<% } else { %>
        'copy:styles'<% } %>
      ],
      test: [<% if (coffee) { %>
        'coffee',<% } %><% if (compass) { %>
        'compass'<% } else { %>
        'copy:styles'<% } %>
      ],
      dist: [<% if (coffee) { %>
        'coffee',<% } %><% if (compass) { %>
        'compass:dist',<% } else { %>
        'copy:styles',<% } %>
        'imagemin',
        'svgmin'
      ]
    },

    // Auto link scripts
    'sails-linker': {
      index: {
        options: {
          appRoot: '<%%= yeoman.src %>/'
        },
        files: {
          '<%%= yeoman.src %>/index.html': ['<%%= yeoman.src %>/app/**/*.js']
        }
      },
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%%= yeoman.src %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%%= yeoman.dist %>/app/scripts.js': [
    //         '<%%= yeoman.dist %>/app/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bower-install',
      'sails-linker',
      'copy:serve',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bower-install',
    'sails-linker',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};

'use strict';

var webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/*[!tests]*/*.js'],
		clientViews: ['public/modules/**/*.html'],
		clientJS: ['public/js/*.js', 'public/modules/*[!tests]*/*.js'],
		clientCSS: ['public/modules/**/*.css', 'public/less/modules.css'],
		clientLESS: ['public/**/*.less', 'public/less/*'],
		mochaTests: ['app/tests/**/*.js']
	};

	grunt.loadNpmTasks('grunt-webpack');

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['public/dist'],
		watch: {
			serverViews: {
				files: watchFiles.serverViews,
				options: {
					livereload: true
				}
			},
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientViews: {
				files: watchFiles.clientViews,
                tasks: ['html2js'],
				options: {
					livereload: true,
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: [],
				options: {
					livereload: true
				}
			},
			clientLESS: {
                files: watchFiles.clientLESS,
                tasks: ['less'],
                options: {
                    livereload: true,
                }
			}
		},
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc',
			},
			all: {
				src: watchFiles.clientCSS
			}
		},
        html2js: {
            options: {
                base: 'public/'
            },
            main: {
                src: '<%= applicationHTMLFiles %>',
                dest: 'public/dist/templates.js'
            }
        },
		cssmin: {
			combine: {
				files: {
					'public/dist/application.min.css': '<%= applicationCSSFiles %>'
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					ext: 'js,html'
				}
			},
			debug: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html'
				}
			}
		},
		concurrent: {
			default: ['nodemon:dev', 'watch'],
			debug: ['nodemon:debug'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		env: {
            development: {
                NODE_ENV: 'development'
            },
			test: {
				NODE_ENV: 'test'
			}
		},
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
				reporter: 'spec',
				require: 'server.js'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		less: {
			development: {
				files: {
              		'public/less/modules.css': 'public/less/modules.less'
            	}
			},
			options: {
				plugins: [require('less-plugin-glob')]
			}
		},
		webpack: {
			prod: webpackConfig,
			dev: webpackConfig
		}
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		//jshint unused:false
		var init = require('./config/init')();
		var config = require('./config/config');

        grunt.config.set('applicationHTMLFiles', config.assets.html);
        grunt.config.set('applicationJavaScriptLibFiles', config.assets.lib.js);
		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
	});

	// Default task(s).
	grunt.registerTask('default', ['concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'csslint']);

	// Build task(s).
	grunt.registerTask('build', ['env:development', 'loadConfig', 'clean', 'webpack:prod', 'html2js', 'cssmin', 'less']);

	// Test task.
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

    grunt.registerTask('mocha', ['env:test', 'mochaTest']);

	// production
	grunt.registerTask('production', []);
};

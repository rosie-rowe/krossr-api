'use strict';

var webpackConfig = require('./webpack.config'),
	crypto = require('crypto');

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-webpack');

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['public/dist'],
		cssmin: {
			combine: {
				files: {
					'public/dist/application.bundle-<%= hash %>.min.css': '<%= applicationCSSFiles %>'
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
					nodeArgs: ['--inspect'],
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
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		less: {
			development: {
				files: {
              		'public/dist/modules.bundle-<%= hash %>.css': 'public/less/modules.less'
            	}
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

        grunt.config.set('applicationJavaScriptLibFiles', config.assets.lib.js);
		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
		grunt.config.set('hash', crypto.createHash('md5').digest('hex'));
	});

	// Default task(s).
	grunt.registerTask('default', ['concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Build task(s).
	grunt.registerTask('buildCSS', ['less', 'cssmin']);
	grunt.registerTask('buildTypescript', ['webpack:dev']);
	grunt.registerTask('build', ['env:development', 'loadConfig', 'clean', 'buildTypescript', 'buildCSS']);

	grunt.registerTask('test', ['env:test', 'karma:unit']);
};

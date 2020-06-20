'use strict';

var webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-webpack');

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['public/dist'],
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
		webpack: {
			prod: webpackConfig,
			dev: webpackConfig
		}
	});

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// Default task(s).
	grunt.registerTask('default', ['concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	grunt.registerTask('buildTypescript', ['webpack:dev']);
	grunt.registerTask('build', ['env:development', 'clean', 'buildTypescript']);

	grunt.registerTask('test', ['env:test', 'karma:unit']);
};

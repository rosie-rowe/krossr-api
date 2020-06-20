'use strict';

var webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-webpack');

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['public/dist'],
		webpack: {
			prod: webpackConfig,
			dev: webpackConfig
		}
	});

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	grunt.registerTask('buildTypescript', ['webpack:dev']);
	grunt.registerTask('build', ['buildTypescript']);
};

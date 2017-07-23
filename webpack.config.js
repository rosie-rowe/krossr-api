'use strict';

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');

var config = {
    entry: {
        'krossr': 'AppModule.ts'
    },
    output: {
        path: '/public/dist',
        filename: 'krossr.js'
    },
    resolve: {
        modules: ['node_modules', 'public/modules'],
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            { test: /.*[^test].ts$/, loader: 'ts-loader' }
        ]
    }
}

module.exports = config;
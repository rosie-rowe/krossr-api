'use strict';

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');

var config = {
    entry: {
        'krossr': glob.sync('/public/modules/**/!(*.test).ts')
    },
    output: {
        path: '/public/dist',
        filename: 'krossr.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            { test: /.*[^test].ts$/, loader: 'ts-loader' }
        ]
    }
}

module.exports = config;
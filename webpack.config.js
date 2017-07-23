'use strict';

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');

var config = {
    entry: {
        'krossr': 'AppModule.ts'
    },
    output: {
        path: __dirname + '/public/dist',
        filename: 'krossr.js'
    },
    resolve: {
        modules: [
            'node_modules',
            'public/lib',
            'public/modules'
        ],
        extensions: [
            '.ts',
            '.js'
        ]
    },
    module: {
        loaders: [
            {
                include: __dirname,
                test: /.*[^test].ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}

module.exports = config;
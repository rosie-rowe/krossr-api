'use strict';

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');

var config = {
    entry: {
        'krossr': 'AppModule.ts'
    },
    output: {
        path: path.join(__dirname + '/public/dist'),
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
                include: path.join(__dirname, 'public/modules'),
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}

module.exports = config;
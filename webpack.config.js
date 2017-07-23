'use strict';

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');

var config = {
    entry: {
        'vendor': ['angular'],
        'krossr': 'AppModule.ts'
    },
    output: {
        path: path.join(__dirname + '/public/dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            minChunks: Infinity
        })
    ],
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
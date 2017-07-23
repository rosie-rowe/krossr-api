'use strict';

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');

var config = {
    entry: {
        'vendor': [
            'angular',
            'angular-animate',
            'angular-resource',
            'angular-cookies',
            'angular-touch',
            'angular-sanitize',
            'angular-ui-router',
            'angular-ui-utils/ui-utils.js',
            'ng-debounce/angular-debounce.js',
            'ngDialog/js/ngDialog.js'
        ],
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
            'public/lib/angular-ui-router/release',
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
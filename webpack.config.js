'use strict';

var path = require('path');

var config = {
    devtool: 'source-map',
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
            'ngDialog/js/ngDialog.js',
            'ng-lodash/build/ng-lodash.js'
        ],
        'krossr': 'app.ts'
    },
    output: {
        path: path.join(__dirname + '/public/dist'),
        filename: '[name].bundle-[hash].js'
    },
    resolve: {
        modules: [
            'node_modules',
            'public/lib',
            'public/lib/angular-ui-router/release',
            'public/modules',
            'public/ng-app'
        ],
        extensions: [
            '.ts',
            '.js'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}

module.exports = config;
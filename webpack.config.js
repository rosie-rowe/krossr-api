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
            'angular-ui-utils/ui-utils.js',
            'ng-debounce/angular-debounce.js'
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
                loader: 'html-loader?minimize=false' // Angular attributes require correct case...
            },
            /** Mixed usage of scss/less loaders will be fixed later, TODO */
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'to-string-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
}

module.exports = config;
'use strict';

var path = require('path');
var nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const tsNameof = require('ts-nameof');

var config = {
    devtool: 'source-map',
    entry: {
        'server': './server.ts'
    },
    externals: [
        nodeExternals(),
        { fs: 'commonjs fs' }
    ],
    mode: 'development',
    node: {
        __dirname: false
    },
    output: {
        path: path.join(__dirname + '/dist'),
        filename: '[name].js'
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'app/models', to: 'models' },
                { from: 'app/views', to: 'views' }
            ]
        }),
        new EnvironmentPlugin(['SESSION_SECRET', 'SENDGRID_API_KEY'])
    ],
    resolve: {
        modules: [
            'node_modules'
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
                use: [{
                    loader: 'ts-loader',
                    options: {
                        getCustomTransformers: () => ({ before: [tsNameof] })
                    }
                }]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader?minimize=false' // Angular attributes require correct case...
            }
        ]
    }
}

module.exports = config;
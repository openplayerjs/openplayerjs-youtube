const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        'openplayer-youtube.min.js': './src/youtube.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]',
        publicPath: '/dist/',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /src\/*\.js$/,
                exclude: /node_modules/,

                use: [{
                    loader: 'eslint-loader',

                    options: {
                        failOnWarning: true,
                        failOnError: true
                    }
                }]
            },
            {
                test: /src\/*\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name]'),
        new UnminifiedWebpackPlugin({
            postfix: ' ',
        })
    ]
};

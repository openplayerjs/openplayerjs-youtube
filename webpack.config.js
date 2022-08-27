const path = require('path');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    target: 'node',
    stats: {
        children: true,
    },
    context: __dirname,
    entry: {
        'openplayerjs-youtube.min.js': './src/youtube.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]',
        publicPath: '/dist/',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this',
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
                test: /src\/youtube.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false,
        },
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    mangle: true,
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new UnminifiedWebpackPlugin({
            postfix: 'nomin',
        }),
    ],
};

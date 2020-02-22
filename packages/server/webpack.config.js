// Load dotenv configurations
require('dotenv').config();

const paths = require('../../config/paths');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const webpackConfig = {
    name: 'server',
    target: 'node',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        index: paths.server('index')
    },
    output: {
        filename: `[name].js`,
        path: paths.dist(),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: true,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    externals: [nodeExternals()],
    node: {
        console: true,
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
        }),

        new CaseSensitivePathsPlugin(),
    ],
};

module.exports = webpackConfig;

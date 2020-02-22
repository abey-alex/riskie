// Load dotenv configurations
require('dotenv').config();

const paths = require('../../config/paths');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const webpackConfig = {
    name: 'client',
    target: 'web',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        app: paths.client('index')
    },
    output: {
        filename: `[name].js`,
        path: paths.dist(),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: true,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.js', '.json'],
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
    ],
};

module.exports = webpackConfig;

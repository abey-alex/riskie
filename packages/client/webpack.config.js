// Load dotenv configurations
require('dotenv').config();

const paths = require('../../config/paths');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackBar = require('webpackbar');

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
        new WebpackBar({ name: 'client' }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
        }),
    ],
};

module.exports = webpackConfig;
exports.default = webpackConfig;

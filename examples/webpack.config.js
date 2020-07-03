const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: '#source-map',
    entry: path.resolve(__dirname, './index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'jojo': path.resolve(__dirname, '../src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { 
                            modules: {
                                mode: 'global',
                                localIdentName: '[path][name]__[local]',
                            }
                        }
                    },
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { 
                            modules: {
                                localIdentName: '[path][name]__[local]',
                            },
                            
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                use: 'vue-loader' 
            },
            {
                test: /\.(png|jpe?g|gif|eot|ttf|woff2?|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: path.resolve(__dirname, './index.html'),
        })
    ],
    devServer: {
        contentBase: __dirname,
        publicPath: '/',
        // host: '192.168.3.8', // 调试用
        proxy: {
            '/upload': 'http://localhost:3000'
        }
    }
}
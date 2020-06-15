const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        library: 'jojo',
        libraryExport: 'default',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, '../dist')
    },
    optimization: {
        minimize: false
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
                            url: false,
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
    ],
}
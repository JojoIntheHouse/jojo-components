const path = require('path');
const JSONMinifyPlugin = require('node-json-minify');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const isProd = process.env.NODE_ENV === 'production'
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
        minimize: true,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                data: {
                    test: /\.json/,
                    name: 'data',
                    chunks: 'all',
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: 'src/components/j-emoji-select/data/apple.json',
        //             transform: function(content) {
        //                 // minify json
        //                 return JSONMinifyPlugin(content.toString());
        //             },
        //             to: path.resolve(__dirname, '../dist/data')
        //         },
        //     ],
        // }),
        // new BundleAnalyzerPlugin({ analyzerPort: 8081 }) 
    ],
}
const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production' // 设置环境变量，用于postcss

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: [
                // 'style-loader',  // 创建style标签，将css插入进去，
                {// 提出CSS为单独文件
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                'css-loader', // 将css弄到js中
                {   // css 兼容性处理
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ['postcss-preset-env'] // browserslist
                        }
                    }

                }
            ]
        }, {
            test: /\.less$/i,
            use: [
                // 'style-loader', 
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                'css-loader',
                {   // css 兼容性处理
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ['postcss-preset-env']
                        }
                    }

                },
                'less-loader'
            ]
        }, { // 处理图片资源，limit以下大小的图片使用base64
            test: /\.(png|jpg|gif|svg|jpeg)/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[hash:10].[ext]',
                        outputPath: 'static',
                        esModule: false
                    }
                }
            ]
        }, { // 处理静态资源
            exclude: /\.(css|less|html|js|png|jpg|gif|svg|jpeg)$/i,
            loader: 'file-loader',
            options: {
                name: '[hash:10].[ext]',
                outputPath: 'static'
            }
        }, { // 处理html中的图片
            test: /\.html$/i,
            loader: 'html-loader'
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({ // html模版导出
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({ // 提取css到单独文件
            filename: 'css/[hash:10].css'
        }),
        new OptimizeCssAssetsPlugin() // 压缩css
    ],

    mode: 'development',

    devServer: {
        port: 8080,
        open: true
    }

}
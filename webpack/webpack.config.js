const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/i,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, { // 处理图片资源，limit以下大小的图片使用base64
            test: /\.(png|jpg|gif|svg)/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[hash:10].[ext]',
                        outputPath: 'static'
                    }
                }
            ]
        }, { // 处理静态资源
            exclude: /\.(css|less|html|js|png|jpg|gif|svg)$/i,
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
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    mode: 'development',

    devServer: {
        port: 8080,
        open: true
    }

}
const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// process.env.NODE_ENV = 'production'; // 设置环境变量，用于postcss

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built[contenthash:10].js',
        path: resolve(__dirname, 'build'),
        // publicPath: '/' // 资源引入的路径前缀
        chunkFilename: 'js/[name]_chunk.js' // 非入口chunk的名称
    },
    module: {
        rules: [
            { // js 兼容性处理
                test: /\.js$/i,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', // 预设处理
                                {
                                    useBuiltIns: 'usage', // 使用corejs按需处理
                                    corejs: {
                                        version: 3
                                    },
                                    targets: { // 浏览器需求
                                        chrome: '60',
                                        ie: '9',
                                        firefox: '50',
                                        edge: '17',
                                        safari: '10'
                                    }
                                }
                            ]
                        ]
                    }
                }, 
                // {
                //     loader: 'eslint-loader',
                //     options: {
                //         fix: true, // 自动修复不合格的语法
                //     }
                // }
            
            ]
            },
            // { // js语法检查 // 使用airbnb进行语法检查 ,使用  npm i eslint-config-airbnb-base
            //     //  "extends": "airbnb-base" 可以配置在package.json 也可以在 .eslintrc 中。
            //     test: /\.js/i,
            //     exclude: /node_modules/,
            //     use: [{
            //         loader: 'eslint-loader',
            //         options: {
            //             fix: true, // 自动修复不合格的语法
            //         }
            //     }]
            // },
            {
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
                    'css-loader',// 将css弄到js中
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
                test: /\.(png|jpg|gif|svg|jpeg)$/i,
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
            template: './src/index.html',
            minify: false  //true if mode is 'production', otherwise false
        }),
        new MiniCssExtractPlugin({ // 提取css到单独文件
            filename: 'css/built[contenthash:10].css'
        }),
        new OptimizeCssAssetsPlugin() // 压缩css
    ],

    // 树摇 tree shaking 1. mode为 production 2. 必须使用es6的import。 在有些版本中可能摇掉 css 文件
    // 必须使用 sideEffects,
    // sideEffects: false, // 是有的代码都没有副作用，都参与树摇, 需要配置在package.json中。

    // js压缩 将 development 改成 production
    mode: 'development',

    devtool: 'source-map',  //构建后的关联源代码

    resolve: {
        alias: { // 配置路径别名
            sss: resolve(__dirname, 'src/js'),
            '$css': resolve(__dirname, 'src/css/')
        },
        extensions: ['.js', '.json'], // 配置引入文件的后缀
        modules: [resolve(__dirname, 'node_modules'), 'node_modules'] // 指定解析模块的路径 默认为node_modules 
    },

    devServer: {
        port: 8080,
        open: true,
        hot: true
    }

}
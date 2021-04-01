const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// const ESLintPlugin = require('eslint-webpack-plugin');

// process.env.NODE_ENV = 'production'; // 设置环境变量，用于postcss

// 树摇 tree shaking 1. mode为 production 2. 必须使用es6的import。 在有些版本中可能摇掉 css 文件
// 必须使用 sideEffects,
// sideEffects: false, // 是有的代码都没有副作用，都参与树摇, 需要配置在package.json中。

const cssLoaders = [
  // 'style-loader',  // 生成html中的style标签
  {// 提出CSS为单独文件
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  }, {
    loader: 'css-loader', // 将css弄到js中
  }, {   // css 兼容性处理
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['postcss-preset-env'] // browserslist
      }
    }
  }];

/**
 * 1. js  压缩： 将mode development 改成 production。
 * 2. css 压缩： CssMinimizerPlugin，optimization配置项。
 * 3. html压缩： HtmlWebpackPlugin  minify true or false, 不写的情况，会根据mode的配置。
 */
module.exports = {
  mode: 'production', // js压缩 将 development 改成 production
  // devtool: 'source-map',  //构建后的关联源代码
  entry: './src/js/index.js',
  output: {
    filename: 'js/built[contenthash:10].js',
    path: resolve(__dirname, 'build'),
    // publicPath: '/' // 资源引入的路径前缀
    // chunkFilename: 'js/[name]_chunk.js' // 非入口chunk的名称
  },

  module: {
    rules: [

      // =================================== babel loader ===================================
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
        }]
      },

      // =================================== css loader ===================================
      {
        test: /\.css$/i,
        use: [...cssLoaders]
      },

      // =================================== less loader ==================================
      {
        test: /\.less$/i,
        use: [...cssLoaders, 'less-loader']
      },

      // =================================== url loader ==================================
      { // 处理图片资源，limit以下大小的图片使用base64
        test: /\.(png|jpg|gif|svg|jpeg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[hash:10].[ext]',
            outputPath: 'static',
            esModule: false
          }
        }
        ]
      },

      // =================================== static loader ==================================
      { // 处理静态资源
        exclude: /\.(css|less|html|js|png|jpg|gif|svg|jpeg)$/i,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'static'
        }
      },

      // =================================== html loader ==================================
      { // 处理html中的图片
        test: /\.html$/i,
        loader: 'html-loader'
      }],
  },

  // 压缩处理css
  optimization: {
    // minimize: false, // 设置为true， 开发模式也压缩
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
      new UglifyJsPlugin()
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ // html模版导出
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({ // 提取css到单独文件
      filename: 'css/built[contenthash:10].css'
    }),
    // new ESLintPlugin({ // js 语法检查
    //   fix: true
    // }),
    // new OptimizeCssAssetsPlugin() // 压缩css webpack4 对于5已经过时了
  ],

  resolve: {
    alias: { // 配置路径别名
      '@': resolve(__dirname, 'src/'),
      '$css': resolve(__dirname, 'src/css/')
    },
    extensions: ['.js', '.json'], // 配置引入文件的后缀
    modules: [resolve(__dirname, 'node_modules'), 'node_modules'] // 指定解析模块的路径 默认为node_modules 
  }
}
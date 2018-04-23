const path			            = require('path');
const config		            = require('../config');
const webpack								= require('webpack');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const FriendlyErrorsPlugin  = require('friendly-errors-webpack-plugin');
const StyleLintPlugin       = require('stylelint-webpack-plugin');

function resolve (dir) {
	return path.join(__dirname, '..', dir);
}

module.exports = {
	entry: {
		app: ['./build/dev-client', './src/main.js', './common/common.js']
	},
  output: {
    path: config.dev.assetsRoot,
    filename: '[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'style': path.resolve('src/style'),
      'components': path.resolve('src/components'),
      'asset': path.resolve('src/asset')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                css: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      minimize: false,
                      sourceMap: true
                    }
                  }
                ],
                less: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      minimize: false,
                      sourceMap: true
                    }
                  },
                  {
                    loader: 'less-loader',
                    options: Object.assign({}, {
                      sourceMap: true
                    })
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader?modules',
            options: {
              minimize: false,
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader?modules',
            options: {
              minimize: false,
              sourceMap: true
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: Object.assign({}, {
              sourceMap: true
            })
          }
        ]
      },
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new FriendlyErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: ['src/**/*.less', 'src/**/*.css']
    })
  ]
}

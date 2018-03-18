const path = require('path')
const argv = require('yargs').argv
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = argv.mode === 'development'
const isProd = argv.mode = !isDev
const distPath = path.join(__dirname, '/public-dev')

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: isDev
})

const config = {
  entry: {
    main: './dev-test/js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: distPath
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }]
    }, {
      test: /\.vue$/,
      use: {
        loader: 'vue-loader'
      }
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: extractSass.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: isProd
          }
        },
          'sass-loader',
          'resolve-url-loader'
        ]
      })
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name][hash].[ext]'
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 70
          }
        }
      }]
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name][hash].[ext]'
        }
      }
    }]
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      template: './dev-test/index.html'
    })
  ],
  optimization: isProd ? {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            warnings: false,
            drop_console: true,
            unsafe: true
          }
        }
      })
    ]
  } : {},
  devServer: {
    contentBase: distPath,
    port: 9000,
    compress: true,
    open: true
  }
}
module.exports = config
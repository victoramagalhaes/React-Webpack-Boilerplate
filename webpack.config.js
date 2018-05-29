var config = require("./webpack.config.js");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: "./src/index.jsx",
    mode: 'production',
    output:{
        path: __dirname + "/public",
        filename:"./app.js"
    },
    devServer: {
        contentBase: __dirname + "/public",
        inline: true,
        hot:true,
        watchContentBase: true,
        port:9000,
        historyApiFallback: true
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
      },
    module:{
        rules:[
            {
               loader: "babel-loader",
               test: /.js[x]?$/,
               exclude: /node_modules/,
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader?name=font-[hash:6].[ext]&outputPath=./fonts"
              },
            {
                test: /\.(gif|png|jpe?g|svg)/i,
                use: [
                    "file-loader?name=img-[hash:6].[ext]&outputPath=./images",
                    {
                        loader: "image-webpack-loader",
                        options:{
                            gifsicle:{
                                interlanced:false
                            },
                            optipng: {
                                optimizationLevel: 7
                            },
                            pngquant:{
                                quality:"65-90",
                                speed: 4
                            },
                            mozjpeg:{
                                progressive:true,
                                quality:65
                            }
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
              },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                  {
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                  })
              }
        ]
    },
    plugins: [ 
        new ExtractTextPlugin(
          {filename: 'app.css'}
        ),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
          inject: false,
          hash: true,
          template: './src/index.html',
          filename: 'index.html'
        })
      ]
};
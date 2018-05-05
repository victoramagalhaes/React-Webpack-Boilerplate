var config = require("./webpack.config.js");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        port:3000
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
        new HtmlWebpackPlugin({
          inject: false,
          hash: true,
          template: './src/index.html',
          filename: 'index.html'
        })
      ]
};
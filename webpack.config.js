var config = require("./webpack.config.js");

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
        watchContentBase: true
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
                    }
                ]

            }
        ]
    }
};
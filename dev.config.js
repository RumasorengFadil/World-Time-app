const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("./webpack.config");
const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(config,{
    mode : "development",
    devServer: {
      static: {
        directory: path.join(__dirname, 'src'),
      },
      compress: true,
      port: 9000,
      liveReload : true
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: './template.html'
      })
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          }
        ]
    },
    devtool : false
})

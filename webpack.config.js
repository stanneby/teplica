const path = require("path");
var InlineChunkHtmlPlugin = require("inline-chunk-html-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    front: "./src/front/index.ts",
    back: "./src/back/index.ts",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.[tj]s$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      inlineSource: ".(js|css)$",
      chunks: ["front"],
      template: "./src/front/index.html",
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, ["front"]),
  ],
  target: "node",
};

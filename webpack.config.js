const path = require("path");
var InlineChunkHtmlPlugin = require("inline-chunk-html-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    front: "./src/front/index.js",
    back: "./src/back/index.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      inlineSource: ".(js|css)$",
      chunks: ["front"],
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, ["front"]),
  ],
};

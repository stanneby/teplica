const path = require("path");
var InlineChunkHtmlPlugin = require("inline-chunk-html-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    new HtmlWebpackPlugin({
      inject: true,
      inlineSource: ".(js|css)$",
      chunks: ["front"],
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, ["front"]),
  ],
  target: "node",
};

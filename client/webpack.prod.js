const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].[hash].js"
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({})], // Minify code with the terser plugin. The sideEffects must be set to false in package.json
    splitChunks: {
      chunks: "all" // Split all chunks, including sync
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      // Build an HTML file and automatically fill it with the bundles
      template: "./src/index.html",
      filename: "index.html"
    }),
    new BundleAnalyzerPlugin(),
    new CompressionPlugin(), // Compress assets
    new CleanWebpackPlugin() // Gut the dist folder during every build
  ]
};

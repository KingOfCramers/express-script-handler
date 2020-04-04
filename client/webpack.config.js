const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AsyncChunkNames = require("webpack-async-chunk-names-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    chunkFilename: '[name].[hash].js'
  },
  optimization: {
    splitChunks: { // The split chunks plugin
      cacheGroups: { 
        default: false,
        vendors: false,
        vendor: { // Create a chunk to include node_modules dependencies.
          name: 'modules',
          chunks: 'all',
          test: /node_modules/
        },
        common: { // Create common chunks for every module imported into more than 2x 
          name: 'common',
          minChunks: 2,
          enforce: true // Force webpack to make the chunk, regardless of size
        }
      },
    }
  },
  devtool: 'inline-source-map', // Allows us to see errors in specific modules rather than the entire bundle.js file
  devServer: { // Essentially an Express server w/ hot reloading
    contentBase: path.join(__dirname, "./dist"),
    port: 3001,
    hot: true, // Reload files on change...
    proxy: {
      "/api": {
        target: "http://localhost:3005",
        pathRewrite: { '^/api': '' } // Will proxy all /api/whatever requests to localhost:3000/whatever
      }
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
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({ // Build an HTML file and automatically fill it with the bundles 
      template: "./src/index.html",
      filename: "index.html"
    }),
    //new CompressionPlugin(), // Compress assets
    new CleanWebpackPlugin(), // Gut the dist folder during every build
    new AsyncChunkNames() // Names our async chunks after the files they are imported from
  ]
}

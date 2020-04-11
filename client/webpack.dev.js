const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AsyncChunkNames = require("webpack-async-chunk-names-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].[hash].js" // The names of our chunks.
  },
  optimization: {
    splitChunks: {
      chunks: "all" // Split all chunks, including sync
    }
  },
  devtool: "inline-source-map", // Allows us to see errors in specific modules rather than the entire bundle.js file
  devServer: {
    // Essentially an Express server w/ hot reloading
    contentBase: path.join(__dirname, "./dist"),
    open: false, // Do not automatically open the Chrome browser.
    port: 3001,
    hot: true, // Reload files on change...
    headers: {
      // Allow CORS
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      "/api": {
        target: {
          host: "127.0.0.1",
          port: 3005
        },
        pathRewrite: { "^/api": "" } // Will proxy all /api/whatever requests to localhost:3000/whatever
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
    new AsyncChunkNames(),
    new CleanWebpackPlugin() // Gut the dist folder during every build
  ]
};

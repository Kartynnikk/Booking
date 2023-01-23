const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { ALL } = require("dns");
// const { allowedNodeEnvironmentFlags } = require("process");
// const OptimizeCssAssetPlugin = require("optimize-css-assets-webpack-plugin");
// const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = true; //process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };
  if (isProd) {
    // config.minimizer = [new OptimizeCssAssetPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./index.js",
    history: "./history.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".json", ".png"],
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "./assets", to: "assets" }],
    }),
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
      chunks: ["main"],
    }),
    new HTMLWebpackPlugin({
      filename: "history.html",
      template: "./history.html",
      minify: {
        collapseWhitespace: isProd,
      },
      chunks: ["history"],
    }),
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};

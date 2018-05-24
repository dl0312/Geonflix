const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js",
  module: {},
  output: {
    path: path.join(__dirname, "out"),
    filename: "bundle.js"
  }
};

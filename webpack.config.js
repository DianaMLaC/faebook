const path = require("path")

module.exports = {
  entry: "./frontend/faebook.jsx",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
}

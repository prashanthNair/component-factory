const path = require("path");

module.exports = {
  entry: "./src/Register.tsx",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "user-register.bundle.js",
    library: {
      type: "umd",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    react: "react", // Externalize React
    "react-dom": "react-dom", // Externalize ReactDOM
  },
};

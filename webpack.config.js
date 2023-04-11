const path = require("path");
module.exports = {
  mode: "development", // development mood
  entry: "./src/index.js", // this is the file that will be watched and compiled to bundle.js file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watch: true,
};

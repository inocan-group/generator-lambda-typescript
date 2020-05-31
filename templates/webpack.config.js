const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  context: __dirname,
  entry: JSON.parse(
    require("fs").readFileSync("./webpack.ts-entry-points.json", {
      encoding: "utf-8",
    })
  ),
  resolve: {
    mainFields: ["main", "module"],
    extensions: [".js", ".json", ".ts"],
  },
  mode: "production",
  optimization: {
    minimize: false,
  },
  output: {
    pathinfo: false,
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, ".webpack"),
    filename: "[name].js",
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: true,
    //   statsFilename: 'stats.json',
    //   generateStatsFile: true,
    // }),
  ],
};

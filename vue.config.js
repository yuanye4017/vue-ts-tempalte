const path = require("path");

const devServerPort = 8080; // TODO: get this variable from setting.ts
const name = "Vue Typescript Template"; // TODO: get this variable from setting.ts

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/product-vue-template/" : "/",
  lintOnSave: process.env.NODE_ENV === "dsevelopment",
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "src/styles/_variables.scss"),
        path.resolve(__dirname, "src/styles/_mixins.scss")
      ]
    }
  },
  chainWebpack(config) {
    config.set("name", name);
    config.when(process.env.NODE_ENV === "development", config =>
      config.devtool("cheap-eval-source-map")
    );
    config.plugins.delete("progress");
    // 服务的进度输出 打包进度百分比
    config
      .plugin("simple-progress-webpack-plugin")
      .use(require.resolve("simple-progress-webpack-plugin"), [
        {
          format: "compact"
        }
      ]);
    // 打包分析
    config.when(process.env.use_analyzer, config =>
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
    );
    // set svg-sprite-loader
    config.module // svg-sprite-loader 将加载的 svg 图片拼接成 雪碧图，放到页面中，其它地方通过 <use> 复用
      .rule("svg")
      .exclude.add(path.resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    config.when(process.env.NODE_ENV !== "development", config => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-vant", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: path.resolve(__dirname, "src/components"),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  }
};

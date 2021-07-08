module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      disableHostCheck: true,
      sockPort: 9003,
      sockHost: "localhost",
      // https: true,
      port: 9003
    },
    externals: ["vue", "vue-router", /^@avon\/.+/]
  },
  filenameHashing: false
};

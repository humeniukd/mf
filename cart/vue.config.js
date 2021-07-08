module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      disableHostCheck: true,
      sockPort: 9004,
      sockHost: "localhost",
      // https: true,
      port: 9004
    },
    externals: [
      "vue",
      "vue-router",
      "@storefront-ui/vue",
      "@vue/composition-api",
      /^@avon\/.+/,
    ]
  },
  filenameHashing: false
};

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets:"@/assets",
        api:"@/api",
        components:"@/components",
        views:"@/views"
      },
    },
  }
}
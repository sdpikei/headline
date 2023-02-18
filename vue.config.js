const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。

        modifyVars: {
          // 直接覆盖变量
          'nav-bar-background-color': 'rgb(251, 114, 153)',
          'nav-bar-text-color': 'rgb(255, 245, 255)',
          'nav-bar-icon-color': 'rgb(255, 245, 255)',
          'nav-bar-title-text-color': 'rgb(255, 245, 255)'
        },

      },
    },
  },
})

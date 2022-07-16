const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const setting = require('./src/setting')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = setting.title
      return args
    })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})

const {
  defineConfig
} = require('@vue/cli-service');
const {
  VantResolver
} = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
    resolve: {
      //设置别名
      alias: {
        'assets': '@/assets',
      }
    }
  },
})
const path = require('path')
const webpack=require('webpack')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  publicPath: BASE_URL,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/ailab': {
        /*江海峰*/
        target: 'http://10.0.203.155:8888',
        /*李祥超*/
        // target: 'http://10.0.203.162:8888',
        changeOrigin: true
      },
      '/facepredator': {
        /*江海峰*/
        target: 'http://10.0.203.155:8888',
        /*李祥超*/
        // target: 'http://10.0.203.162:8888',
        changeOrigin: true
      },
      '/armyprotector': {
        /*江海峰*/
        target: 'http://10.0.203.155:8888',
        /*李祥超*/
        // target: 'http://10.0.203.162:8888',
        changeOrigin: true
      },
      '/peacepigeon': {
        /*江海峰*/
        target: 'http://10.0.203.155:8888',
        /*李祥超*/
        // target: 'http://10.0.203.162:8888',
        changeOrigin: true
      },
      '/predator': {
        /*江海峰*/
        target: 'http://10.0.203.155:8888',
        /*李祥超*/
        // target: 'http://10.0.203.162:8888',
        changeOrigin: true
      },
    }
  },
  chainWebpack: config => {
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    //const svgRule = config.module.rule('svg')
    //svgRule.uses.clear()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  configureWebpack:{
    plugins:[
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  }

}




import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'
import $ from 'jquery'

import '@/icons'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'


Vue.use(ElementUI)
Vue.use(Viewer,{
  defaultOptions:{
    zIndex:99999,
    navbar:false,
    inline:false,
    tooltip:false,
  }
})
// Vue.use(VueWaterfallEasy)


Vue.config.productionTip = false

var app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import {fetch} from '@/utils/index'
import api from '@/utils/api'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import '@/global/init.scss'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = fetch // 将axios挂载到Vue上
Vue.prototype.$api = api
Vue.prototype.$store = store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'


import Axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'http://at.alicdn.com/t/font_1601968_krl3qd9jm1s.js'

Vue.use(ElementUI);
Vue.use(VueAxios,Axios);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

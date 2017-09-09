import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

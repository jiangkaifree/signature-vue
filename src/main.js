import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://47.111.234.159:8088'
Vue.prototype.$Axios = Axios;



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

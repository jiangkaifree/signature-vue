import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import Fingerprint2 from "fingerprintjs2"


// 请求头加入浏览器指纹 确保唯一性
Fingerprint2.get(components => {
     const values = components.map(component => component.value);
     const murmur = Fingerprint2.x64hash128(values.join(""), 31);
// Vue.prototype.Agent = murmur;
Axios.defaults.headers.common['Agent'] =  murmur     // 加入AcCode
    //  return murmur
   });

console.log(Vue)

// 设置默认请求参数
Axios.defaults.baseURL = 'http://192.168.199.56:8088'   // 设置请求根地址
// Axios.defaults.timeout = 3000       // 3000毫秒延时
Axios.defaults.headers.common['X-Token'] =  '2e8126cae7094de0874476447500456a'      // 加入token 
Axios.defaults.headers.common['AcCode'] =  'AC001'      // 加入AcCode

Vue.prototype.$Axios = Axios;



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

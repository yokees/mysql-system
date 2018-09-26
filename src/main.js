import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from './store'
import './registerServiceWorker'

/* 获取后台数据库接口 */
import service from '@/service/service.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  provide: {
    service
  },
  render: h => h(App)
}).$mount('#app')

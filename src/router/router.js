import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login.vue'

import databaseChilds from '@/router/databaseChilds'
// import main from '@/components/DataBase/Main.vue'

Vue.use(Router)

export default new Router({
  // linkActiveClass: 'active',
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/database',
    name: 'database',
    props: true,
    component: () =>
      import(/* webpackChunkName: "database" */ '@/components/DataBase/Main.vue'),
    children: databaseChilds
  }]
})

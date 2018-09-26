import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

import databaseChilds from '@/router/databaseChilds'
// import main from '@/components/DataBase/Main.vue'

Vue.use(Router)

export default new Router({
  // linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/database',
    name: 'database',
    props: true,
    component: () =>
      import(/* webpackChunkName: "database" */ '@/components/DataBase/DataBase.vue'),
    children: databaseChilds
  }]
})

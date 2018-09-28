import column from '@/components/DataBase/Column/main.vue'

const routes = [{
  path: ':database',
  component: column,
  props: true,
  children: [{
    path: ':table',
    component: column,
    props: true
  }]
}]

export default routes

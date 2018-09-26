import main from '@/components/DataBase/Main.vue'

const routes = [{
  path: ':database/:table',
  component: main,
  props: true
}]

export default routes

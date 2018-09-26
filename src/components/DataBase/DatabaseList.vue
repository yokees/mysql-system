<template><ul @click="changeSelection">
  <li class="list"
    :class="{actived: list.name === currentDatabase}"
    v-for="(list, index) in lists"
    :key="index"
  >
    {{list.name}}
  </li>
</ul></template>

<script>
export default {
  name: 'databaseList',
  inject: ['service'], // eslint-disable-next-line
  data: function () { return {
    currentDatabase: '',
    lists: []// eslint-disable-next-line
  } },
  watch: {
    $route: function () {
      this.currentDatabase = this.$route.params.database
    }
  },
  methods: {
    excluld (dbname) {
      return dbname !== 'information_schema' &&
        dbname !== 'performance_schema' &&
        dbname !== 'mysql'
    },
    changeSelection (e) {
      let matchName = e.target.innerText || this.currentDatabase
      this.$emit('list-change', matchName)
    },
    async refreshData () {
      this.lists = []
      let data = await this.service.getDatabase()
      data.forEach(v => {
        this.excluld(v.Database) && this.lists.push({ name: v.Database })
      })
      // 初始化选项
      this.currentDatabase = this.$route.params.database || this.lists[0].name
      this.$emit('list-change', this.currentDatabase)
    }
  },
  async created () { this.refreshData() }
}
</script>

<style lang="less" scoped>
.list {
  background: rgba(90, 90, 3, 0.5);
  line-height: 30px;
  border-bottom: 1px solid rgba(53, 53, 2, 0.5);
}
.actived {
  width: 100%;
  background: rgba(3, 105, 57, 0.5);
}
</style>

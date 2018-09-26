<template><ul @click="changeSelection">
  <li class="list"
    :class="{actived: list.name === currentTable}"
    v-for="(list, index) in lists"
    :key="index"
  >
    {{list.name}}
  </li>
</ul></template>

<script>
export default {
  name: 'tableList',
  inject: ['service'], // eslint-disable-next-line
  data: function () { return {
    currentTable: '',
    lists: []// eslint-disable-next-line
  } },
  watch: {
    $route: function (newVal, oldVal) {
      newVal.params.database !== oldVal.params.database && this.refreshData()
      this.currentTable = this.$route.params.table
    }
  },
  methods: {
    changeSelection (e) {
      let matchName = e.target.innerText || this.currentTable
      this.$emit('list-change', matchName)
    },
    async refreshData () {
      this.lists = []
      /* 获取数据库中的表 */
      let db = this.$route.params.database
      if (!db) return
      let data = await this.service.getTable(db)
      data.forEach(v => { this.lists.push({ name: v.table_name }) })

      // 初始化选项
      let table = this.$route.params.table
      this.currentTable = table === 'undefined' ? this.lists[0].name : table
      this.$emit('list-change', this.currentTable)
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

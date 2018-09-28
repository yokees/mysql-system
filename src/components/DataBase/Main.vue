<template><div class="w h">
  <div class="left fl h">
    <header class="header">
      <div class="db1">选择数据库</div>
      <div class="db2">
        <DatabaseList @change="changeDB"/>
      </div>
    </header>
    <TableList class="table"
      :database="database"
      :table="table"
      @change="changeTable"
    />
  </div>
  <div class="right fr h">
    <router-view/>
  </div>
</div></template>

<script>
import DatabaseList from './DatabaseList.vue'
import TableList from './TableList.vue'
export default {
  name: 'database',
  props: ['database', 'table'],
  components: {
    DatabaseList, TableList
  }, // eslint-disable-next-line
  data: function () { return {
    tables: { 'tool': 'info' } // eslint-disable-next-line
  } },
  watch: {
    test () { alert(this.test) }
  },
  methods: {
    changeDB (db) {
      let path = '/database/' + db
      let table = this.tables[db]
      path += table ? '/' + table : ''
      this.$router.push({ path: path })
    },
    changeTable (table) {
      let db = this.database
      this.tables[db] = table
      let path = '/database/' + db + '/' + table
      this.$router.push({ path: path })
    }
  }
}
</script>

<style lang="less" scoped>
.left  { width: 150px; }
.right { width: calc(100% - 150px); }
.table { height: calc(100% - 50px); }
.db1 { height:25px;line-height:30px }
.db2 { height:25px;line-height:22px }
// main::before {
//   content: '';
//   width: 100%; height:100%;
//   box-shadow: inset 0 0 5px black;
// }
</style>

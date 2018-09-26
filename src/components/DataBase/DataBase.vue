<template><div class="database">
  <div class="DB">
    <div class="title">DataBase</div>
    <div>
      <button>新建</button>
    </div>
    <database-list @list-change="changeDB"/>
  </div>
  <div class="DB" style="border-left:2px solid gray">
    <div class="title">table</div>
    <div>
      <button>新建</button>
      <button>重命名</button>
      <button>删除</button>
    </div>
    <table-list @list-change="changeTable"/>
  </div>
  <div class="main"><router-view/></div>
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
  methods: {
    changeDB (name) {
      this.$router.push({ path: '/database/' + name + '/' + this.tables[name] })
    },
    changeTable (name) {
      let currentDatabase = this.database
      this.tables[currentDatabase] = name
      this.$router.push({ path: '/database/' + currentDatabase + '/' + name })
    }
  }
}
</script>

<style lang="less" scoped>
.database {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .DB::-webkit-scrollbar { width: 0 !important }
  .DB {
    float: left;
    width: 149px;
    height: 100%;
    background: rgba(53, 53, 2, 0.5);
    overflow: auto;
    cursor: pointer;
    .title {
      margin-top: 10px;
      line-height: 30px;
    }
    button {
      background: rgba(59, 58, 116, 0.5);
      border: 1px solid rgb(58, 110, 80);
      border-radius: 5px;
      padding: 3px 7px;
      margin: 3px 2px 7px 2px;
    }
  }
  .main {
    float: right;
    width: calc(100% - 300px);
    height: 100%;
    background: rgba(97, 97, 18, 0.5);
  }
}
</style>

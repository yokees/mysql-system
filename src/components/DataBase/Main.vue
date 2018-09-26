<template><div class="columndata">
<div class="commands">
  <button>新建</button>
  <button>重命名</button>
  <button>删除</button>
</div>
<div class="table"><table border="0" cellspacing="0">
  <thead>
    <tr><th v-for="(th,index) in tableTitle" :key="index">
      {{th}}
    </th></tr>
  </thead>
  <tbody >
    <tr v-for="(tr,index) in data" :key="index">
      <td v-for="(th,index) in tableTitle" :key="index">
        {{tr[th]}}
      </td>
    </tr>
  </tbody>
</table></div>
</div></template>

<script>
export default {
  name: 'columndata',
  inject: ['service'],
  props: ['database', 'table'], // eslint-disable-next-line
  data: function () { return {
    data: [],
    tableTitle: []// eslint-disable-next-line
  } },
  watch: {
    $route: function (to, from) {
      this.database !== 'undefined' && this.table !== 'undefined' &&
      this.refreshData(this.database, this.table)
    }
  },
  methods: {
    async refreshData (db, tbl) {
      let data = await this.service.getData(db, tbl)
      this.tableTitle = []
      if (data.length > 0) {
        Reflect.ownKeys(data[0]).forEach(v => this.tableTitle.push(v))
      }
      this.data = data
    }
  }
}
</script>

<style lang="less" scoped>
.columndata {
  width: 100%;
  height: 100%;
  // overflow: auto;
  .commands {
    height: 50px;line-height: 60px;
  }
  .table::-webkit-scrollbar { width: 0 !important }
  .table {
    width: 100%;
    height: calc(100% - 30px);
    overflow: auto;
    // overflow-y: hidden;
  }
  table th, table td {
    white-space: nowrap;
    max-width: 100px;
    overflow: hidden;
    padding: 1px;
  }
  table th {
    height: 20px;
    line-height: 20px;
    background: rgba(255,255,0,0.1)
  }
  table {
    margin: 5px 10px;
    font-size: 10px;
  }
  button {
    background: rgba(59, 58, 116, 0.5);
    border: 1px solid rgb(58, 110, 80);
    border-radius: 5px;
    padding: 3px 7px;
    margin: 0px 5px;
  }
}
</style>

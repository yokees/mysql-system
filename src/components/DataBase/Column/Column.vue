<template><div class="w h">
  <header class="header">column功能</header>
  <div class="search">
    <select v-model="search.column" style="min-width:100px;"><option
      v-for="(column, index) in columns"
      :key="index"
    >
      {{column}}
    </option></select>
    <select v-model="search.condition">
      <option selected>=</option>
      <!-- <option>&lt;</option>
      <option>&gt;</option> -->
    </select>
    <input v-model="search.value" placeholder="请输入匹配字段值"/>
    <input id="search" value="搜索" type="button" @click="searchData">
  </div>
  <main class="main">
    <div class="table"><table border="1" cellspacing="0">
      <thead>
        <tr><th v-for="(th,index) in columns" :key="index">{{th}}</th></tr>
      </thead>
      <tbody>
        <tr v-for="(tr,index) in data" :key="index">
          <td v-for="(th,index) in columns" :key="index">{{tr[th]}}</td>
        </tr>
      </tbody>
    </table></div>
  </main>
  <footer class="footer">
    <div class="fl pointer" @click="gotopage(0.1)" :class="{disabled:pageNumber===1}">首页</div>
    <div class="fl pointer" @click="gotopage(-1)"  :class="{disabled:pageNumber===1}">上页</div>
    <div class="fl pointer" @click="gotopage(1)"   :class="{disabled:pageNumber===totalPage}">下页</div>
    <div class="fl pointer" @click="gotopage(0.9)" :class="{disabled:pageNumber===totalPage}">尾页</div>
    <div class="fl disabled">|</div>
    <div class="fl pointer">{{pageNumber}}/{{totalPage}}页</div>
    <div class="fl pointer">共计 {{totalCount}} 条</div>
    <div class="fl disabled">|</div>
    <div class="fl pointer">设置</div>
    <div class="fl disabled">|</div>
  </footer>
</div></template>

<script>
export default {
  name: 'columndata',
  inject: ['service'],
  props: ['database', 'table'], // eslint-disable-next-line
  data: function () { return {
    data: [],
    pageSize: 1000,
    pageNumber: 1,
    totalCount: 100,
    search: {
      column: null,
      condition: '=',
      value: null
    },
    columns: []// eslint-disable-next-line
  } },
  computed: {
    totalPage: function () {
      let _page = this.totalCount / this.pageSize
      let page = parseInt(_page)
      if (page < 1) return 1
      return page < _page ? page + 1 : page
    }
  },
  watch: {
    $route: function (to, from) {
      if (!this.database || !this.table) return
      if (to === from) return
      this.pageNumber = 1
      this.search = { column: null, condition: '=', value: null }
      this.refreshData(this.database, this.table)
    }
  },
  methods: {
    async refreshData (db, tbl) {
      let _data = await this.service.getData(db, tbl, {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber < this.totalPage ? this.pageNumber : this.totalPage,
        column: this.search.column,
        condition: this.search.condition,
        value: this.search.value
      })
      this.totalCount = _data.totalCount
      this.columns = []
      _data.fields.forEach(v => this.columns.push(v.name))
      this.data = _data.values
    },
    searchData () {
      if (this.search.column === null) return
      if (this.search.value === null) return
      this.refreshData(this.database, this.table)
    },
    gotopage (number) {
      if (Math.abs(number) < 1) {
        number === 0.1 && (this.pageNumber = 1)
        number === 0.9 && (this.pageNumber = this.totalPage)
      } else {
        if (number + this.pageNumber === 0) return
        if (number + this.pageNumber > this.totalPage) return
        this.pageNumber += number
      }
      this.refreshData(this.database, this.table)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  height: 30px;
  line-height: 32px;
  text-align: left;
  padding-left: 10px;
  border-left:1px solid gray;
  background: rgba(99, 99, 8, 0.5);
  overflow: hidden;
  select, option, input {
    margin: 0 5px;
    padding: 2px 10px;
    text-align: center;
    appearance:none;-moz-appearance:none;-webkit-appearance:none;
    border: 1px solid rgb(22, 139, 114);
    background: transparent;
  }
  input { width: 200px; }
  #search { width: auto; }
}
// .main::-webkit-scrollbar { width: 0 !important }
.main {
  height: calc(100% - 104px);
  background: rgba(99, 99, 8, 0.5);
  overflow: auto;
  font-size: 12px;
  cursor: pointer;
}
table{
  // border-color:gray;
  border-collapse: collapse;
  border: 1px solid gray;
  min-width: 100%;
  th, td {
    white-space: nowrap;
    text-overflow:ellipsis;
    word-break:break-all;
    max-width: 100px;
    overflow: hidden;
    padding: 1px 4px;
  }
  th {
    height: 24px;
    background: linear-gradient(#adb8b6,#858d8c);
  }
  tr:nth-child(even) {
    background: rgba(99, 99, 8, 0.2);
  }
  tr:hover {
    background: rgba(99, 99, 8, 0.5);
  }
}
.footer {
  overflow: hidden;
  .fl {
    // position: absolute;
    display: inline;
    margin-left: 5px;
  }
  .disabled { color: #777; }
}

</style>

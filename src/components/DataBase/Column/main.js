export default {
  name: 'Column',
  inject: ['service'],
  props: ['database', 'table'], // eslint-disable-next-line
  data: function () {
    return {
      data: [],
      pageSize: 1000,
      pageNumber: 1,
      totalCount: 100,
      search: {
        column: null,
        condition: '=',
        value: null
      },
      columns: [] // eslint-disable-next-line
    }
  },
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
      this.search = {
        column: null,
        condition: '=',
        value: null
      }
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

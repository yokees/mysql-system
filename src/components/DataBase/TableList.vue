<template><div>
  <ul class="main" @click="changeSelection">
    <li class="list"
      :class="{actived:table.name===selected}"
      v-for="(table, index) in tables"
      :data-table="table.name"
      :key="index"
    >
      {{table.name}}
    </li>
  </ul>
  <footer class="footer">
  </footer>
</div></template>

<script>
export default {
  name: 'Table',
  props: ['database', 'table'],
  inject: ['service'], // eslint-disable-next-line
  data: function () { return {
    selected: null,
    tables: []// eslint-disable-next-line
  } },
  watch: {
    async database () {
      this.tables = await this.service.getTable(this.database)
      this.selected = this.table || this.tables[0].name
    },
    table () { this.selected = this.table || this.selected },
    selected () { this.$emit('change', this.selected) }
  },
  methods: {
    changeSelection (e) {
      let table = e.target.dataset.table
      this.selected = table || this.selected
    }
  }
}
</script>

<style lang="less" scoped>
.main::-webkit-scrollbar { width: 0 !important }
.main {
  height: calc(100% - 24px);
  background: rgba(122, 122, 10, 0.7);
  overflow: auto;
  font-size: 12px;
  cursor: pointer;
}
.list {
  line-height: 24px;
  border-bottom: 1px solid rgba(122, 122, 10, 0.4);
}
.actived, .list:hover {
  background: rgba(3, 105, 57, 0.5);
}
</style>

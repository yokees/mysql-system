<template><div>
  <select v-model="selected">
  <option
    v-for="(database, index) in databases"
    :key="index" :value="database.name"
  >
    {{database.name}}
  </option></select>
</div></template>

<script>
export default {
  name: 'Database',
  inject: ['service'], // eslint-disable-next-line
  data: function () { return {
    selected: null,
    databases: []// eslint-disable-next-line
  } },
  watch: {
    selected () { this.$emit('change', this.selected) }
  },

  // 生命周期钩子函数
  beforeCreate () {},
  async created () { this.databases = await this.service.getDatabase() },
  beforeMount () {},
  mounted () {},
  beforeUpdate () { this.selected = this.selected || this.databases[0].name },
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () { console.log('destroyed') }
}
</script>

<style lang="less" scoped></style>

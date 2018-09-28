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

<script src="./main.js"></script>
<style lang="less" scoped src="./main.less"></style>

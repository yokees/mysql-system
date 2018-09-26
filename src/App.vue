<template><div id="app">
    <div id="nav">
      <router-link to="/" exact active-class="active">主页</router-link>
      <router-link to="/database" active-class="active">数据库</router-link>
    </div>
    <div id="main"><router-view/></div>
    <footer></footer>
</div></template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body,html,#app {
  height: 100%;
  width: 100%;
}
ul {
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  footer {
    width: 100%;
    height: 24px;
    background: #99b4b1;
    box-shadow: 0 0 20px black;
  }
}
#nav {
  background: #99b4b1;
  height: 50px;
  line-height: 50px;
  box-shadow: 0 0 20px black;
  padding: 0 20px;
  a {
    font-weight: bold;
    color: #2c3e50;
    color: black;
    text-decoration: none;
    float: right;
    &.active {
      float: left;
      color: green;
    }
  }
}
#main {
  height: calc(100% - 74px);
}
</style>

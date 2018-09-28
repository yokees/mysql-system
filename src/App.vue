<template><div id="app"><router-view/></div></template>

<style lang="less">
* { margin: 0; padding: 0; }
body, html, #app { height: 100%; width: 100%; font-size: 14px; }
ul { list-style: none; }
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
.w { width: 100%; } .h { height: 100%; }
.fl { float: left; } .fr { float: right; }
.ab { position: absolute; } .rtl { position: relative; } .TL { top:0; left:0; }
.pointer { cursor: pointer; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header, .footer {
  background: #99b4b1;
  height: 50px;
  line-height: 50px;
  background: linear-gradient(#99b4b1,#748a87);
}
.footer {
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}
</style>

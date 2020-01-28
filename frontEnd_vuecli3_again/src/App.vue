<template>
  <div id="app">
    <div id="view">
      <router-view />
    </div>
  </div>
</template>

<script>

</script>

<style>
/* *{
  padding:0;
  margin:0;
} */



body{
  box-sizing: border-box;
  font-family: 'microsoft Yahei',"Avenir", Helvetica, Arial, sans-serif;
  position: relative;
}
html,body,#app{
  /* background-color: green; */
  padding:0;
  margin:0;
  position: relative;
}
li {
   list-style: none;
  /* display: inline-block;  */
}

a{
  text-decoration: none;
}

/* 清除下边距 */
.el-menu--horizontal .el-menu-item,.el-menu--horizontal{
  border-bottom:0 !important;
}

img{
  width:200px;
  height:116px
}





</style>

<template>
<!-- 登陆界面 -->
  <div class="home" >
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.home{
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top:108px;
}
</style>

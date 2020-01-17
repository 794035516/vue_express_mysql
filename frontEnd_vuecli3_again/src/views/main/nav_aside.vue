<template>
  <div>
    <el-row class="tac">
      <el-col>
        <el-menu
          class="el-menu-vertical-demo"
          mode="vertical"
          text-color="#888"
          background-color="rgb(28,31,33)"
          :default-route="$route.path"
        >
        <!-- router-link -->
          <el-menu-item index="main/user_contents/lesson">
            <!-- 使样式保持一致，防止边距不一样 -->
            <i class="el-icon-collection iconfont icon-lesson"></i>
            <span>课程</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-collection iconfont icon-table"></i>
            <span>课表</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-collection iconfont icon-collection"></i>
            <span>收藏</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-collection iconfont icon-note"></i>
            <span>笔记</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-collection iconfont icon-article"></i>
            <span>手记</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {};
  },
  components: {},
  computed: {},
  mounted: function() {},
  created: function() {},
  methods: {}
};
</script>

<style scoped>
.el-menu {
  border: none;
  height: 525px;
  padding-left: 22px;
  padding-top: 60px;
  /* lin */
}

.el-menu-item {
  height: 70px;
  line-height: 70px;
  border-radius: 8px 0 0 8px;
  background-origin: padding-box;
  background-clip: border-box;
  /* position: relative; */
}
</style>
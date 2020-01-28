<template>
  <!--  登陆后的界面 -->
  <div>
    <!-- 主体内容 -->
    <div class="div">
      <el-container class="main_content">
        <!-- 头部 -->
        <el-header class="overflow">
          <el-col :span="8">
            <el-menu
              :default-active="$route.path"
              router
              text-color="#888"
              active-text-color="#888"
              mode="horizontal"
              background-color="rgb(51,51,51)"
            >
              <el-menu-item index="/main/show">首页</el-menu-item>
              <el-menu-item index="/main/lesson">免费课程</el-menu-item>
              <el-menu-item index="/main/lesson">付费课程</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="11" :offset="5">
            <el-menu
              :default-active="$route.path"
              style="padding-bottom:0px;"
              router
              text-color="#888"
              active-text-color="#888"
              mode="horizontal"
              background-color="rgb(51,51,51)"
              popper-append-to-body="true"
            >
              <el-menu-item>
                <span>搜索</span>
              </el-menu-item>
              <el-menu-item>
                <el-input suffix-icon="el-icon-search" type="text" placeholder="输入搜索的东西" />
              </el-menu-item>
              <el-menu-item index="/main/user_contents">
                <span>我的</span>
              </el-menu-item>
              <el-menu-item index>
                <span>注册</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-header>

        <!-- 下边路由视图 -->
        <div>
          <router-view></router-view>
        </div>
      </el-container>
    </div>
    <!-- 底部 -->
    <footer>
      <p>Copyright©2011-2020 李敬先个人网站 版权归个人所有</p>
      <p>由Vue-cli3,nodejs,express,mysql赞助提供</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {
      msg: "登陆成功",
      user: {}
    };
  },
  components: {},
  computed: {},
  mounted: function() {},
  created: function() {
    this.axios
      .post("/api/getUserList", {
        // data:{
        userName: this.$route.query.userName
        // }
      })
      .then(res => {
        // console.log("zheli---");
        // console.log(res);
        // console.log("main --" + JSON.stringify(res.data));
        // this.user = res.data[0];
        // sessionStorage.setItem("user", res.data[0]);
        if (res.data[0]) {
          this.$store.commit("SAVE_USERINFO", res.data[0]);
          // console.log("res",res.data);
        }
      });
  },
  methods: {
    logout() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
.el-container {
  min-width: 1263px;
}

.el-header {
  background-color: rgb(51, 51, 51);
}
.el-menu {
  display: flex;
  padding: 0 56px;
  color: #888;
}

.el-input {
  /* margin-top:-5px !important; */
  height: 60px;
  line-height: 55px;
}

.el-menu-item:hover {
  background-color: rgb(51, 51, 51) !important;
  color: white;
  cursor: pointer;
}

.inline-right-menu .el-menu-item span {
  cursor: default !important;
}

.el-button {
  background-color: rgb(51, 51, 51);
  border: none;
}

#nav .el-menu {
  border-bottom: 0;
  /* height: 100%; */
}

.el-menu-item:hover {
  color: blue !important;
}
/* 主体内容 */
.div {
  position: relative;
  min-height: 82vh;
  /* background-color: blueviolet; */
}

footer {
  background-color: #4b4b4b;
  color: #787b82;
  width: 100%;
  text-align: center;
  padding: 14px 0;
}

footer p {
  font-size: 14px;
  word-spacing: 0.05em;
}
</style>

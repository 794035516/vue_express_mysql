<template>
  <!--  登陆后的界面 -->
  <div class="main">
    <div class="div">
      <el-container class="main_content">
        <!-- 头部 -->
        <el-header class="nav overflow">
          <div class="inline-left">
            <el-menu
              class
              :default-active="$route.path"
              router
              text-color="#888"
              mode="horizontal"
              active-text-color="yellow"
              background-color="rgb(51,51,51)"
            >
              <!-- <div> -->
              <el-menu-item index="/main/show">首页</el-menu-item>
              <el-menu-item index="/main/lesson">免费课程</el-menu-item>
              <el-menu-item index="/main/lesson">付费课程</el-menu-item>
              <!-- </div> -->
              <!-- <div> -->
            </el-menu>
          </div>
          <div class="inline-right">
            <el-menu
              class="inline-right-menu"
              :default-active="$route.path"
              style="padding-bottom:0px;"
              router
              text-color="#888"
              mode="horizontal"
              background-color="rgb(51,51,51)"
            >
              <!-- background-color="rgb(51,51,51)" -->
              <el-menu-item index="/">
                <span>搜索</span>
              </el-menu-item>
              <el-menu-item>
                <el-input type="text" placeholder="输入搜索的东西"></el-input>
              </el-menu-item>
              <el-menu-item>
                <el-button @click="logout">我的</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button>注册</el-button>
              </el-menu-item>
              <!-- </div> -->
            </el-menu>
            <div class="clear"></div>
          </div>
        </el-header>
        <!-- 下边路由视图 -->
        <div class="main_view">
          <router-view  ></router-view>
        </div>

        <!-- copyright -->
      </el-container>
    </div>
    <footer>
      <p>Copyright©2011-2020 李敬先个人网站 版权归个人所有</p>
      <p>由Vue-cli3,nodejs,express,mysql赞助提供</p>
      <!-- <p></p> -->
    </footer>
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {
      msg: "登陆成功",
      user:{},
    };
  },
  components: {},
  computed: {},
  mounted: function() {},
  created: function() {
    this.axios.post("/api/getUserList", {
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
        if(res.data[0]){  
          this.$store.commit("SAVE_USERINFO",res.data[0]);
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
.el-header {
  width: 100%;
  margin: 0 auto;
  background-color: rgb(51, 51, 51);
}

.overflow {
  /* 清除浮动，方舟子高度塌陷 */
  overflow: hidden;
  /* 防止窗口大小改变导致左右移动 */
  width: 1263px;
}
.inline-left {
  float: left;
}
.inline-right {
  float: right;
}
.inline-right-menu .el-menu-item:hover,
element.style {
  background-color: rgb(51, 51, 51) !important;
  cursor: auto;
}

span {
  color: #888;
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
  height: 100%;
}

.el-menu-item:hover {
  color: blue !important;
}

.div {
  position: relative;
  min-height: 89vh;
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

/* .el-menu-item {
  padding: none;
} */
/* .el-menu-demo {
  border: none;
} */

/* li {
  margin-right: 10px;
} */
</style>

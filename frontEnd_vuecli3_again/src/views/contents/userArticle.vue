<template>
  <div>
    <div>
      <router-link to="/main/addArticle">添加文章</router-link>
    </div>
    <div v-for="article in articles" :key="article.id" class="article">
      <el-container @click.native="showArticle(article.id)" class="pointer" >
        <el-aside>
          <img :src="article.pic" alt="error" class="img" />
        </el-aside>
        <el-container class="border">
          <el-main>
            <el-row>
              <el-col :span="4">
                <span>{{article.title}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <i class="el-icon-view"></i>
                <span>{{article.times}}</span>
              </el-col>
              <el-col :span="4">
                <span>{{article.author}}</span>
              </el-col>
              <el-col :span="4">
                <span>{{article.type}}</span>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {
      id: this.$store.state.user.id,
      articles: []
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    this.axios
      .post("/api/getUserArticle", {
        id: this.id
      })
      .then(res => {
        if (res.data instanceof Array) {
          console.log(res.data);
          this.articles = res.data;
        } else if (res.data instanceof Object) {
          console.log(res.data);
          this.articles.push(res.data);
        }
      });
  },
  created: function() {},
  methods: {
    insert() {
      // this.axios.get('/api/users/addArticle',{
      this.axios
        .get("/api/users/addArticle", {
          params: { id: this.$store.state.user.id }
        })
        .then(res => {
          if (res.data instanceof Array) {
            this.articles = res.data;
          } else if (res.data instanceof Object) {
            this.articles.push(res.data);
          }
          // console.log(res.data);
        });
    },
    showArticle(articleId){
      console.log("showArticle");
      this.$router.push({path:'/main/user_contents/showArticle',query:{id:articleId}})
    }
  }
};
</script>

<style scoped>
.el-main {
  box-sizing: border-box;
  height:90px;
  padding: 5px 0 0 5px !important;
  margin: 10px 0 20px;
}

.border {
  border-bottom: 1px dotted gray;
  height: 90px;
}

.el-aside {
  width: 200px !important;
  height: 90px;
}

.el-row {
  margin-bottom: 6px !important;
  padding-bottom: 8px !important;
}
.img {
  width: 169px;
  height: 85px;
}
.article {
  height: 110px;
}
.pointer {
  cursor: pointer;
}
</style>
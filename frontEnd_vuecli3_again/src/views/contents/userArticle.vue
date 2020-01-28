<template>
  <div>
    <div>
      <router-link to="/main/addArticle">添加文章</router-link>
    </div>
    <img :src="img" alt="error" />
    <div v-for="article in articles" :key="article.id" class="article">
      <el-container>
        <el-aside>
          <img :src="article.pic" alt="error" class="img" />
        </el-aside>
        <el-container>
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
      articles: [],
      img: ""
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
    // this.axios.get('/api/index')
    // .then(res=>{
    // console.log(res.data.data,"---",res.data.net,"--",res.data.img);;
    // this.img = res.data.data.net+res.data.data.img;
    // this.img = imgUrl;
    // })
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
    }
  }
};
</script>

<style scoped>
.el-main {
  border-bottom: 1px dotted gray;
  box-sizing: border-box;
  padding: 5px 0 0 5px !important;
  margin: 10px 0 20px;
}

.el-aside {
  width: 200px !important;
}

.el-row {
  margin-bottom: 6px !important;
  padding-bottom: 8px !important;
}
.img {
  width: 169px;
  height: 85px;
}
.article{
  border:1px solid red;
  height:110px;
}

</style>
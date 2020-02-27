<template>
  <div>
    <el-container>
      <el-main style="border:1px dotted blue;">
        <el-row type="flex">
          <el-col :span="22">
            <span class="header">{{article.title}}</span>
            <span class="class">{{article.class}}</span>
          </el-col>
          <el-col class="img" :span="4">
            <img :src="article.pic" alt="err" />
          </el-col>
        </el-row>
        <el-row>
            <p class="article">
                {{article.content}}
            </p>
        </el-row>
        <el-row></el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {
      article: {}
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    this.axios
      .get("/api/getUserSingleArticle", {
        params: { id: this.$route.query.id }
      })
      .then(res => {
        //   返回来的是一个数组
        this.article = res.data[0];
      });
  },
  created: function() {},
  methods: {}
};
</script>

<style scoped>
.el-col {
  text-align: center;
}
img {
  width: 80px;
  height: 52px;
}
.el-col {
  justify-content: center;
  display: flex;
  align-items: center;
}
.img {
  justify-content: flex-end;
}
.header{
    font-weight:700;
    font-size:22px;
    text-indent: 2em;
}
.class{
    align-self: flex-end;
    font-size: 14px;
    color:gray;
    text-indent: 2em;
}

.article{
    /* border:1px dotted yellow; */
    /* flex-wrap:wrap;  */
    text-indent: 2em;
}
</style>
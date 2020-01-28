<template>
  <div>
    <el-container id="main">
      <el-aside>
        <img :src="lesson.pic" alt="error" />
      </el-aside>
      <el-container>
        <el-main id="content">
          <el-row>
            <el-col :span="6">
              <span class="title">{{lesson.lessonName}}</span>
            </el-col>
            <el-col :span="6">{{lesson.teacherName}}</el-col>
            <el-col :span="6">
              <span class="lessonType" v-if="lesson.lessonCost == 0">免费课程</span>
              <span class="lessonType" v-else>付费课程</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>已学至 : 0%</span>
            </el-col>
            <el-col :span="6">
              <span>当前课程 : xxx</span>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="6">笔记：0</el-col>
            <el-col :span="12">代码：0</el-col>
            <el-col :span="6">
              <el-button class="lesstonType continue">
                <span v-if="type == 'study'">继续学习</span>
                <span v-else-if="type == 'store'">取消收藏</span>
              </el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {    };
  },
  props: {
    lesson: {
      type: Object
      // default:{}
    },
    type: {
      type: String
    }
  },
  components: {},
  computed: {},
  mounted: function() {},
  created: function() {},
  methods: {}
};
</script>

<style scoped>
.el-container#main {
  margin: 10px 0 20px;
  /* margin:10px 0 0 20px; */
  box-sizing: border-box;
}

#main .el-aside {
  margin-right: 30px;
}

.el-main#content {
  padding-bottom: 5px !important;
  border-bottom: 1px dotted gray;
  box-sizing: border-box;
}

li {
  border: 1px dotted black;
  margin: 10px auto;
  /* width: 824px; */
  /* margin-left:10px; */
}

.title{
  font-size: 22px;
  font-weight: 700;
}

.el-aside {
  width: 200px !important;
}
.el-main {
  padding: 5px 0 0 0px !important;
}
.el-row {
  margin-bottom: 6px !important;
  padding-bottom: 8px !important;
}

.lessonType {
  display: inline-block;
  background: #f5f7fa;
  color: #9199a1;
  font-size: 12px;
  width: 62px;
  height: 20px;
  line-height: 20px;
  /* margin-left:12px; */
  text-align: center;
  border-radius: 3px;
}
.continue {
  background: rgb(240, 20, 20, 0.6);
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  color: #f5faff;
}

.el-row.row {
  height: 28px;
  line-height: 28px;
}
</style>
<template>
    <div>
       <el-container>
        <el-main>
          <img src="/static/lesson/nullLesson.png" alt="error">
        </el-main>
        <el-footer>
          <span v-text="message"/>
        </el-footer>
      </el-container> 
    </div>
</template>

<script>
export default {
    name:'',
    data:function(){
        return{
        }
    },
    props:{
        message:{
            type:String,
            default:"暂无记录"
        }
    },
    components:{},
    computed:{},
    mounted:function(){},
    created:function(){},
    methods:{},
}
</script>

<style scoped>
.el-container{
  border:1px dotted gray;
}
img{
  width:148px;
}
.el-container *{
  margin:0 auto;
  margin-top: 14px;
}
</style>
<template>
    <div>
       文章 {{id}}
       <el-button @click="insert">添加文章</el-button>
    </div>
</template>

<script>
export default {
    name:'',
    data:function(){
        return{
            id:this.$store.state.user.id
        }
    },
    components:{},
    computed:{},
    mounted:function(){},
    created:function(){},
    methods:{
        insert(){
            // this.axios.get('/api/users/addArticle',{
            this.axios.get('/api/users/addArticle',{
                params:{id:this.$store.state.user.id}
            })
            .then(res => {
                console.log(res);
            })
        }
    },
}
</script>

<style scoped>
</style>
<template>
    <div>
       课程 {{type}}
    </div>
</template>

<script>
export default {
    name:'',
    data:function(){
        return{
            da:"",
            type:"",
            lesson:[],
        }
    },
    components:{},
    computed:{
        data(){
            return  this.da;
        }
    },
    mounted:function(){
        // this.type = this.$route.query.type;
        // this.axios.get('/api/getLessonList',{
        //     id:this.user.id,
        //     type:this.type
        // }).then(res =>{
        //     // console.log(res);
        //     this.lesson = res.data;
        // })
    },
    created:function(){
        this.user = JSON.parse(sessionStorage.getItem("user"));
    },
    methods:{},
    watch:{
        $route(to,from){
            this.type = this.$route.query.type;
        },
        type(){
            this.da = this.type;
        }
    }
}
</script>

<style scoped>


</style>
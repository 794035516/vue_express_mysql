<template>
  <!-- <div>{{user}} nihao</div> -->
  <div>
    <!-- <div>{{lesson}}</div> -->
    <!-- {{test}} -- {{user}} -->
    <div v-if="lessons">

    <li v-for="lesson in lessons" :key="lesson.id">
      <class :lesson="lesson"  :type="'study'"></class>
    </li>
    </div>
    <div v-else>
      <nullLesson message="暂无课程" />
    </div>
    <!-- <img src="/static/lesson/dwarvesAndDiants.png" alt=""> -->
    <!-- <img :src="require('@/static/people.png')" alt=""> -->
  </div>
</template>

<script>
import lesson from '../../components/lesson';
import nullLesson from '../../components/null';

export default {
  name: "",
  data: function() {
    return {
      lessons:[],
      user:this.$store.state.user,
    };
  },
  components: {
    'class':lesson,
    nullLesson
  },
  computed: {
    test() {
      return localStorage.getItem("user");
    }
  },
  mounted(){
      this.axios.post("/api/getUserLesson",{
          id:this.user.id,
      })
      .then(res => {
        this.lessons = null;
          // console.log(res.data);
          if(res.data instanceof Array){
            this.lessons = res.data;
          }else if(res.data instanceof Object){
            this.lessons.push(res.data);
          }
          console.log(res.data);
      })
  },
  // mo
  created: function() {
    // this.user = JSON.parse(sessionStorage.getItem("user"));
    // this.user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(this.user.id);
  },
  methods: {}
};
</script>

<style scoped>

</style>
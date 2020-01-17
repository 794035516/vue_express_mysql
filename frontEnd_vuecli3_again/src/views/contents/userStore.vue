<template>
  <div>
    <li v-for="lesson in store" :key="lesson.id">
      <class :lesson="lesson" :type="'store'"></class>
    </li>
  </div>
</template>

<script>
import lesson from "../../components/lesson";
export default {
  name: "",
  data: function() {
    return {
      user: this.$store.state.user,
      store: [],
    };
  },
  components: {
    class: lesson
  },
  computed: {},
  mounted: function() {
    this.axios.post("/api/getUserStore", {
        id: this.$store.state.user.id
      })
      .then(res => {
        // console.log(res);
        this.store = res.data;
      });
  },
  created: function() {},
  methods: {}
};
</script>

<style scoped>
</style>
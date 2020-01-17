<template>
  <div>
    <el-form :model="user" label-width="60px" ref="login" :rules="rules" status-icon class="demo-ruleForm">
      <h3>登陆</h3>
      <el-form-item label="账户" prop="userName">
        <el-input prefix-icon="el-icon-user" type="text" placeholder="输入账号" v-model="user.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input prefix-icon="el-icon-key" type="password" placeholder="输入账号" v-model="user.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('login')">提交</el-button>
        <el-button @click="resetForm('login')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "helloWorld",
  data: function() {
    return {
      user: {
        userName: "nihao",
        pwd: "111111"
      },
      msg: "welcome to the vuejs.org",
      rules: {
        userName: [
          { required: true, message: "请输入账号名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 ~ 18 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入账号密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 ~ 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  computed: {},
  mounted: function() {},
  created: function() {},
  methods: {
    submitForm(formName){
      this.$refs[formName].validate(valid =>{
        if(!valid){
          console.log("occur an error...");
        }
        
        // 这里需要跨域，需要配置proxyTable 在 server/index.js
        this.axios.post("/api/checkLogin",this.user)
        .then(res =>{
          console.log(res.data)
          // console.log("Hello " + this.user.userName)
          this.$router.push({name:'main',query:{userName:this.user.userName}});
        });
        
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.el-form {
  border: 1px dotted #e4e7ec;
  padding: 10px 20px;
}

.el-form-item .is_success{
  border:1px solid green ;
}
</style>
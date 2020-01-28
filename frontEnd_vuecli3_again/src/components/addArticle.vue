<template>
  <div id="add">
    <div class="add_content">
      <el-form :model="form">
        <el-form-item class="submit">
          <!-- <el-button type="primary" plain @click="toAdd">发表</el-button> -->
          <el-button type="primary" plain @click="showDialog(true)">发表</el-button>
        </el-form-item>

        <el-dialog
          :visible.sync="dialogVisible"
          width="800px"
          :center="true"
          :destroy-on-close="true"
        >
          <!-- :auto-upload="uploadDisabled" -->
          <!-- :class="{disabled:uploadDisabled}" -->
          <el-container>
            <el-aside :class="{disabled:uploadDisabled}" class="relative">
              <!-- action="http://localhost:888/upload/img" -->
              <img name="test_img" class="userImg" :src="imgURL" alt />
              <el-row>
                <el-col :span="8">
                  <button type="button" @click="changeUser" class="userButton">换一换</button>
                </el-col>
                <el-col :span="8">
                  <input ref="refFile" type="file" class="hiddenSize" @change="selectImg" />
                  <button type="button" @click="uploadUser($event)" class="userButton">本地上传</button>
                </el-col>
              </el-row>
            </el-aside>
            <el-container>
              <el-main>
                <el-row>
                  <el-col :span="4">nihao</el-col>
                  <el-col :span="4">nihao</el-col>
                  <el-col :span="4">nihao</el-col>
                </el-row>
              </el-main>
            </el-container>
          </el-container>
          <span slot="footer">
            <el-button plain @click="showDialog(false)">取消</el-button>
            <el-button @click="toAdd" type="primary" plain>上传</el-button>
          </span>
        </el-dialog>

        <el-form-item>
          <el-input
            type="text"
            placeholder="请输入标题(必填)"
            suffix-icon="el-icon-edit"
            v-model="form.title"
          />
        </el-form-item>
        <!-- 
        <el-form-item>
          <span>类别：</span>
          <el-dropdown @command="handleCommand" trigger="click">
            <span>
              {{form.type}}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu>
              <el-dropdown-item command="情感类">情感类</el-dropdown-item>
              <el-dropdown-item command="心理类">心理类</el-dropdown-item>
              <el-dropdown-item command="技术类">技术类</el-dropdown-item>
              <el-dropdown-item command="家庭类">家庭类</el-dropdown-item>
              <el-dropdown-item command="其他">其他</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </el-form-item>
        -->
        <el-form-item>
          <el-input type="textarea" v-model="form.content" :autosize="{minRows:10}" minlength="20" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {
      form: {
        id: this.$store.state.user.id,
        type: "请选择",
        title: "initialize",
        content: "内容",
        img: File,
        pic: ""
      },
      arr: [
        "https://img.mukewang.com/57af16fe0001acc401000100-200-200.jpg",
        "https://img.mukewang.com//54584e120001811202200220.jpg",
        "https://img.mukewang.com//54584fa900017c5502200220.jpg",
        "https://img.mukewang.com//545865f0000198ee02200220.jpg",
        "https://img.mukewang.com//545867790001599f02200220.jpg",
        "https://img.mukewang.com//545847f50001126402200220.jpg",
        "https://img.mukewang.com//5333a28f00019e7702100210.jpg"
      ],
      display: "",
      dialogVisible: false,
      // 根据图片的选择进行提交数据库地址(本地或上传)
      localImg: true,
      imgURL: "",
      uploadDisabled: false
    };
  },
  components: {},
  computed: {},
  mounted: function() {},
  created: function() {},
  methods: {
    showDialog(flag) {
      this.dialogVisible = flag;
      // 展示随机的已有的图片
      this.imgURL = this.arr[this.getRand()];
    },
    selectImg(e) {
      this.form.img = e.target.files[0];
      var img = this.form.img;
      // 回显图片
      this.imgURL = URL.createObjectURL(img);
    },
    getRand() {
      return Math.floor(Math.random() * this.arr.length);
    },
    handleCommand(command) {
      this.form.type = command;
    },
    // 保证刷新后图片不是一样的
    changeUser() {
      this.localImg = true;
      var rand, answer;
      while ((rand = this.arr[this.getRand()])) {
        answer = this.imgURL == rand ? true : false;
        if (!answer) {
          break;
        }
      }
      this.imgURL = rand;
    },
    uploadUser() {
      // 更改为上传类型
      this.localImg = false;
      this.$refs.refFile.click();
    },

    toAdd() {
      // var { imgFile:img, ...form2 } = this.form;
      // 如果localImg为假，表示是上传图片，需要提交图片到后端
      var clear = this.imgURL;
      this.form.pic = clear;
      let fd = new FormData();
      if (!this.localImg) {
        this.form.pic = "";
        console.log("content--",this.form.content)
      } else {
        console.log("imgFile--", this.form.img.path,this.localImg);
      }
      // imgFile.path = this.imgURL;
      // fd.append("avatar", pic);
      // fd.set("id", this.$store.state.user.id);
      // fd.set("form", this.form.content);
      // console.log(fd.get("form"));
      Object.keys(this.form).forEach(key => {
        fd.set(key, this.form[key]);
        console.log(key,this.form[key])
      });
      this.axios
        .post(
          "/api/upload/img",
          // 图片，用户ID，表单数据
          //  {fd:fd,id:this.$store.state.user.id,form:form2},
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          console.log("data:", res.data);
          this.$message({
            message: "发布成功...",
            type: "success",
            showClose: true,
            // 关闭跳转页面
            onClose: res => {
              this.$router.push("/main/user_contents/article");
              // console.log("222imgUrl,,", this.imgURL);
            }
          });
        })
        .catch(err => {
          console.log("catch:", err);
        });
      // if (!this.click == "") {
      //   form2.img = this.imgURL;
      //   // console.log(typeof(form2),'--')
      // }
      // console.log("111imgUrl,,", this.imgURL);
      // this.axios
      //   .get("/api/users/addArticle", {
      //     params: {

      //     }
      //   })
      //   .then(res => {
      //               });
      //     console.log("form successful...");
      //   });
      // console.log(this.form)
    }
  }
};
</script>


<style  scoped>
#add {
  background: #888;
}

.add_content {
  width: 82%;
  margin: 0 auto;
  /* margin-top: 20px; */
  padding: 30px 20px;
  /* background: rgb(51,51,51); */
  height: 82vh;
  color: black !important;
}

span {
  color: black;
}

.el-form-item {
  margin-bottom: 8px;
}

.el-dropdown {
  color: black !important;
}

.el-dropdown {
  cursor: pointer;
  margin-top: -10px;
}

.submit {
  text-align: left;
}
/* 原型图片 */
/* >>> .el-upload--picture-card,
>>> .el-upload-list__item {
  border-radius: 72px;
} */
.hiddenSize {
  /* width: 0; */
  display: none;
}

.userImg {
  border-radius: 72px;
  width: 148px;
  height: 148px;
  border: 1px dotted gray;
  display: block;
}
/* 去除点击后button出现边框 */
button {
  outline: none;
}
.userButton,
input[type="file"] {
  border: none;
  color: blue;
  background: transparent;
  cursor: pointer;
}
/* .hidden{
  display: hidden;
} */
/* 只允许一个头像图片 */
/* .disabled >>> .el-upload--picture-card {
  display: none;
} */
/* 清除闪动 */
/* >>> .el-upload-list__item,
>>> .el-upload-list--picture-card,
>>> .el-upload-list {
  transition: none;
  margin: 0px;
} */
</style>

<template>
  <div class="body">
    <h1>博思考试系统</h1>
    <h2>注册账号(*为必填)</h2>
    <el-input v-model="mobile" placeholder="*您的手机号"></el-input>
    <el-input
      v-model="password"
      placeholder="*您的密码"
      show-password
    ></el-input>
    <el-input
      v-model="againPwd"
      placeholder="*再次确认密码"
      show-password
    ></el-input>
    <el-input v-model="name" placeholder="*您的姓名"></el-input>
    <el-input v-model="email" placeholder="您的邮箱"></el-input>
    <el-radio-group v-model="sex">
      <el-radio-button label="0">男</el-radio-button>
      <el-radio-button label="1">女</el-radio-button>
    </el-radio-group>
    <el-input v-model="educational" placeholder="文化水平"></el-input>
    <el-input v-model="english_level" placeholder="英语能力"></el-input>
    <el-input v-model="university" placeholder="毕业院校"></el-input>
    <el-input v-model="professional" placeholder="专业"></el-input>
    <el-date-picker
      v-model="graduation_time"
      type="date"
      placeholder="*选择毕业日期"
    >
    </el-date-picker>
    <el-input
      v-model="school_postion"
      placeholder="在校职务说明"
      textarea="4"
    ></el-input>
    <el-input
      v-model="internship_info"
      placeholder="实习经历"
      textarea="4"
    ></el-input>
    <el-input v-model="prize" placeholder="获得奖项" textarea="4"></el-input>
    <p></p>
    <el-button type="warning" @click="clickUpload()"
      >*上传人像
      <input
        ref="fileInput"
        class="hide"
        @change="triggerFile($event)"
        type="file"
        accept="image/*"
      />
    </el-button>
    <div v-if="this.file" style="color:red">已暂存相片，将在注册后保存</div>
    <p></p>
    <el-button type="primary" @click="doRegister()">注册账号</el-button>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      userId: "",
      mobile: "",
      password: "",
      againPwd: "",
      name: "",
      email: "",
      sex: "",
      file: "",
      educational: "",
      english_level: "",
      university: "",
      professional: "",
      graduation_time: "",
      internship_info: "",
      school_postion: "",
      prize: ""
    };
  },
  methods: {
    clickUpload() {
      this.$refs.fileInput.dispatchEvent(new MouseEvent("click"));
    },
    triggerFile(event) {
      this.file = event.target.files[0];
      var reader = new FileReader();
      var _this = this;
      reader.readAsDataURL(this.file);

      reader.onload = function() {
        _this.newFile = this.result;
      };
      console.log(this.file);
    },
    async doRegister() {
      if (this.password !== this.againPwd) {
        this.$message.error("两次输入的密码不对应！");
        return;
      }
      if (this.mobile.length != 11) {
        this.$message.error("手机号长度不对！");
        return;
      }
      if (!this.file) {
        this.$message.error("请上传照片！");
        return;
      }
      if (!this.name) {
        this.$message.error("请填写名字！");
        return;
      }
      if (!this.sex) {
        this.$message.error("请填写性别！");
        return;
      }
      if (!this.graduation_time) {
        this.$message.error("请填写毕业时间！");
        return;
      }
      let loadingInstance = Loading.service();
      let data = await this.$http.post("/gateway/exam/user/register", {
        head: {
          version: "1",
          token: this.$store.getters.getToken,
          businessType: "12",
          equipId: "1",
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: {
            mobile: this.mobile,
            password: this.password,
            name: this.name,
            email: this.email,
            sex: this.sex,
            educational: this.educational,
            englishLevel: this.english_level,
            university: this.university,
            professional: this.professional,
            graduationtime: this.graduation_time,
            internshipInfo: this.internship_info,
            prize: this.prize
          }
        }
      });
      if (data.head.responseCode === "1") {
        this.userId = data.body.data.userId;
        await this.doUpload();
        this.$message.success("注册成功!即将跳转到登录界面");
        setTimeout(() => {
          this.$router.push("/examLogin");
        }, 2000);
      }
      loadingInstance.close();
    },
    async doUpload() {
      let formData = new FormData();
      formData.append("userId", this.userId);
      formData.append("userPic", this.file);
      await this.$http.uploadFile("/gateway/exam/user/uploadMyPhoto", formData);
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  .el-input {
    width: 80%;
    margin-bottom: 1em;
  }
  .el-button {
    .hide {
      display: none;
    }
  }
}
</style>

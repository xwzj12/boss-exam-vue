<template>
  <div class="body">
    <h1>博思考试系统</h1>
    <h2>登录系统</h2>
    <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
    <p></p>
    <el-input
      v-model="password"
      show-password
      placeholder="请输入密码"
    ></el-input>
    <p></p>
    <el-button type="primary" @click="doLogin()">登录</el-button>
    <p></p>
    <el-link type="danger">忘记密码？</el-link>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      mobile: "",
      password: ""
    };
  },
  methods: {
    async doLogin() {
      let loadingInstance = Loading.service();
      let data = await this.$http.post("/gateway/exam/user/login", {
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
            password: this.password
          }
        }
      });
      if (data.head.responseCode === "1") {
        loadingInstance.close();
        this.$message.success("登录成功！");
        this.$store.commit("setUserId", data.body.data.userId);
        this.$store.commit("setUserName", data.body.data.name);
        this.$store.commit("setUserSex", data.body.data.sex);
        this.$router.push("/startExam");
      } else {
        loadingInstance.close();
        this.$message.success("登录失败,请检查账号或者密码！");
      }
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  .el-inpt {
    width: 70%;
  }
  .el-button {
    width: 70%;
  }
}
</style>

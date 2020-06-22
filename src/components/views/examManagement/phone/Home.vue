<template>
  <div class="home">
    <h1>博思考试系统</h1>

    <el-card>
      <p>本场考试编号：{{ phoneExamData.examPublishRecordId }}</p>
      <p>本场考试名称：{{ phoneExamData.title }}</p>
      <p>考试开始时间：{{ phoneExamData.startTime }}</p>
      <p>考试结束时间： {{ phoneExamData.endTime }}</p>
      <p>考试限时：{{ phoneExamData.limitTime }} 小时</p>
      <p>请注意，考试过程中请遵守考场纪律</p>
      <p style="color:red">如果被判定作弊，你的成绩将直接作废！</p></el-card
    >
    <p></p>
    <div v-if="!phoneExamData.isClosed">
      <el-button :disabled="btnDisabled" type="primary" @click="login()"
        >登录</el-button
      >
      <p></p>
      <el-button :disabled="btnDisabled" type="primary" @click="register()"
        >注册</el-button
      >
    </div>
    <div v-else><p style="color:red">本场考试已经结束！不能参加</p></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      phoneExamData: Object,
      btnDisabled: false
    };
  },
  mounted() {
    if (!this.$route.query.examId) {
      this.$message.error("未指明考试场次！请检查链接！");
      this.btnDisabled = true;
      return;
    }
    this.getExamInfo();
    this.$store.commit("setExamPublishId", this.$route.query.examId);
  },
  methods: {
    async getExamInfo() {
      let data = await this.$http.post("/gateway/exam/publish/queryExam", {
        head: {
          version: "1",
          token: "",
          businessType: "12",
          equipId: "1",
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: this.$route.query.examId
        }
      });
      this.$store.commit("setphoneExamData", data.body.data);
      this.phoneExamData = this.$store.getters.getphoneExamData;
    },
    login() {
      this.$router.push("/examLogin");
      console.log("登录");
    },
    register() {
      this.$router.push("/register");
      console.log("注册");
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .el-card {
    background-color: #f5f5f5;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .el-button {
    width: 80%;
  }
}
</style>

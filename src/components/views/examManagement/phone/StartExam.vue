<template>
  <div class="body">
    <h1>博思考试系统</h1>

    <el-card>
      <p style="color:blue">
        欢迎您！{{ userName }} {{ userSex === 0 ? "先生" : "女士" }}
      </p>
      <p>本场考试编号：{{ phoneExamData.examPublishRecordId }}</p>
      <p>本场考试名称：{{ phoneExamData.title }}</p>
      <p>考试开放时间：{{ phoneExamData.startTime }}</p>
      <p>考试截止时间： {{ phoneExamData.endTime }}</p>
      <p>
        考试类型：{{ phoneExamData.status === "1" ? "限时考试" : "不限时考试" }}
      </p>
      <p>请注意，考试过程中请遵守考场纪律</p>

      <p style="color:red">
        点击开始考试按钮后进入考试界面，并开始计时
      </p>
      <p style="color:red">如果被判定作弊，你的成绩将直接作废！</p></el-card
    >
    <p></p>
    <el-button :disabled="btnDisabled" type="primary" @click="doStartExam()"
      >开始考试</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneExamData: "",
      btnDisabled: false,
      userName: this.$store.getters.getUserName,
      userSex: this.$store.getters.getUserSex
    };
  },
  mounted() {
    this.getExamInfo();
  },
  methods: {
    async getExamInfo() {
      let data = await this.$http.post("/gateway/exam/publish/queryExam", {
        head: {
          version: "1",
          token: this.$store.getters.getToken,
          businessType: "12",
          equipId: "1",
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: this.$store.getters.getExamPublishId
        }
      });
      this.$store.commit("setphoneExamData", data.body.data);
      this.phoneExamData = data.body.data;
      if (new Date().getTime() >= new Date(this.phoneExamData.endTime)) {
        this.btnDisabled = true;
        this.$message.error("本场考试已经结束！无法加入");
      } else if (
        new Date().getTime() <= new Date(this.phoneExamData.startTime)
      ) {
        this.btnDisabled = true;
        this.$message.warning("本场考试还未开始！无法加入");
      }
    },
    async doStartExam() {
      console.log("shuju");
      console.log(this.$store.getters.getUserId);
      console.log(this.$store.getters.getExamPublishId);
      let data = await this.$http.post("/gateway/exam/exam/startExam", {
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
            examPublishRecordId: this.$store.getters.getExamPublishId,
            examUserId: this.$store.getters.getUserId
          }
        }
      });

      if (data.body.data.isStart === true) {
        this.$message.success("开始考试，开始计时");
        this.$store.commit("setEntryExam", true);
        this.$store.commit("setExamRecordId", data.body.data.examRecordId);
        this.$router.push("/phoneExam");
      } else {
        this.$message.error(data.head.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  .el-card {
    background-color: #f5f5f5;
  }
}
</style>

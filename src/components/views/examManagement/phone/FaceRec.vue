<template>
  <div class="body">
    <h1>博思考试系统</h1>
    <h3>进入考试</h3>
    <p></p>

    <p></p>
    <el-card>
      <p style="color:blue">
        欢迎您！{{ userName }} {{ userSex === 0 ? "先生" : "女士" }}
      </p>
      <!-- <p>请选择一张你的正面照片</p>
      <p>照片质量不要太差，至少看清正脸</p> -->
      <p style="color:red">
        点击确认后将直接进入考试界面，同时自动开始计时，请自主把握时间
      </p>
      <p></p>
    </el-card>
    <p></p>
    <el-button
      @click="clickUpload()"
      class="rec-botton"
      icon="el-icon-user"
      type="primary"
    >
      确认
      <input
        ref="fileInput"
        class="hide"
        @change="triggerFile($event)"
        type="file"
        accept="image/*"
      />
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: "",
      tryTime: 3,
      userName: this.$store.getters.getUserName,
      userSex: this.$store.getters.getUserSex
    };
  },
  mounted() {},
  methods: {
    clickUpload() {
      //this.$refs.fileInput.dispatchEvent(new MouseEvent("click"));
      this.doFaceRec();
    },
    //triggerFile(event) {
    // this.file = event.target.files[0];
    // var reader = new FileReader();
    // var _this = this;
    // reader.readAsDataURL(this.file);

    // reader.onload = function() {
    //   _this.newFile = this.result;
    // };
    // this.doFaceRec();
    // },
    async doFaceRec() {
      // let formData = new FormData();
      // console.log(this.$store.getters.getUserId);
      // formData.append("userId", this.$store.getters.getUserId);
      // formData.append("userPic", this.file);
      // let data = await this.$http.uploadFile(
      //   "/gateway/exam/user/faceRecognition/",
      //   formData
      // );
      // if (data.body.data === true) {
      //   this.$message.success("即将进入考试！");
      //   this.$store.commit("setEntryExam", true);
      //   this.$router.push("/startExam");
      // } else {
      //   this.tryTime = this.tryTime - 1;
      //   if (this.tryTime == 0) {
      //     this.$notify.error("如果一直不行，请联系现场考官");
      //   } else {
      //     this.$notify.error("对不起！您的人脸识别未通过，请再试一次");
      //   }
      this.$message.success("即将进入考试！");
      this.$store.commit("setEntryExam", true);
      this.$router.push("/startExam");
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  .el-card {
    background-color: #f5f5f5;
  }

  .rec-botton {
    .hide {
      display: none;
    }
  }
}
</style>

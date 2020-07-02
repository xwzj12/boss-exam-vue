<template>
  <div class="body">
    <h1>博思考试系统</h1>
    <h3 style="color: blue">正在考试!</h3>
    <div v-if="$store.getters.getEntryExam">
      <el-card>
        <p v-show="examStatus === 0" style="color: red">
          本场为不限时考试，规定时间内作答即可
        </p>
        <p>本场考试编号：{{ phoneExamData.examPublishRecordId }}</p>
        <p>本场考试名称：{{ phoneExamData.title }}</p>
        <p>考试开放时间：{{ phoneExamData.startTime }}</p>
        <p>考试截止时间： {{ phoneExamData.endTime }}</p>
        <p>考试实际开始于：{{ examRecord.actualStartTime }}</p>
        <p v-show="examStatus === 1">
          考试限时：
          <span style="color: red;font-weight:bold">
            {{ $store.getters.getphoneExamData.limitTime }}
          </span>
          小时
        </p>
        <p v-show="examStatus === 1">
          距离考试结束还有：
          <span style="color: red;font-weight:bold">{{ endTimeLeft }}</span>
          分钟
        </p>
        <p>
          自动保存：
          <span style="color: red;font-weight:bold">每1分钟</span>
        </p>
      </el-card>
      <el-card v-for="item in paperData.subjects" :key="item.id">
        <div>
          <p>
            <span style="color: red">
              ({{ item.score }}分
              {{
                item.subjectTypeId === "367183204926050304"
                  ? "单选题"
                  : item.subjectTypeId === "413215621381836800"
                  ? "多选题"
                  : item.subjectTypeId === "415836603560972288"
                  ? "主观题"
                  : item.subjectTypeId === "411526617355735040"
                  ? "判断题"
                  : ""
              }})
            </span>
            <span>{{ item.subject }}</span>
          </p>
          <div
            v-if="
              item.subjectTypeId === '367183204926050304' ||
                item.subjectTypeId === '411526617355735040'
            "
          >
            <el-radio-group v-model="item.myAnswer">
              <el-radio
                v-for="item2 in item.answers"
                :key="item2.id"
                :label="item2.id"
                >{{ item2.answer }}</el-radio
              >
            </el-radio-group>
          </div>
          <div v-else-if="item.subjectTypeId === '413215621381836800'">
            <el-checkbox-group v-model="item.myAnswer">
              <el-checkbox
                v-for="item2 in item.answers"
                :key="item2.id"
                :label="item2.id"
                >{{ item2.answer }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
          <!-- 主观题 -->
          <div v-else-if="item.subjectTypeId === '415836603560972288'">
            <el-upload
              class="avatar-uploader"
              :action="apiUrl + '/exam/backAnswerPic/'"
              :data="{
                paperSubjectId: item.id
              }"
              name="answerPic"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <div style="color:blue" slot="tip">
                请上传您的解答，注意需要清晰的图片哦（选择图片后自动保存）
              </div>
              <img v-if="item.myAnswer" :src="item.myAnswer" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
      </el-card>
      <p>
        若因网络问题导致提交不成功，可推出后重新登录，系统自动为您还原答案！
      </p>
      <el-button type="primary" slot="reference" @click="confirmEnd()"
        >提交试卷</el-button
      >
    </div>
    <div v-else>对不起，您没有权限进入考试</div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      examStatus: "",
      paperData: "",
      examRecord: "",
      phoneExamData: "",
      endTimeLeft: "",
      myAnswers: {},
      timer1: "",
      timer2: "",
      apiUrl: "",
      examUserId: "",
      examPublishRecordId: "",
      evaluateText: ""
    };
  },
  mounted() {
    // 获取配置文件中的API地址
    // console.log(this.$store.getters.getUserId);
    // console.log(this.$store.getters.getExamPublishId);
    this.apiUrl = 'http://123.57.84.143:9003';
    this.phoneExamData = this.$store.getters.getphoneExamData;
    this.examStatus = this.phoneExamData.status;
    this.examUserId = this.$store.getters.getUserId;
    this.examPublishRecordId = this.$store.getters.getExamPublishId;
    this.endTimeLeft = this.examRecord.tempTime;
    this.timer1 = setInterval(() => {
      this.getTimeLeft();
      this.doUpdateLimitTime();
    }, 1000 * 60);
    this.getPaper();
    this.getExamRecord();
    this.timer2 = setInterval(() => {
      this.doBackUpAnswer();
    }, 1000 * 60);
  },
  methods: {
    handleAvatarSuccess(res, file) {
      for (let i of this.paperData.subjects) {
        if (i.id === res.body.data[0]) {
          i.pic = URL.createObjectURL(file.raw);
          i.myAnswer = res.body.data[1];
          break;
        }
      }
      this.doBackUpAnswer();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    getTimeLeft() {
      this.examRecord.tempTime = this.examRecord.tempTime - 1;
      if (this.examRecord.tempTime == 2) {
        this.$message.error("考试时间还剩2分钟!");
      }
      if (this.examRecord.tempTime.valueOf() <= 0) {
        this.doEndExam();
      } else {
        this.endTimeLeft =
          ~~(this.examRecord.tempTime.valueOf() / 60) +
          "小时" +
          (this.examRecord.tempTime.valueOf() % 60);
      }
    },
    async getPaper() {
      let loadingInstance = Loading.service();
      let data = await this.$http.post("/gateway/exam/paper/goPaper", {
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
      this.paperData = data.body.data;
      this.examStatus = this.$store.getters.getphoneExamData.status;
      for (let item of this.paperData.subjects) {
        if (item.subjectTypeId === "367183204926050304") {
          item.myAnswer = "";
        } else if (item.subjectTypeId === "413215621381836800") {
          item.myAnswer = [];
        } else if (item.subjectTypeId === "411526617355735040") {
          item.myAnswer = "";
        } else {
          item.myAnswer = "";
        }
      }
      this.restoreAnswer();
      loadingInstance.close();
    },
    async getExamRecord() {
      let loadingInstance = Loading.service();
      let data = await this.$http.post("/gateway/exam/exam/queryExamRecord", {
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
      this.examRecord = data.body.data;
      loadingInstance.close();
      this.getTimeLeft();
    },
    async restoreAnswer() {
      let data = await this.$http.post("/gateway/exam/exam/restoreAnswer", {
        head: {
          version: "1",
          token: this.$store.getters.getToken,
          businessType: "12",
          equipId: "1",
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: this.$store.getters.getExamRecordId
        }
      });
      let tempAnswers = data.body.data;
      if (tempAnswers.length != 0) {
        for (let subject of this.paperData.subjects) {
          if (subject.subjectTypeId === "413215621381836800") {
            let myAnswer = [];
            for (let temp of tempAnswers) {
              if (temp.paperSubjectId === subject.id) {
                myAnswer.push(temp.myAnswer);
              }
              subject.myAnswer = myAnswer;
            }
          } else {
            for (let temp of tempAnswers) {
              if (temp.paperSubjectId === subject.id) {
                subject.myAnswer = temp.myAnswer;
              }
            }
          }
        }
      }
    },
    autoEndExam() {
      this.$message.console.warn("考试时间到！自动提交试卷");
    },
    confirmEnd() {
      this.$confirm("即将提交答案, 确认后无法继续考试，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.doEndExam();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    async doEndExam() {
      clearInterval(this.timer2);
      clearInterval(this.timer1);
      let loadingInstance = Loading.service();
      this.myAnswers.examUserId = this.$store.getters.getUserId;
      this.myAnswers.examRecordId = this.$store.getters.getExamRecordId;
      this.myAnswers.examPublishId = this.$store.getters.getExamPublishId;
      let records = [];
      for (let subject of this.paperData.subjects) {
        // 如果是多选题
        if (subject.subjectTypeId === "413215621381836800") {
          let tempAnswers = [];
          for (let answer of subject.answers) {
            if (answer.rightAnswer === "1") {
              tempAnswers.push(answer.id);
            }
          }
          let flag = this.eqSet(subject.myAnswer, tempAnswers);
          for (let SingleAnswer of subject.myAnswer) {
            if (flag === true) {
              records.push({
                paperSubjectId: subject.id,
                myAnswer: SingleAnswer,
                score: subject.score / subject.answers.length()
              });
            } else {
              records.push({
                paperSubjectId: subject.id,
                myAnswer: SingleAnswer,
                score: 0
              });
            }
          }
        } else if (
          subject.subjectTypeId === "411526617355735040" ||
          subject.subjectTypeId === "367183204926050304"
        ) {
          if (subject.myAnswer === subject.rightAnswer) {
            records.push({
              paperSubjectId: subject.id,
              myAnswer: subject.myAnswer,
              standardAnswer: subject.rightAnswer,
              score: subject.score
            });
          } else {
            records.push({
              paperSubjectId: subject.id,
              myAnswer: subject.myAnswer,
              standardAnswer: subject.rightAnswer,
              score: 0
            });
          }
        } else {
          records.push({
            paperSubjectId: subject.id,
            myAnswer: subject.myAnswer
          });
        }
      }
      this.myAnswers.records = records;
      let data = await this.$http.post("/gateway/exam/exam/submitPaper", {
        head: {
          version: "1",
          token: this.$store.getters.getToken,
          businessType: "12",
          equipId: "1",
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: this.myAnswers
        }
      });
      if (data.body.data === true) {
        this.$message.success("保存成功！");
        loadingInstance.close();
        this.$router.push("/endExam");
      } else {
        this.$message.error(data.head.message);
        loadingInstance.close();
        this.$router.push("/endExam");
      }
      loadingInstance.close();
    },
    doBackUpAnswer() {
      this.myAnswers.examUserId = this.$store.getters.getUserId;
      this.myAnswers.examRecordId = this.$store.getters.getExamRecordId;
      let records = [];
      for (let subject of this.paperData.subjects) {
        // 如果是多选题
        if (subject.subjectTypeId === "413215621381836800") {
          let tempAnswers = [];
          for (let answer of subject.answers) {
            if (answer.rightAnswer === "1") {
              tempAnswers.push(answer.id);
            }
          }
          let flag = this.eqSet(subject.myAnswer, tempAnswers);
          for (let SingleAnswer of subject.myAnswer) {
            if (flag === true) {
              records.push({
                paperSubjectId: subject.id,
                myAnswer: SingleAnswer,
                score: subject.score / subject.answers.size()
              });
            } else {
              records.push({
                paperSubjectId: subject.id,
                myAnswer: SingleAnswer,
                score: 0
              });
            }
          }
        } else if (
          subject.subjectTypeId === "411526617355735040" ||
          subject.subjectTypeId === "367183204926050304"
        ) {
          if (subject.myAnswer === subject.rightAnswer) {
            records.push({
              paperSubjectId: subject.id,
              myAnswer: subject.myAnswer,
              standardAnswer: subject.rightAnswer,
              score: subject.score
            });
          } else {
            records.push({
              paperSubjectId: subject.id,
              myAnswer: subject.myAnswer,
              standardAnswer: subject.rightAnswer,
              score: 0
            });
          }
        } else {
          records.push({
            paperSubjectId: subject.id,
            myAnswer: subject.myAnswer
          });
        }
      }
      this.myAnswers.records = records;
      this.$http.post("/gateway/exam/exam/backAnswer", {
        head: {
          version: "1",
          token: this.$store.getters.getToken,
          businessType: "12",
          equipId: "1",
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: this.myAnswers
        }
      });
      this.$message.success("自动保存成功！");
    },
    doUpdateLimitTime() {
      this.$http.post("/gateway/exam/exam/updateExamRecord", {
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
            examRecordId: this.examRecord.examRecordId,
            tempTime: this.examRecord.tempTime
          }
        }
      });
    },
    eqSet(as, bs) {
      if (as.size !== bs.size) return false;
      for (var a of as) if (!this.has(a, bs)) return false;
      return true;
    },
    has(a, bs) {
      for (var b of bs) {
        if (a === b) return true;
        else return false;
      }
    }
  },
  beforeDestroy() {
    if (this.timer1) {
      clearInterval(this.timer1);
    }
    if (this.timer2) {
      clearInterval(this.timer2);
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  .el-card {
    background-color: #f5f5f5;
    margin-bottom: 1em;
  }
  .rec-botton {
    .hide {
      display: none;
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

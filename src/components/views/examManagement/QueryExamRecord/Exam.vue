<template>
  <div class="body">
    <h1>博思考试系统</h1>
    <h3 style="color: blue">考试信息</h3>
    <div>
      <el-card>
        <p>本场考试编号：{{ examData.examPublishRecordId }}</p>
        <p>本场考试名称：{{ examData.title }}</p>
        <p>本场考试记录编号：{{ examData.examid }}</p>
        <p>考试人员编号：{{ examData.examinerCode }}</p>
        <p>考试人员：{{ examData.examiner }}</p>
        <p>总得分：{{ examData.score }}</p>
      </el-card>
      <el-card v-for="item in paperData.subjects" :key="item.id">
        <div>
          <p>
            <span style="color: red"> ({{ item.score }}分 </span>
            <span>{{ item.subject }}</span>
          </p>
          <div
            v-if="
              item.subjectTypeId === '367183204926050304' ||
                item.subjectTypeId === '411526617355735040'
            "
          >
            <el-radio-group v-model="item.myAnswer">
              <span>得分{{ item.myAnswer.score }}</span>
              <el-radio
                v-for="item2 in item.answers"
                :key="item2.id"
                :label="item2.id"
                disabled
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
                disabled
                >{{ item2.answer }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
          <!-- 主观题 -->
          <div v-else-if="item.subjectTypeId === '415836603560972288'">
            <img v-if="item.myAnswer" :src="item.myAnswer" class="avatar" />
          </div>
        </div>
      </el-card>
    </div>
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
      examData: "",
      endTimeLeft: 0,
      myAnswers: {}
    };
  },
  mounted() {
    this.examData = this.$store.getters.getExamData;
    console.log(this.examData);
    this.getPaper();
  },
  methods: {
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
            examPublishRecordId: this.examData.examPublishRecordId,
            examUserId: this.examData.examinerCode
          }
        }
      });
      this.paperData = data.body.data;
      console.log(this.paperData.subjects);
      this.examStatus = this.$store.getters.getExamData.status;
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
          data: this.examData.examid
        }
      });
      let tempAnswers = data.body.data;
      console.log(tempAnswers);
      if (tempAnswers.length != 0) {
        for (let subject of this.paperData.subjects) {
          if (subject.subjectTypeId === "413215621381836800") {
            let myAnswer = [];
            for (let temp of tempAnswers) {
              if (temp.paperSubjectId === subject.id) {
                myAnswer.push(temp.myAnswer);
                console.log(temp.myAnswer);
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
  .pic {
    width: 400px;
    height: 600px;
  }
}
</style>

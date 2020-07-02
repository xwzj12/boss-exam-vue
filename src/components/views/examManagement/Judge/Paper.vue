<template>
  <div class="body">
    <h1>博思考试系统</h1>
    <h3 style="color: blue">考试阅卷</h3>
    <div>
      <el-card>
        <p>本场考试编号：{{ examData.examPublishRecordId }}</p>
        <p>本场考试名称：{{ examData.title }}</p>
        <p>本场考试记录编号：{{ examData.examid }}</p>
        <p>考试人员编号：{{ examData.examinerCode }}</p>
        <p>考试人员：{{ examData.examiner }}</p>
      </el-card>
      <div v-if="isMarkingStopTime">
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
                    : "判断题"
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

      <div v-if="!isMarkingStopTime">
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
            <div v-else-if="item.subjectTypeId === '415836603560972288'">
              <img v-if="item.myAnswer" :src="item.myAnswer" class="avatar" />
              <div class=" score">
                <el-input
                  placeholder="请阅卷官打分(不得超过满分!超过满分，默认满分！)"
                  v-model="item.Score"
                  type="number"
                  min="0"
                  :maxlength="1"
                  :max="item.score"
                  onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                  oninput="if(this.value>=this.max||this.value.length>1) this.value=this.max"
                  @change="check(item.Score, item.score)"
                  :disabled="isMarkingStopTime"
                ></el-input>
              </div>
              <el-input
                placeholder="请阅卷官评价"
                type="textarea"
                :rows="4"
                v-model="item.myEvaluate"
                :disabled="isMarkingStopTime"
              >
              </el-input>
            </div>
          </div>
        </el-card>
        <el-card>
          <el-input
            placeholder="请阅卷官评价"
            type="textarea"
            :rows="4"
            v-model="evaluateText"
            :disabled="isMarkingStopTime"
          >
          </el-input>
        </el-card>
        <el-button @click="doBackUpAnswer()">提交</el-button>
      </div>
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
      myAnswers: {},
      myScore: "",
      realScore: "",
      myEvaluate: "",
      evaluateText: "",
      isMarkingStopTime: false
    };
  },
  mounted() {
    let loadingInstance = Loading.service();
    this.examData = this.$store.getters.getExamData;
    this.getPaper();
    this.doqueryMarkingStopTime();
    loadingInstance.close();
  },
  methods: {
    async getPaper() {
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
      console.log(this.paperData);
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
    async doBackUpAnswer() {
      this.myAnswers.examUserId = this.examData.examinerCode;
      this.myAnswers.examRecordId = this.examData.examid;
      this.myAnswers.examPublishId = this.examData.examPublishRecordId;
      let records = [];
      console.log(this.paperData.subjects);
      for (let subject of this.paperData.subjects) {
        if (subject.subjectTypeId === "415836603560972288") {
          records.push({
            paperSubjectId: subject.id,
            myAnswer: subject.myAnswer,
            score: subject.Score,
            evaluate: subject.myEvaluate
          });
        }
      }
      this.myAnswers.records = records;
      console.log(records);
      let data = await this.$http.post("/gateway/exam/evaluate/saveScore", {
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
      this.sumbitEvaluate();
      if (data) {
        this.$message.success("提交总评成功,跳转回主页面！");
      }
    },
    async doqueryMarkingStopTime() {
      let data = await this.$http.post(
        "/gateway/exam/evaluate/queryMarkingStopTime",
        {
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
              examRecordId: this.examData.examPublishRecordId
            }
          }
        }
      );
      if (data.body.data === false && this.examData.status === 1) {
        this.isMarkingStopTime = true;
        this.$message.success("未曾批阅且阅卷时间已过,不得开始批阅！");
      }
    },
    async sumbitEvaluate() {
      if (this.evaluateText === "") {
        alert("请总评一下吧！");
      } else {
        this.$http.post("/gateway/exam/evaluate/sumbitEvaluate", {
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
              examinerCode: this.examData.examinerCode,
              id: this.examData.examid,
              evaluate: this.evaluateText,
              PaperVo: this.paperData
            }
          }
        });
        this.$message.success("提交总评成功,跳转回主页面！");
        //3测
        this.$router.push({ path: "/exam/Judge" });
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
  .avatar {
    width: 300px;
    height: 400px;
    display: block;
  }
  .score {
    width: 50%;
    display: block;
  }
}
</style>

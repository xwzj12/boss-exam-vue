<template>
  <div class="body">
    <h1>博思考试系统</h1>
    <div>
      <el-card>
        <p>试卷名：{{ pageName }}</p>
        <p>总分：{{ pageScore }} 分</p>
        <p>
          试卷介绍：
          <span style="font-weight:bold">{{ pageDiscript }}</span>
        </p>
      </el-card>
      <el-card v-for="subject in subjectData" :key="subject.id">
        <div>
          <p>
            <span style="color: red" v-if="subject.subjectTypeId === '367183204926050304'">
              ({{ subject.score }}分
              {{'单选题'}}
              )
            </span>
            <span style="color: red" v-if="subject.subjectTypeId === '413215621381836800'">
              ({{ subject.score }}分
              {{'多选题'}}
              )
            </span>
            <span style="color: red" v-if="subject.subjectTypeId === '411526617355735040'">
              ({{ subject.score }}分
              {{'判断题'}}
              )
            </span>
            <span style="color: red" v-if="subject.subjectTypeId === '415836603560972288'">
              ({{ subject.score }}分
              {{'主观题'}}
              )
            </span>
            <span>{{ subject.subject }}</span>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-if="updataFlag === '1'"
              @click="open(subject)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-if="updataFlag === '1'"
              @click="deleteSubject(subject)"
            ></el-button>
            <el-dialog title="题目信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="试题ID" :label-width="formLabelWidth">
                  <el-input v-model="form.id" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="试题分数" :label-width="formLabelWidth">
                  <el-input-number v-model="form.score" :min="1" :max="100" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="试题描述" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="form.subject"></el-input>
                </el-form-item>
                <div>
                  <div v-for="answer in answerData" :key="answer.id">
                    <div v-if="answer.paperSubjectId === form.id">
                      <el-form-item label="试题答案" :label-width="formLabelWidth">
                        <el-input v-model="answer.answer" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-tooltip :content="'Switch value: ' + value" placement="top">
                        <el-switch
                          v-model="answer.rightAnswer"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          active-value="1"
                          inactive-value="0"
                          active-text="正确"
                          inactive-text="错误"
                        ></el-switch>
                      </el-tooltip>
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        style="float: right;"
                        v-if="updataFlag === '1'"
                        @click="deleteAnswer(answer.id)"
                      ></el-button>
                    </div>
                  </div>
                </div>
                <!-- <div v-if="form.categoryId === '415836603560972288'">
                  <div v-for="answer in answerData" :key="answer.id">
                    <div v-if="answer.paperSubjectId === form.id">
                      <el-image
                        style="width: 100px; height: 100px"
                        v-if="answer.paperSubjectId === subject.id"
                        :src="answer.answer"
                        :preview-src-list="[answer.answer,answer.answer]"
                      ></el-image>
                      <el-upload
                        action="upload"
                        list-type="picture-card"
                        @on-change="handleChange"
                        :http-request="getFile"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt />
                      </el-dialog>
                      <el-button size="small" type="success" @click="upload">确认上传</el-button>
                    </div>
                  </div>
                </div>-->
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                  type="success"
                  @click="insertAnswer()"
                  v-if="form.categoryId !== '415836603560972288'"
                >新 增</el-button>
                <el-button type="primary" @click="doUpdata()">确 定</el-button>
              </div>
            </el-dialog>
          </p>
          <div>
            <div v-for="answer in answerData" :key="answer.id">
              <div v-if="subject.categoryId !== '415836603560972288'">
                <el-checkbox
                  v-model="answer.rightAnswer"
                  v-if="answer.paperSubjectId === subject.id"
                  disabled
                >
                  <span>{{ answer.answer }}</span>
                </el-checkbox>
              </div>
              <div v-if="subject.categoryId === '415836603560972288'">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="answer.answer"
                  v-if="answer.paperSubjectId === subject.id"
                ></el-input>
              </div>
            </div>
          </div>
          <!-- <div v-if="subject.categoryId === '415836603560972288'">
            <div class="demo-image__preview" v-for="answer in answerData" :key="answer.id">
              <el-image
                style="width: 100px; height: 100px"
                v-if="answer.paperSubjectId === subject.id"
                :src="answer.answer"
                :preview-src-list="[answer.answer,answer.answer]"
              ></el-image>
            </div>
          </div>-->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exam',
  created () {
    localStorage.setItem('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIzNjY4MDUyMjE0NDY2NDc4MDgiLCJjb2RlIjoiMTkxMDUwNTQzMEBxcS5jb20iLCJ1cGRhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJjcmVhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJpcCI6IjEyNy4wLjAuMSIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLkuJPkuJrkurrlkZgiLCJleHAiOjE1OTEzMzM4MjEsInVzZXJJZCI6IjQxMjc3ODA0OTU3NjU1MDQwMCIsIm9yZ0lkIjoiMzY2ODA1MTU1MzIzNDQ1MjQ4In0.b5abDnn7Tqo14ie7ZTbVTOQm6BcIWSUeUQAGKMeqVos')
    this.updataFlag = this.$route.query.updataFlag
    this.pageId = this.$route.query.pageId
    this.pageName = this.$route.query.pageName
    this.pageDiscript = this.$route.query.pageDiscript
    this.pageScore = this.$route.query.pageScore
    this.$ajax.post(
      '/gateway/paper/getTestPaperController',
      {
        head: {
          version: '1',
          token: this.getCookie(),
          businessType: '12',
          equipId: '1',
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: {
            id: this.pageId
          }
        }
      }
    ).then(
      (response) => {
        console.log(response)
        this.subjectData = response.data.body.data.subjectPojoList
        this.answerData = response.data.body.data.answerPojosList
        for (var i = 0; i < this.answerData.length; i++) {
          if (this.answerData[i].rightAnswer === 1) { this.answerData[i].rightAnswer = '1' }
          if (this.answerData[i].rightAnswer === 0) { this.answerData[i].rightAnswer = '0' }
        }
        console.log(this.subjectData)
        console.log(this.answerData)
      }, function () {
        console.log('error')
      }
    )
  },
  data () {
    return {
      updataFlag: '',
      pageId: '',
      pageName: '',
      pageDiscript: '',
      pageScore: '',
      subjectData: [],
      answerData: [],
      paper: {},
      form: {
      },
      dialogFormVisible: false,
      examStatus: '',
      paperData: '',
      examRecord: '',
      examData: '',
      endTimeLeft: 0,
      myAnswers: {},
      timer1: '',
      timer2: '',
      apiUrl: ''
    }
  },
  mounted () {
    // 获取配置文件中的API地址
    this.apiUrl = process.env.VUE_APP_APIURL
    this.examData = this.$store.getters.getExamData
    this.examStatus = this.examData.status
    if (this.examStatus === '1') {
      this.timer1 = setInterval(() => {
        this.getTimeLeft()
        if (!(typeof this.endTimeLeft === 'string') || this.endTimeLeft < 0) {
          this.doEndExam()
        }
      }, 3000)
    }
    this.getPaper()
    this.getExamRecord()
    this.timer2 = setInterval(() => {
      this.doBackUpAnswer()
    }, 1000 * 20)
  },
  methods: {
    getCookie () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ')// 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')// 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'staffToken') {
            return arr2[1]
          }
        }
      } else {
        alert('登录超时!')
        this.$router.push({
          path: '/Login',
          name: 'Login',
          params: {
          }
        })
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getFile (item) {
      console.log(item.file)
      this.file = item.file
    },
    open (subject) {
      this.dialogFormVisible = true
      this.form = subject
    },
    upload () {
      const fd = new FormData()
      fd.append('filename', this.file)
      fd.append('id', this.form.id)
      fd.append('token', localStorage.getItem('Authorization'))
      console.log(fd)
      this.$ajax.post(
        '/gateway/paper/uploading',
        fd
      ).then(response => {
        console.log(response)
        this.answerData = response.data.body.data.answerPojosList
        this.dialogFormVisible = false
      }, function () {
        console.log('error')
      })
    },
    doUpdata () {
      this.dialogFormVisible = false
      console.log(this.form)
      console.log(this.answerData)
      this.$ajax.post(
        '/gateway/paper/doUpdataPaper',
        {
          head: {
            version: '1',
            token: this.getCookie(),
            businessType: 'bosssoft',
            equipId: 'DELL001',
            equipType: 1,
            encrypt: 0
          },
          body: {
            data: {
              id: this.pageId,
              subject: this.form,
              answers: this.answerData
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.subjectData = response.data.body.data.subjectPojoList
          this.answerData = response.data.body.data.answerPojosList
          for (var i = 0; i < this.answerData.length; i++) {
            if (this.answerData[i].rightAnswer === 1) { this.answerData[i].rightAnswer = '1' }
            if (this.answerData[i].rightAnswer === 0) { this.answerData[i].rightAnswer = '0' }
          }
          this.pageScore = response.data.body.data.paper.score
        }, function () {
          console.log('error')
        }
      )
    },
    insertAnswer () {
      this.dialogFormVisible = false
      this.$ajax.post(
        '/gateway/paper/insertAnswerController',
        {
          head: {
            version: '1',
            token: this.getCookie(),
            businessType: 'bosssoft',
            equipId: 'DELL001',
            equipType: 1,
            encrypt: 0
          },
          body: {
            data: {
              paperId: this.pageId,
              subjectId: this.form.id,
              answer: '新增答案'
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.answerData = response.data.body.data.answerPojosList
          for (var i = 0; i < this.answerData.length; i++) {
            if (this.answerData[i].rightAnswer === 1) { this.answerData[i].rightAnswer = '1' }
            if (this.answerData[i].rightAnswer === 0) { this.answerData[i].rightAnswer = '0' }
          }
        }, function () {
          console.log('error')
        }
      )
    },
    deleteAnswer (id) {
      this.dialogFormVisible = false
      this.$ajax.post(
        '/gateway/paper/deleteAnswerController',
        {
          head: {
            version: '1',
            token: this.getCookie(),
            businessType: 'bosssoft',
            equipId: 'DELL001',
            equipType: 1,
            encrypt: 0
          },
          body: {
            data: {
              paperId: this.pageId,
              answerId: id
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.answerData = response.data.body.data.answerPojosList
          for (var i = 0; i < this.answerData.length; i++) {
            if (this.answerData[i].rightAnswer === 1) { this.answerData[i].rightAnswer = '1' }
            if (this.answerData[i].rightAnswer === 0) { this.answerData[i].rightAnswer = '0' }
          }
        }, function () {
          console.log('error')
        }
      )
    },
    deleteSubject (subject) {
      this.dialogFormVisible = false
      this.$ajax.post(
        '/gateway/paper/deleteSubject',
        {
          head: {
            version: '1',
            token: this.getCookie(),
            businessType: 'bosssoft',
            equipId: 'DELL001',
            equipType: 1,
            encrypt: 0
          },
          body: {
            data: {
              id: subject.id,
              paperId: this.pageId
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.subjectData = response.data.body.data.subjectPojoList
          this.answerData = response.data.body.data.answerPojosList
          for (var i = 0; i < this.answerData.length; i++) {
            if (this.answerData[i].rightAnswer === 1) { this.answerData[i].rightAnswer = '1' }
            if (this.answerData[i].rightAnswer === 0) { this.answerData[i].rightAnswer = '0' }
          }
          this.pageScore = this.pageScore - subject.score
        }, function () {
          console.log('error')
        }
      )
    },
    handleAvatarSuccess (res, file) {
      for (let i of this.paperData.subjects) {
        if (i.id === res.body.data[0]) {
          i.pic = URL.createObjectURL(file.raw)
          i.myAnswer = res.body.data[1]
          break
        }
      }
      this.doBackUpAnswer()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    getTimeLeft () {
      this.endTimeLeft = (
        (new Date(this.examRecord.actualStartTime).getTime() +
          this.$store.getters.getExamData.limitTime * 60 * 60 * 1000 -
          new Date().getTime()) /
        1000 /
        60.0
      ).toFixed(0)
    },
    async getPaper () {
      let data = await this.$http.post('/exam/queryPaper', {
        head: {
          version: '1',
          token: this.$store.getters.getToken,
          businessType: '12',
          equipId: '1',
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: {
            examPublishRecordId: this.$store.getters.getExamPublishId,
            examUserId: this.$store.getters.getUserId
          }
        }
      })
      this.paperData = data.body.data
      this.examStatus = this.$store.getters.getExamData.status
      for (let item of this.paperData.subjects) {
        if (item.categoryId === 0) {
          item.myAnswer = ''
        } else if (item.categoryId === 1) {
          item.myAnswer = []
        } else if (item.categoryId === 3) {
          item.myAnswer = ''
        } else {
          item.myAnswer = ''
        }
      }
      this.restoreAnswer()
    },
    async getExamRecord () {
      let data = await this.$http.post('/exam/queryExamRecord', {
        head: {
          version: '1',
          token: this.$store.getters.getToken,
          businessType: '12',
          equipId: '1',
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: {
            examPublishRecordId: this.$store.getters.getExamPublishId,
            examUserId: this.$store.getters.getUserId
          }
        }
      })
      this.examRecord = data.body.data
    },
    async restoreAnswer () {
      let data = await this.$http.post('/exam/restoreAnswer', {
        head: {
          version: '1',
          token: this.$store.getters.getToken,
          businessType: '12',
          equipId: '1',
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: this.$store.getters.getExamRecordId
        }
      })
      let tempAnswers = data.body.data
      if (tempAnswers.length !== 0) {
        for (let subject of this.paperData.subjects) {
          if (subject.categoryId === 1) {
            let myAnswer = []
            for (let temp of tempAnswers) {
              if (temp.paperSubjectId === subject.id) {
                myAnswer.push(temp.myAnswer)
              }
              subject.myAnswer = myAnswer
            }
          } else {
            for (let temp of tempAnswers) {
              if (temp.paperSubjectId === subject.id) {
                subject.myAnswer = temp.myAnswer
              }
            }
          }
        }
      }
    },
    autoEndExam () {
      this.$message.console.warn('考试时间到！自动提交试卷')
    },
    async doEndExam () {
      this.myAnswers.examUserId = this.$store.getters.getUserId
      this.myAnswers.examRecordId = this.$store.getters.getExamRecordId
      this.myAnswers.examPublishId = this.$store.getters.getExamPublishId
      let records = []
      for (let subject of this.paperData.subjects) {
        // 如果是多选题
        if (subject.categoryId === 1) {
          for (let SingleAnswer of subject.myAnswer) {
            records.push({
              paperSubjectId: subject.id,
              myAnswer: SingleAnswer
            })
          }
        } else {
          records.push({
            paperSubjectId: subject.id,
            myAnswer: subject.myAnswer
          })
        }
      }
      this.myAnswers.records = records
      let data = await this.$http.post('/exam/submitPaper', {
        head: {
          version: '1',
          token: this.$store.getters.getToken,
          businessType: '12',
          equipId: '1',
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: this.myAnswers
        }
      })
      if (data.body.data === true) {
        this.$message.success('保存成功！')
        this.$router.push('/endExam')
      } else {
        this.$message.error(data.head.message)
        this.$router.push('/endExam')
      }
    },
    doBackUpAnswer () {
      this.myAnswers.examUserId = this.$store.getters.getUserId
      this.myAnswers.examRecordId = this.$store.getters.getExamRecordId
      let records = []
      for (let subject of this.paperData.subjects) {
        // 如果是多选题
        if (subject.categoryId === 1) {
          for (let SingleAnswer of subject.myAnswer) {
            records.push({
              paperSubjectId: subject.id,
              myAnswer: SingleAnswer
            })
          }
        } else {
          records.push({
            paperSubjectId: subject.id,
            myAnswer: subject.myAnswer
          })
        }
      }
      this.myAnswers.records = records
      this.$http.post('/exam/backAnswer', {
        head: {
          version: '1',
          token: this.$store.getters.getToken,
          businessType: '12',
          equipId: '1',
          equipType: 1,
          encrypt: 1
        },
        body: {
          data: this.myAnswers
        }
      })
      this.$message.success('自动保存成功！')
    }
  }
}
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

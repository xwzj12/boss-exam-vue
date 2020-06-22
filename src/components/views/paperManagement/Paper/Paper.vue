<template>
  <div class="paper">
    <div class="flag">
      <span>
        <h2>PageName: {{this.pageName}}</h2>
      </span>
      <span>PageId: {{this.pageId}}</span>
    </div>
    <div class="subject" v-for="(subject,index) in subjectData" :key="subject">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>{{index}}.){{subject.subject}}(分数：{{subject.score}},试题ID：{{subject.id}})</span>
          <el-button
            style="float: right"
            type="warning"
            icon="el-icon-plus"
            @click="open2(index)"
            circle
            v-if="updataFlag == '1'"
          ></el-button>
          <el-dialog title="添加答案" :visible.sync="dialogFormVisible2">
            <el-form :model="form2">
              <el-form-item label="试题ID" :label-width="formLabelWidth">
                <el-input v-model="form2.id" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="答案描述" :label-width="formLabelWidth">
                <el-input v-model="form2.answer" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="insertAnswer()">确 定</el-button>
            </div>
          </el-dialog>
          <el-button
            style="float: right"
            type="primary"
            icon="el-icon-edit"
            @click="open1(index)"
            circle
            v-if="updataFlag == '1'"
          ></el-button>
          <el-dialog title="修改试题" :visible.sync="dialogFormVisible1">
            <el-form :model="form1">
              <el-form-item label="试题ID" :label-width="formLabelWidth">
                <el-input v-model="form1.id" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="题目描述" :label-width="formLabelWidth">
                <el-input v-model="form1.subject" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="分值" :label-width="formLabelWidth">
                <el-input v-model="form1.score" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="updataSubject()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div style="margin-bottom: 18px;">{{subject.name}}</div>
        <div class="text item" v-for="(answer,indexs) in answerData" :key="answer">
          <div class="text item" v-if="answer.paperSubjectId == subject.id">
            <p style="padding:0px; margin:0px;display: inline;">({{indexs}}).{{answer.answer}}</p>
            <el-button
              style="float: right"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteAnswer(indexs)"
              size="mini"
              v-if="updataFlag == '1'"
            ></el-button>
            <el-button
              style="float: right"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="open3(index, indexs)"
              size="mini"
              v-if="updataFlag == '1'"
            ></el-button>
            <el-button
              style="float: right"
              type="success"
              icon="el-icon-check"
              @click="check(indexs)"
              circle
              size="mini"
              v-if="updataFlag == '1' && answer.rightAnswer == '0'"
            ></el-button>
            <el-button
              style="float: right"
              type="info"
              icon="el-icon-close"
              @click="check(indexs)"
              circle
              size="mini"
              v-if="updataFlag == '1' && answer.rightAnswer == '1'"
            ></el-button>
            <el-dialog title="修改答案" :visible.sync="dialogFormVisible3">
              <el-form :model="form2">
                <el-form-item label="试题ID" :label-width="formLabelWidth">
                  <el-input v-model="form3.id" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="答案描述" :label-width="formLabelWidth">
                  <el-input v-model="form3.answer" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="updataAnswer()">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>>
<script>
export default {
  name: 'Paper',
  created () {
    localStorage.setItem('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIzNjY4MDUyMjE0NDY2NDc4MDgiLCJjb2RlIjoiMTkxMDUwNTQzMEBxcS5jb20iLCJ1cGRhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJjcmVhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJpcCI6IjEyNy4wLjAuMSIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLkuJPkuJrkurrlkZgiLCJleHAiOjE1OTEwODIwNDAsInVzZXJJZCI6IjQxMjc3ODA0OTU3NjU1MDQwMCIsIm9yZ0lkIjoiMzY2ODA1MTU1MzIzNDQ1MjQ4In0.NYKqFATBkSpUGQu0GKSibQcBtqG7XyrM24NXQjZPUx4')
    this.templateFlag = this.$route.query.templateFlag
    this.updataFlag = this.$route.query.updataFlag
    this.pageId = this.$route.query.pageId
    this.pageName = this.$route.query.pageName
    this.$ajax.post(
      'getTestPaperController',
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
        console.log(this.subjectData)
        console.log(this.answerData)
      }, function () {
        console.log('error')
      }
    )
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
    open1 (index) {
      this.dialogFormVisible1 = true
      this.form1.id = this.subjectData[index].id
      this.form1.subject = this.subjectData[index].subject
      this.form1.score = this.subjectData[index].score
    },
    open2 (index) {
      this.dialogFormVisible2 = true
      this.form2.id = this.subjectData[index].id
    },
    open3 (index, indexs) {
      this.dialogFormVisible3 = true
      this.form3.id = this.answerData[indexs].id
      this.form3.answer = this.answerData[indexs].answer
    },
    updataSubject () {
      this.$ajax.post(
        'updataSubjectController',
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
              paperId: this.pageId,
              subjectId: this.form1.id,
              subject: this.form1.subject,
              score: this.form1.score
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.subjectData = response.data.body.data.subjectPojoList
          this.answerData = response.data.body.data.answerPojosList
          console.log(this.subjectData)
          console.log(this.answerData)
        }, function () {
          console.log('error')
        }
      )
      this.dialogFormVisible1 = false
    },
    updataAnswer () {
      this.$ajax.post(
        'updataAnswerController',
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
              paperId: this.pageId,
              answerId: this.form3.id,
              answer: this.form3.answer
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.subjectData = response.data.body.data.subjectPojoList
          this.answerData = response.data.body.data.answerPojosList
          console.log(this.subjectData)
          console.log(this.answerData)
        }, function () {
          console.log('error')
        }
      )
      this.dialogFormVisible3 = false
    },
    check (indexs) {
      this.$ajax.post(
        'checkController',
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
              paperId: this.pageId,
              answerId: this.answerData[indexs].id,
              rightAnswer: this.answerData[indexs].rightAnswer
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.subjectData = response.data.body.data.subjectPojoList
          this.answerData = response.data.body.data.answerPojosList
          console.log(this.subjectData)
          console.log(this.answerData)
        }, function () {
          console.log('error')
        }
      )
    },
    deleteAnswer (indexs) {
      this.$ajax.post(
        'deleteAnswerController',
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
              paperId: this.pageId,
              answerId: this.answerData[indexs].id
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.subjectData = response.data.body.data.subjectPojoList
          this.answerData = response.data.body.data.answerPojosList
          console.log(this.subjectData)
          console.log(this.answerData)
        }, function () {
          console.log('error')
        }
      )
    },
    insertAnswer () {
      this.$ajax.post(
        'insertAnswerController',
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
              paperId: this.pageId,
              subjectId: this.form2.id,
              answer: this.form2.answer
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.subjectData = response.data.body.data.subjectPojoList
          this.answerData = response.data.body.data.answerPojosList
          console.log(this.subjectData)
          console.log(this.answerData)
        }, function () {
          console.log('error')
        }
      )
      this.dialogFormVisible2 = false
    }
  },
  data () {
    return {
      templateFlag: '',
      updataFlag: '',
      pageId: '',
      pagaName: '',
      subjectData: [{
      }],
      answerData: [{
      }],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form1: {
        id: '',
        subject: '',
        score: ''
      },
      form2: {
        id: '',
        answer: ''
      },
      form3: {
        id: '',
        answer: ''
      }
    }
  }
}
</script>
<style scoped>
.paper {
  margin-top: 1%;
  width: 100%;
  height: 1200px;
  border-bottom: 1px solid #eeeeee;
  overflow-y: scroll;
  overflow-x: hidden;
}
.text {
  font-size: 20px;
}
.item {
  margin-bottom: 30px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 100%;
  height: 300px;
}
.subject {
  width: 100%;
  height: 300px;
  float: none;
  overflow-y: scroll;
  overflow-x: scroll;
}
.subject::-webkit-scrollbar {
  display: none; /*隐藏滚动条*/
}
.flag {
  margin-top: 1%;
  width: 100%;
  height: 100px;
}
</style>

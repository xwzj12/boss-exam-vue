<template>
  <div class="standard">
    <div class="head">
      <el-input v-model="pageName" class="bar-search-item-input" size="mini" placeholder="请输入配置项名">
        <template slot="prepend">配置项名</template>
      </el-input>
      <el-button
        size="mini"
        class="bar-search-item"
        type="primary"
        icon="el-icon-plus"
        @click="open1()"
      >添加配置项明细</el-button>
      <el-dialog title="模板信息" :visible.sync="dialogFormVisible1">
        <el-form :model="form1" ref="form1" :rules="rules">
          <el-form-item label="配置项名" :label-width="formLabelWidth" prop="id">
            <el-input v-model="form1.id" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="题目类别" :label-width="formLabelWidth" prop="categoryId">
            <el-select v-model="form1.categoryId" placeholder="请选择类别">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目难度" :label-width="formLabelWidth" prop="difficulty">
            <el-select v-model="form1.difficulty" placeholder="请选择难度">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目题型" :label-width="formLabelWidth" prop="subjectTypeId">
            <el-select v-model="form1.subjectTypeId" placeholder="请选择难度">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth" prop="num">
            <el-input-number v-model="form1.num" :min="1" :max="10000" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="分值" :label-width="formLabelWidth" prop="score">
            <el-input-number v-model="form1.score" :min="1" :max="100" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="additemSubmitForm('form1')">确 定</el-button>
        </div>
      </el-dialog>
      <el-button
        size="mini"
        class="bar-search-item"
        type="success"
        icon="el-icon-check"
        @click="open3()"
      >组卷</el-button>
      <el-dialog title="模板信息" :visible.sync="dialogFormVisible4">
        <el-form :model="form4" ref="form4" :rules="rules">
          <el-form-item label="试卷名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form4.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="试卷难度" :label-width="formLabelWidth" prop="difficulty">
            <el-select v-model="form4.difficulty" placeholder="请选择难度">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="试卷类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="form4.type" placeholder="请选择类型">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible4 = false">取 消</el-button>
          <el-button type="primary" @click="dopageSubmitForm('form4')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="middle">
      <!-- 表格 -->
      <div class="table">
        <el-table :data="tableData" height="950" border style="width: 100%">
          <el-table-column prop="subjectTypeId" label="题目类别" width="180"></el-table-column>
          <el-table-column prop="categoryId" label="题型"></el-table-column>
          <el-table-column prop="difficulty" label="题目难度"></el-table-column>
          <el-table-column prop="num" label="题目数量"></el-table-column>
          <el-table-column prop="score" label="题目分值"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="open2(scope.$index, scope.row)">
                修改
                <i class="el-icon-edit el-icon--right"></i>
              </el-button>
              <el-dialog title="模板信息" :visible.sync="dialogFormVisible2">
                <el-form :model="form2" ref="form2" :rules="rules">
                  <el-form-item label="题目类别" :label-width="formLabelWidth" prop="categoryId">
                    <el-select v-model="form2.categoryId" placeholder="请选择类别">
                      <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="题目难度" :label-width="formLabelWidth" prop="difficulty">
                    <el-select v-model="form2.difficulty" placeholder="请选择难度">
                      <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="题目题型" :label-width="formLabelWidth" prop="subjectTypeId">
                    <el-select v-model="form2.subjectTypeId" placeholder="请选择难度">
                      <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数量" :label-width="formLabelWidth" prop="num">
                    <el-input-number v-model="form2.num" :min="1" :max="10000" label="描述文字"></el-input-number>
                  </el-form-item>
                  <el-form-item label="分值" :label-width="formLabelWidth" prop="score">
                    <el-input-number v-model="form2.score" :min="1" :max="100" label="描述文字"></el-input-number>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="doupdataSubmitForm('form2')">确 定</el-button>
                </div>
              </el-dialog>
              <el-button size="mini" type="danger" @click="deleteItem(scope.$index, scope.row)">
                删除
                <i class="el-icon-close el-icon--right"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Standard',
  created () {
    this.$ajax.post('/gateway/basedata/type/queryOptions', {
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
          parentId: '0'
        }
      }
    })
      .then(
        response => {
          var data = response.data.body.data
          console.log('typeOptions查询成功:' + data)
          this.options2 = data
        },
        function () {
          console.log('error')
          console.log('typeOptions查询失败')
        }
      )
    this.$ajax
      .post('/gateway/basedata/category/queryOptions', {
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
            parentId: '0'
          }
        }
      })
      .then(
        response => {
          var data = response.data.body.data
          console.log('categoryOptions查询成功:' + data)
          data.shift()
          this.options4 = data
        },
        function () {
          console.log('error')
          console.log('categoryOptions查询失败')
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
    handleSelect () {
      this.$ajax
        .post('/gateway/basedata/team/queryCombExamConfig', {
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
              combExamConfigName: this.pageName,
              difficulty: this.pageDifficulty,
              page: this.currentPage,
              pagesize: this.pageSize
            }
          }
        })
        .then(
          response => {
            console.log(response)
            this.tableData = []
            var data = response.data.body.data.combExamConfigList
            for (let i = 0; i < data.length; i++) {
              this.tableData[i] = data[i]
              this.tableData[i].status =
                this.tableData[i].status === 1 ? '是' : '否'
            }
            console.log('查询配置项成功')
            console.log(response.data.body.data)
          },
          function () {
            console.log('error')
            console.log('分页查询失败')
          }
        )
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.$ajax
        .post('/gateway/basedata/team/queryCombExamConfig', {
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
              combExamConfigName: this.pageName,
              difficulty: this.pageDifficulty,
              page: this.currentPage,
              pagesize: this.pageSize
            }
          }
        })
        .then(
          response => {
            console.log(response)
            this.tableData = []
            var data = response.data.body.data.combExamConfigList
            for (let i = 0; i < data.length; i++) {
              this.tableData[i] = data[i]
              this.tableData[i].status =
                this.tableData[i].status === 1 ? '是' : '否'
            }
            console.log('查询配置项成功')
            console.log(response.data.body.data)
          },
          function () {
            console.log('error')
            console.log('分页查询失败')
          }
        )
    },
    showItem (index, row) {
      this.$ajax
        .post('/gateway/basedata/team/queryCombExamConfigItem', {
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
              id: row.id
            }
          }
        })
        .then(
          response => {
            console.log(response)
            var data = response.data.body.data
            console.log('查询配置项明细成功')
            console.log(data)
            this.tableDataTwo = data
            this.pageNameTwo = row.name
            this.pageId = row.id
          },
          function () {
            console.log('error')
            console.log('查询明细失败')
          }
        )
    },
    updataItem () {
      this.tableData[this.f] = this.form2
      this.dialogFormVisible2 = false
    },
    deleteItem (index, row) {
      console.log(index, row)
      this.$confirm('此操作将删除该配置项明细, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.tableData.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    doupload (index, row) {
      this.$ajax.post(
        '/gateway/paper/doUploadController',
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
              id: row.id,
              version: row.version,
              page: this.currentPage,
              pagesize: this.pageSize
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.tableData = response.data.body.data.list
          this.pageSize = response.data.body.data.pagesize
          this.pagetotal = response.data.body.data.pagetotal
          this.currentPage = response.data.body.data.page
        }, function () {
          console.log('error')
        }
      )
    },
    dopage () {
      if (this.tableData.length !== 0) {
        if (this.form4.name.length !== 0 && this.form4.type.length !== 0 && this.form4.difficulty.length !== 0) {
          this.$message({
            message: '组卷成功',
            type: 'success'
          })
          console.log(this.pageName)
          console.log(this.tableData)
          this.$ajax
            .post('/gateway/basedata/team/StandardPaper', {
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
                  name: this.pageName,
                  combExamConfigItemList: this.tableData
                }
              }
            })
            .then(
              response => {
                console.log(
                  'response.data.head.message=' + response.data.head.message
                )
                alert(response.data.head.message)
                console.log(response.data.body.data)
                this.paperSubjecList = response.data.body.data.paperSubjecList
                this.paperAnswerList = response.data.body.data.paperAnswerList
                for (let i = 0; i < this.paperSubjecList.length; i++) {
                  if (this.paperSubjecList[i].difficulty === '简单') { this.paperSubjecList[i].difficulty = '1' }
                  if (this.paperSubjecList[i].difficulty === '中等') { this.paperSubjecList[i].difficulty = '2' }
                  if (this.paperSubjecList[i].difficulty === '困难') { this.paperSubjecList[i].difficulty = '3' }
                }
                var emp = 1
                if (this.form4.difficulty === '简单') { emp = '1' }
                if (this.form4.difficulty === '中等') { emp = '2' }
                if (this.form4.difficulty === '困难') { emp = '3' }
                console.log('------------------------------')
                console.log(this.paperSubjecList)
                console.log(this.paperAnswerList)
                console.log(this.form4.name)
                console.log(this.form4.type)
                console.log(emp)
                console.log('-----------------------------')
                this.$ajax.post(
                  '/gateway/paper/quickController',
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
                        paperSubjecList: this.paperSubjecList,
                        paperAnswerList: this.paperAnswerList,
                        name: this.form4.name,
                        type: this.form4.type,
                        difficulty: emp
                      }
                    }
                  }
                ).then(
                  (response) => {
                    console.log(response)
                  }, function () {
                    console.log('error')
                  }
                )
              },
              function () {
                alert('查询失败')
                console.log('error')
              }
            )
        } else {
          this.$message.error('必填字段不能为空')
        }
      } else {
        this.$message.error('配置项内容不能为空')
      }
      this.dialogFormVisible4 = false
    },
    dopageSubmitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dopage()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    doupdata (index, row) {
      this.$ajax.post(
        '/gateway/paper/doUpdataController',
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
              id: this.form.id,
              name: this.form.name,
              paperType: this.form.paperType,
              difficulty: this.form.difficulty,
              combExamMan: this.form.combExamMan,
              discript: this.form.discript,
              version: this.form.version,
              page: this.currentPage,
              pagesize: this.pageSize
            }
          }
        }
      ).then(
        (response) => {
          console.log(response)
          this.tableData = response.data.body.data.list
          this.pageSize = response.data.body.data.pagesize
          this.pagetotal = response.data.body.data.pagetotal
          this.currentPage = response.data.body.data.page
          this.dialogFormVisible = false
        }, function () {
          console.log('error')
        }
      )
    },
    doupdataSubmitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updataItem()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    open1 (index, row) {
      this.dialogFormVisible1 = true
      this.form1.id = this.pageName
    },
    open2 (index, row) {
      this.dialogFormVisible2 = true
      this.form2.id = ''
      this.form2.combExamId = ''
      this.form2.difficulty = row.difficulty
      this.form2.subjectTypeId = row.subjectTypeId
      this.form2.num = row.num
      this.form2.score = row.score
      this.form2.categoryId = row.categoryId
      this.f = index
    },
    open3 () {
      this.dialogFormVisible4 = true
    },
    additem () {
      var list = {
        categoryId: this.form1.categoryId,
        combExamId: '',
        difficulty: this.form1.difficulty,
        id: '',
        num: this.form1.num,
        score: this.form1.score,
        subjectTypeId: this.form1.subjectTypeId
      }
      this.tableData.push(list)
      this.dialogFormVisible1 = false
      console.log(list)
    },
    // edit表单验证
    additemSubmitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.additem()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // edit界面的表格的删除按钮
    handleDelete (index, row) {
      console.log(index, row)
      this.$confirm('此操作将删除该配置项明细, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.editItemTableData.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  data () {
    return {
      f: '',
      pageId: 123,
      pageSize: 8,
      pagetotal: 2,
      currentPage: 1,
      pageName: '',
      pageNameTwo: '123',
      createdByName: '',
      createdByTime: '',
      pageDifficulty: '',
      pageType: '',
      paperAnswerList: [{
      }],
      paperSubjecList: [{
      }],
      tableData: [],
      options1: [{
        value: '3',
        label: 'difficulty'
      }, {
        value: '2',
        label: 'medium'
      }, {
        value: '1',
        label: 'simple'
      }],
      options2: [{
        value: '367183204926050304',
        label: '单选题'
      }, {
        value: '413215621381836800',
        label: '多选题'
      }, {
        value: '411526617355735040',
        label: '判断题'
      }, {
        value: '415836603560972288',
        label: '主观题'
      }],
      options3: [{
        value: '3',
        label: '困难'
      }, {
        value: '2',
        label: '中等'
      }, {
        value: '1',
        label: '简单'
      }],
      options4: [{
        value: '369265995968626690',
        label: 'java'
      }, {
        value: '369265995968626696',
        label: 'python'
      }, {
        value: '369265995968626702',
        label: 'c++'
      }],
      options5: [{
        value: '1601',
        label: '1601'
      }, {
        value: '1602',
        label: '1602'
      }, {
        value: '1603',
        label: '1603'
      }],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible4: false,
      form1: {
        name: '',
        id: '',
        paperType: '',
        difficulty: '',
        combExamMan: '',
        discript: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: '',
        resource: '',
        desc: '',
        num: '',
        subjectTypeId: '',
        score: '',
        version: ''
      },
      form2: {
        id: '',
        combExamId: '',
        difficulty: '',
        num: '',
        subjectTypeId: '',
        score: '',
        categoryId: ''
      },
      form4: {
        id: '',
        name: '',
        difficulty: '',
        type: ''
      },
      formLabelWidth: '120px',
      rules: {
        id: [
          { required: true, message: '请去标准组卷页面输入配置项名称', trigger: 'blur' },
          {
            min: 2,
            max: 64,
            message: '配置项名长度应在 2 到 64 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入试卷名', trigger: 'blur' },
          {
            min: 2,
            max: 64,
            message: '试卷名长度应在 2 到 64 个字符',
            trigger: 'blur'
          }
        ],
        categoryId: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        subjectTypeId: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        difficulty: [
          { required: true, message: '请选择难度', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择难度', trigger: 'change' }
        ]

      }
    }
  }
}
</script>
<style scoped>
.head {
  margin-top: 1%;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  display: flex;
}
.table {
  margin-top: 2%;
}
.page {
  margin-top: 1%;
}
.add {
  margin-top: 1%;
}
.addTop {
  margin-top: 0%;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  display: flex;
}
.addMain {
  margin-top: 0%;
}
.p-font {
  font-size: 1px;
  line-height: 100%;
}
.bar-search-item-input {
  float: left;
  width: 200px;
  margin-right: 10px;
  font-size: 1px;
}
.bar-search-item {
  float: left;
  margin-right: 20px;
  height: 30px;
}
.date-picker {
  margin-left: 10px;
  margin-right: 10px;
  width: 200px;
}
.bar-select {
  margin-left: 10px;
  margin-right: 10px;
  height: 25px;
  width: 200px;
}
</style>

<template>
  <div class="maintaintemplatego">
    <div class="head">
      <el-input v-model="pageName" class="bar-search-item-input" size="mini" placeholder="请输入试卷名">
        <template slot="prepend">试卷名</template>
      </el-input>
      <el-input
        v-model="createdByName"
        class="bar-search-item-input"
        size="mini"
        placeholder="请输入出卷人"
      >
        <template slot="prepend">出卷人</template>
      </el-input>
      <p class="p-font">试卷发布时间:</p>
      <el-date-picker
        class="date-picker"
        v-model="createdByTime"
        size="mini"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <p class="p-font">试卷难度:</p>
      <el-select class="bar-select" placeholder="请选择" size="mini" v-model="pageDifficulty">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <p class="p-font">试卷类型:</p>
      <el-select class="bar-select" placeholder="请选择" size="mini" v-model="pageType">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        size="mini"
        class="bar-search-item"
        type="primary"
        icon="el-icon-search"
        @click="handleSelect()"
      >试卷查找</el-button>
    </div>
    <div class="middle">
      <div id="icon">
        <font color="#E6A23C" @click="seepapers()">
          <i class="el-icon-plus">浏览</i>
        </font>
        &nbsp;&nbsp;&nbsp;
        <font color="#F56C6C" @click="deleteSelected()">
          <i class="el-icon-edit">删除</i>
        </font>
        &nbsp;&nbsp;&nbsp;
        <font color="#409EFF">
          <i>已选中：{{this.multipleSelection.length}}</i>
        </font>
        <!-- <font color="#F56C6C"><i class="el-icon-upload2">导入</i></font>
        &nbsp;&nbsp;&nbsp;
        <font color="#F56C6C"><i class="el-icon-upload2">导出</i></font>
        &nbsp;&nbsp;&nbsp;-->
      </div>
      <!-- 表格 -->
      <div class="table">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="组卷时间" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.combExamTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="试卷名" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>试卷描述: {{ scope.row.discript }}</p>
                <p>试卷总分: {{ scope.row.score }}</p>
                <div slot="reference" class="name-wrapper">
                  <span>{{ scope.row.name }}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="试卷类型" width="180">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.paperType }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="试卷难度" width="180">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.difficulty == 3"
                type="danger"
                size="medium"
                effect="dark"
              >difficulty</el-tag>
              <el-tag
                v-if="scope.row.difficulty == 2"
                type="warning"
                size="medium"
                effect="dark"
              >medium</el-tag>
              <el-tag
                v-if="scope.row.difficulty == 1"
                type="success"
                size="medium"
                effect="dark"
              >simple</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="出卷人" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.combExamMan }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="180">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == '1'" size="medium" effect="plain">已启用</el-tag>
              <el-tag v-if="scope.row.status == '0'" type="info" size="medium" effect="plain">未启用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status == 0"
                size="mini"
                type="primary"
                @click="startUp(scope.$index, scope.row)"
              >启用试卷</el-button>
              <el-button
                v-if="scope.row.status == 1"
                size="mini"
                type="info"
                @click="forbidden(scope.$index, scope.row)"
              >禁用试卷</el-button>
              <el-button
                v-if="scope.row.status == 0"
                disabled
                size="mini"
                type="success"
                @click="doupload(scope.$index, scope.row)"
              >浏览</el-button>
              <el-button
                v-if="scope.row.status == 1"
                size="mini"
                type="success"
                @click="seePaper(scope.$index, scope.row)"
              >浏览</el-button>
              <el-button
                v-if="scope.row.status == 0"
                disabled
                size="mini"
                type="warning"
                @click="updataPaper(scope.$index, scope.row)"
              >修改</el-button>
              <el-button
                v-if="scope.row.status == 1"
                size="mini"
                type="warning"
                @click="updataPaper(scope.$index, scope.row)"
              >修改</el-button>
              <el-button
                v-if="scope.row.status == 0"
                disabled
                size="mini"
                type="success"
                @click="open(scope.$index, scope.row)"
              >
                修改试卷信息
                <i class="el-icon-edit el-icon--right"></i>
              </el-button>
              <el-button
                v-if="scope.row.status == 1"
                size="mini"
                type="success"
                @click="open(scope.$index, scope.row)"
              >
                修改试卷信息
                <i class="el-icon-edit el-icon--right"></i>
              </el-button>
              <el-dialog title="模板信息" :visible.sync="dialogFormVisible">
                <el-form :model="form" ref="form" :rules="rules">
                  <el-form-item label="试卷ID" :label-width="formLabelWidth" prop="id">
                    <el-input v-model="form.id" autocomplete="off" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="试卷名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="试卷类型" :label-width="formLabelWidth" prop="paperType">
                    <el-select v-model="form.paperType" placeholder="请选择类型">
                      <el-option label="1601" value="1601"></el-option>
                      <el-option label="1602" value="1602"></el-option>
                      <el-option label="1603" value="1603"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="试卷难度" :label-width="formLabelWidth" prop="difficulty">
                    <el-select v-model="form.difficulty" placeholder="请选择难度">
                      <el-option label="simple" value="simple"></el-option>
                      <el-option label="medium" value="medium"></el-option>
                      <el-option label="difficulty" value="difficulty"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="试卷描述" :label-width="formLabelWidth" prop="discript">
                    <el-input v-model="form.discript" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="doupdataSubmitForm('form')">确 定</el-button>
                </div>
              </el-dialog>
              <el-button
                v-if="scope.row.status == 0"
                disabled
                size="mini"
                type="danger"
                @click="deleteController(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                v-if="scope.row.status == 1"
                size="mini"
                type="danger"
                @click="deleteController(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="this.currentPage"
          :page-sizes="[8]"
          :page-size="this.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.pagetotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MaintainTemplatego',
  created () {
    localStorage.setItem('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIzNjY4MDUyMjE0NDY2NDc4MDgiLCJjb2RlIjoiMTkxMDUwNTQzMEBxcS5jb20iLCJ1cGRhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJjcmVhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJpcCI6IjEyNy4wLjAuMSIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLkuJPkuJrkurrlkZgiLCJleHAiOjE1OTEzMzM4MjEsInVzZXJJZCI6IjQxMjc3ODA0OTU3NjU1MDQwMCIsIm9yZ0lkIjoiMzY2ODA1MTU1MzIzNDQ1MjQ4In0.b5abDnn7Tqo14ie7ZTbVTOQm6BcIWSUeUQAGKMeqVos')
    this.$ajax.post(
      '/gateway/paper/goMaintainTemplategoController',
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
      this.$ajax.post(
        '/gateway/paper/maintaintemplategoHandleSelect',
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
              page: this.currentPage,
              pagesize: this.pageSize,
              pageName: this.pageName,
              createdByName: this.createdByName,
              createdByStartTime: this.createdByTime[0],
              createdByEndTime: this.createdByTime[1],
              pageDifficulty: this.pageDifficulty,
              pageType: this.pageType
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
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.$ajax.post(
        '/gateway/paper/goMaintainTemplategoController',
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
    deleteController (index, row) {
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
          this.$ajax.post(
            '/gateway/paper/deleteMaintaintemplategoController',
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    forbidden (index, row) {
      this.$ajax.post(
        '/gateway/paper/forbiddenMaintaintemplategoController',
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
    startUp (index, row) {
      this.$ajax.post(
        '/gateway/paper/startMaintaintemplategoController',
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
    seePaper (index, row) {
      // let routeData = this.$router.resolve({
      //   path: '/Exam',
      //   name: 'Exam',
      //   query: {
      //     updataFlag: '0',
      //     pageId: row.id,
      //     pageName: row.name,
      //     pageScore: row.score,
      //     pageDiscript: row.discript
      //   }
      // })
      // window.open(routeData.href, '_blank')
      this.$router.push({
        path: '/Exam',
        name: 'Exam',
        params: {
        },
        query: {
          updataFlag: '0',
          pageId: row.id,
          pageName: row.name,
          pageScore: row.score,
          pageDiscript: row.discript
        }
      })
    },
    updataPaper (index, row) {
      // let routeData = this.$router.resolve({
      //   path: '/Exam',
      //   name: 'Exam',
      //   query: {
      //     updataFlag: '1',
      //     pageId: row.id,
      //     pageName: row.name,
      //     pageScore: row.score,
      //     pageDiscript: row.discript
      //   }
      // })
      // window.open(routeData.href, '_blank')
      this.$router.push({
        path: '/Exam',
        name: 'Exam',
        params: {
        },
        query: {
          updataFlag: '1',
          pageId: row.id,
          pageName: row.name,
          pageScore: row.score,
          pageDiscript: row.discript
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
              paperName: this.form.name,
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
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].template === 0) {
              this.tableData.splice(i, 1)
              i--
            }
          }
        }, function () {
          console.log('error')
        }
      )
    },
    doupdataSubmitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.doupdata()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 多选框
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 多选框选中
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    seepapers () {
      if (this.multipleSelection.length === 0) {
        alert('请勾选要浏览的试卷')
      } else if (this.multipleSelection.length > 1) {
        alert('只能勾选一行试卷')
      } else {
        this.seePaper(1, this.multipleSelection[0])
      }
    },
    deletes (row) {
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
          for (var i = 0; i < row.length; i++) {
            this.$ajax.post(
              '/gateway/paper/deleteController',
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
                    id: row[i].id,
                    version: row[i].version,
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
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteSelected () {
      if (this.multipleSelection.length === 0) {
        alert('请勾选要删除的试卷')
      } else if (this.multipleSelection.length > 1) {
        this.deletes(this.multipleSelection)
      } else {
        this.deleteController(1, this.multipleSelection[0])
      }
    },
    open (index, row) {
      this.dialogFormVisible = true
      this.form.paperType = row.paperType
      this.form.difficulty = row.difficulty
      this.form.name = row.name
      this.form.discript = row.discript
      this.form.combExamMan = row.combExamMan
      this.form.id = row.id
      this.form.version = row.version
    }
  },
  data () {
    return {
      multipleSelection: [],
      pageSize: 8,
      pagetotal: 2,
      currentPage: 1,
      pageName: '',
      createdByName: '',
      createdByTime: '',
      pageDifficulty: '',
      pageType: '',
      tableData: [{
      }],
      options1: [{
        value: 'difficulty',
        label: 'difficulty'
      }, {
        value: 'medium',
        label: 'medium'
      }, {
        value: 'simple',
        label: 'simple'
      }],
      options2: [{
        value: '1601',
        label: '1601'
      }, {
        value: '1602',
        label: '1602'
      }, {
        value: '1603',
        label: '1603'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
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
        type: [],
        resource: '',
        desc: '',
        version: ''
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
        paperType: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        discript: [
          { required: true, message: '请输入试卷名', trigger: 'blur' },
          {
            min: 2,
            max: 64,
            message: '试卷名长度应在 2 到 64 个字符',
            trigger: 'blur'
          }
        ],
        difficulty: [
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
#icon {
  margin-bottom: 20px;
  float: left;
}
</style>

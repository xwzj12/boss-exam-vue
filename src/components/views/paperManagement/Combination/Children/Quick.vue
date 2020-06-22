<template>
  <div class="quick">
    <div class="head">
      <el-input v-model="pageName" class="bar-search-item-input" size="mini" placeholder="请输入配置项名">
        <template slot="prepend">配置项</template>
      </el-input>
      <p class="p-font">难度:</p>
      <el-select class="bar-select" placeholder="请选择" size="mini" v-model="pageDifficulty">
        <el-option
          v-for="item in options1"
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
      >查找</el-button>
    </div>
    <div class="middle">
      <div id="icon">
        <font color="#E6A23C" @click="dopapers()">
          <i class="el-icon-plus">组卷</i>
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
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createdTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配置项" width="180">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="试卷难度" width="180">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.difficulty == '困难'"
                type="danger"
                size="medium"
                effect="dark"
              >difficulty</el-tag>
              <el-tag
                v-if="scope.row.difficulty == '中等'"
                type="warning"
                size="medium"
                effect="dark"
              >medium</el-tag>
              <el-tag
                v-if="scope.row.difficulty == '简单'"
                type="success"
                size="medium"
                effect="dark"
              >simple</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createdBy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="180">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.remark }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="280">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == '是'" size="medium" effect="plain">已启用</el-tag>
              <el-tag v-if="scope.row.status == '否'" type="info" size="medium" effect="plain">未启用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="showItem(scope.$index, scope.row)">
                查看配置项
                <i class="el-icon-view el-icon--right"></i>
              </el-button>
              <el-button size="mini" type="success" @click="open3(scope.$index, scope.row)">
                组卷
                <i class="el-icon-edit el-icon--right"></i>
              </el-button>
              <el-dialog title="模板信息" :visible.sync="dialogFormVisible4">
                <el-form :model="form4" ref="form4" :rules="rules">
                  <el-form-item label="配置项ID" :label-width="formLabelWidth">
                    <el-input v-model="form4.id" autocomplete="off" :disabled="true"></el-input>
                  </el-form-item>
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
    <div class="add">
      <div class="addTop">
        <el-input
          v-model="pageNameTwo"
          class="bar-search-item-input"
          size="mini"
          placeholder="请选择一项配置项"
          :disabled="true"
        >
          <template slot="prepend">配置项</template>
        </el-input>
        <el-button
          v-if="this.pageId != 0"
          size="mini"
          class="bar-search-item"
          type="success"
          icon="el-icon-plus"
          @click="open1()"
        >添加</el-button>
        <el-button
          v-if="this.pageId == 0"
          size="mini"
          class="bar-search-item"
          type="success"
          icon="el-icon-plus"
          @click="open1()"
          :disabled="true"
        >添加</el-button>
        <el-dialog title="模板信息" :visible.sync="dialogFormVisible1">
          <el-form :model="form1" ref="form1" :rules="rules">
            <el-form-item label="题目类别" :label-width="formLabelWidth" prop="subjectTypeId">
              <el-select v-model="form1.subjectTypeId" placeholder="请选择类别">
                <el-option
                  v-for="item in options2"
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
            <el-form-item label="题目题型" :label-width="formLabelWidth" prop="type">
              <el-select v-model="form1.type" placeholder="请选择难度">
                <el-option
                  v-for="item in options4"
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
            <el-button @click="close1()">取 消</el-button>
            <el-button type="primary" @click="additemSubmitForm('form1')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <span>请在上表中选择配置项下表显示配置项明细</span>
      </div>
      <div class="addMain">
        <el-table :data="tableDataTwo" height="250" border style="width: 100%">
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
                <el-form :model="form2">
                  <el-form-item label="ID" :label-width="formLabelWidth">
                    <el-input v-model="form2.id" autocomplete="off" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="题目类别" :label-width="formLabelWidth">
                    <el-select v-model="form2.subjectTypeId" placeholder="请选择类别">
                      <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="题目难度" :label-width="formLabelWidth">
                    <el-select v-model="form2.difficulty" placeholder="请选择难度">
                      <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="题目题型" :label-width="formLabelWidth">
                    <el-select v-model="form2.type" placeholder="请选择难度">
                      <el-option
                        v-for="item in options4"
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
                  <el-button type="primary" @click="updataItem()">确 定</el-button>
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
  name: 'Quick',
  created () {
    localStorage.setItem('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIzNjY4MDUyMjE0NDY2NDc4MDgiLCJjb2RlIjoiMTkxMDUwNTQzMEBxcS5jb20iLCJ1cGRhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJjcmVhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJpcCI6IjEyNy4wLjAuMSIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLkuJPkuJrkurrlkZgiLCJleHAiOjE1OTEzMzM4MjEsInVzZXJJZCI6IjQxMjc3ODA0OTU3NjU1MDQwMCIsIm9yZ0lkIjoiMzY2ODA1MTU1MzIzNDQ1MjQ4In0.b5abDnn7Tqo14ie7ZTbVTOQm6BcIWSUeUQAGKMeqVos')
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
            difficulty: '简单',
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
          this.tableData = data
        },
        function () {
          console.log('error')
          console.log('分页查询失败')
        }
      )
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
      this.$ajax
        .post('/gateway/basedata/team/UpdataCombExamConfigItem', {
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
              id: this.form2.id,
              combExamId: this.pageId,
              num: this.form2.num,
              difficulty: this.form2.difficulty,
              score: this.form2.score,
              subjectTypeId: this.form2.subjectTypeId,
              categoryId: this.form2.type
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
            this.tableDataTwo = response.data.body.data
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
                    difficulty: '简单',
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
                  this.tableData = data
                },
                function () {
                  console.log('error')
                  console.log('分页查询失败')
                }
              )
          },
          function () {
            alert('修改失败')
            console.log('error')
          }
        )
      this.dialogFormVisible2 = false
    },
    deleteItem (index, row) {
      this.$ajax
        .post('/gateway/basedata/team/DeleteCombExamConfigItem', {
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
              id: row.id,
              combExamId: this.pageId
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
            this.tableDataTwo = response.data.body.data
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
                    difficulty: '简单',
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
                  this.tableData = data
                },
                function () {
                  console.log('error')
                  console.log('分页查询失败')
                }
              )
          },
          function () {
            alert('修改失败')
            console.log('error')
          }
        )
      localStorage.setItem('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIzNjY4MDUyMjE0NDY2NDc4MDgiLCJjb2RlIjoiMTkxMDUwNTQzMEBxcS5jb20iLCJ1cGRhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJjcmVhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJpcCI6IjEyNy4wLjAuMSIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLkuJPkuJrkurrlkZgiLCJleHAiOjE1OTEzMzM4MjEsInVzZXJJZCI6IjQxMjc3ODA0OTU3NjU1MDQwMCIsIm9yZ0lkIjoiMzY2ODA1MTU1MzIzNDQ1MjQ4In0.b5abDnn7Tqo14ie7ZTbVTOQm6BcIWSUeUQAGKMeqVos')
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
              difficulty: '简单',
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
            this.tableData = data
          },
          function () {
            console.log('error')
            console.log('分页查询失败')
          }
        )
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
      if (this.form4.name.length !== 0 && this.form4.type.length !== 0 && this.form4.difficulty.length !== 0) {
        this.$message({
          message: '组卷成功',
          type: 'success'
        })
        this.$ajax
          .post('/gateway/basedata/team/QuickPaper', {
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
                combExamId: this.form4.id
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
    close1 () {
      this.loading = false
      this.dialogFormVisible1 = false
    },
    open1 (index, row) {
      this.loading = true
      this.dialogFormVisible1 = true
      this.form1.id = this.pageNameTwo
    },
    open2 (index, row) {
      this.dialogFormVisible2 = true
      this.form2.id = row.id
      this.form2.difficulty = row.difficulty
      this.form2.subjectTypeId = row.subjectTypeId
      this.form2.num = row.num
      this.form2.score = row.score
      this.form2.type = row.categoryId
    },
    open3 (index, row) {
      this.dialogFormVisible4 = true
      this.form4.id = row.id
    },
    additem () {
      this.dialogFormVisible1 = false
      var list = {
        categoryId: this.form1.type,
        combExamId: this.pageId,
        difficulty: this.form1.difficulty,
        id: 'null',
        num: this.form1.num,
        score: this.form1.score,
        subjectTypeId: this.form1.subjectTypeId
      }
      this.tableDataTwo.push(list)
      this.$ajax
        .post('/gateway/basedata/team/InsertCombExamConfigItem', {
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
              id: list.id,
              combExamId: list.combExamId,
              num: list.num,
              difficulty: list.difficulty,
              score: list.score,
              subjectTypeId: list.subjectTypeId,
              categoryId: list.categoryId
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
            this.tableDataTwo = response.data.body.data
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
                    difficulty: '简单',
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
                  this.tableData = data
                },
                function () {
                  console.log('error')
                  console.log('分页查询失败')
                }
              )
          },
          function () {
            console.log('error')
          }
        )
      this.loading = false
    },
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

      console.log('选中的deletetable')
      console.log(this.multipleSelection)
    },
    dopapers () {
      if (this.multipleSelection.length === 0) {
        alert('请勾选要生成的配置项')
      } else if (this.multipleSelection.length > 1) {
        alert('只能勾选一条配置项')
      } else {
        this.open3(1, this.multipleSelection[0])
      }
    }
  },
  data () {
    return {
      // 表格的多选框
      multipleSelection: [],
      loading: false,
      pageId: '',
      pageSize: 8,
      pagetotal: 2,
      currentPage: 1,
      pageName: '',
      pageNameTwo: '',
      createdByName: '',
      createdByTime: '',
      pageDifficulty: 'simple',
      pageType: '',
      paperAnswerList: [{
      }],
      paperSubjecList: [{
      }],
      tableData: [],
      tableDataTwo: [],
      options1: [{
        value: '困难',
        label: 'difficulty'
      }, {
        value: '中等',
        label: 'medium'
      }, {
        value: '简单',
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
#icon {
  margin-bottom: 20px;
  float: left;
}
</style>

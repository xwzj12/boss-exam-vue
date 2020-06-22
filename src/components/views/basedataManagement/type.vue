<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-main>
        <div id="serchs">
          <el-form :inline="true" :model="formInline">
            <el-form-item label="题目类型">
              <el-input v-model="formInline.searchs" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="reflashAll">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
       
        <div id="icon">
          <font color="#409EFF" @click="addVisible = true">
            <i class="el-icon-plus">增加</i>
          </font>
          &nbsp;&nbsp;&nbsp;
          <font color="#E6A23C" @click="updateSelected()">
            <i class="el-icon-delete">修改</i>
          </font>
          &nbsp;&nbsp;&nbsp;
          <font color="#F56C6C" @click="deleteSelected()">
            <i class="el-icon-edit">删除</i>
          </font>
           &nbsp;&nbsp;&nbsp;
           <font color="#409EFF">
            <i >已选中：{{this.multipleSelection.length}} </i>
          </font>
         
          <!-- <font color="#F56C6C"><i class="el-icon-upload2">导入</i></font>
        &nbsp;&nbsp;&nbsp;
        <font color="#F56C6C"><i class="el-icon-upload2">导出</i></font>
          &nbsp;&nbsp;&nbsp;-->
        </div>

        <el-table
          ref="multipleTable"
          stripe
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="'题型 ID" v-if="false" width="180"></el-table-column>
          <el-table-column prop="subjectName" label="题目类型" width="250"></el-table-column>
          <el-table-column prop="attribute" label="属性" width="250"></el-table-column>
          <el-table-column prop="remark" label="备注" width="250"></el-table-column>
          <el-table-column prop="updatedTime" label="更新时间" width="300"></el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="180"
            :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status=== '是' ? 'success' : 'danger'"
                effect="dark"
                disable-transitions
              >{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="360">
            <template slot-scope="scope">
              <!-- Form -->
              <el-button size="big" type="primary" @click="addVisible = true">增加</el-button>
              <el-button size="big" type="warning" @click="editClick(scope.$index, scope.row)">编辑</el-button>
              <el-button size="big" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <span class="demonstration">完整功能</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="0"
            :page-sizes="[2, 5, 10, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>

    <!-- addForm -->
    <el-dialog title="添加题型" :visible.sync="addVisible">
      <el-form
        :rules="rules"
        ref="addForm"
        class="demo-ruleForm"
        :model="addForm"
        size="big"
        label-width="100px"
      >
        <el-row>
          <el-form-item label="题目类型：" prop="subjectName">
            <el-input v-model="addForm.subjectName" />
          </el-form-item>
          <el-form-item label="属性：" prop="attribute">
            <el-select v-model="addForm.attribute" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="addForm.status">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="addForm.remark" />
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">添加题目类型</el-button>
      </div>
    </el-dialog>
    <!-- editForm -->
    <el-dialog title="修改题目类别" :visible.sync="editVisible">
      <el-form
        :rules="rules"
        ref="editForm"
        class="demo-ruleForm"
        :model="editForm"
        size="big"
        label-width="100px"
      >
        <el-row>
          <el-form-item label="题目类型：" prop="subjectName">
            <el-input v-model="editForm.subjectName" />
          </el-form-item>
          <el-form-item label="属性：" prop="attribute">
            <el-select v-model="editForm.attribute" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="editForm.status">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="editForm.remark" />
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible=false">取 消</el-button>
        <el-button type="primary" @click="editSubmitForm('editForm')">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>


    

<script>
export default {
  components: {},
  created() {
    localStorage.setItem(
      "Authorization",
      "eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIxMDEwMDEiLCJjb21wYW55TmFtZSI6IuWNmuaAnemVv-S5kOWIhuWFrOWPuCIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLlvKDkuIkiLCJleHAiOjE1ODkyNTI0NzcsInVzZXJJZCI6IjAwMSIsIm9yZ0lkIjoiMTAxIn0.hegrr4Ia9XtDzCCXv0CvpPyRFrC2LgoQZc3jdwmmsXA"
    );
    this.reflashAll();
  },
  data() {
    return {
      serchs: "",
      rules: {
        subjectName: [
          { required: true, message: "请输入题目类型名称", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur"
          }
        ],
        attribute: [
          { required: true, message: "请选择题目类型", trigger: "change" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      //表格的多选框
      multipleSelection: [],
      deleteTable: [
        {
          id: "",
          version: ""
        }
      ],
      tableData: [
        {
          id: "001",
          subjectName: "多选题",
          attribute: "填空题",
          remark: "测试",
          updatedTime: "2016-05-02",
          status: "1",
          version: "1"
        },
        {
          id: "001",
          subjectName: "多选题",
          attribute: "填空题",
          remark: "测试",
          updatedTime: "2016-05-02",
          status: "1",
          version: "1"
        }
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      pageSize: 5,
      pageIndex: 0,
      total: 5,
      formInline: {
        searchs: ""
      },

      options: [
        {
          value: "单选题",
          label: "单选题"
        },
        {
          value: "多选题",
          label: "多选题"
        },
        {
          value: "主观题",
          label: "主观题"
        },
        {
          value: "填空题",
          label: "填空题"
        },
        {
          value: "判断题",
          label: "判断题"
        }
      ],
      value: "",
      // 是否显示本面板
      addVisible: false,
      // add表单数据
      addForm: {
        subjectName: "单选题",
        attribute: "单选题",
        status: "是",
        remark: "测试"
      },
      //是否显示本面板
      editVisible: false,
      //edit表单数据
      editForm: {
        id: "001",
        subjectName: "多选题",
        attribute: "填空题",
        remark: "测试",
        updatedTime: "2016-05-02",
        status: "1",
        version: "1"
      }
    };
  },

  methods: {
    reflashAll() {
      this.getData();
      this.queryTotal();
    },
     getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "staffToken") {
            return arr2[1];
          }
        }
      } else {
        alert("登录超时!");
        this.$router.push({
          path: "/Login",
          name: "Login",
          params: {}
        });
      }
    },
    //add表单验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleAdd();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //edit表单验证
    editSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleEdit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //分页查询
    getData() {
      console.log(this.formInline.serchs);
      this.$ajax
        .post("/gateway/basedata/type/queryPage", {
          head: {
            version: "1",
            token: this.getCookie(),
            businessType: "12",
            equipId: "1",
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              name: this.formInline.searchs,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            }
          }
        })
        .then(
          response => {
            console.log(response);
            this.tableData = [];
            var data = response.data.body.data;
            for (let i = 0; i < data.length; i++) {
              this.tableData[i] = data[i];
              this.tableData[i].status =
                this.tableData[i].status == 1 ? "是" : "否";
              console.log(this.tableData[i].status);
            }
            console.log("分页查询成功" + response.data.body.data);
          },
          function() {
            console.log("error");
            console.log("分页查询失败");
          }
        );
    },
    //查询总条数
    queryTotal() {
      this.$ajax
        .post("/gateway/basedata/type/queryTotal", {
          head: {
            version: "1",
            token: this.getCookie(),
            businessType: "12",
            equipId: "1",
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              name: this.formInline.searchs
            }
          }
        })
        .then(
          response => {
            var data = response.data.body.data;
            console.log("查询total成功" + data);
            this.total = data;
          },
          function() {
            console.log("error");
            console.log("total查询失败");
          }
        );
    },

    //增加
    handleAdd() {
      this.$ajax
        .post("/gateway/basedata/type/add", {
          head: {
            version: "1",
            token: this.getCookie(),
            businessType: "12",
            equipId: "1",
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              id: "1",
              subjectName: this.addForm.subjectName,
              status: this.addForm.status == "是" ? 1 : 0,
              remark: this.addForm.remark,
              attribute: this.addForm.attribute,
              version: "1"
            }
          }
        })
        .then(
          response => {
            console.log(response);
            var message = response.data.head.message;
            alert(message);
            this.reflashAll();
          },
          function() {
            console.log("error");
            alert("增加失败,内部错误");
          }
        );
      this.addVisible = false;
    },

    //点击修改
    editClick(index, row) {
      console.log(index, row);
      this.editVisible = true;
      this.editForm.id = row.id;
      this.editForm.subjectName = row.subjectName;
      this.editForm.attribute = row.attribute;
      this.editForm.status = row.status;
      this.editForm.remark = row.remark;
      this.editForm.version = row.version;
    },
    //确认修改
    handleEdit() {
      this.$ajax
        .post("/gateway/basedata/type/update", {
          head: {
            version: "1",
            token: this.getCookie(),
            businessType: "12",
            equipId: "1",
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              id: this.editForm.id,
              subjectName: this.editForm.subjectName,
              status: this.editForm.status == "是" ? 1 : 0,
              remark: this.editForm.remark,
              attribute: this.editForm.attribute,
              version: this.editForm.version
            }
          }
        })
        .then(
          response => {
            console.log(response);
            var message = response.data.head.message;
            alert(message);
            this.reflashAll();
          },
          function() {
            console.log("error");
            alert("修改失败,版本号不一致,请刷新重试 ");
          }
        );
      this.editVisible = false;
    },

    //删除
    handleDelete(index, row) {
      console.log(row.id + "\n" + row.version);
      if (row.status == "否") {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "执行删除!"
            });
            this.tableData.splice(index, 1);
          })
          .then(() => {
            this.$ajax
              .post("/gateway/basedata/type/delete", {
                head: {
                  version: "1",
                  token: this.getCookie(),
                  businessType: "12",
                  equipId: "1",
                  equipType: 1,
                  encrypt: 1
                },
                body: {
                  data: {
                    id: row.id,
                    version: row.version
                  }
                }
              })
              .then(
                response => {
                  console.log(response);
                  var message = response.data.head.message;
                  alert(message);
                  this.reflashAll();
                },
                function() {
                  console.log("error");
                  alert("删除失败,版本号不一致或该类型已被引用,请刷新重试");
                }
              );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        alert("该题目类型正在启用状态,不能删除!");
      }
    },

    //标签处理 过滤
    filterTag(value, row) {
      return row.status === value;
    },

    //分页 改变pagesize
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.reflashAll();
    },
    //分页 改变pageIndex
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.reflashAll();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //多选框全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //多选框选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.deleteTable = [];
      for (let i = 0; i < val.length; i++) {
        let DeleteVO = {};
        DeleteVO.id = val[i].id;
        DeleteVO.version = val[i].version;
        this.deleteTable.push(DeleteVO);
      }
      console.log("选中的deletetable");
      console.log(this.deleteTable);
    },
    //选中修改
    updateSelected() {
      if (this.multipleSelection.length == 0) {
        alert("请勾选要修改的数据");
      } else if (this.multipleSelection.length > 1) {
        alert("只能修改一个数据");
      } else {
        let row = this.multipleSelection[0];
        this.editVisible = true;
        this.editForm.id = row.id;
        this.editForm.subjectName = row.subjectName;
        this.editForm.attribute = row.attribute;
        this.editForm.status = row.status;
        this.editForm.remark = row.remark;
        this.editForm.version = row.version;
      }
    },
    //多选执行删除
    deleteSelected() {
      if (this.multipleSelection.length == 0) {
        alert("请勾选要删除的数据");
      } else {
        var statusFlag = true;
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status == "是" && statusFlag) {
            statusFlag = false;
            alert(
              "选中的第" +
                (i + 1) +
                "个题型启动状态，不能删除：" +
                this.multipleSelection[i].subjectName
            );
          }
        }
        if (statusFlag && this.multipleSelection.length > 0) {
          console.log("将执行删除：");
          console.log(this.multipleSelection);
          this.$confirm("此操作将永久删除选中的文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "开始执行批量删除!"
              });
            })
            .then(() => {
              this.$ajax
                .post("/gateway/basedata/type/deleteSelected", {
                  head: {
                    version: "1",
                    token: this.getCookie(),
                    businessType: "12",
                    equipId: "1",
                    equipType: 1,
                    encrypt: 1
                  },
                  body: {
                    data: {
                      deleteVOList: this.deleteTable
                    }
                  }
                })
                .then(
                  response => {
                    console.log(response);
                    var flag = response.data.body.data;
                    alert(response.data.head.message);
                    this.reflashAll();
                  },
                  function() {
                    console.log("error");
                    alert("删除失败");
                  }
                );
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        }
      }
    },
    //关闭弹窗
    handleCancel() {
      this.$emit("getCancel");
    },
    //关闭弹窗，不可以删这个方法。不用这个方法点击遮罩层关闭会报错
    handleCloseBindWarnStandard() {
      this.$emit("closeBindWarnStandard");
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
#icon {
  margin-bottom: 20px;
  float: left;
}
</style>

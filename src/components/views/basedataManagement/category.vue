<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div>
          <!-- <el-card class="box-card"> -->
          <!-- <div slot="header" class="clearfix">
            <i class="el-icon-menu"></i>
            <span>题目类别管理</span>
          </div>-->

          <el-header style="margin: 20px 0px 20px 0px">
            <el-row>
              <h1 style="font-size:15px;text-align:center;line-height:50px">题目类别管理</h1>
            </el-row>
            <div class="horizon">
              <hr />
            </div>
          </el-header>

          <el-tree
            :data="treeData"
            node-key="id"
            @node-contextmenu="rightClick"
            @node-click="handleNodeClick"
          ></el-tree>

          <!-- </el-card> -->
          <!-- 右键菜单 -->
          <div v-show="menuVisible">
            <el-card>
              <ul id="menu" class="menu" :model="treeItem">
                <li class="menu__item" @click="addClick(1,treeItem)">添加</li>
                <li class="menu__item" @click="menuUpdate(1,treeItem)">修改</li>
                <li class="menu__item" @click="handleDelete(1,treeItem)">删除</li>
              </ul>
            </el-card>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div id="serchs">
          <el-form :inline="true" :model="formInline">
            <el-form-item label="题目类别">
              <el-input v-model="formInline.searchs" placeholder="请输入题目类别"></el-input>
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
 
        </div>
        <el-table
          ref="multipleTable"
          stripe
          :data="tableData"
          tooltip-effect="dark"
          style="width: 200%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="题目类别 ID" v-if="false" width="180"></el-table-column>
          <el-table-column prop="name" label="类别名称" width="300"></el-table-column>
          <el-table-column prop="parentId" label="父类别ID" v-if="false" width="180"></el-table-column>
          <el-table-column prop="remark" label="备注" width="300"></el-table-column>

          <el-table-column prop="updatedTime" label="更新时间" width="300"></el-table-column>
          <el-table-column
            prop="status"
            label="是否启用"
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
              <el-button size="big" type="primary" @click="addClick(scope.$index, scope.row)">增加</el-button>
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
            :current-page="currentPage1"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>

    <!-- addForm -->
    <el-dialog title="添加题目类别" :visible.sync="addVisible">
      <el-form
        :rules="rules"
        ref="addForm"
        class="demo-ruleForm"
        :model="addForm"
        size="big"
        label-width="100px"
      >
        <el-row>
          <el-form-item label="父类别名称：" prop="parentId">
            <el-select v-model="addForm.parentId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别名称：" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入类别名称" />
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="addForm.status">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="addForm.remark"
            />
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确定添加</el-button>
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
          <el-form-item label="父类别名称：" prop="parentId">
            <el-select v-model="editForm.parentId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别名称：" prop="name">
            <el-input v-model="editForm.name" />
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="editForm.status">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="editForm.remark"
            />
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
    // localStorage.setItem(
    //   "Authorization",
    //   "eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIxMDEwMDEiLCJjb21wYW55TmFtZSI6IuWNmuaAnemVv-S5kOWIhuWFrOWPuCIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLlvKDkuIkiLCJleHAiOjE1ODkzMDY2OTgsInVzZXJJZCI6IjAwMSIsIm9yZ0lkIjoiMTAxIn0.rtBYPRGpIVwpwYlfaD_4KZrIfedfRxDxlKXz76RS-rE"
    // );
    this.reflashAll();
  },
  data() {
    return {
      //右击树菜单判定
      menuVisible: false,
      // 右键菜单
      treeItem: {},
      //表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入题目类别名称", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur"
          }
        ],
        parentId: [
          { required: true, message: "请选择题目类型", trigger: "change" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      //这是表格的测试数据
      tableData: [
        {
          id: "001",
          name: "367201090252001280",
          parentId: "000",
          remark: "测试",
          createdBy: "Tom",
          createdTime: "2016-05-02",
          updatedBy: "Tom",
          updatedTime: "2016-05-02",
          status: "是"
        },
        {
          id: "002",
          name: "spring",
          parentId: "000",
          remark: "测试",
          updatedTime: "2016-05-02",
          status: "否"
        }
      ],
      //这是树状图的测试数据
      treeData: [
        {
          id: "1",
          label: "一级 1",
          parentId: "",
          status: "",
          version: "",

          children: [
            {
              id: "1",
              label: "二级 1-1",
              parentId: "",
              status: "",
              version: "",
              children: [
                {
                  id: "1",
                  label: "二级 1-1",
                  parentId: "",
                  status: "",
                  version: ""
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "name"
      },
      currentPage1: 1,
      currentPage2: 2,
      currentPage3: 3,
      currentPage4: 4,
      pageSize: 10,
      pageIndex: 0,
      total: 10,
      formInline: {
        searchs: ""
      },

      options: [
        {
          value: "0",
          label: "一级类别"
        }
      ],
      value: "",
      //是否显示本面板
      addVisible: false,
      //add表单数据
      addForm: {
        id: "1",
        name: "",
        parentId: "367201090252001280",
        status: "是",
        remark: "",
        version: "1"
      },
      //是否显示本面板
      editVisible: false,
      //edit表单数据
      editForm: {
        id: "",
        name: "",
        parentId: "",
        status: "",
        remark: "",
        version: "1"
      },
      //表格的多选框
      multipleSelection: [],
      deleteTable: [
        {
          id: "",
          version: ""
        }
      ]
    };
  },
  methods: {
    // clickRow(row) {
    //   this.$refs.multipleTable.toggleRowSelection(row);
    // },
    //右击树节点
    rightClick(MouseEvent, object, Node, element) {
      this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
      var local = MouseEvent.target.getBoundingClientRect();
      var menu = document.querySelector("#menu");
      document.addEventListener("click", this.foo); // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      menu.style.left = MouseEvent.pageX + "px";
      menu.style.top = MouseEvent.pageY - 10 + "px";
      console.log(
        "右键被点击的event:",
        MouseEvent.target.getBoundingClientRect()
      );
      console.log("右键被点击的object:", object);
      this.treeItem = object;
      console.log("this.treeItem");
      console.log(this.treeItem);
      console.log(menu);
    },
    foo() {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false;
      document.removeEventListener("click", this.foo); // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    //右键菜单的修改方法
    menuUpdate(index, row) {
      console.log("parentId:" + row.parentId);
      this.editForm.id = row.id;
      this.editForm.parentId = row.parentId;
      this.editForm.name = row.label;
      this.editForm.status = row.status == 1 ? "是" : "否";
      this.editForm.remark = row.remark;
      this.editForm.version = row.version;
      this.editVisible = true;
      console.log(this.editForm);
    },

    //刷新页面数据方法
    reflashAll() {
      this.getData();
      this.getOptions();
      this.reflashTree();
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
    // getData() {
    //   console.log(this.formInline.serchs);
    //   this.$ajax
    //     .post("/gateway/basedata/category/queryPage", {
    //       head: {
    //         version: "1",
    //         token: this.getCookie(), //localStorage.getItem("Authorization")
    //         businessType: "12",
    //         equipId: "1",
    //         equipType: 1,
    //         encrypt: 1
    //       },
    //       body: {
    //         data: {
    //           name: this.formInline.searchs,
    //           pageIndex: this.pageIndex,
    //           pageSize: this.pageSize
    //         }
    //       }
    //     })
    //     .then(
    //       response => {
    //         console.log(response);
    //         this.tableData = [];
    //         var data = response.data.body.data;
    //         for (let i = 0; i < data.length; i++) {
    //           this.tableData[i] = data[i];
    //           this.tableData[i].status =
    //             this.tableData[i].status == 1 ? "是" : "否";
    //         }
    //         console.log("分页查询成功" + response.data.body.data);
    //       },
    //       function() {
    //         console.log("error");
    //         console.log("分页查询失败");
    //       }
    //     );
    // },
    //分页查询
    getData() {
      console.log(this.formInline.serchs);
      let data1={
        head: {
            version: "1",
            token: this.getCookie(), //localStorage.getItem("Authorization")
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
        }
      this.$http
        .post("/gateway/basedata/category/queryPage", data1
          )
        .then(
          response => {
            console.log(response);
            this.tableData = [];
            var data = response.body.data;
            for (let i = 0; i < data.length; i++) {
              this.tableData[i] = data[i];
              this.tableData[i].status =
                this.tableData[i].status == 1 ? "是" : "否";
            }
            console.log("分页查询成功" + response.body.data);
          },
          function() {
            console.log("error");
            console.log("分页查询失败");
          }
        );
    },
    //树形节点点击,查询对应的子集
    handleNodeClick(data) {
      console.log(data.id);
      this.$http
        .post("/gateway/basedata/category/queryChildren", {
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
              id: data.id
            }
          }
        })
        .then(
          response => {
            this.tableData = [];
            var data = response.body.data;
            for (let i = 0; i < data.length; i++) {
              this.tableData[i] = data[i];
              this.tableData[i].status =
                this.tableData[i].status == 1 ? "是" : "否";
            }
            console.log("childrenTree查询成功" + data);
          },
          function() {
            console.log("error");
            console.log("childrenTree查询失败");
          }
        );
    },
    
    //刷新树节点
    reflashTree() {
       this.$http
        .post("/gateway/basedata/category/queryTree", {
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
              parentId: "0"
            }
          }
        })
        .then(
          response => {
            console.log(response);
            var data = response.body.data;
            console.log("Tree查询成功" + data);
            this.treeData = data;
          },
          function() {
            console.log("error");
            console.log("Tree查询失败");
          }
        );
    },

    //查询Options
    getOptions() {
      this.$http
        .post("/gateway/basedata/category/queryOptions", {
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
              parentId: "0"
            }
          }
        })
        .then(
          response => {
            var data = response.body.data;
            console.log("Options查询成功:");
            console.log(data);
            this.options = data;
            this.total = data.length - 1;
          },
          function() {
            console.log("error");
            console.log("Options查询失败");
          }
        );
    },
    addClick(index, row) {
      this.addVisible = true;
      this.addForm.parentId = row.id;
    },
    //增加
    handleAdd() {
      this.$ajax
        .post("/gateway/basedata/category/add", {
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
              parentId: this.addForm.parentId,
              name: this.addForm.name,
              status: this.addForm.status == "是" ? 1 : 0,
              remark: this.addForm.remark,
              version: "1"
            }
          }
        })
        .then(
          response => {
            console.log(response);
            alert(response.data.head.message);
            this.reflashAll();
          },
          function() {
            console.log("error");
            alert("增加失败,内部原因");
          }
        );
      this.addVisible = false;
    },
    //点击修改按钮，弹出框
    editClick(index, row) {
      console.log("parentId:" + row.parentId);
      this.editForm.id = row.id;
      this.editForm.parentId = row.parentId;
      this.editForm.name = row.name;
      this.editForm.status = row.status;
      this.editForm.remark = row.remark;
      this.editForm.version = row.version;
      this.editVisible = true;
      console.log(this.editForm);
    },
    //确认修改
    handleEdit() {
      this.$http
        .post("/gateway/basedata/category/update", {
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
              parentId: this.editForm.parentId,
              name: this.editForm.name,
              status: this.editForm.status == "是" ? 1 : 0,
              remark: this.editForm.remark,
              version: this.editForm.version
            }
          }
        })
        .then(
          response => {
            console.log(response);
            alert(response.head.message);
            this.reflashAll();
          },
          function() {
            console.log("error");
            alert("修改失败,内部原因");
            console.log("修改失败,内部原因");
          }
        );
      this.editVisible = false;
    },
    //删除
    handleDelete(index, row) {
      console.log(row.id + "\n" + row.version);
      if (row.status == "否" || row.status == 0) {
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
              .post("/gateway/basedata/category/delete", {
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
                  alert(response.data.head.message);
                  this.reflashAll();
                },
                function() {
                  console.log("error");
                  alert("删除失败,该类别已被引用，无法删除");
                  this.reflashAll();
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
        alert("该题目类别正在启用状态,不能删除!");
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
    updateSelected() {
      if (this.multipleSelection.length == 0) {
        alert("请勾选要修改的数据");
      } else if (this.multipleSelection.length > 1) {
        alert("只能修改一个数据");
      } else {
        let row = this.multipleSelection[0];
        console.log("parentId:" + row.parentId);
        this.editVisible = true;
        this.editForm.id = row.id;
        this.editForm.parentId = row.parentId;
        this.editForm.name = row.name;
        this.editForm.status = row.status;
        this.editForm.remark = row.remark;
        this.editForm.version = row.version;
        console.log(this.editForm);
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
                "个题目类别启动状态，不能删除：" +
                this.multipleSelection[i].name
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
                .post("/gateway/basedata/category/deleteSelected", {
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

<style scoped>
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

.box-card {
  height: 800px;
}
.xrequired:before {
  content: "*";
  color: red;
  margin-right: 4px;
}

.menu_item {
  line-height: 20px;
  text-align: center;
  margin-top: 10px;
}

.menu {
  height: 100px;
  width: 80px;
  position: absolute;
  border-radius: 10px;
  border: 1px solid #999999;
  background-color: #f4f4f4;
}
.card-box {
  position: static;
}
</style>



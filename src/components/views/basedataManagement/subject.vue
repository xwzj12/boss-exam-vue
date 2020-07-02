<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-main>
        <div id="serchs">
          <el-form :inline="true" :model="formInline">
            <el-form-item label="题目">
              <el-input v-model="formInline.name" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item label="题目类别">
              <el-select v-model="formInline.categoryId" placeholder="请选择">
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题型">
              <el-select v-model="formInline.subjectTypeId" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData()">查询</el-button>
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
            <i>已选中：{{this.multipleSelection.length}}</i>
          </font>
          <input
            type="file"
            @change="importf(this)"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          &nbsp;&nbsp;&nbsp;
          <font color="#F56C6C">
            <el-button
              :loading="downloadLoading"
              type="danger"
              size="small"
              icon="el-icon-download"
              @click="handleDownload"
            >导出选中数据</el-button>
          </font>
          <font color="#F56C6C">
            <el-button
              :loading="downloadLoading"
              type="primary"
              size="small"
              icon="el-icon-download"
              @click="getDownload"
            >获取导入模板</el-button>
          </font>
          <font color="#F56C6C">
            <el-button
              :loading="downloadLoading"
              type="danger"
              size="small"
              icon="el-icon-download"
              @click="exportExcelAll"
            >导出所有</el-button>
          </font>
        </div>

        <el-table
          ref="multipleTable"
          :data="tableData"
          :default-sort="{prop: 'updatedTime', order: 'descending'}"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="'题型 ID" v-if="false" width="180"></el-table-column>
          <el-table-column prop="name" label="题目" width="360"></el-table-column>
          <el-table-column prop="imageUrl" label="图片地址" v-if="false" width="180"></el-table-column>
          <el-table-column prop="categoryId" label="题目类别" sortable width="180"></el-table-column>
          <el-table-column prop="subjectTypeId" label="题型" sortable width="180"></el-table-column>
          <el-table-column prop="difficulty" label="难度" sortable width="180"></el-table-column>
          <el-table-column prop="updatedTime" label="更新时间" sortable width="180"></el-table-column>
          <el-table-column prop="remark" label="备注" width="180"></el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="120"
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

          <el-table-column prop="version" label="版本" v-if="false" width="80"></el-table-column>
          <el-table-column label="操作" width="360">
            <template slot-scope="scope">
              <!-- Form -->
              <el-button size="big" type="primary" @click="addVisible = true">增加</el-button>
              <el-button size="big" type="warning" @click="showEditForm(scope.$index, scope.row)">编辑</el-button>
              <el-button size="big" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <span class="demonstration">完整功能</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[5,10, 20, 40, 80,160]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>

    <!-- addForm -->
    <el-dialog title="添加题目" :visible.sync="addVisible">
      <el-form
        :rules="rules"
        ref="addForm"
        class="demo-ruleForm"
        :model="addForm"
        size="big"
        label-width="100px"
      >
        <el-row>
          <el-form-item label="题目类别：" prop="categoryId">
            <el-select v-model="addForm.categoryId" placeholder="请选择">
              <el-option
                v-for="item in  categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型：" prop="subjectTypeId">
            <el-select v-model="addForm.subjectTypeId" placeholder="请选择">
              <el-option
                v-for="item in  typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度：" prop="difficulty">
            <el-select v-model="addForm.difficulty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目内容：" prop="name">
            <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="addForm.name" />
          </el-form-item>

          <el-form-item label="题目图片：">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :file-list="fileList"
              :http-request="getFile"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-button size="small" type="success" @click="upload">确认上传</el-button>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="addForm.remark"
            />
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="addForm.status">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <el-button type="primary" @click="itemAddVisible = true">新增答案按钮</el-button>
      <!-- 增加界面的答案表格-->
      <el-table
        ref="multipleTable"
        :data="addItemTableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" v-if="false" label="题目Id" width="100"></el-table-column>
        <el-table-column prop="answer" label="答案" width="360"></el-table-column>
        <el-table-column prop="rightAnswer" label="正确" width="120" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.rightAnswer=== '是' ? 'success' : 'danger'"
              effect="dark"
              disable-transitions
            >{{scope.row.rightAnswer}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="subjectId" v-if="false" label="难度" width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="itemAddVisible = true">增加</el-button>
            <el-button size="mini" type="warning" @click="showAddEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="addHandleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确认添加题目</el-button>
      </div>
    </el-dialog>
    <!-- itemAddForm Dialog add增加增加临时表 弹窗 -->
    <el-dialog title="添加答案" :visible.sync="itemAddVisible">
      <el-form :rules="rules" ref="form" :model="form" size="big" label-width="100px">
        <el-row>
          <el-form-item label="答案：" prop="answer">
            <el-input v-model="itemAddForm.answer" />
          </el-form-item>
          <el-form-item label="是否正确">
            <el-radio-group v-model="itemAddForm.rightAnswer">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemAddVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleAddAdd">确定增加答案</el-button>
      </div>
    </el-dialog>
    <!-- itemAddEditForm Dialog 增加修改临时表单 弹窗-->
    <el-dialog title="修改答案" :visible.sync="itemAddEditVisible">
      <el-form ref="form" :model="itemAddEditForm" size="big" label-width="100px" :rules="rules">
        <el-row>
          <el-form-item label="答案：" prop="answer">
            <el-input v-model="itemAddEditForm.answer" />
          </el-form-item>
          <el-form-item label="是否正确">
            <el-radio-group v-model="itemAddEditForm.rightAnswer">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemAddEditVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleAddEdit">保存答案</el-button>
      </div>
    </el-dialog>

    <!-- editForm 修改弹窗框-->
    <el-dialog title="修改题目" :visible.sync="editVisible">
      <el-form
        :rules="rules"
        ref="editForm"
        class="demo-ruleForm"
        :model="editForm"
        size="big"
        label-width="100px"
      >
        <el-row>
          <el-form-item label="题目类别：" prop="categoryId">
            <el-select v-model="editForm.categoryId" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型：" prop="subjectTypeId">
            <el-select v-model="editForm.subjectTypeId" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度：" prop="difficulty">
            <el-select v-model="editForm.difficulty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目内容：" prop="name">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="editForm.name"
            />
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :file-list="fileList"
              :http-request="getFile"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-button size="small" type="success" @click="upload">确认上传</el-button>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="editForm.remark"
            />
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="editForm.status">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-button type="primary" @click="itemEditAddVisible = true">新增答案按钮</el-button>
          <!-- 修改弹出框的明细表格-->
          <el-table
            ref="multipleTable"
            :data="editItemTableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="answer" label="答案内容" width="360"></el-table-column>
            <el-table-column
              prop="rightAnswer"
              label="正确"
              width="120"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.rightAnswer=== '是' ? 'success' : 'danger'"
                  effect="dark"
                  disable-transitions
                >{{scope.row.rightAnswer}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="itemEditAddVisible = true">增加</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click="showEditEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="editHandleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible=false">取 消</el-button>
        <el-button type="primary" @click="editSubmitForm('editForm')">确定修改</el-button>
      </div>
    </el-dialog>
    <!-- itemEditAddForm Dialog 修改 增加临时表 弹窗-->
    <el-dialog title="添加答案" :visible.sync="itemEditAddVisible">
      <el-form ref="form" :model="itemEditAddForm" size="big" label-width="100px" :rules="rules">
        <el-row>
          <el-form-item label="题目数量：">
            <el-input v-model="itemEditAddForm.answer" />
          </el-form-item>
          <el-form-item label="是否正确">
            <el-radio-group v-model="itemEditAddForm.rightAnswer">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemEditAddVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleItemEditAdd">增加答案</el-button>
      </div>
    </el-dialog>
    <!-- itemAddEditForm Dialog 修改修改临时表单 弹窗-->
    <el-dialog title="修改答案" :visible.sync="itemEditEditVisible">
      <el-form ref="form" :model="itemEditEditForm" size="big" label-width="100px" :rules="rules">
        <el-row>
          <el-form-item label="答案内容：" prop="answer">
            <el-input v-model="itemEditEditForm.answer" />
          </el-form-item>
          <el-form-item label="是否正确">
            <el-radio-group v-model="itemEditEditForm.rightAnswer">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemEditEditVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleEditEdit">保存答案修改</el-button>
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
      "eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIxMDEwMDEiLCJjb21wYW55TmFtZSI6IuWNmuaAnemVv-S5kOWIhuWFrOWPuCIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLlvKDkuIkiLCJleHAiOjE1ODk2MDIxODcsInVzZXJJZCI6IjAwMSIsIm9yZ0lkIjoiMTAxIn0.19UGb2w-GjrwxWfN3nlGRDIoR1hzs4WpqqAmDmsKQdY"
    );
    this.reflashAll();
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      pageSize: 5, //页大小
      pageIndex: 0, //页数
      total: 10,
      index: 0, //修改表格的下标
      formInline: {
        name: "",
        categoryId: "java",
        subjectTypeId: "单选题"
      },
      dialogImageUrl: "",
      dialogVisible: false,
      dialogImageUrl2: "",
      dialogVisible2: false,
      //图片上传
      fileList: [
        {
          name: "题目内容.jpg",
          url: ""
        }
      ],
      file: {},
      //表格的多选框
      multipleSelection: [],
      //删除的表格
      deleteTable: [
        {
          id: "",
          version: ""
        }
      ],
      tableData: [
        {
          id: "001",
          name: "spring的特点",
          imageUrl: "",
          categoryId: "java",
          subjectTypeId: "单选题",
          difficulty: "简单",
          updatedTime: "2016-05-02",
          remark: "",
          status: "是",
          version: "",
          items: [
            {
              id: "",
              answer: "",
              rightAnswer: "是",
              subjectId: ""
            }
          ]
        }
      ],
      //增加答案表格
      addItemTableData: [
        {
          id: "",
          answer: "java天下第一",
          rightAnswer: "否",
          subjectId: ""
        }
      ],
      // 修改弹出框的明细表格
      editItemTableData: [
        {
          id: "",
          combExamId: "",
          num: "10",
          difficulty: "简单",
          score: "50",
          subjectTypeId: "单选题",
          categoryId: "java"
        }
      ],
      //修改弹出框的增加明细表格
      editAddItemTableData: [
        {
          id: "",
          combExamId: "",
          difficulty: "简单",
          num: "10",
          score: "50",
          subjectTypeId: "单选题",
          categoryId: "语文"
        }
      ],
      //修改弹出框的修改明细表格
      editEditItemTableData: [
        {
          id: "",
          combExamId: "",
          num: "10",
          difficulty: "简单",
          score: "50",
          subjectTypeId: "单选题",
          categoryId: "java"
        }
      ],
      value: "",
      //是否显示add本面板
      addVisible: false,
      itemAddVisible: false,
      itemAddEditVisible: false,
      //add表单数据
      addForm: {
        id: "",
        name: "测试",
        imageUrl: "",
        categoryId: "java",
        subjectTypeId: "单选题",
        difficulty: "简单",
        remark: "",
        status: "是",
        version: "",
        items: [
          {
            id: "",
            answer: "java天下",
            rightAnswer: "是",
            subjectId: ""
          }
        ]
      },
      //add题目add临时表 答案
      itemAddForm: {
        id: "",
        answer: "java天下",
        rightAnswer: "否",
        subjectId: ""
      },
      //add修改题目明细表单
      itemAddEditForm: {
        id: "",
        answer: "java天下",
        rightAnswer: "否",
        subjectId: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入题目内容", trigger: "blur" },
          {
            min: 2,
            max: 1000,
            message: "长度在 2 到 1000 个字符",
            trigger: "blur"
          }
        ],
        categoryId: [
          { required: true, message: "请选择题目类别", trigger: "change" }
        ],
        subjectTypeId: [
          { required: true, message: "请选择题目类型", trigger: "change" }
        ],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      answer: [
        { required: true, message: "请输入答案内容", trigger: "blur" },
        {
          min: 2,
          max: 100,
          message: "长度在 2 到 100 个字符",
          trigger: "blur"
        }
      ],
      typeOptions: [
        {
          value: "null",
          label: "null"
        }
      ],
      categoryOptions: [
        {
          value: "null",
          label: "null"
        }
      ],
      options: [
        {
          value: "简单",
          label: "简单"
        },
        {
          value: "中等",
          label: "中等"
        },
        {
          value: "困难",
          label: "困难"
        }
      ],
      //是否显示update本面板
      editVisible: false,
      itemEditAddVisible: false, //修改界面的增加弹出框
      itemEditEditVisible: false, //修改界面的修改弹出框
      //edit表单数据
      editForm: {
        id: "",
        name: "测试",
        imageUrl: "",
        categoryId: "java",
        subjectTypeId: "单选题",
        difficulty: "简单",
        remark: "",
        status: "是",
        version: "",
        items: [
          {
            id: "",
            answer: "java天下",
            rightAnswer: "是",
            subjectId: ""
          }
        ]
      },
      //edit题目add明细临时表单
      itemEditAddForm: {
        id: "",
        answer: "java天下",
        rightAnswer: "否",
        subjectId: ""
      },
      //edit题目edit明细临时表单
      itemEditEditForm: {
        id: "",
        answer: "java天下",
        rightAnswer: "否",
        subjectId: ""
      },
      downloadLoading: false //导出判定
    };
  },
  methods: {
    reflashAll() {
      this.getData();
      this.getCategoryOptions();
      this.getTypeOptions();
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
    //查询CategoryOptions
    getCategoryOptions() {
      this.$ajax
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
            var data = response.data.body.data;
            console.log("categoryOptions查询成功:");
           data.shift();
            data.unshift({
              value: "null",
              label: "null"
            });

            this.categoryOptions = data;
            console.log(this.categoryOptions);
          },
          function() {
            console.log("error");
            console.log("categoryOptions查询失败");
          }
        );
    },
    //查询typeOptions
    getTypeOptions() {
      this.$ajax
        .post("/gateway/basedata/type/queryOptions", {
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
            var data = response.data.body.data;
            console.log("typeOptions查询成功:");
            data.unshift({
              value: "null",
              label: "null"
            });

            this.typeOptions = data;
            console.log(this.typeOptions);
          },
          function() {
            console.log("error");
            console.log("typeOptions查询失败");
          }
        );
    },
    //分页查询
    getData() {
      this.$ajax
        .post("/gateway/basedata/subject/queryPage", {
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
              name: this.formInline.name,
              categoryId: this.formInline.categoryId,
              subjectTypeId: this.formInline.subjectTypeId,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            }
          }
        })
        .then(
          response => {
            this.tableData = [];
            var data = response.data.body.data;
            console.log(data);
            for (let i = 0; i < data.length; i++) {
              this.tableData[i] = data[i];
              this.tableData[i].status =
                this.tableData[i].status == 1 ? "是" : "否";
              this.tableData[i].items = data[i].answers;
              for (let j = 0; j < this.tableData[i].items.length; j++) {
                this.tableData[i].items[j].rightAnswer =
                  this.tableData[i].items[j].rightAnswer == 1 ? "是" : "否";
              }
            }

            console.log("分页查询成功");
            console.log(this.tableData);
            this.queryTotal();
          }
          // function() {
          //   console.log("error");
          //   console.log("分页查询失败");
          // }
        );
    },
    //查询总条数
    queryTotal() {
      this.$ajax
        .post("/gateway/basedata/subject/queryTotal", {
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
              name: this.formInline.name,
              categoryId: this.formInline.categoryId,
              subjectTypeId: this.formInline.subjectTypeId
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
    getFile(item) {
      console.log(item.file);
      this.file = item.file;
    },
    //题目图片上传
    upload() {
      const fd = new FormData();
      fd.append("filename", this.file);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      this.$ajax.post("/gateway/basedata/subject/uploading", fd, config).then(
        response => {
          this.$message.success(response.data.head.message);
          var url = response.data.body.data;
          this.addForm.imageUrl = url;
          this.editForm.imageUrl = url;
          console.log(url);
        },
        function() {
          this.addForm.imageUrl = "";
          console.log("error");
          console.log("total查询失败");
        }
      );
    },

    //增加弹窗的照片处理
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log("图片预览：");
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    handleChange(file, fileList) {
      fileList.splice(0);

      fileList.push(file);
      let formData = new FormData();
      formData.append("file", file);
      console.log(formData.getAll("file"));
      this.addForm.imageUrl = file.url;
      this.editForm.imageUrl = file.url;
      console.log("editForm图片地址：" + this.editForm.imageUrl);
      console.log("addForm图片地址：" + this.addForm.imageUrl);
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
    //add明细修改弹出框数据处理
    showAddEdit(index, row) {
      console.log("add明细修改弹出框数据处理");
      this.itemAddEditVisible = true;

      this.itemAddEditForm.answer = row.answer;

      this.itemAddEditForm.rightAnswer = row.rightAnswer;
      this.index = index; //addItemTable要修改的表格下标
    },
    //add明细增加保存按钮方法
    handleAddAdd(index, row) {
      console.log(index, row);
      if (this.itemAddForm.answer.length < 2) {
        alert("请输入答案");
      } else {
        this.addItemTableData.push(this.itemAddForm);
        this.itemAddForm = {
          id: "",
          answer: "java天下",
          rightAnswer: "否",
          subjectId: ""
        };
        this.itemAddVisible = false;
      }
    },
    //add明细修改弹出框的保存按钮方法
    handleAddEdit() {
      if (this.itemAddEditForm.answer.length < 2) {
        alert("请输入答案");
      } else {
        console.log("add明细修改弹出框 保存按钮方法");
        console.log("itemAddEditForm" + this.itemAddEditForm.subjectTypeId);
        this.addItemTableData.splice(this.index, 1); //addItemTable要修改的表格下标
        this.addItemTableData.push(this.itemAddEditForm);
        this.itemAddEditForm = {
          id: "",
          answer: "java天下",
          rightAnswer: "否",
          subjectId: ""
        };
        this.itemAddEditVisible = false;
      }
    },
    //add界面的表格的删除按钮
    addHandleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除该题目答案, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.addItemTableData.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //处理增加方法
    handleAdd() {
      //访问后台方法 未完成!!!!!
      if (this.addItemTableData.length == 0) {
        alert("请增加相应答案");
      } else {
        let answerFlag = false; //判断是否有正确答案
        for (let k = 0; k < this.addItemTableData.length; k++) {
          if (this.addItemTableData[k].rightAnswer == "是") {
            answerFlag = true;
            break;
          }
        }
        if (answerFlag == false) {
          alert("请添加正确答案");
        } else {
          console.log("执行增加");
          this.addVisible = false;
          this.addForm.items = this.addItemTableData;
          for (let i = 0; i < this.addForm.items.length; i++) {
            this.addForm.items[i].rightAnswer =
              this.addForm.items[i].rightAnswer == "是" ? 1 : 0;
          }
          console.log(this.addForm);
          this.$ajax
            .post("/gateway/basedata/subject/add", {
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
                  name: this.addForm.name,
                  imageUrl: this.addForm.imageUrl,
                  remark: this.addForm.remark,
                  status: this.addForm.status == "是" ? 1 : 0,
                  version: "1",
                  categoryId: this.addForm.categoryId,
                  subjectTypeId: this.addForm.subjectTypeId,
                  difficulty: this.addForm.difficulty,
                  answers: this.addForm.items
                }
              }
            })
            .then(
              response => {
                console.log(
                  "response.data.head.message=" + response.data.head.message
                );
                alert("增加成功");
                this.dialogFormVisible = false;
                this.addItemTableData = [];
                this.addForm.imageUrl = "";
                this.dialogImageUrl = "";
                // this.fileList.splice(0);
                this.reflashAll();
              },
              function() {
                alert("增加失败");
                console.log("error");
              }
            );
        }
      }
    },
    //下列方法为 修改按钮及其修改界面的数据处理
    //修改按钮的数据处理
    showEditForm(index, row) {
      this.fileList.splice(0);
      if (row.imageUrl != null) {
        let file = {};
        file.name = "修改图片";
        file.url = row.imageUrl;
        this.fileList.push(file);
        console.log("点击修改按钮:fileList表imageUrl为:");
        console.log(this.fileList[0].url);
      } else {
        console.log("点击修改按钮:fileList表imageUrl为:");
        console.log("null");
      }
      this.editItemTableData = [];
      this.editVisible = true;
      this.editForm.id = row.id;
      this.editForm.categoryId = row.categoryId;
      this.editForm.subjectTypeId = row.subjectTypeId;
      this.editForm.difficulty = row.difficulty;
      this.editForm.name = row.name;
      this.editForm.imageUrl = row.imageUrl;
      this.editForm.remark = row.remark;
      this.editForm.status = row.status;
      this.editForm.version = row.version;
      for (var i = 0; i < row.items.length; i++) {
        this.editItemTableData[i] = row.items[i];
      }
    },
    //修改增加item的保存按钮
    handleItemEditAdd() {
      if (this.itemEditAddForm.answer.length < 2) {
        alert("请输入答案");
      } else {
        this.editItemTableData.push(this.itemEditAddForm);
        this.itemEditAddForm = {
          id: "",
          answer: "java",
          rightAnswer: "否",
          subjectId: ""
        };
        this.itemEditAddVisible = false;
        console.log("点击修改增加item的保存按钮:");
        console.log(this.editItemTableData);
      }
    },
    //修改修改items数据处理
    showEditEdit(index, row) {
      console.log("edit明细修改弹出框数据处理");
      this.itemEditEditVisible = true;
      this.itemEditEditForm.answer = row.answer;
      this.itemEditEditForm.rightAnswer = row.rightAnswer;
      this.index = index; //editItemTable要修改的表格下标
    },
    //修改修改弹出框的保存按钮方法
    handleEditEdit() {
      if (this.itemEditEditForm.answer.length < 2) {
        alert("请输入答案");
      } else {
        console.log("edit明细修改弹出框 保存按钮方法");
        console.log("itemEditEditForm" + this.itemEditEditForm.subjectTypeId);
        this.editItemTableData.splice(this.index, 1); //addItemTable要修改的表格下标
        this.editItemTableData.push(this.itemEditEditForm);
        this.itemEditEditForm = {
          id: "",
          answer: "java",
          rightAnswer: "否",
          subjectId: ""
        };
        this.itemEditEditVisible = false;
      }
    },
    //edit界面的表格的删除按钮
    editHandleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除该答案, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.editItemTableData.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //确认修改方法
    handleEdit() {
      if (this.editItemTableData.length == 0) {
        alert("请添加相应的答案");
      } else {
        //访问后台方法 未完成!!!!!
        this.editVisible = false;
        this.editForm.items = [];
        var items = this.editItemTableData;
        for (let i = 0; i < items.length; i++) {
          this.editForm.items[i] = items[i];
          this.editForm.items[i].rightAnswer =
            this.editForm.items[i].rightAnswer == "是" ? 1 : 0;
        }

        console.log("this.editForm");
        console.log(this.editForm);
        this.$ajax
          .post("/gateway/basedata/subject/update", {
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
                categoryId: this.editForm.categoryId,
                categoryId: this.editForm.categoryId,
                subjectTypeId: this.editForm.subjectTypeId,
                difficulty: this.editForm.difficulty,
                name: this.editForm.name,
                imageUrl: this.editForm.imageUrl,
                remark: this.editForm.remark,
                status: this.editForm.status == "是" ? 1 : 0,
                version: this.editForm.version,
                answers: this.editForm.items
              }
            }
          })
          .then(
            response => {
              console.log(
                "response.data.head.message=" + response.data.head.message
              );
              alert("修改成功");
              this.dialogFormVisible = false;
              this.editItemTableData = [];
              this.reflashAll();
            },
            function() {
              alert("修改失败,请刷新重试");
              console.log("error");
            }
          );
      }
    },

    //删除
    handleDelete(index, row) {
      console.log(row.id + "\n" + row.version);
      console.log(row.status);
      // if (row.status == "否") {
      this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
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
            .post("/gateway/basedata/subject/delete", {
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
                var flag = response.data.body.data;

                alert(response.data.head.message + "\n" + flag);

                this.reflashAll();
              },
              function() {
                console.log("error");
                alert("删除失败,请刷新重试");
              }
            );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // } else {
      //   alert("该题目正在启用状态,不能删除!");
      // }
    },
    //标签处理 过滤
    filterTag(value, row) {
      return row.status === value;
    },
    //分页 改变pagesize
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      console.log("当前页:" + this.pageIndex);
      this.pageSize = val;
      this.reflashAll();
    },
    //分页 改变pageIndex
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      console.log("当前页:" + this.pageIndex);
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
    //选中修改
    updateSelected() {
      if (this.multipleSelection.length == 0) {
        alert("请勾选要修改的数据");
      } else if (this.multipleSelection.length > 1) {
        alert("只能修改一个数据");
      } else {
        let row = this.multipleSelection[0];
        this.showEditForm(0, row);
      }
    },
    //多选执行删除
    deleteSelected() {
      if (this.multipleSelection.length == 0) {
        alert("请勾选要删除的数据");
      } else {
        var statusFlag = true;
        // for (let i = 0; i < this.multipleSelection.length; i++) {
        //   if (this.multipleSelection[i].status == "是" && statusFlag) {
        //     statusFlag = false;
        //     alert(
        //       "选中的第" +
        //         (i + 1) +
        //         "个题目启动状态，不能删除：" +
        //         this.multipleSelection[i].name
        //     );
        //   }
        // }

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
                .post("/gateway/basedata/subject/deleteSelected", {
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
    },
    //导入数据处理
    importf(obj) {
      let _this = this;
      let inputDOM = this.$refs.inputer; // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          // outdata就是你想要的东西 excel导入的数据
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          // excel 数据再处理
          let arr = [];
          outdata.map(v => {
            let obj = {};
            obj.name = v.题目内容;
            obj.categoryId = v.题目类别;
            obj.subjectTypeId = v.题目类型;
            obj.difficulty = v.题目难度;
            obj.remark = v.备注;
            obj.status = v.是否启用;
            obj.answerA = v.答案A;
            obj.rightAnswerA = v.是否正确A;
            obj.answerB = v.答案B;
            obj.rightAnswerB = v.是否正确B;
            obj.answerC = v.答案C;
            obj.rightAnswerC = v.是否正确C;
            obj.answerD = v.答案D;
            obj.rightAnswerD = v.是否正确D;
            arr.push(obj);
          });

          _this.importList = [...arr];

          _this.reload();
        };

        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    //后台执行批量导入
    reload() {
      //访问后台方法 未完成!!!!!
      console.log("before执行增加this.importList");
      console.log(this.importList);
      let subjectList = [
        {
          id: "001",
          name: "spring的特点",
          imageUrl: "",
          categoryId: "java",
          subjectTypeId: "单选题",
          difficulty: "简单",
          remark: "",
          status: "是",
          version: "",
          answers: []
        }
      ];
      subjectList = this.importList;
      for (let i = 0; i < this.importList.length; i++) {
        subjectList[i].status = this.importList[i].status == "是" ? 1 : 0;
        subjectList[i].answers = [];
        let item = {};
        item.answer = this.importList[i].answerA;
        item.rightAnswer = this.importList[i].rightAnswerA == "是" ? 1 : 0;
        subjectList[i].answers.push(item);
        let item1 = {};
        item1.answer = this.importList[i].answerB;
        item1.rightAnswer = this.importList[i].rightAnswerB == "是" ? 1 : 0;
        subjectList[i].answers.push(item1);
        let item2 = {};
        item2.answer = this.importList[i].answerC;
        item2.rightAnswer = this.importList[i].rightAnswerC == "是" ? 1 : 0;
        subjectList[i].answers.push(item2);
        let item3 = {};
        item3.answer = this.importList[i].answerD;
        item3.rightAnswer = this.importList[i].rightAnswerD == "是" ? 1 : 0;
        subjectList[i].answers.push(item3);
      }
      console.log("执行增加this.importList");
      console.log(this.importList);
      console.log("执行增加subjectList");
      console.log(subjectList);
      this.$ajax
        .post("/gateway/basedata/subject/addList", {
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
              subjectList: subjectList
            }
          }
        })
        .then(
          response => {
            let messageCode = response.data.head.responseCode;
            let message = response.data.head.message;
            console.log("response.data.head.message=" + messageCode + message);
            alert(+messageCode + " + " + message);
            this.reflashAll();
          },
          function() {
            alert("导入失败,题目解析错误");
            console.log("error");
          }
        );
    },
    //导出EXCEL数据方法
    exportExcel(subjectList) {
      this.downloadLoading = true;
      import("@/components/views/basedataManagement/excel/Export2Excel").then(excel => {
        const tHeader = [
          "题目内容",
          "题目类别",
          "题目类型",
          "题目难度",
          "备注",
          "是否启用",
          "答案A",
          "是否正确A",
          "答案B",
          "是否正确B",
          "答案C",
          "是否正确C",
          "答案D",
          "是否正确D"
        ];

        const filterVal = [
          "name",
          "categoryId",
          "subjectTypeId",
          "difficulty",
          "remark",
          "status",
          "answerA",
          "rightAnswerA",
          "answerB",
          "rightAnswerB",
          "answerC",
          "rightAnswerC",
          "answerD",
          "rightAnswerD"
        ];

        let excels = subjectList;
        for (let i = 0; i < subjectList.length; i++) {
          if (subjectList[i].items.length > 0) {
            excels[i].answerA = subjectList[i].items[0].answer;
            excels[i].rightAnswerA = subjectList[i].items[0].rightAnswer;
          }
          if (subjectList[i].items.length > 1) {
            excels[i].answerB = subjectList[i].items[1].answer;
            excels[i].rightAnswerB = subjectList[i].items[1].rightAnswer;
          }
          if (subjectList[i].items.length > 2) {
            excels[i].answerC = subjectList[i].items[2].answer;
            excels[i].rightAnswerC = subjectList[i].items[2].rightAnswer;
          }
          if (subjectList[i].items.length > 3) {
            excels[i].answerD = subjectList[i].items[3].answer;
            excels[i].rightAnswerD = subjectList[i].items[3].rightAnswer;
          }
        }
        console.log("导出的 excels");
        console.log(excels);
        const data = this.formatJson(filterVal, excels);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename:
            "题目数据_" +
            this.formInline.categoryId +
            "_" +
            this.formInline.subjectTypeId
        });
        this.downloadLoading = false;
      });
    },
    // 导出选中的表格数据
    handleDownload() {
      if (this.multipleSelection.length == 0) {
        alert("请勾选要导出的数据");
      } else {
        this.exportExcel(this.multipleSelection);
      }
    },
    //获取导入模板
    getDownload() {
      this.downloadLoading = true;
      import("@/components/views/basedataManagement/excel/Export2Excel").then(excel => {
        const tHeader = [
          "题目内容",
          "题目类别",
          "题目类型",
          "题目难度",
          "备注",
          "是否启用",
          "答案A",
          "是否正确A",
          "答案B",
          "是否正确B",
          "答案C",
          "是否正确C",
          "答案D",
          "是否正确D"
        ];

        const filterVal = [
          "name",
          "categoryId",
          "subjectTypeId",
          "difficulty",
          "remark",
          "status",
          "answerA",
          "rightAnswerA",
          "answerB",
          "rightAnswerB",
          "answerC",
          "rightAnswerC",
          "answerD",
          "rightAnswerD"
        ];
        let subjectList = [];
        const data = this.formatJson(filterVal, subjectList);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "题目导入模板"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(i => {
          return v[i];
        })
      );
    },
    //导出查询的所有题目
    exportExcelAll() {
      this.$ajax
        .post("/gateway/basedata/subject/exportExcelAll", {
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
              name: this.formInline.name,
              categoryId: this.formInline.categoryId,
              subjectTypeId: this.formInline.subjectTypeId,
              pageIndex: 1,
              pageSize: 10000
            }
          }
        })
        .then(
          response => {
            let subjectList = [];
            var data = response.data.body.data;

            console.log(data);
            for (let i = 0; i < data.length; i++) {
              subjectList[i] = data[i];
              subjectList[i].status = data[i].status == 1 ? "是" : "否";
              subjectList[i].items = data[i].answers;
              for (let j = 0; j < data[i].answers.length; j++) {
                subjectList[i].items[j].rightAnswer =
                  subjectList[i].items[j].rightAnswer == 1 ? "是" : "否";
              }
            }
            console.log("查询到所有题目成功");
            console.log(subjectList);
            this.exportExcel(subjectList);
          }
          // function() {
          //   console.log("error");
          //   console.log("查询所有题目失败");
          // }
        );
    }

    //结束
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
.serchs {
  margin-bottom: 20px;
  float: left;
}
#icon {
  margin-bottom: 20px;
  float: left;
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



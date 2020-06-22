<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-main>
        <div id="searchs">
          <el-form :inline="true" :model="formInline">
            <el-form-item label="组卷项配置名：">
              <el-input v-model="formInline.searchs" placeholder="请输入关键字"></el-input>
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
          <!-- <font color="#F56C6C"><i class="el-icon-upload2">导入</i></font>
        &nbsp;&nbsp;&nbsp;
        <font color="#F56C6C"><i class="el-icon-upload2">导出</i></font>
          &nbsp;&nbsp;&nbsp;-->
        </div>

        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-dblclick="showDialog"
          @row-click="showItem"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="'配置项ID" v-if="false" width="180"></el-table-column>
          <el-table-column prop="name" label="配置名" width="180"></el-table-column>
          <el-table-column prop="difficulty" label="难度" width="180"></el-table-column>
          <el-table-column prop="updatedBy" label="修改人" width="180"></el-table-column>
          <el-table-column prop="updatedTime" label="修改时间" width="180"></el-table-column>
          <el-table-column prop="companyId" label="公司" width="180"></el-table-column>
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
          <span class="demonstration">完整功能分页</span>
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
        <!-- 单击时的明细表格-->
        <div v-show="itemVisible">
          <div id="icon">
            <font color="#409EFF" @click="showItemAddVisible = true">
              <i class="el-icon-plus">增加明细</i>
            </font>
            &nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="updateShowItemVisible = true">保存修改</el-button>
          </div>
          <el-table
            :aria-label="明细表"
            ref="multipleTable"
            :data="itemTableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="categoryId" label="题目类别" width="100"></el-table-column>
            <el-table-column prop="subjectTypeId" label="题型" width="100"></el-table-column>
            <el-table-column prop="num" label="题目数量" width="100"></el-table-column>
            <el-table-column prop="difficulty" label="难度" width="100"></el-table-column>
            <el-table-column prop="score" label="题目分值" width="100"></el-table-column>
            <el-table-column label="操作" width="360">
              <template slot-scope="scope">
                <el-button size="big" type="primary" @click="showItemAddVisible = true">增加</el-button>
                <el-button
                  size="big"
                  type="warning"
                  @click="showItemEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="big"
                  type="danger"
                  @click="showItemDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>

    <!-- addForm -->
    <el-dialog title="添加配置项" :visible.sync="addVisible">
      <el-form
        :rules="rules"
        ref="addForm"
        class="demo-ruleForm"
        :model="addForm"
        size="big"
        label-width="100px"
      >
        <el-row>
          <el-form-item label="配置项名：" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="难度：" prop="difficulty">
            <el-select v-model="addForm.difficulty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
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
      <el-button type="primary" @click="itemAddVisible = true">新增配置明细按钮</el-button>
      <!-- 增加界面的明细表格-->
      <el-table
        ref="multipleTable"
        :data="addItemTableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="categoryId" label="题目类别" width="100"></el-table-column>
        <el-table-column prop="subjectTypeId" label="题型" width="100"></el-table-column>
        <el-table-column prop="num" label="题目数量" width="100"></el-table-column>
        <el-table-column prop="difficulty" label="难度" width="100"></el-table-column>
        <el-table-column prop="score" label="题目分值" width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="itemAddVisible = true">增加</el-button>
            <el-button size="mini" type="warning" @click="showAddEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="big" type="danger" @click="addHandleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确定增加配置项</el-button>
      </div>
    </el-dialog>
    <!-- itemAddForm Dialog add增加增加临时表 弹窗 -->
    <el-dialog title="添加配置项明细参数" :visible.sync="itemAddVisible">
      <el-form ref="itemAddForm" :model="itemAddForm" size="big" label-width="100px">
        <el-row>
          <el-form-item label="*题目类别：">
            <el-select v-model="itemAddForm.categoryId" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="*题型：">
            <el-select v-model="itemAddForm.subjectTypeId" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="*题目难度：">
            <el-select v-model="itemAddForm.difficulty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目数量：">
            <el-input-number
              v-model="itemAddForm.num"
              @change="handleChangeAddAdd"
              :min="1"
              :max="10000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="题目分值：">
            <el-input-number
              v-model="itemAddForm.score"
              @change="handleChangeAddAdd"
              :min="1"
              :max="100"
              label="描述文字"
            ></el-input-number>
            <!-- <el-button type="primary" @click="judgeSubjectNumAddAdd('itemAddForm')">判断题目数量</el-button> -->
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemAddVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleAddAdd">确定增加配置项明细</el-button>
      </div>
    </el-dialog>
    <!-- itemAddEditForm Dialog 增加修改临时表单 弹窗-->
    <el-dialog title="修改具体配置项明细参数" :visible.sync="itemAddEditVisible">
      <el-form ref="form" :model="itemAddEditForm" size="big" label-width="100px">
        <el-row>
          <el-form-item label="*题目类别：">
            <el-select v-model="itemAddEditForm.categoryId" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="*题型：">
            <el-select v-model="itemAddEditForm.subjectTypeId" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="*题目难度：">
            <el-select v-model="itemAddEditForm.difficulty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目数量：">
            <el-input-number
              v-model="itemAddEditForm.num"
              @change="handleChangeAddEdit"
              :min="1"
              :max="10000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="题目分值：">
            <el-input-number
              v-model="itemAddEditForm.score"
              @change="handleChangeAddEdit"
              :min="1"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemAddEditVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleAddEdit">保存配置项明细</el-button>
      </div>
    </el-dialog>

    <!-- editForm 修改弹窗框-->
    <el-dialog title="修改配置项" :visible.sync="editVisible">
      <el-form
        :rules="rules"
        ref="editForm"
        class="demo-ruleForm"
        :model="editForm"
        size="big"
        label-width="100px"
      >
        <el-row>
          <el-form-item label="配置项名：" prop="name">
            <el-input v-model="editForm.name" />
          </el-form-item>
          <el-form-item label="难度：" prop="difficulty">
            <el-select v-model="editForm.difficulty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="editForm.remark"
            />
          </el-form-item>
          <el-form-item label="是否启用">
            <el-radio-group v-model="editForm.status" prop="status">
              <el-radio label="是" value="是">是</el-radio>
              <el-radio label="否" value="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-button type="primary" @click="itemEditAddVisible = true">新增配置明细按钮</el-button>
          <!-- 修改弹出框的明细表格-->
          <el-table
            ref="multipleTable"
            :data="editItemTableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="categoryId" label="题目类别" width="100"></el-table-column>
            <el-table-column prop="subjectTypeId" label="题型" width="100"></el-table-column>
            <el-table-column prop="num" label="题目数量" width="100"></el-table-column>
            <el-table-column prop="difficulty" label="难度" width="100"></el-table-column>
            <el-table-column prop="score" label="题目分值" width="100"></el-table-column>
            <el-table-column label="操作" width="360">
              <template slot-scope="scope">
                <el-button size="big" type="primary" @click="itemEditAddVisible = true">增加</el-button>
                <el-button
                  size="big"
                  type="warning"
                  @click="showEditEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="big"
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
    <el-dialog title="添加具体配置项明细参数" :visible.sync="itemEditAddVisible">
      <el-form ref="form" :model="itemEditAddForm" size="big" label-width="100px">
        <el-row>
          <el-form-item label="*题目类别：">
            <el-select v-model="itemEditAddForm.categoryId" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="*题型：">
            <el-select v-model="itemEditAddForm.subjectTypeId" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="*题目难度：">
            <el-select v-model="itemEditAddForm.difficulty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目数量：">
            <el-input-number
              v-model="itemEditAddForm.num"
              @change="handleChangeEditAdd"
              :min="1"
              :max="10000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="题目分值：">
            <el-input-number
              v-model="itemEditAddForm.score"
              @change="handleChangeEditAdd"
              :min="1"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemEditAddVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleItemEditAdd">保存配置项明细</el-button>
      </div>
    </el-dialog>
    <!-- itemAddEditForm Dialog 修改修改临时表单 弹窗-->
    <el-dialog title="修改具体配置项明细参数" :visible.sync="itemEditEditVisible">
      <el-form ref="form" :model="itemEditEditForm" size="big" label-width="100px">
        <el-row>
          <el-form-item label="题目类别：">
            <el-select v-model="itemEditEditForm.categoryId" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型：">
            <el-select v-model="itemEditEditForm.subjectTypeId" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="题目难度：">
            <el-select v-model="itemEditEditForm.difficulty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目数量：">
            <el-input-number
              v-model="itemEditEditForm.num"
              @change="handleChangeEditEdit"
              :min="1"
              :max="10000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="题目分值：">
            <el-input-number
              v-model="itemEditEditForm.score"
              @change="handleChangeEditEdit"
              :min="1"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemEditEditVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleEditEdit">保存配置项明细</el-button>
      </div>
    </el-dialog>

    <!-- showItemAddForm Dialog 单击表格的增加 弹窗 -->
    <el-dialog title="添加配置项明细参数" :visible.sync="showItemAddVisible">
      <el-form ref="showItemAddForm" :model="showItemAddForm" size="big" label-width="100px">
        <el-row>
          <el-form-item label="*题目类别：">
            <el-select v-model="showItemAddForm.categoryId" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="*题型：">
            <el-select v-model="showItemAddForm.subjectTypeId" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="*题目难度：">
            <el-select v-model="showItemAddForm.difficulty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目数量：">
            <el-input-number
              v-model="showItemAddForm.num"
              @change="handleChangeItemAdd"
              :min="1"
              :max="10000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="题目分值：">
            <el-input-number
              v-model="showItemAddForm.score"
              @change="handleChangeItemAdd"
              :min="1"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showItemAddVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleShowItemAdd">确定增加配置项明细</el-button>
      </div>
    </el-dialog>
    <!-- showItemEditForm Dialog 单击表格的修改 弹窗-->
    <el-dialog title="修改具体配置项明细参数" :visible.sync="showItemEditVisible">
      <el-form ref="form" :model="showItemEditForm" size="big" label-width="100px">
        <el-row>
          <el-form-item label="题目类别：">
            <el-select v-model="showItemEditForm.categoryId" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型：">
            <el-select v-model="showItemEditForm.subjectTypeId" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目难度：">
            <el-select v-model="showItemEditForm.difficulty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目数量：">
            <el-input-number
              v-model="showItemEditForm.num"
              @change="handleChangeItemEdit"
              :min="1"
              :max="10000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="题目分值：">
            <el-input-number
              v-model="showItemEditForm.score"
              @change="handleChangeItemEdit"
              :min="1"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showItemEditVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleShowItemEdit">保存配置项明细</el-button>
      </div>
    </el-dialog>
    <!--明细表的保存修改-->
    <el-dialog
      title="提示"
      :visible.sync="updateShowItemVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否保存当前更改?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateShowItemVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelUpdateShowItem">确 定</el-button>
      </span>
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
  // 组件内导航钩子，处理未保存退出的情况
  beforeRouteLeave: function(to, from, next) {
    if (this.contentHasSave) {
      next();
      return;
    }
    this.$confirm("是否保存当前更改?", "提示", {
      confirmButtonText: "是",
      cancelButtonText: "否",
      type: "warning"
    })
      .then(() => {
        // 选择确定
        this.handelUpdateShowItem()
        next();
      })
      .catch(() => {
        next();
      });
  },
  data() {
    return {
      contentHasSave: true, // 记录用户是否已经保存内容
      itemVisible: false, //明细表展示
      showItemAddVisible: false, //明细表的增加
      showItemEditVisible: false, //明细表的修改
      updateShowItemVisible: false, //明细表的保存修改
      itemTableData: [
        {
          id: "",
          combExamId: "",
          num: 10,
          difficulty: "简单",
          score: "5",
          subjectTypeId: "单选题",
          categoryId: "java"
        }
      ],
      showItemAddForm: {
        //明细表的增加弹窗
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      },
      showItemEditForm: {
        //明细表的修改弹窗
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      },
      //明细表的保存修改单
      updateShowItemForm: {
        id: "",
        name: "配置项名称",
        difficulty: "简单",
        remark: "备注内容",
        status: "是",
        items: [
          {
            id: "",
            combExamId: "",
            num: 10,
            difficulty: "简单",
            score: "5",
            subjectTypeId: "单选题",
            categoryId: "java"
          }
        ]
      },

      //原來
      showAddAdd: false,
      flag: 1,
      tableData: [
        {
          id: "",
          name: "配置项名称",
          difficulty: "简单",
          remark: "备注内容",
          createdBy: "Tom",
          createdTime: "2016-05-02",
          updatedBy: "Tom",
          updatedTime: "2016-05-02",
          companyId: "",
          status: "否",
          version: "123456789",
          items: [
            {
              id: "",
              combExamId: "",
              num: 10,
              difficulty: "简单",
              score: "5",
              subjectTypeId: "单选题",
              categoryId: "java"
            }
          ]
        }
      ],

      //增加弹出框的明细表格
      addItemTableData: [
        {
          id: "",
          combExamId: "",
          num: 10,
          difficulty: "简单",
          score: "5",
          subjectTypeId: "单选题",
          categoryId: "java"
        }
      ],
      // 修改弹出框的明细表格
      editItemTableData: [
        {
          id: "",
          combExamId: "",
          num: 10,
          difficulty: "简单",
          score: "5",
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
          num: 10,
          score: "5",
          subjectTypeId: "单选题",
          categoryId: "语文"
        }
      ],
      //修改弹出框的修改明细表格
      editEditItemTableData: [
        {
          id: "",
          combExamId: "",
          num: 10,
          difficulty: "简单",
          score: "5",
          subjectTypeId: "单选题",
          categoryId: "java"
        }
      ],
      currentPage1: 1,
      currentPage2: 2,
      currentPage3: 3,
      currentPage4: 4,
      pageSize: 10,
      pageIndex: 0,
      total: 10,

      index: 0, //修改表格的下标
      formInline: {
        searchs: ""
      },

      rules: {
        name: [
          { required: true, message: "请输入配置项名称", trigger: "blur" },
          {
            min: 2,
            max: 64,
            message: "配置项名长度应在 2 到 64 个字符",
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
      options: [
        {
          value: "选项1",
          label: "简单"
        },
        {
          value: "选项2",
          label: "中等"
        },
        {
          value: "选项3",
          label: "困难"
        }
      ],
      typeOptions: [
        {
          value: "选项1",
          label: "选择题"
        }
      ],
      categoryOptions: [
        {
          value: "选项1",
          label: "语文古诗词"
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
        difficulty: "简单",
        remark: "测试",
        status: "是",
        items: [
          {
            id: "",
            combExamId: "",
            num: "1",
            difficulty: "简单",
            score: "5",
            subjectTypeId: "单选题",
            categoryId: "java"
          }
        ]
      },

      //add配置项add明细临时表单
      itemAddForm: {
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      },
      //add修改配置项明细表单
      itemAddEditForm: {
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      },

      //是否显示update本面板
      editVisible: false,
      itemEditAddVisible: false, //修改界面的增加弹出框
      itemEditEditVisible: false, //修改界面的修改弹出框

      //edit表单数据
      editForm: {
        id: "",
        name: "配置项名称",
        difficulty: "简单",
        remark: "备注内容",
        status: "是",
        items: [
          {
            id: "",
            combExamId: "",
            num: 10,
            difficulty: "简单",
            score: "5",
            subjectTypeId: "单选题",
            categoryId: "java"
          }
        ]
      },

      //edit配置项add明细临时表单
      itemEditAddForm: {
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      },
      //edit配置项edit明细临时表单
      itemEditEditForm: {
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
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
            console.log("categoryOptions查询成功:" + data);
            data.shift();
            this.categoryOptions = data;
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
            console.log("typeOptions查询成功:" + data);
            this.typeOptions = data;
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
        .post("/gateway/basedata/combExam/queryPage", {
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
            }

            console.log("分页查询成功" + response.data.body.data);
            console.log(data);
            this.queryTotal();
            this.getCategoryOptions();
            this.getTypeOptions();
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
        .post("/gateway/basedata/combExam/queryTotal", {
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
    //处理增加方法
    handleAdd() {
      if (this.addItemTableData.length == 0) {
        alert("请输入配置项明细");
      } else {
        //访问后台方法 未完成!!!!!
        this.addVisible = false;
        this.addForm.items = this.addItemTableData;
        console.log(this.addForm);
        this.$ajax
          .post("/gateway/basedata/combExam/add", {
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
                difficulty: this.addForm.difficulty,
                remark: this.addForm.remark,
                status: this.addForm.status == "是" ? 1 : 0,
                version: "1",
                items: this.addForm.items
              }
            }
          })
          .then(
            response => {
              console.log(
                "response.data.head.message=" + response.data.head.message
              );
              alert(response.data.head.message);
              this.dialogFormVisible = false;
              this.addItemTableData = [];
              this.reflashAll();
            },
            function() {
              alert("增加失败");
              console.log("error");
            }
          );
      }
    },
    //add明细修改弹出框数据处理
    showAddEdit(index, row) {
      console.log("add明细修改弹出框数据处理");
      this.itemAddEditVisible = true;
      this.itemAddEditForm.categoryId = row.categoryId;
      this.itemAddEditForm.subjectTypeId = row.subjectTypeId;
      this.itemAddEditForm.num = row.num;
      this.itemAddEditForm.difficulty = row.difficulty;
      this.itemAddEditForm.score = row.score;
      this.index = index; //addItemTable要修改的表格下标
    },
    //add明细增加保存按钮方法
    handleAddAdd(index, row) {
      console.log("itemAddForm");
      console.log(this.itemAddForm);
      this.addItemTableData.push(this.itemAddForm);
      this.itemAddForm = {
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      };
      this.itemAddVisible = false;
    },
    async judgeSubjectNumAddAdd(item) {
      let flag = this.judgeSubjectNum(this.itemAddForm);
      console.log("判断结果:");
      console.log(flag);
      if (flag == 1) {
        this.showAddAdd = false;
        console.log(this.showAddAdd);
      } else {
        this.showAddAdd = true;
        console.log(this.showAddAdd);
      }
    },
    handleAddAddSure() {},
    //add明细修改弹出框的保存按钮方法
    handleAddEdit() {
      console.log("add明细修改弹出框 保存按钮方法");
      console.log("itemAddEditForm" + this.itemAddEditForm.subjectTypeId);
      this.addItemTableData.splice(this.index, 1); //addItemTable要修改的表格下标
      this.addItemTableData.push(this.itemAddEditForm);
      this.itemAddEditForm = {
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      };
      this.itemAddEditVisible = false;
    },
    //add界面的表格的删除按钮
    addHandleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除该配置项明细, 是否继续?", "提示", {
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

    //下列方法为 修改按钮及其修改界面的数据处理
    //修改按钮的数据处理
    showEditForm(index, row) {
      console.log("点击修改按钮:row明细表为");
      console.log(row.items);
      this.editItemTableData = [];
      this.editVisible = true;
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.difficulty = row.difficulty;
      this.editForm.status = row.status;
      this.editForm.remark = row.remark;
      this.editForm.version = row.version;
      for (var i = 0; i < row.items.length; i++) {
        this.editItemTableData[i] = row.items[i];
      }
      console.log("点击修改按钮:table明细表为");
      console.log(this.editItemTableData);
    },
    //修改增加item的保存按钮
    handleItemEditAdd() {
      this.editItemTableData.push(this.itemEditAddForm);
      this.itemEditAddForm = {
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      };
      this.itemEditAddVisible = false;
      console.log("点击修改增加item的保存按钮:");
      console.log(this.editItemTableData);
    },
    //修改修改items数据处理
    showEditEdit(index, row) {
      console.log("edit明细修改弹出框数据处理");
      this.itemEditEditVisible = true;
      this.itemEditEditForm.categoryId = row.categoryId;
      this.itemEditEditForm.subjectTypeId = row.subjectTypeId;
      this.itemEditEditForm.num = row.num;
      this.itemEditEditForm.difficulty = row.difficulty;
      this.itemEditEditForm.score = row.score;
      this.index = index; //editItemTable要修改的表格下标
    },
    //修改修改弹出框的保存按钮方法
    handleEditEdit() {
      console.log("edit明细修改弹出框 保存按钮方法");
      console.log("itemEditEditForm" + this.itemEditEditForm.subjectTypeId);
      this.editItemTableData.splice(this.index, 1); //addItemTable要修改的表格下标
      this.editItemTableData.push(this.itemEditEditForm);
      this.itemEditEditForm = {
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      };
      this.itemEditEditVisible = false;
    },
    //edit界面的表格的删除按钮
    editHandleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除该配置项明细, 是否继续?", "提示", {
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
        alert("请输入配置项明细");
      } else {
        //访问后台方法 未完成!!!!!
        this.editVisible = false;
        this.editForm.items = [];
        var items = this.editItemTableData;
        for (let i = 0; i < items.length; i++) {
          this.editForm.items[i] = items[i];
        }
        console.log("this.editForm.items");
        console.log(this.editForm.items);
        this.goToUpdate(this.editForm);
      }
    },
    //去后台执行修改
    goToUpdate(editForm) {
      this.$ajax
        .post("/gateway/basedata/combExam/update", {
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
              id: editForm.id,
              companyId: editForm.companyId,
              name: editForm.name,
              difficulty: editForm.difficulty,
              remark: editForm.remark,
              status: editForm.status == "是" ? 1 : 0,
              version: editForm.version,
              items: editForm.items
            }
          }
        })
        .then(
          response => {
            console.log(
              "response.data.head.message=" + response.data.head.message
            );
            alert(response.data.head.message);
            this.dialogFormVisible = false;
            this.editItemTableData = [];
            this.reflashAll();
          },
          function() {
            alert("修改失败");
            console.log("error");
          }
        );
    },
    //删除
    handleDelete(index, row) {
      console.log(row.id + "\n" + row.version);
      console.log(row.status);
      if (row.status == "否") {
        this.$confirm("此操作将永久删除该配置项, 是否继续?", "提示", {
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
              .post("/gateway/basedata/combExam/delete", {
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
                  alert(response.data.head.message);

                  this.reflashAll();
                },
                function() {
                  console.log("error");
                  alert("删除失败");
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
        alert("该配置项正在启用状态,不能删除!");
      }
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

    //多选框
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
        console.log("点击修改按钮:row明细表为");
        console.log(row.items);
        this.editItemTableData = [];
        this.editVisible = true;
        this.editForm.id = row.id;
        this.editForm.name = row.name;
        this.editForm.difficulty = row.difficulty;
        this.editForm.status = row.status;
        this.editForm.remark = row.remark;
        this.editForm.version = row.version;
        for (var i = 0; i < row.items.length; i++) {
          this.editItemTableData[i] = row.items[i];
        }
        console.log("点击修改按钮:table明细表为");
        console.log(this.editItemTableData);
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
                "个配置项启动状态，不能删除：" +
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
                .post("/gateway/basedata/combExam/deleteSelected", {
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

    //题数点击事件AddAdd
    handleChangeAddAdd(value) {
      this.judgeSubjectNum(this.itemAddForm);
    },
    //题数点击事件AddEdit
    handleChangeAddEdit(value) {
      this.judgeSubjectNum(this.itemAddEditForm);
    },

    //题数点击事件EditAdd
    handleChangeEditAdd(value) {
      this.judgeSubjectNum(this.itemEditAddForm);
    },
    //题数点击事件EditEdit
    handleChangeEditEdit(value) {
      this.judgeSubjectNum(this.itemEditEditForm);
    },

    //题数点击事件ItemAdd
    handleChangeItemAdd(value) {
      this.judgeSubjectNum(this.showItemAddForm);
    },
    //题数点击事件EditAdd
    handleChangeItemEdit(value) {
      this.judgeSubjectNum(this.showItemEditForm);
    },
    //判断题数
    judgeSubjectNum(item) {
      this.$ajax
        .post("/gateway/basedata/combExam/judgeSubjectNum", {
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
              id: item.id,
              num: item.num,
              difficulty: item.difficulty,
              categoryId: item.categoryId,
              subjectTypeId: item.subjectTypeId,
              score: item.score
            }
          }
        })
        .then(
          response => {
            let total = response.data.body.data;
            console.log(item.num);
            console.log(total);
            if (item.num > total) {
              this.$message.error("题目数量应小等于现有数量：" + total);
            }
          },
          function() {
            console.log("判断明细现有题目数量错误");
            console.log("error");
            // this.flag = 1;
          }
        );
      return this.flag;
    },
    //双击事件
    showDialog(row) {
      // balbala
      console.log(row);
      this.showEditForm(0, row);
    },
    //单击事件
    showItem(row) {
      console.log("updateShowItemForm");
      this.itemVisible = true;
      this.itemTableData = [];
      this.updateShowItemForm.id = row.id;
      this.updateShowItemForm.name = row.name;
      this.updateShowItemForm.difficulty = row.difficulty;
      this.updateShowItemForm.status = row.status;
      this.updateShowItemForm.remark = row.remark;
      this.updateShowItemForm.version = row.version;
      for (var i = 0; i < row.items.length; i++) {
        this.itemTableData[i] = row.items[i];
      }
      console.log(this.updateShowItemForm);
    },
    //明细表的增加item方法
    handleShowItemAdd() {
      this.showItemAddVisible = false;
      this.itemTableData.push(this.showItemAddForm);
      this.showItemAddForm = {
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      };
      console.log(this.itemTableData);
      this.contentHasSave = false;
    },
    //明细表的修改items数据处理
    showItemEdit(index, row) {
      console.log("edit明细修改弹出框数据处理");
      this.showItemEditVisible = true;
      this.showItemEditForm.categoryId = row.categoryId;
      this.showItemEditForm.subjectTypeId = row.subjectTypeId;
      this.showItemEditForm.num = row.num;
      this.showItemEditForm.difficulty = row.difficulty;
      this.showItemEditForm.score = row.score;
      this.index = index; //要修改的表格下标
    },
    //明细表的修改弹出框的保存按钮方法
    handleShowItemEdit() {
      this.itemTableData.splice(this.index, 1); //addItemTable要修改的表格下标
      this.itemTableData.push(this.showItemEditForm);
      this.showItemEditForm = {
        id: "",
        combExamId: "",
        num: 10,
        difficulty: "简单",
        score: "5",
        subjectTypeId: "单选题",
        categoryId: "java"
      };
      this.showItemEditVisible = false;
      this.contentHasSave = false;
    },
    //明细表格的删除按钮
    showItemDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除该配置项明细, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.itemTableData.splice(index, 1);
          this.contentHasSave = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //明细表单的保存修改方法
    handelUpdateShowItem() {
      if (this.itemTableData.length == 0) {
        alert("请输入配置项明细");
      } else {
        this.updateShowItemVisible = false;
        this.updateShowItemForm.items = [];
        var items = this.itemTableData;
        for (let i = 0; i < items.length; i++) {
          this.updateShowItemForm.items[i] = items[i];
        }
        console.log("this.updateShowItemForm");
        console.log(this.updateShowItemForm);
        this.goToUpdate(this.updateShowItemForm);
         this.contentHasSave = true;
      }
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
.serchs {
  margin-bottom: 20px;
  float: left;
}
#icon {
  margin-bottom: 20px;
  float: left;
}
</style>



<template>
  <div>
     <div style="float:left;margin-bottom:20px;">
        <div id="selector" style="floar:left">
            <span>用户名称:</span>
            <el-input v-model="name" placeholder="请输入内容" style="width:150px"></el-input>
            <span>工号:</span>
            <el-input v-model="code" placeholder="请输入内容" style="width:150px"></el-input>
            <span>手机号:</span>
            <el-input v-model="tel" placeholder="请输入内容" style="width:150px"></el-input>
            <span>角色:</span>
            <el-select v-model="RoleValue" multiple placeholder="请选择">
              <el-option
                v-for="item in RoleIdAndName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span>是否启用:</span>
            <el-select v-model="status" placeholder="请选择" style="width:100px;">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="queryDataByName()">搜索</el-button>   
        </div>
        <div style="float:left;">
        <el-button-group>
                <el-button
                  size="mini"
                  type="primary"
                  @click="clearAddForm"
                  icon="el-icon-plus"
                >增加</el-button>

                <el-button
                  size="mini"
                  type="warning"
                  @click="checkModifySelectOne"
                  icon="el-icon-edit"
                >编辑</el-button>
                
                <el-button
                  size="mini"
                  type="danger"
                  @click="checkDeleteSelect"
                  icon="el-icon-delete"
                >删除</el-button>


                <el-button
                  size="mini"
                  type="info"
                  @click="checkUserMatchRoleSelect"
                  icon="el-icon-s-custom"
                >角色分配</el-button>

          </el-button-group>
        </div>
     </div>
       <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @row-dblclick="handledbClick"
                :row-key="getRowKeys"
                @selection-change="handleSelectionChange">
                <el-table-column
                reserve-selection="true"
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="用户工号"
                width="100">
                <template slot-scope="scope">{{ scope.row.code }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="用户名"
                width="100">
                </el-table-column>
                <el-table-column
                prop="password"
                label="密码"
                width="100">
                </el-table-column>
                <el-table-column
                prop="departmentId.name"
                label="所在部门"
                width="100">
                </el-table-column><el-table-column
                prop="departmentId.companyId.name"
                label="所在公司"
                width="100">
                </el-table-column>
                <!-- <el-table-column
                prop="roleId"
                label="角色"
                width="100">
                </el-table-column> -->
                <el-table-column
                prop="sex"
                label="性别"
                width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.sex == 1">男</span>
                  <span v-else-if="scope.row.sex == 0">女</span>
                </template>
                </el-table-column>
                <el-table-column
                :formatter="formatDate"
                prop="birthday"
                label="生日"
                width="100">
                
                </el-table-column>
                <el-table-column 
                prop="positionId.name"
                label="职位"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column 
                prop="tel"
                label="电话"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column 
                prop="email"
                label="邮箱"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column 
                prop="other"
                label="其他/微信"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column 
                prop="status"
                label="是否启用"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 1"><el-tag>是</el-tag></span>
                  <span v-else-if="scope.row.status == 0"><el-tag type="info">否</el-tag></span>
                </template>
                </el-table-column>
                
                 <el-table-column
                label="操作" width="400px">
                <template slot-scope="scope">
                    <el-button-group>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="dialogFormVisible = true"
                        icon="el-icon-plus"
                      >增加</el-button>

                      <el-button
                        size="mini"
                        type="warning"
                        @click="handleEdit(scope.$index, scope.row)"
                        icon="el-icon-edit"
                      >编辑</el-button>
                      
                      <el-button
                        size="mini"
                        type="danger"
                        @click="checkDelete(scope.row)"
                        icon="el-icon-delete"
                      >删除</el-button>

                      <el-button
                        size="mini"
                        type="info"
                        @click="selectOnetUser_RoleData(scope.row)"
                        icon="el-icon-s-custom"
                      >角色分配</el-button>
                </el-button-group>
                  
                </template>
                <!-- <template>
                    <span><modify/></span>
                </template> -->
                </el-table-column>
            </el-table>

            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <span>确认删除？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteUserData">确 定</el-button>
              </span>
            </el-dialog>
            <!-- <div style="margin-top: 20px">
                <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
            </div> -->
            <div class="page" style="margin-top: 50px">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 6, 7, 8]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count">
                </el-pagination>
            </div>


            <div id="btn1">
              <!-- 增加Form -->
                <el-dialog title="增加用户" :visible.sync="dialogFormVisible" width="800px"> 
                  <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px" >
                  <el-form-item label="用户名" prop="name">
                      <el-input v-model="addForm.name">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="工号" prop="code">
                      <el-input v-model="addForm.code">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password" >
                      <el-input v-model="addForm.password">{{}}</el-input>
                  </el-form-item>

                  <el-form-item label="所属公司"  prop="companyId"> 
                       <el-select v-model="addForm.companyId" placeholder="请选择" style="width:100%" @change="reflashDepartemntAdd()">
                        <el-option
                          v-for="item in companyIdAndName" 
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="部门" readonly="true" prop="departmentId">
                      <el-select v-model="addForm.departmentId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in DepartmentIdAndName"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="性别" readonly="true" prop="sex">
                      <el-radio-group v-model="addForm.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                      </el-radio-group>
                  </el-form-item>

                  <el-form-item label="生日" readonly="true" prop="birthday">
                      <el-date-picker
                        v-model="addForm.birthday"
                        type="date"
                        size="large"
                        placeholder="选择日期">
                      </el-date-picker>
                  </el-form-item>

                  <el-form-item label="职位" readonly="true" prop="positionId">
                      <el-select v-model="addForm.positionId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in PositionIdAndName"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="角色" readonly="true">
                    <el-select v-model="addForm.roleIds" multiple placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in RoleIdAndNameOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>


                  <el-form-item label="电话" readonly="true" prop="tel">
                      <el-input v-model="addForm.tel">{{}}</el-input>
                  </el-form-item>

                  <el-form-item label="邮箱" readonly="true" prop="email">
                      <el-input v-model="addForm.email">{{}}</el-input>
                  </el-form-item>

                  <el-form-item label="其他" readonly="true">
                      <el-input v-model="addForm.other">{{}}</el-input>
                  </el-form-item>

                  <el-form-item label="备注" readonly="true" >
                      <el-input v-model="addForm.remark" type="textarea">{{}}</el-input>
                  </el-form-item>

                

                  
                  <el-form-item label="是否启用" prop="status">
                      <el-radio-group v-model="addForm.status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  
                 <div style="margin-left:60%">
                  <el-form-item>
                      <el-button type="primary" @click="addSubmitForm()">创建</el-button>
                      <el-button @click="dialogFormVisible = false">取消</el-button>
                  </el-form-item>
                 </div>
                  </el-form>
              <!-- <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div> -->
              </el-dialog>
          </div>

          <div id="btn2">
              <!-- 修改Form -->
              <el-dialog title="编辑用户" :visible.sync="dialogFormVisible2" width="800px"> 
                  <el-form ref="modifyForm" :rules="rules" :model="modifyForm" label-width="100px" >
                  <el-form-item label="用户ID" >
                      <el-input v-model="modifyForm.id" readonly="true">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="用户名" prop="name">
                      <el-input v-model="modifyForm.name">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="工号" prop="code">
                      <el-input v-model="modifyForm.code">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input v-model="modifyForm.password">{{}}</el-input>
                  </el-form-item>
                 <el-form-item label="所属公司"  prop="companyId"> 
                       <el-select v-model="modifyForm.companyId" placeholder="请选择" style="width:100%" @change="reflashDepartemntModify()">
                        <el-option
                          v-for="item in companyIdAndName" 
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="部门" readonly="true" prop="departmentId">
                      <el-select v-model="modifyForm.departmentId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in DepartmentIdAndName"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="性别" readonly="true" prop="sex">
                      <el-radio-group v-model="modifyForm.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                      </el-radio-group>
                  </el-form-item>

                  <el-form-item label="生日" readonly="true" prop="birthday">
                          <el-date-picker
                            v-model="modifyForm.birthday"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日">
                          </el-date-picker>
                  </el-form-item>

                  <el-form-item label="职位" readonly="true" prop="positionId">
                      <el-select v-model="modifyForm.positionId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in PositionIdAndName"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="角色" readonly="true">
                    <el-select v-model="modifyForm.roleIds" multiple placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in RoleIdAndNameOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="电话" readonly="true" prop="tel">
                      <el-input v-model="modifyForm.tel">{{}}</el-input>
                  </el-form-item>

                  <el-form-item label="邮箱" readonly="true" prop="email">
                      <el-input v-model="modifyForm.email">{{}}</el-input>
                  </el-form-item>

                  <el-form-item label="其他" readonly="true" >
                      <el-input v-model="modifyForm.other">{{}}</el-input>
                  </el-form-item>

                  <el-form-item label="备注" readonly="true" >
                      <el-input v-model="modifyForm.remark" type="textarea">{{}}</el-input>
                  </el-form-item>


                  
                  <el-form-item label="是否启用" prop="status">
                      <el-radio-group v-model="modifyForm.status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  
                 <div style="margin-left:60%">
                  <el-form-item>
                      <el-button type="primary" @click="updateSubmitForm()">保存</el-button>
                      <el-button @click="dialogFormVisible2 = false">取消</el-button>
                  </el-form-item>
                 </div>
                  </el-form>
              <!-- <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div> -->
              </el-dialog>
          </div>


        <div id="Role_UserMatchPage">
          <el-dialog title="用户角色界面" :visible.sync="dialogRoleAndUserMatchingVisible" width="70%">
          <div class="dataTree">
              <div class="leftTree">
                  <h3>用户</h3>
                  <p v-for="item in userNames" :key="item.id">{{item.name}}</p>
              </div>
              <div class="rightTree">
                  <h3>角色</h3>
                  <el-tree
                  :data="roleTree"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="roleTree"
                  highlight-current
                  :props="defaultProps">
                  </el-tree>
              </div>
          </div>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogRoleAndUserMatchingVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser_RoleData">保 存</el-button>
          </div>
          </el-dialog>
        </div>
   </div> 


</template>

<script>
export default {
    data(){
        return{
        //这是表格的测试数据
        tableData: [],
        multipleSelection: [],
       
        dialogTableVisible2: false,
        dialogFormVisible2: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        modifyForm: {
          id:'',
          code:'',
          name:'',
          password:'',
          companyId:'',
          departmentId:'',
          sex:'',
          birthday:'',
          positionId:'',
          tel:'',
          email:'',
          other:'',
          version:"",
          status:'',
          remark:'',
          roleIds:[]
        },
        formLabelWidth: '120px',
        addForm:{
          id:'',
          code:'',
          name:'',
          password:'',
          companyId:'',
          departmentId:'',
          sex:'',
          birthday:'',
          positionId:'',
          tel:'',
          email:'',
          other:'',
          version:"",
          status:'',
          remark:'',
          roleIds:[]
        },

        rules: {
        name: [
          { required: true, message: '请输入用户名！', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入工号！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请选择公司', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择生日', trigger: 'blur' }
        ],
        positionId: [
          { required: true, message: '请选择职位', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        other: [
          { required: true, message: '请输入其他联系方式', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请输入所属机构', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ],
        },

        //页数和size测试数据
        page:1,
        pageSize:5,
        count:0,
        param:'',
        paramType:'',

        //删除提示的
        dialogVisible: false,
        deleteId:"",
        deleteVersion:-1,

 
        //搜索数据
        code:'',
        tel:'',
        name:'',
        //搜索角色列表数据
        RoleValue: [],

        //用户角色搭配数据
        dialogRoleAndUserMatchingVisible:false,
        userNames:[],

        //记录部门和公司的id和名称
        companyName:"",
        companyId:"",
        departmentName:'',
        departmentId:'',
        //部门名称和id选择
        DepartmentIdAndName:[],
        companyIdAndName:[],

        //职位的id和名称
        PositionIdAndName:'',

        //角色树
        roleTree:'',

        //添加修改用户界面的角色指
        RoleIdAndNameOptions:[],
        
        //启用条件
        status:null,
        statusList:[
          {label:"全部",value:null},
          {label:"是",value:1},
          {label:"否",value:0},
        ],

        }
    },
    methods:{
      evaluationModifyForm(row){
        if(this.$refs['modifyForm'] != undefined ){
              this.$refs['modifyForm'].clearValidate()
          }
        console.log(row)

        this.modifyForm.id=row.id
        if(row.departmentId != null){
          this.modifyForm.companyId=row.departmentId.companyId.id
          this.modifyForm.departmentId=row.departmentId.id
        }
        else{
          this.modifyForm.companyId =null
          this.modifyForm.departmentId=null
        }
        
         if(this.companyIdAndName.length != 1){
           this.getDepartmentIdAndNameByCompanyID(this.modifyForm.companyId)
           this.getPositionIdAndNameByCompanyID(this.modifyForm.departmentId)
           this.getRoleIdAndNameByCompanyID(this.modifyForm.companyId)
         }
        
        
        this.modifyForm.name=row.name,
        this.modifyForm.code=row.code,

        this.modifyForm.password=row.password,
        this.modifyForm.sex= row.sex,
        this.modifyForm.birthday = row.birthday,
        this.modifyForm.positionId= row.positionId.id,
        this.modifyForm.tel = row.tel,
        this.modifyForm.email = row.email,
        this.modifyForm.other =row.other ,
         
        this.modifyForm.remark=row.remark,
        this.modifyForm.version=row.version,
        this.modifyForm.status=row.status
        this.modifyForm.roleIds = row.roleIds

      }
      ,
      getRowKeys(row){
          return row.id;
      }
      ,
      handleEdit(scope, row){
        //this.form=row,        
        this.dialogFormVisible2= true,
        this.dialogTableVisible2= true
        this.evaluationModifyForm(row)
      }
      ,
      handledbClick(row, event, column) {
          this.handleEdit(0,row)
      }
      ,
      getdata(){
        //增加角色ID
        var roleId=[];
        if(this.RoleValue.length != 0){
            this.RoleValue.forEach(element => {
                  roleId.push(element)
          
            });
        }
   

          this.$ajax.post(
      'gateway/systemModule/doQueryUserByPage',
      {
        
        
          head: {
            version: '1',
            token: this.getCookie(),
            businessType: '12',
            equipId: '1',
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              name:this.name,
              code:this.code,
              tel:this.tel,
              status:this.status,
              roleId:roleId,
              page: this.page,
              pageSize: this.pageSize
            }
          }
            

        
      }
    ).then(
      (response) => {
        this.count =response.data.body.data.count
        this.tableData = response.data.body.data.userList

      }, function () { 
        console.log('error')
      }
    )
      },
        //表格的函数
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // alert(this.$refs.multipleTable.selection)
        
      },
       //分页的函数
       handleSizeChange(val) {
        this.pageSize=val;
        this.getdata();
      },
      handleCurrentChange(val) {
        this.page=val;
        this.getdata();
        
      },
      queryDataByName(){
        this.page=1;
        this.getdata();
      },
      //多选的情况下的编辑按钮函数
      checkModifySelectOne(){
        if(this.multipleSelection.length == 1){
          this.dialogFormVisible2=true;
          //this.modifyForm =this.multipleSelection[0];
          this.evaluationModifyForm(this.multipleSelection[0]);
        }
        else{
          alert("请选中一行数据！")
        }
      }
      ,
      updateUserData(){
          this.$ajax.post(
            'gateway/systemModule/doUpdateUser',
            {
              
              
                head: {
                  version: '1',
                  token: this.getCookie(),
                  businessType: '12',
                  equipId: '1',
                  equipType: 1,
                  encrypt: 1
                },
                body: {
                  data: {
                    // user:this.modifyForm
                    id: this.modifyForm.id,
                    name:  this.modifyForm.name,
                    code:  this.modifyForm.code,
                    password:  this.modifyForm.password,
                    departmentId:  this.modifyForm.departmentId,
                    sex:  this.modifyForm.sex,
                    birthday:  this.modifyForm.birthday ,
                    positionId:  this.modifyForm.positionId,
                    tel:  this.modifyForm.tel ,
                    email:  this.modifyForm.email ,
                    other:  this.modifyForm.other  ,
                    remark:  this.modifyForm.remark,
                    status:  this.modifyForm.status,
                    image: null,
                    version:this.modifyForm.version,
                    companyId:this.modifyForm.companyId,
                    roleIds:this.modifyForm.roleIds
                  }
                }
                  

              
            }
          ).then(
            (response) => {
              alert(response.data.head.message);
              if(response.data.head.responseCode == "0"){
                this.$refs.multipleTable.clearSelection();
                this.dialogFormVisible2=false;
                this.reflashTree();
                this.getdata();
              } 
            }, function () { 
              alert("保存失败")
              this.dialogFormVisible2=false;
              console.log('error')
            }
          )
      },
      
      clearAddForm(){
        if(this.$refs['addForm'] != undefined ){
              this.$refs['addForm'].clearValidate()
          }
        this.addForm.id='',
        this.addForm.name='',
        this.addForm.code=this.createUniqueId(),

        this.addForm.password='123456',
        this.addForm.departmentId='',
        this.addForm.sex= '',
        this.addForm.birthday = '',
        this.addForm.positionId= '',
        this.addForm.tel = '',
        this.addForm.email = '',
        this.addForm.other ='' ,
         
        this.addForm.remark='',
        this.addForm.version='',
        this.addForm.status=''
        if(this.companyIdAndName.length == 1){
          this.addForm.companyId = this.companyIdAndName[0].value;
        }
        else{
          this.addForm.companyId='',
          this.PositionIdAndName=[],
          this.DepartmentIdAndName=[]
          this.RoleIdAndNameOptions=[]
        }
        
        this.dialogFormVisible = true;

      }
      ,

      addUserData(){
        this.$ajax.post(
            'gateway/systemModule/doAddUser',
            {
              
              
                head: {
                  version: '1',
                  token: this.getCookie(),
                  businessType: '12',
                  equipId: '1',
                  equipType: 1,
                  encrypt: 1
                },
                body: {
                  data: {
                    // user:this.addForm
            
                      
                    name:  this.addForm.name,
                    code:  this.addForm.code,
                    password:  this.addForm.password,
                    departmentId:  this.addForm.departmentId,
                    sex:  this.addForm.sex,
                    birthday:  this.addForm.birthday ,
                    positionId:  this.addForm.positionId,
                    tel:  this.addForm.tel ,
                    email:  this.addForm.email ,
                    other:  this.addForm.other  ,
                    remark:  this.addForm.remark,
                    status:  this.addForm.status,
                    image: null,
                    companyId:this.addForm.companyId,
                    roleIds:this.addForm.roleIds
                  }
                }
                  

              
            }
          ).then(
            (response) => {
              alert(response.data.head.message);
              if(response.data.head.responseCode == "0"){
                this.dialogFormVisible=false;
                this.reflashTree();
                this.getdata();
              }
            }, function () { 
              alert("增加失败")
              console.log('error')
            }
          )
      },
      createUniqueId() {
          var n = 1; // 生成一个唯一id，包含数字和字母
          var random = function() {
            // 生成10-12位不等的字符串
            return Number(
              Math.random()
                .toString()
                .substr(2)
            ).toString(36); // 转换成十六进制
          };
          var arr = [];
          function createId() {
            var num = random();
            var _bool = false;
            arr.forEach(v => {
              if (v === num) _bool = true;
            });
            if (_bool) {
              createId();
            } else {
              arr.push(num);
            }
          }
          var i = 0;
          while (i < n) {
            createId();
            i++;
          }
          this.uniqueId = arr[0]; // 将生成的转为我们需要的字符串并赋值
          return arr[0];
    },
      
      
      checkDelete(row){
        this.deleteId=row.id;
        this.deleteVersion=row.version;
        this.dialogVisible = true;
      }
      ,
      deleteUserData(){
        this.dialogVisible = false;
        this.$ajax.post(
              'gateway/systemModule/doDeleteUser',
              {
                //params: {
                  
                            head: {
                              version: '1',
                              token: this.getCookie(),
                              businessType: '12',
                              equipId: '1',
                              equipType: 1,
                              encrypt: 1
                            },
                            body: {
                              data: {
                                id: this.deleteId,
                                version: this.deleteVersion
                              }
                            }
                  
              //  }
           
              }
            ).then(
              (response) => {
              alert(response.data.head.message);
              if(response.data.head.responseCode == "0"){
                this.$refs.multipleTable.clearSelection();
                this.reflashTree();
                this.getdata();
              }
            }, function () { 
              alert("删除失败")
              console.log('error')
            }
            )
      },
      checkDeleteSelect(){
        if(this.multipleSelection.length == 0){
          alert("请选择数据！")
        }
        else{
          this.$confirm('确定删除选中数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var deleteList=[];
            this.multipleSelection.forEach(element => {
              deleteList.push({id:element.id,version:element.version})
            });
            this.$ajax.post(
                'gateway/systemModule/doDeleteUserList',
                {
                  //params: {
                    
                              head: {
                                version: '1',
                                token: this.getCookie(),
                                businessType: '12',
                                equipId: '1',
                                equipType: 1,
                                encrypt: 1
                              },
                              body: {
                                data: {
                                  userList:deleteList
                                  
                                }
                              }
                    
                //  }
            
                }
              ).then(
                (response) => {
                alert(response.data.head.message);
                if(response.data.head.responseCode == "0"){
                  this.$refs.multipleTable.clearSelection();
                  this.reflashTree();
                  this.getdata();
                }
              }, function () { 
                alert("删除失败")
                console.log('error')
              }
              )
          }).catch(() => {

          });
          
        }
      }
      ,
      reflashTree(){
        this.$emit("reflashTree");
      }
      ,
      //格式化日期
      formatDate(row, column) {
        if(row[column.property] != null){
          let data = row[column.property]
          let dt = new Date(data)
          return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' 
            + dt.getDate() 
        }
      }


      ,




       //接下来是用户角色分配的函数

    //获取单个用户的角色
      getUser_RoleDataByUserID(id){
        this.$ajax.post(
              'gateway/systemModule/doQueryUser_RoleLeafByUserId',
              {
                      head: {
                        version: '1',
                        token: this.getCookie(),
                        businessType: '12',
                        equipId: '1',
                        equipType: 1,
                        encrypt: 1
                      },
                      body: {
                        data: {
                          userId:id
                        }
                      }
              }
            ).then(
              (response) => {
              //获得该用户的角色id
              var ids=[];
              this.$refs.roleTree.setCheckedKeys(ids);
              
          
              response.data.body.data.forEach(element => {
                ids.push(element.roleId)
               
              });
              this.$refs.roleTree.setCheckedKeys(ids);           
            }, function () { 
              alert("error")
              console.log('error')
            }
            )
      }
      ,
      //根据公司的ID获取角色树
      getRoleNameTreeByCompanyID(companyId){
      this.$ajax.post(
      'gateway/systemModule/doQueryRoleNameTreeByCompanyId',
      {
        
        
          head: {
            version: '1',
            token: this.getCookie(),
            businessType: '12',
            equipId: '1',
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              companyId:companyId,
     
            }
          }
        
      }
    ).then(
      (response) => {
        this.roleTree= response.data.body.data
        

      }, function () { 
        console.log('error')
      }
    )
    },
      //从表格勾选的情况
      checkUserMatchRoleSelect(){
        if(this.multipleSelection.length == 0){
          alert("请至少选择一行数据！")
        }
        else {
          this.userNames=[];
          this.multipleSelection.forEach(element => {
            this.userNames.push({name:element.name,id:element.id})
          });
            var flag=0;
            for(var i=0;i<this.multipleSelection.length-1;i++){
              if(flag == 1){
                continue
              }
              for(var j=i+1; j<this.multipleSelection.length;j++){
                if(flag == 1){
                  continue
                }
                if( this.multipleSelection[i].departmentId  != null && this.multipleSelection[j].departmentId != null ){
                  if(this.multipleSelection[i].departmentId.companyId.id != this.multipleSelection[j].departmentId.companyId.id){
                    flag= 1;
                  }
                }
                else{
                    flag= 1;
                }
                
              }

            }
            if(flag == 1){
              alert("请不要选择多个不同公司的用户")
              return
            }
          var companyId = null  
          if(this.multipleSelection[0].departmentId != null){
             companyId  = this.multipleSelection[0].departmentId.companyId.id
          }
          
          this.getRoleNameTreeByCompanyID(companyId)
          this.dialogRoleAndUserMatchingVisible=true;
          
          if(this.multipleSelection.length == 1){
            this.getUser_RoleDataByUserID(this.multipleSelection[0].id);

          }
          else{
             this.$refs.roleTree.setCheckedKeys([]);
          }
        }
        
      }
      
      ,
      //保存用户角色
      addUser_RoleData(){
        //设置角色资源列表数据
        var roleIds=this.$refs.roleTree.getCheckedKeys().concat(this.$refs.roleTree.getHalfCheckedKeys());
        // var user_roleList=[];
        // for(var i=0 ;i< this.userNames.length;i++){
        //   for(var j=0 ;j<roleIds.length;j++){
        //     console.log({id:null,roleId:roleIds[j],userId:this.userNames[i].id})
        //     user_roleList.push({id:null,roleId:roleIds[j],userId:this.userNames[i].id});
        //   }
        // }

        //设置角色id列表数据
        var userIds=[];
        this.userNames.forEach(element => {
          userIds.push(element.id)
        });
        this.$ajax.post(
              'gateway/systemModule/doAddNewUserToRole',
              {
                      head: {
                        version: '1',
                        token: this.getCookie(),
                        businessType: '12',
                        equipId: '1',
                        equipType: 1,
                        encrypt: 1
                      },
                      body: {
                        data: {
                          //userMatchingRoleList:user_roleList,
                          userIds:userIds,
                          roleIds:roleIds
                        }
                      }
              }
            ).then(
              (response) => {
              alert(response.data.head.message);
              if(response.data.head.responseCode == "0"){
                this.dialogRoleAndUserMatchingVisible = false;
                this.getdata()
              }
             
            }, function () { 
              alert("error")
              console.log('error')
            }
            )
      }

      ,
      //单个角色修改的情况
      selectOnetUser_RoleData(row) {
        var companyId = null ;
        if(row.departmentId != null){
          companyId =  row.departmentId.companyId.id
        }
        this.getRoleNameTreeByCompanyID(companyId)
        this.dialogRoleAndUserMatchingVisible=true;
        this.userNames=[];
        this.userNames.push({name:row.name,id:row.id})
        this.getUser_RoleDataByUserID(row.id);
      },


      updateSubmitForm() {
        this.$refs['modifyForm'].validate((valid) => {
          if (valid) {
            this.updateUserData();
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      addSubmitForm() {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            this.addUserData();
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getCompanyIdAndName(){
        this.$ajax.post(
      'gateway/systemModule/queryCompanyIdAndName',
      {
        
        
          head: {
            version: '1',
            token: this.getCookie(),
            businessType: '12',
            equipId: '1',
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              
     
            }
          }
        
      }
    ).then(
      (response) => {
        this.companyIdAndName= response.data.body.data
        if(this.companyIdAndName.length == 1){
          this.getDepartmentIdAndNameByCompanyID(this.companyIdAndName[0].value);
          this.getPositionIdAndNameByCompanyID(this.companyIdAndName[0].value)
          this.getRoleIdAndNameByCompanyID(this.companyIdAndName[0].value)
        }

      }, function () { 
        console.log('error')
      }
    )
    },

      getDepartmentIdAndNameByCompanyID(companyId){
        this.$ajax.post(
      'gateway/systemModule/doQueryDepartmentNameByCompanyId',
      {
        
        
          head: {
            version: '1',
            token: this.getCookie(),
            businessType: '12',
            equipId: '1',
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              companyId:companyId,
     
            }
          }
        
      }
    ).then(
      (response) => {
        //this.count =response.data.body.data.count
        this.DepartmentIdAndName = response.data.body.data
        
      }, function () { 
        console.log('error')
      }
    )
    },

        getPositionIdAndNameByCompanyID(companyId){
       this.$ajax.post(
      'gateway/systemModule/doQueryPostionIdAndNameByCompanyId',
      {
        
        
          head: {
            version: '1',
            token: this.getCookie(),
            businessType: '12',
            equipId: '1',
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              companyId:companyId,
     
            }
          }
        
      }
    ).then(
      (response) => {
        //this.count =response.data.body.data.count
      
        this.PositionIdAndName = response.data.body.data
      }, function () { 
        console.log('error')
      }
    )
    },

      reflashDepartemntAdd(){
        this.getDepartmentIdAndNameByCompanyID(this.addForm.companyId)
        this.getPositionIdAndNameByCompanyID(this.addForm.companyId)
        this.getRoleIdAndNameByCompanyID(this.addForm.companyId)
        this.addForm.departmentId =null
        this.addForm.positionId = null
        this.addForm.roleIds=[]
      },

      reflashDepartemntModify(){
        this.getDepartmentIdAndNameByCompanyID(this.modifyForm.companyId)
        this.getPositionIdAndNameByCompanyID(this.modifyForm.companyId)
        this.getRoleIdAndNameByCompanyID(this.modifyForm.companyId)
        this.modifyForm.departmentId =null
        this.modifyForm.positionId = null
        this.modifyForm.roleIds=[]

      },

      getRoleIdAndNameByCompanyID(companyId){
      this.$ajax.post(
      'gateway/systemModule/doQueryRoleIdAndName',
      {
        
        
          head: {
            version: '1',
            token: this.getCookie(),
            businessType: '12',
            equipId: '1',
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: companyId
          }
        
      }
    ).then(
      (response) => {
        //this.count =response.data.body.data.count
        this.RoleIdAndNameOptions= response.data.body.data

      }, function () { 
        console.log('error')
      }
    )
    },
    
    getCookie() {
      if (document.cookie.length>0) {
        var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
        for(var i=0;i<arr.length;i++){
          var arr2=arr[i].split('=');//再次切割
          //判断查找相对应的值
          if(arr2[0]=='staffToken'){
            return arr2[1]
          }
        }
      } else {
        alert("登录超时!")
        this.$router.push({  
          path: '/Login',   
          name: 'Login',  
          params: {   
          }  
      })
      }
    },





    
    },
    
    components:{

    },
    
    //页面渲染前调用
      created(){
        this.getdata(); 
        this.getCompanyIdAndName();
      }
      ,
      afterCreate(){
        //this.getDepartmentIdAndNameByCompanyID(this.companyIdAndName[0].value)
      }

    ,

    props:["RoleIdAndName"]
}
</script>

<style scoped>
#selector{
  width: 100%;
  margin-bottom: 30px;
}


/* 搭配页面的css */
.dataTree{
    width: 100%;
    height: 700px;
    
    
}

.leftTree{
    width: 49%;
    height: 100%;
    float: left;
    background-color: aliceblue;
    overflow:auto;
}

.rightTree{
    width: 49%;
    height:100%;
    float: left;
    background-color: aliceblue;
    overflow:auto;
    margin-left: 2%;
}

.el-tree{
    background-color: aliceblue;
}  

</style>
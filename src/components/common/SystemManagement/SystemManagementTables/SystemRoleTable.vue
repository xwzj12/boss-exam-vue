<template>
  <div>
     <div style="float:left;margin-bottom:20px;">
        <div id="selector">
            <span>角色名称:</span>
            <el-input v-model="name" placeholder="请输入内容" style="width:200px"></el-input>
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
                  type="success"
                  @click="checkRoleMatchResourceSelect"
                  icon="el-icon-circle-plus-outline"
                >资源分配</el-button>

                <el-button
                  size="mini"
                  type="info"
                  @click="checkRoleMatchUserSelect"
                  icon="el-icon-user"
                >用户分配</el-button>
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
                label="角色"
                width="150">
                <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                prop="code"
                label="角色编号"
                width="150">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="角色备注"
                width="150">
                </el-table-column>
                <el-table-column
                prop="companyId.name"
                label="所属公司"
                width="150">
                <!-- <template slot-scope="scope">
                  <span>
                    {{scope.row.updatedTime.getFullYear() + '-' + (scope.row.updatedTime.getMonth() + 1) + '-' + scope.row.updatedTime.getDate() + ' ' + scope.row.updatedTime.getHours() + ':' + scope.row.updatedTime.getMinutes() + ':' + scope.row.updatedTime.getSeconds()}}
                  </span>
                  
                </template> -->
                </el-table-column>
                <el-table-column
                prop="orgId.name"
                label="所属机构"
                width="150">
                </el-table-column>
                <el-table-column
                prop="status"
                label="启用标记"
                width="150">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 1"><el-tag>是</el-tag></span>
                  <span v-else-if="scope.row.status == 0"><el-tag type="info">否</el-tag></span>
                </template>
                </el-table-column>
                 <el-table-column
                label="操作" width="500px">
                <template slot-scope="scope">
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
                        @click="handleEdit(scope.$index, scope.row)"
                        icon="el-icon-edit"
                      >编辑</el-button>
                      <!-- @click="deleteCompanyData(scope.row)" -->
                      <el-button
                        size="mini"
                        type="danger"
                        @click="checkDelete(scope.row)"
                        icon="el-icon-delete"
                      >删除</el-button>
                      <el-button
                        size="mini"
                        type="success"
                        @click="selectOnetResouce_RoleData(scope.row)"
                        icon="el-icon-circle-plus-outline"
                      >资源分配</el-button>

                      <el-button
                        size="mini"
                        type="info"
                        @click="selectOnetUser_RoleData(scope.row)"
                        icon="el-icon-user"
                      >用户分配</el-button>
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
                <el-button type="primary" @click="deleteRoleData">确 定</el-button>
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
                <el-dialog title="增加角色" :visible.sync="dialogFormVisible" width="800px"> 
                  <el-form ref="addForm" :model="addForm" label-width="100px" :rules="rules">
                  <el-form-item label="角色名称" prop="name">
                      <el-input v-model="addForm.name">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="角色编号" prop="code">
                      <el-input v-model="addForm.code" :disabled="true">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="角色备注" readonly="true">
                      <el-input v-model="addForm.remark" type="textarea" >{{}}</el-input>
                  </el-form-item>

                  <el-form-item label="所属机构" prop="orgId"> 
                       <el-select v-model="addForm.orgId" placeholder="请选择" style="width:100%" @change="reflashAdd()">
                        <el-option
                          v-for="item in organizationIdAndName" 
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                   <el-form-item label="所属公司" prop="companyId"> 
                       <el-select v-model="addForm.companyId" placeholder="请选择" style="width:100%" >
                        <el-option
                          v-for="item in companyIdAndName" 
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
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
              <el-dialog title="编辑角色" :visible.sync="dialogFormVisible2" width="800px"> 
                  <el-form ref="modifyForm" :model="modifyForm" label-width="100px" :rules="rules" >
                  <el-form-item label="角色ID" >
                      <el-input v-model="modifyForm.id" readonly="true">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="角色名称" prop="name" >
                      <el-input v-model="modifyForm.name">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="角色编号" prop="code">
                      <el-input v-model="modifyForm.code">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="角色备注" readonly="true">
                      <el-input v-model="modifyForm.remark" type="textarea">{{}}</el-input>
                  </el-form-item>
                  <!-- <el-form-item label="所属机构ID">
                      <el-input type="input" v-model="modifyForm.orgId" readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="所属机构">
                      <el-input type="input" v-model="orgName" readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="公司ID">
                      <el-input type="input" v-model="modifyForm.companyId" readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="公司">
                      <el-input type="input" v-model="companyName" readonly="true"></el-input>
                  </el-form-item> -->
                  <!-- <el-form-item label="所属机构">
                      <el-input type="input" v-model="modifyForm.orgId"></el-input>
                  </el-form-item> -->
                  <el-form-item label="所属机构" prop="orgId"> 
                       <el-select v-model="modifyForm.orgId" placeholder="请选择" style="width:100%" @change="reflashModify()" >
                        <el-option
                          v-for="item in organizationIdAndName" 
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                   <el-form-item label="所属公司" prop="companyId"> 
                       <el-select v-model="modifyForm.companyId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in companyIdAndName" 
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  
                  <el-form-item label="是否启用"  prop="status">
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
          

          <!-- 这里开始是两个数据搭配页面 -->
        <div id="Role_ResourceMatchPage">
          <el-dialog title="角色资源界面" :visible.sync="dialogRoleAndResourceMatchingVisible" width="70%">
          <div class="dataTree">
              <div class="leftTree">
                  <h2>角色</h2>
                  <p v-for="(item,index) in roleNames" :key="index">{{item.name}}</p>
              </div>
              <div class="rightTree">
                  <h2>资源</h2>
                  <el-tree
                  :data="resourceTree"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="resourceTree"
                  highlight-current
                  :props="defaultProps">
                  </el-tree>
              </div>
          </div>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogRoleAndResourceMatchingVisible = false"  >取 消</el-button>
              <el-button type="primary" @click="addResource_RoleData" >保存</el-button>
          </div>
          </el-dialog>
        </div>

        <div id="Role_UserMatchPage">
          <el-dialog title="角色用户界面" :visible.sync="dialogRoleAndUserMatchingVisible" width="70%">
          <div class="dataTree">
              <div style="width:100%;padding-left:0%;margin-bottom:20px">
                <span style="font-size:15px;">用户名:</span><el-input style="width:30%" v-model="username"></el-input>
                <span style="font-size:15px;">工号:</span><el-input style="width:30%" v-model="code"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="queryUserDataByNameAndCode()">搜索</el-button>   
              </div>
              <div class="leftTree">
                  <h3>角色</h3>
                  <p v-for="item in roleNames" :key="item.id">{{item.name}}</p>
              </div>
              <div class="rightTree">
                  <h3>用户</h3>
                  <el-tree
                  :data="userTree"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="userTree"
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
import matchingPage from '../SystemDataMatchingPage.vue';
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
          companyId:'',
          orgId:'',
          name:'',
          code:'',
          remark:'',
          status:'',
          version:"",
          // createdBy:'',
          // createdTime:'',
          // updatedBy:'',
          // updatedTime:''
        },
        formLabelWidth: '120px',
        addForm:{
          id:'',
          companyId:'',
          orgId:'',
          name:'',
          code:'',
          remark:'',
          status:'',
          version:"",
        },

        //页数和size测试数据
        page:1,
        pageSize:5,
        name:'',
        count:0,
        param:'',
        paramType:'',

        //删除提示的
        dialogVisible: false,
        deleteId:"",
        deleteVersion:-1,

        //给搭配页面的数据
        dialogRoleAndResourceMatchingVisible:false,
        dialogRoleAndUserMatchingVisible:false,
        // roleTree:[],
        userTree:'',
        resourceTree:'',
 
        //要显示的角色名数据
        roleNames:[],


        rules: {
          name: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入角色编号!', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择是否启用!', trigger: 'change' }
          ],
          orgId: [
            { required: true, message: '请选择组织机构!', trigger: 'change' }
          ],
          companyId: [
            { required: true, message: '请选择公司!', trigger: 'change' }
          ]
        },


        //组织和公司
        orgId:null,
        orgName:null,
        companyId:null,
        companyName:null,

        companyIdAndName:[],
        organizationIdAndName:[],

        roleComapnyId:null,
        code:null,
        username:null

        }
    },
    methods:{
      evaluationModifyForm(row){
        if(this.$refs['modifyForm'] != undefined ){
              this.$refs['modifyForm'].clearValidate()
          }
        this.modifyForm.id=row.id
        if(this.organizationIdAndName.length != 1){
          this.getCompanyIdAndNameByOrgId(row.orgId.id)
        }
        if(row.companyId != null){
          this.modifyForm.companyId=row.companyId.id
        }
        else{
          this.modifyForm.companyId=null
        }
        if(row.orgId != null){
          this.modifyForm.orgId=row.orgId.id
        }
        else{
          this.modifyForm.orgId=null
        }
        
        this.modifyForm.name=row.name,
        this.modifyForm.code=row.code,
        this.modifyForm.remark=row.remark,
        this.modifyForm.version=row.version,
        this.modifyForm.status=row.status
        // this.modifyForm.createdBy=row.createdBy,
        // this.modifyForm.createdTime=row.createdTime,
        // this.modifyForm.updatedBy=row.updatedBy,
        // this.modifyForm.updatedTime=row.updatedTime
      }
      ,
      
      getRowKeys(row){
          return row.id;
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
          this.$ajax.post(
      'gateway/systemModule/doQueryRoleByPage',
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
              page: this.page,
              pageSize: this.pageSize
            }
          }
            

        
      }
    ).then(
      (response) => {
        this.count =response.data.body.data.count
        this.tableData = response.data.body.data.roleList

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
        else if(this.multipleSelection.length == 0){
          alert("未选中任何角色！")

        }
        else{
          alert("该操作只能选择一个角色！")
        }
      }
      ,
      updateRoleData(){
          this.$ajax.post(
            'gateway/systemModule/doUpdateRole',
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
                    // role:this.modifyForm
                    id: this.modifyForm.id,
                    companyId:  this.modifyForm.companyId,
                    orgId:  this.modifyForm.orgId,
                    name:  this.modifyForm.name,
                    code:  this.modifyForm.code,
                    remark:  this.modifyForm.remark,
                    status: this.modifyForm.status,
                    version:this.modifyForm.version
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
              console.log('error')
            }
          )
      },
      
      clearAddForm(){
          if(this.$refs['addForm'] != undefined ){
              this.$refs['addForm'].clearValidate()
          }
          this.addForm.id="",
          this.addForm.companyId='',
          this.addForm.name="",
          this.addForm.code=this.createUniqueId(),
          this.addForm.remark="",
          this.addForm.version="",
          this.addForm.status=""
          if(this.organizationIdAndName.length == 1){
            this.addForm.orgId = this.organizationIdAndName[0].value;
          }
          else{
             this.addForm.orgId='',
             this.companyIdAndName=[]
          }
          
          this.dialogFormVisible = true;

      }
      ,

      addRoleData(){
        this.$ajax.post(
            'gateway/systemModule/doAddRole',
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
                    // role:this.addForm          this.addForm.id="",
                    companyId:  this.addForm.companyId,
                    orgId:  this.addForm.orgId,
                    name:  this.addForm.name,
                    code:  this.addForm.code,
                    remark:  this.addForm.remark,
                    status: this.addForm.status
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
      }
      ,
      checkDelete(row){
        this.deleteId=row.id;
        this.deleteVersion=row.version;
        this.dialogVisible = true;
      }
      ,
      deleteRoleData(){
        this.dialogVisible = false;
        this.$ajax.post(
              'gateway/systemModule/doDeleteRole',
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
              if(response.data.head.responseCode == "0"){
                alert(response.data.head.message);
                this.$refs.multipleTable.clearSelection();
                this.reflashTree();
                this.getdata();
              }
              else{
                this.$message({
                  type: 'error',
                  message: response.data.head.message,
                  duration: 3000,
                  showClose: true,
                })
              }
            }, function () { 
              alert("删除失败")
              console.log('error')
            }
            )
      },
      checkDeleteSelect(){
        if(this.multipleSelection.length == 0){
          alert("未选中任何角色")
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
                'gateway/systemModule/doDeleteRoleList',
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
                                  roleList:deleteList
                                  
                                }
                              }
                    
                //  }
            
                }
              ).then(
                (response) => {
                if(response.data.head.responseCode == "0"){
                  alert(response.data.head.message);
                  this.$refs.multipleTable.clearSelection();
                  this.reflashTree();
                  this.getdata();
                }
                else{
                this.$message({
                  type: 'error',
                  message: response.data.head.message,
                  duration: 3000,
                  showClose: true,
                })
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
            + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' 
            + dt.getSeconds()
        }
      }
      ,

      //接下来是搭配函数--------------
      //获取单个角色的资源
      getRole_ResourceDataByRoleID(id){
        this.$ajax.post(
              'gateway/systemModule/doQueryResource_RoleLeafByRoleId',
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
                          roleId:id
                        }
                      }
              }
            ).then(
              (response) => {
              //获得该角色的资源id
              var ids=[];
              this.$refs.resourceTree.setCheckedKeys(ids);
              response.data.body.data.forEach(element => {
                ids.push(element.resourceId)
              });
              this.$refs.resourceTree.setCheckedKeys(ids);           
            }, function () { 
              alert("error")
              console.log('error')
            }
            )
      }
      ,
      //从表格勾选的情况
      checkRoleMatchResourceSelect(){
        if(this.multipleSelection.length == 0){
          alert("请至少选择一行数据！")
        }
        else {
          this.getResourceTree();
          this.roleNames=[];
          this.multipleSelection.forEach(element => {
            this.roleNames.push({name:element.name,id:element.id})
          });

          this.dialogRoleAndResourceMatchingVisible=true;
          
          if(this.multipleSelection.length == 1){
            this.getRole_ResourceDataByRoleID(this.multipleSelection[0].id);

          }
          else{
             this.$refs.resourceTree.setCheckedKeys([]);
          }
        }
        
      }
      
      ,
      //保存角色资源
      addResource_RoleData(){
        //设置角色资源列表数据
        var resourceIds=this.$refs.resourceTree.getCheckedKeys().concat(this.$refs.resourceTree.getHalfCheckedKeys());
        // 原本是用来拼接角色资源信息的，后面改到后端了
       // var resource_roleList=[];
        // for(var i=0 ;i< this.roleNames.length;i++){
        //   for(var j=0 ;j<resourceIds.length;j++){
        //     console.log({id:null,resourceId:resourceIds[j],roleId:this.roleNames[i].id})
        //     resource_roleList.push({id:null,resourceId:resourceIds[j],roleId:this.roleNames[i].id});
        //   }
        // }

        //设置角色id列表数据
        var roleIds=[];
        this.roleNames.forEach(element => {
          roleIds.push(element.id)
        });
        this.$ajax.post(
              'gateway/systemModule/doAddResource_Role',
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
                          //resourceMatchingRoleList:resource_roleList,
                          roleIds:roleIds,
                          resourceIds:resourceIds
                        }
                      }
              }
            ).then(
              (response) => {
              alert(response.data.head.message);
              this.dialogRoleAndResourceMatchingVisible = false
            }, function () { 
              alert("error")
              console.log('error')
            }
            )
      }

      ,
      //单个角色修改的情况
      selectOnetResouce_RoleData(row) {
        this.getResourceTree();
        this.dialogRoleAndResourceMatchingVisible=true;
        this.roleNames=[];
        this.roleNames.push({name:row.name,id:row.id})
        this.getRole_ResourceDataByRoleID(row.id);
      }
      ,


      //--------角色用户搭配函数开始
      //获取拥有这个角色的用户
      getRole_UserDataByRoleID(id){
        this.$ajax.post(
              'gateway/systemModule/doQueryUser_RoleLeafByRoleId',
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
                          roleId:id
                        }
                      }
              }
            ).then(
              (response) => {
              //获得该角色的用户id
              var ids=[];
              this.$refs.userTree.setCheckedKeys(ids);
              response.data.body.data.forEach(element => {
                ids.push(element.userId)
              });
              this.$refs.userTree.setCheckedKeys(ids);           
            }, function () { 
              alert("error")
              console.log('error')
            }
            )
      }
      ,
      //获取资源树
      getResourceTree(){
            this.$ajax.post(
      'gateway/systemModule/doQueryResourceNameTree',
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
        this.resourceTree = response.data.body.data

      }, function () { 
        console.log('error')
      }
    )
      }
      ,

      //根据中的角色公司获取用户列表！！！
      getUserTree(companyId){
        this.roleComapnyId = companyId;
        this.$ajax.post(
      'gateway/systemModule/doQueryDepartmentUserNameTreeByCompanyIdAndUserNameAndCode',
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
              name:this.username,
              code:this.code

            }
          }
        
      }
    ).then(
      (response) => {
        this.userTree= response.data.body.data
        console.log(this.userTree)
      }, function () { 
        console.log('error')
      }
    )
      },

      queryUserDataByNameAndCode(){
        this.getUserTree(this.roleComapnyId)
      }
      ,
      //从表格勾选的情况
      checkRoleMatchUserSelect(){
        if(this.multipleSelection.length == 0){
          alert("请至少选择一行数据！")
        }
        else {
          this.roleNames=[];
          this.multipleSelection.forEach(element => {
            this.roleNames.push({name:element.name,id:element.id})
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
                if(this.multipleSelection[i].companyId != null && this.multipleSelection[j].companyId != null){
                  if(this.multipleSelection[i].companyId.id != this.multipleSelection[j].companyId.id){
                    flag= 1;
                  }
                }
                else{
                  flag = 1;
                }

                
              }

            }
            if(flag == 1){
              alert("请不要选择多个不同公司的角色")
              return
            }
           var companyId;
           //增加了用户过滤条件，所以要清空
           this.username = null
           this.code = null
          //获取公司ID，等会根据公司ID查询各个部门的员工！！！
          if(this.multipleSelection[0].companyId != null){
            companyId=this.multipleSelection[0].companyId.id;
            
          }
          else{
             companyId = null
          }
          this.getUserTree(companyId);

          this.dialogRoleAndUserMatchingVisible=true;
          
          if(this.multipleSelection.length == 1){
            this.getRole_UserDataByRoleID(this.multipleSelection[0].id);

          }
          else{
             this.$refs.userTree.setCheckedKeys([]);
          }
        }
        
      }
      
      ,
      //保存角色——用户
      addUser_RoleData(){
        //设置角色用户列表数据
        var userIds=this.$refs.userTree.getCheckedKeys(true);//这里只获取叶子节点，父节点都是部门

        //  
        // var user_roleList=[];
        // for(var i=0 ;i< this.roleNames.length;i++){
        //   for(var j=0 ;j<userIds.length;j++){
        //     console.log({id:null,userId:userIds[j],roleId:this.roleNames[i].id})
        //     user_roleList.push({id:null,userId:userIds[j],roleId:this.roleNames[i].id});
        //   }
        // }


        //设置角色id列表数据
        var roleIds=[];
        this.roleNames.forEach(element => {
          roleIds.push(element.id)
        });
        this.$ajax.post(
              'gateway/systemModule/doAddNewRoleToUser',
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
                          roleIds:roleIds,
                          userIds:userIds
                        }
                      }
              }
            ).then(
              (response) => {
              alert(response.data.head.message);
              this.dialogRoleAndUserMatchingVisible = false
            }, function () { 
              alert("error")
              console.log('error')
            }
            )
      }

      ,
      //单个角色修改的情况
      selectOnetUser_RoleData(row) {
        //增加了用户过滤条件，所以要清空
           this.username = null
           this.code = null
        if(row.companyId != null){
          this.getUserTree(row.companyId.id);
        }
        else{
          this.getUserTree(null);
        }


        this.dialogRoleAndUserMatchingVisible=true;
        this.roleNames=[];
        this.roleNames.push({name:row.name,id:row.id})
        this.getRole_UserDataByRoleID(row.id);
      },

      
      updateSubmitForm() {
        this.$refs['modifyForm'].validate((valid) => {
          if (valid) {
            this.updateRoleData();
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      addSubmitForm() {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            this.addRoleData();
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


    getOrgIdAndName(){
      this.$ajax.post(
      'gateway/systemModule/doQueryOrgIdAndName',
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
        this.organizationIdAndName= response.data.body.data
        if(this.organizationIdAndName.length == 1){
          this.getCompanyIdAndNameByOrgId(this.organizationIdAndName[0].value)
        }
      }, function () { 
        console.log('error')
      }
    )
    },
    
    getCompanyIdAndNameByOrgId(orgId){
        this.$ajax.post(
      'gateway/systemModule/doQueryCompanyNameAndIdByOrgId',
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
                orgId:orgId
            }
          }
        
      }
    ).then(
      (response) => {
        this.companyIdAndName= response.data.body.data
      }, function () { 
        console.log('error')
      }
    )
    },

    reflashAdd(){
        this.getCompanyIdAndNameByOrgId(this.addForm.orgId)
        this.addForm.companyId =null
      },

    reflashModify(){
        this.getCompanyIdAndNameByOrgId(this.modifyForm.orgId)
        this.modifyForm.companyId =null

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
    props:[]
    ,
    
    //页面渲染前调用
      created(){
        this.getdata(); 
        this.getOrgIdAndName();
      }
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
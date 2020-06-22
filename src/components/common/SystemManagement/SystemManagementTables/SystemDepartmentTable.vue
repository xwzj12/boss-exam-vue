<template>
  <div>
     <div style="float:left;margin-bottom:20px;">
        <div id="selector">
            <span>部门名称:</span>
            <el-input v-model="name" placeholder="请输入内容" style="width:200px"></el-input>
            <span>部门等级:</span>
            <el-select v-model="level" placeholder="请选择">
              <el-option
                v-for="item in Leveloptions"
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
                label="部门名称"
                width="100">
                <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                prop="parentId.name"
                label="上级部门"
                width="100">
                
                </el-table-column>
                <el-table-column 
                prop="mnemonicCode"
                label="助记码"
                width="100">
                </el-table-column>
                <el-table-column
                prop="code"
                label="部门编号"
                width="100">
                </el-table-column><el-table-column
                prop="master"
                label="负责人"
                width="100">
                </el-table-column><el-table-column
                prop="level"
                label="部门等级"
                :formatter="formatType"
                width="100">
                </el-table-column>
                <el-table-column
                prop="status"
                label="启用标记"
                width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 1"><el-tag>是</el-tag></span>
                  <span v-else-if="scope.row.status == 0"><el-tag type="info">否</el-tag></span>
                </template>
                </el-table-column>
                 <el-table-column
                label="操作" width="300px">
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
                <el-button type="primary" @click="deleteDepartmentData">确 定</el-button>
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
                <el-dialog title="增加部门" :visible.sync="dialogFormVisible" width="800px"> 
                  <el-form :rules="rules" ref="addForm" :model="addForm" label-width="100px" >
                  <el-form-item label="部门名称" prop="name">
                      <el-input v-model="addForm.name">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="部门编号" prop="code">
                      <el-input v-model="addForm.code">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="助记码" prop="mnemonicCode">
                      <el-input v-model="addForm.mnemonicCode">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="部门等级" prop="level">
                      <el-select v-model="addForm.level" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in dictionary"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="所属公司" prop="companyId"> 
                       <el-select v-model="addForm.companyId" placeholder="请选择" style="width:100%" @change="reflashDepartemntAdd()">
                        <el-option
                          v-for="item in companyIdAndName" 
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  
                  <el-form-item label="上级部门" >
                       <el-select v-model="addForm.parentId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in DepartmentIdAndName"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="负责人" prop="master">
                      <el-input v-model="addForm.master"></el-input>
                  </el-form-item>
                  
                  <el-form-item label="描述">
                      <el-input type="textarea" v-model="addForm.descript"></el-input>
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
              <el-dialog title="编辑部门" :visible.sync="dialogFormVisible2" width="800px"> 
                  <el-form :rules="rules" ref="modifyForm" :model="modifyForm" label-width="100px" >
                  <el-form-item label="部门ID">
                      <el-input v-model="modifyForm.id" readonly="true">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="部门名称" prop="name">
                      <el-input v-model="modifyForm.name">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="部门编号" prop="code">
                      <el-input v-model="modifyForm.code">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="助记码" prop="mnemonicCode">
                      <el-input v-model="modifyForm.mnemonicCode">{{}}</el-input>
                  </el-form-item>
                  <!-- <el-form-item label="部门等级" prop="level">
                      <el-select v-model="modifyForm.level" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in FormOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item> -->

                  <el-form-item label="部门等级" prop="level">
                      <el-select v-model="modifyForm.level" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in dictionary"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="所属公司"  prop="companyId"> 
                       <el-select v-model="modifyForm.companyId" placeholder="请选择" style="width:100%" @change="reflashDepartemntModif()">
                        <el-option
                          v-for="item in companyIdAndName" 
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="上级部门">
                       <el-select v-model="modifyForm.parentId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in DepartmentIdAndName"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="负责人" prop="master">
                      <el-input v-model="modifyForm.master"></el-input>
                  </el-form-item>
            


                  <el-form-item label="描述" >
                      <el-input type="textarea" v-model="modifyForm.descript"></el-input>
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

          
   </div> 


</template>

<script>
export default {
    data(){
        return{
        //这是表格的测试数据
        tableData: [],
        multipleSelection: [],

        rules: {
        name: [
          { required: true, message: '请输入公司名称！', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入公司编号！', trigger: 'blur' }
        ],
        mnemonicCode: [
          { required: true, message: '请输入助记码！', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择部门等级！', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择上级部门！', trigger: 'blur' }
        ],
        master: [
          { required: true, message: '请输入法人', trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请输入所属公司', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ]
        },
       
       Leveloptions: [{
          value: null,
          label: ''
        },
        {
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }],
        level: null,

        FormOptions: [
        {
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }],


        dialogTableVisible2: false,
        dialogFormVisible2: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        modifyForm: {
          id:'',
          companyId:'',
          mnemonicCode:'',
          name: '',
          code: '',
          level:'',
          parentId:'',
          master:'',
          descript:'',
          status:'',
          version:"123",
          createdBy:'',
          createdTime:'',
        },
        formLabelWidth: '120px',
        addForm:{
          id:'',
          companyId:'',
          mnemonicCode:'',
          name: '',
          code: '',
          level:'',
          parentId:'',
          master:'',
          descript:'',
          status:'',
          version:"123"

        },

        //页数和size测试数据
        page:1,
        pageSize:5,
        name:'',
        count:0,

        //删除提示的
        dialogVisible: false,
        deleteId:"",
        deleteVersion:-1,
        

        //公司名称的绑定变量
        companyName:"",
        companyId:"",

        companyIdAndName:[],
        DepartmentIdAndName:[],

        //部门等级
        dictionary:[],
        }
    },
    props:[]
    ,
    methods:{
      evaluationModifyForm(row){
        if(this.$refs['modifyForm'] != undefined ){
              this.$refs['modifyForm'].clearValidate()
          }
        if(this.companyIdAndName.length != 1){
        this.getDepartmentIdAndNameByCompanyID(row.companyId.id)
          
        }

        this.modifyForm.id=row.id,
        this.modifyForm.companyId=row.companyId.id,
        //this.companyName=row.companyId.name
        this.modifyForm.name=row.name,
        this.modifyForm.code=row.code,
        this.modifyForm.mnemonicCode=row.mnemonicCode,
        this.modifyForm.level=row.level
        if (row.parentId == null){
           this.modifyForm.parentId=null
        }
        else{
           this.modifyForm.parentId=row.parentId.id
        }
        
        this.modifyForm.master=row.master,
        this.modifyForm.descript=row.descript,
        this.modifyForm.version=row.version,
        this.modifyForm.status=row.status,
        this.modifyForm.createdBy=row.createdBy,
        this.modifyForm.createdTime=row.createdTime
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
        var level;
        if(this.level==""){
          level=null;
        }
        else{
          level=this.level;
        }
          this.$ajax.post(
      'gateway/systemModule/doQueryDepartmentByPage',
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
              pageSize: this.pageSize,
              level:level
            }
          }
            

        
      }
    ).then(
      (response) => {
        this.count =response.data.body.data.count
        this.tableData = response.data.body.data.departmentList
        
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
          alert("没有部门被选中！")
        }
        else{
          alert("一次只能修改一个部门！")
        }
      }
      ,
      updateDepartmentData(){
          this.$ajax.post(
            'gateway/systemModule/doUpdateDepartment',
            {
              
              
                head: {
                  version: '1',
                  token:this.getCookie(),
                  businessType: '12',
                  equipId: '1',
                  equipType: 1,
                  encrypt: 1
                },
                body: {
                  data: {
                    // department:this.modifyForm
                    id: this.modifyForm.id,
                    companyId:  this.modifyForm.companyId,
                    mnemonicCode:  this.modifyForm.mnemonicCode,
                    name:  this.modifyForm.name,
                    code:  this.modifyForm.code,
                    level:  this.modifyForm.level,
                    parentId:  this.modifyForm.parentId,
                    master:  this.modifyForm.master,
                    descript:  this.modifyForm.descript,
                    status:  this.modifyForm.status,
                    version: this.modifyForm.version
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
          this.addForm.id=''
          if(this.companyIdAndName.length == 1){
            this.addForm.companyId= this.companyIdAndName[0].value;
          }
          else{
            this.addForm.companyId=''
            this.DepartmentIdAndName=[];

          }
          
          this.addForm.mnemonicCode='',
          this.addForm.name='',
          this.addForm.code= '',
          this.addForm.level='',
          this.addForm.parentId='',
          this.addForm.master='',
          this.addForm.descript='',
          this.addForm.status='',
          this.addForm.version=""
          this.dialogFormVisible = true;

      }
      ,

      addDepartmentData(){
        this.$ajax.post(
            'gateway/systemModule/doAddDepartment',
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
                    companyId:  this.addForm.companyId,
                    mnemonicCode:  this.addForm.mnemonicCode,
                    name:  this.addForm.name,
                    code:  this.addForm.code,
                    level:  this.addForm.level,
                    parentId:  this.addForm.parentId,
                    master:  this.addForm.master,
                    descript:  this.addForm.descript,
                    status:  this.addForm.status,
       
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
      deleteDepartmentData(){
        this.dialogVisible = false;
        this.$ajax.post(
              'gateway/systemModule/doDeleteDepartment',
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
          this.$message({
              message: "没有部门被选中",
              type: 'info'
          })
        }
        else{
          this.$confirm('确定删除选择数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var deleteList=[];
            this.multipleSelection.forEach(element => {
              deleteList.push({id:element.id,version:element.version})
            });
            this.$ajax.post(
                'gateway/systemModule/doDeleteDepartmentList',
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
                                  departmentList:deleteList
                                  
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
                  alert("错误码："+response.data.head.responseCode+"\n"+response.data.head.message);
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
      },
      getParentNameById(parentId){
        this.options.forEach(element => {
          if(element.value == parentId){
            return element.label;
          }
        });

      },


      updateSubmitForm() {
        this.$refs['modifyForm'].validate((valid) => {
          if (valid) {
            this.updateDepartmentData();
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      addSubmitForm() {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            this.addDepartmentData();
            
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
        this.DepartmentIdAndName.unshift({value:null,label:""})

        
      }, function () { 
        console.log('error')
      }
    )
    },

      reflashDepartemntAdd(){
        this.getDepartmentIdAndNameByCompanyID(this.addForm.companyId)

        this.addForm.parentId = null
      },

      reflashDepartemntModif(){
        this.getDepartmentIdAndNameByCompanyID(this.modifyForm.companyId)
        this.modifyForm.parentId =null

      },

      getDictionaryOptionsByCategory(){
            this.$ajax.post(
              'gateway/systemModule/doQueryDictionaryOptionsByCategory',
              {
                //params: {
                  
                            head: {
                              version: '1',
                              token:this.getCookie(),
                              businessType: '12',
                              equipId: '1',
                              equipType: 1,
                              encrypt: 1
                            },
                            body: {
                              data: {
                                category:"部门等级"
                              }
                            }
                  
              //  }
           
              }
            ).then(
              (response) => {
              if(response.data.head.responseCode == "0"){
                this.dictionary = response.data.body.data
                this.Leveloptions = JSON.parse(JSON.stringify(this.dictionary))
                this.Leveloptions.unshift({label:'',value:null})
              }
            }, function () { 
             
              console.log('error')
            }
            )
      },

            //格式化日期
      formatType(row, column) {
        if(row[column.property] != null){
          let data = row[column.property]
          //let dt = new Date(data)
          let type = null;
          this.dictionary.forEach(element => {
            if(element.value == data){
              type = element.label;
              return
            }
          });
          
          return type;

        }
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
        this.getDictionaryOptionsByCategory();
        this.getdata(); 
        this.getCompanyIdAndName()
      }
}
</script>

<style scoped>
#selector{
  width: 100%;
  margin-bottom: 30px;
}
</style>
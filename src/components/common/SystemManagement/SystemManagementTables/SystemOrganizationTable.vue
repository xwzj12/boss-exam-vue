<template>
  <div>
     <div style="float:left;margin-bottom:20px;">
        <div id="selector">
            <span>组织名称:</span>
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
                type="selection"
                reserve-selection="true"
                width="55">
                </el-table-column>
                <el-table-column
                label="组织机构"
                width="150">
                <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                prop="code"
                label="机构编号"
                width="150">
                </el-table-column>
                <el-table-column
                prop="master"
                label="负责人"
                width="150">
                </el-table-column>
                <el-table-column
                prop="tel"
                label="电话"
                width="150">
                </el-table-column><el-table-column
                prop="address"
                label="地址"
                width="150">
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
                <el-button type="primary" @click="deleteOrganizationData">确 定</el-button>
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
                <el-dialog title="增加组织" :visible.sync="dialogFormVisible" width="800px"> 
                  <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px" >
                  <el-form-item label="机构名称" prop="name" >
                      <el-input v-model="addForm.name" id="addRepeatName">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="机构编号" prop="code">
                      <el-input v-model="addForm.code" id="addRepeatCode">{{}}</el-input>
                  </el-form-item> 
                  <el-form-item label="负责人" prop="master">
                      <el-input v-model="addForm.master"></el-input>
                   </el-form-item>
            
                  <el-form-item label="电话" prop="tel">
                      <el-input type="input" v-model="addForm.tel"></el-input>
                  </el-form-item>

                  <el-form-item label="地址" prop="address">
                      <el-input type="input" v-model="addForm.address"></el-input>
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
              <el-dialog title="编辑组织" :visible.sync="dialogFormVisible2" width="800px"> 
                  <el-form ref="modifyForm" :rules="rules" :model="modifyForm" label-width="100px" >
                  <el-form-item label="组织ID" >
                      <el-input v-model="modifyForm.id" readonly="true">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="机构名称" prop="name">
                      <el-input v-model="modifyForm.name" id="modifyRepeatName">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="机构编号" prop="code">
                      <el-input v-model="modifyForm.code" id="modifyRepeatCode">{{}}</el-input>
                  </el-form-item>
                  
                  <el-form-item label="负责人" prop="master">
                      <el-input v-model="modifyForm.master"></el-input>
                  </el-form-item>

            
                  <el-form-item label="电话" prop="tel">
                      <el-input type="input" v-model="modifyForm.tel"></el-input>
                  </el-form-item>

                   <el-form-item label="地址" prop="address">
                      <el-input type="input" v-model="modifyForm.address"></el-input>
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
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        mnemonicCode: [
          { required: true, message: '请输入助记码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入机构编号', trigger: 'blur' }
        ],
        master: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        tax: [
          { required: true, message: '请输入税号', trigger: 'blur' }
        ],
        fax: [
          { required: true, message: '请输入传真地址', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        website: [
          { required: true, message: '请输入网站', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请输入所属机构', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ]
        },
       
        dialogTableVisible2: false,
        dialogFormVisible2: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        modifyForm: {
          id:'',
          name: '',
          code: '',
          master:'',
          tel:'',
          address:'',
          status:'',
          version:""
        },
        formLabelWidth: '120px',
        addForm:{
          name: '',
          code: '',
          master:'',
          tel:'',
          address:'',
          status:''

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



 
        }
    },
    methods:{
      evaluationModifyForm(row){
        if(this.$refs['modifyForm'] != undefined ){
              this.$refs['modifyForm'].clearValidate()
          }
        this.modifyForm.id=row.id,
        this.modifyForm.name=row.name,
        this.modifyForm.code=row.code,
        this.modifyForm.mnemonicCode=row.mnemonicCode,
        this.modifyForm.master=row.master,
        this.modifyForm.tax=row.tax,
        this.modifyForm.fax=row.fax,
        this.modifyForm.tel=row.tel,
        this.modifyForm.website=row.website,
        this.modifyForm.orgId=row.orgId,
        this.modifyForm.email=row.email,
        this.modifyForm.status=row.status,
        this.modifyForm.version=row.version,
        this.modifyForm.address=row.address
      },
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
          this.$ajax.post(
      'gateway/systemModule/doQueryOrganizationByPage',
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
        this.tableData = response.data.body.data.organizationList
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
      },

      updateOrganizationData(){
          this.$ajax.post(
            'gateway/systemModule/doUpdateOrganization',
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
                    // company:this.modifyForm,
                    id:this.modifyForm.id,
                    name:this.modifyForm.name,
                    code:this.modifyForm.code,
                    master:this.modifyForm.master,
                    tel:this.modifyForm.tel,
                    address:this.modifyForm.address,
                    status:this.modifyForm.status,
                    version:this.modifyForm.version,
                    
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
              else if(response.data.head.responseCode == "250903-2"){
                document.getElementById("modifyRepeatCode").focus()
              }
              else if(response.data.head.responseCode == "250903-1"){
                document.getElementById("modifyRepeatName").focus()
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
          
          this.addForm.name = '',
          this.addForm.code= '',
          this.addForm.master='',
          this.addForm.tel='',
          this.addForm.address='',
          this.addForm.status=1,
          this.dialogFormVisible = true;

      }
      ,

      addOrganizationData(){
        this.$ajax.post(
            'gateway/systemModule/doAddOrganization',
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
                    name:this.addForm.name,
                    code:this.addForm.code,
                    mnemonicCode:this.addForm.mnemonicCode,
                    master:this.addForm.master,
                    tax:this.addForm.tax,
                    fax:this.addForm.fax,
                    tel:this.addForm.tel,
                    address:this.addForm.address,
                    email:this.addForm.email,
                    website:this.addForm.website,
                    status:this.addForm.status,
                    orgId:this.addForm.orgId
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
              else if(response.data.head.responseCode == "250901-2"){
                document.getElementById("addRepeatCode").focus()
              }
              else if(response.data.head.responseCode == "250901-1"){
                document.getElementById("addRepeatName").focus()
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
      deleteOrganizationData(){
        this.dialogVisible = false;
        this.$ajax.post(
              'gateway/systemModule/doDeleteOrganization',
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
                'gateway/systemModule/doDeleteOrganizationList',
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
                                  organizationList:deleteList
                                  
                                }
                              }
                    
                //  }
            
                }
              ).then(
                (response) => {
              if(response.data.head.responseCode == "0"){
                this.$refs.multipleTable.clearSelection();
                this.reflashTree();
                this.getdata();
                alert(response.data.head.message);
                
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


    updateSubmitForm() {
      this.$refs['modifyForm'].validate((valid) => {
        if (valid) {
          this.updateOrganizationData();
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    addSubmitForm() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addOrganizationData();
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
      }
}
</script>

<style scoped>
#selector{
  width: 400px;
  margin-bottom: 30px;
}
</style>
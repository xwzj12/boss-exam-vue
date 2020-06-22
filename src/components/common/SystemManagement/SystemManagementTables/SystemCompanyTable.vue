<template>
  <div>
     <div style="float:left;margin-bottom:20px;">
        <div id="selector" style="floar:left">
            <span>公司名称:</span>
            <el-input v-model="name" placeholder="请输入内容" style="width:200px"></el-input>
            <span>组织名称:</span>
            <el-input v-model="orgName" placeholder="请输入内容" style="width:200px"></el-input>
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
                label="公司名称"
                width="100">
                <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                prop="code"
                label="公司编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="mnemonicCode"
                label="助记码"
                width="100">
                </el-table-column>
                <el-table-column
                prop="master"
                label="法人"
                width="100">
                </el-table-column><el-table-column
                prop="orgId.name"
                label="所在机构"
                width="100">
                </el-table-column><el-table-column
                prop="tax"
                label="税号"
                width="100">
                </el-table-column><el-table-column
                prop="fax"
                label="传真"
                width="100">
                </el-table-column>
                <el-table-column
                prop="tel"
                label="电话"
                width="100">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址"
                width="100">
                </el-table-column>
                <el-table-column 
                prop="email"
                label="邮箱"
                show-overflow-tooltip>
                </el-table-column>
                    <el-table-column 
                prop="website"
                label="网站"
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
                <el-button type="primary" @click="deleteCompanyData">确 定</el-button>
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
                <el-dialog title="增加公司" :visible.sync="dialogFormVisible" width="800px"> 
                  <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px" >
                  <el-form-item label="公司名称" prop="name" >
                      <el-input v-model="addForm.name" id="addRepeatName">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="公司编号" prop="code">
                      <el-input v-model="addForm.code" id="addRepeatCode">{{}}</el-input>
                  </el-form-item> 
                  <el-form-item label="助记码" readonly="true" prop="mnemonicCode">
                      <el-input v-model="addForm.mnemonicCode">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="法人" prop="master">
                      <el-input v-model="addForm.master"></el-input>
                  </el-form-item>
                  <el-form-item label="税号" prop="tax">
                      <el-input v-model="addForm.tax"></el-input>
                  </el-form-item>
                  <el-form-item label="传真" prop="fax">
                      <el-input v-model="addForm.fax"></el-input>
                  </el-form-item>
            
                  <el-form-item label="电话" prop="tel">
                      <el-input type="input" v-model="addForm.tel"></el-input>
                  </el-form-item>

                  <el-form-item label="地址" prop="address">
                      <el-input type="input" v-model="addForm.address"></el-input>
                  </el-form-item>

                  <el-form-item label="网站" prop="website">
                      <el-input type="input" v-model="addForm.website"></el-input>
                  </el-form-item>

                  
                  <el-form-item label="所属机构" prop="orgId" >
                       <el-select v-model="addForm.orgId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in orgIdAndName"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  

                  <el-form-item label="邮箱" prop="email">
                      <el-input type="input" v-model="addForm.email"></el-input>
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
              <el-dialog title="编辑公司" :visible.sync="dialogFormVisible2" width="800px"> 
                  <el-form ref="modifyForm" :rules="rules" :model="modifyForm" label-width="100px" >
                  <el-form-item label="公司ID" >
                      <el-input v-model="modifyForm.id" readonly="true">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="公司名称" prop="name">
                      <el-input v-model="modifyForm.name" id="modifyRepeatName">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="公司编号" prop="code">
                      <el-input v-model="modifyForm.code" id="modifyRepeatCode">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="助记码" readonly="true" prop="mnemonicCode">
                      <el-input v-model="modifyForm.mnemonicCode">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="法人" prop="master">
                      <el-input v-model="modifyForm.master"></el-input>
                  </el-form-item>
                  <el-form-item label="税号" prop="tax">
                      <el-input v-model="modifyForm.tax"></el-input>
                  </el-form-item>
                  <el-form-item label="传真" prop="fax">
                      <el-input v-model="modifyForm.fax"></el-input>
                  </el-form-item>
            
                  <el-form-item label="电话" prop="tel">
                      <el-input type="input" v-model="modifyForm.tel"></el-input>
                  </el-form-item>

                   <el-form-item label="地址" prop="address">
                      <el-input type="input" v-model="modifyForm.address"></el-input>
                  </el-form-item>

                  <el-form-item label="网站" prop="website">
                      <el-input type="input" v-model="modifyForm.website"></el-input>
                  </el-form-item>

                  <el-form-item label="邮箱" prop="email">
                      <el-input type="input" v-model="modifyForm.email"></el-input>
                  </el-form-item>

                  <el-form-item label="所属机构" prop="orgId" >
                       <el-select v-model="modifyForm.orgId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in orgIdAndName"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
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
        mnemonicCode: [
          { required: true, message: '请输入助记码！', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入公司编号！', trigger: 'blur' }
        ],
        master: [
          { required: true, message: '请输入法人', trigger: 'blur' }
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
        ],
        orgId: [
          { required: true, message: '请选择机构', trigger: 'blur' }
        ]
        },
       
        dialogTableVisible2: false,
        dialogFormVisible2: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        modifyForm: {
          id:'',
          orgId:'',
          name: '',
          code: '',
          mnemonicCode:'',
          master:'',
          tax:'',
          fax:'',
          tel:'',
          address:'',
          email:'',
          website:'',
          status:'',
          version:"123"
        },
        formLabelWidth: '120px',
        addForm:{
          id:'',
          orgId:'',
          name: '',
          code: '',
          mnemonicCode:'',
          master:'',
          tax:'',
          fax:'',
          tel:'',
          address:'',
          email:'',
          website:'',
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

        //写死的机构名
        //已更改为查询的机构名
        orgName:null,
        orgId:null,

        //组织
        orgIdAndName:[]

 
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
        this.modifyForm.orgId=row.orgId.id,
        this.modifyForm.email=row.email,
        this.modifyForm.status=row.status,
        this.modifyForm.version=row.version,
        this.modifyForm.address=row.address
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
          this.$ajax.post(
      'gateway/systemModule/doQueryCompanyByPage',
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
              orgName:this.orgName,
              page: this.page,
              pageSize: this.pageSize
            }
          }
            

        
      }
    ).then(
      (response) => {
        this.count =response.data.body.data.count
        this.tableData = response.data.body.data.companyList
        console.log(response.data.body.data)
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
        // console.log(`每页 ${val} 条`);
        this.pageSize=val;
        this.getdata();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page=val;
        this.getdata();
        
      },
      queryDataByName(){
        // console.log("搜索名:"+this.name);
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
      updateCompanyData(){
          this.$ajax.post(
            'gateway/systemModule/doUpdateCompany',
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
                    mnemonicCode:this.modifyForm.mnemonicCode,
                    master:this.modifyForm.master,
                    tax:this.modifyForm.tax,
                    fax:this.modifyForm.fax,
                    tel:this.modifyForm.tel,
                    address:this.modifyForm.address,
                    email:this.modifyForm.email,
                    website:this.modifyForm.website,
                    status:this.modifyForm.status,
                    version:this.modifyForm.version,
                    orgId:this.modifyForm.orgId
                    
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
              else if(response.data.head.responseCode == "250103-2"){
                document.getElementById("modifyRepeatCode").focus()
              }
              else if(response.data.head.responseCode == "250103-1"){
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
          this.addForm.id=''
          if(this.orgIdAndName.length == 1){
            this.addForm.orgId = this.orgIdAndName[0].value
          }
          else{
            // 根据测试需求，下拉框都会显示第一个组织
            this.addForm.orgId = this.orgIdAndName[0].value
            // this.addForm.orgId=''
          }
          this.addForm.name = '',
          this.addForm.code= '',
          this.addForm.mnemonicCode='',
          this.addForm.master='',
          this.addForm.tax='',
          this.addForm.fax='',
          this.addForm.tel='',
          this.addForm.address='',
          this.addForm.email='',
          this.addForm.website='',
          this.addForm.status='',
          this.addForm.version="",
          this.dialogFormVisible = true;

      }
      ,

      addCompanyData(){
        this.$ajax.post(
            'gateway/systemModule/doAddCompany',
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
                    //company:this.addForm
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
              else if(response.data.head.responseCode == "250101-2"){
                document.getElementById("addRepeatCode").focus()
              }
              else if(response.data.head.responseCode == "250101-1"){
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
      deleteCompanyData(){
        this.dialogVisible = false;
        this.$ajax.post(
              'gateway/systemModule/doDeleteCompany',
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
                this.$refs.multipleTable.clearSelection();
                this.reflashTree();
                this.getdata();
                alert(response.data.head.message);

              }
              else{
                this.$message({
                        message: response.data.head.message,
                        type: 'error'
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
                'gateway/systemModule/doDeleteCompanyList',
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
                                  companyList:deleteList
                                  
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


    updateSubmitForm() {
      this.$refs['modifyForm'].validate((valid) => {
        if (valid) {
          if(this.checkFax(this.modifyForm.fax) && this.checkTel(this.modifyForm.tel) &&
             this.checkEmail(this.modifyForm.email) && this.checkUrl(this.modifyForm.website)){
              this.updateCompanyData();

          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    addSubmitForm() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          if( this.checkFax(this.addForm.fax) && this.checkTel(this.addForm.tel) &&
              this.checkEmail(this.addForm.email) && this.checkUrl(this.addForm.website) ){
              this.addCompanyData();
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //验证邮箱规范
    checkEmail(email){
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (email != '' && !regEmail.test(email)) {
                    this.$message({
                        message: '邮箱格式不正确，邮箱格式如：12345678@qq.com',
                        type: 'error'
                    })
                    return false;

                }
        return true;
    },
     //验证传真规范
    checkFax(fax){
        var regFax = /^(\d{3,4}-)?\d{7,8}$/;
        if (!regFax.test(fax)) {
                    this.$message({
                        message: '传真格式不正确，传真格式如:0376-1234567',
                        type: 'error'
                    })
                    return false;

                }
        return true;
    },
     //验证网站规范
    checkUrl(url){
        var regURL =/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if (!regURL.test(url)) {
                    this.$message({
                        message: '网站格式不正确,网站格式如:https://www.baidu.com',
                        type: 'error'
                    })
                    return false;

                }
        return true;
    },

     //验证电话规范
    checkTel(tel){
        var regTel =/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,4}))?$/;
        if (!regTel.test(tel)) {
                    this.$message({
                        message: '电话格式不正确,电话格式如:0591-12345678',
                        type: 'error'
                    })
                    return false;

                }
        return true;
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
      console.log("response.data.head.message="+response.data.head.message)
      this.orgIdAndName =response.data.body.data
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
        this.getOrgIdAndName();
      }
}
</script>

<style scoped>
#selector{
  width: 100%;
  margin-bottom: 30px;
}
</style>
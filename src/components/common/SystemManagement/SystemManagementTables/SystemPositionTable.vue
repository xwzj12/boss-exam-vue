<template>
  <div>
     <div style="float:left;margin-bottom:20px;">
        <div id="selector">
            <span>职位名称:</span>
            <el-input v-model="name" placeholder="请输入内容" style="width:200px;margin-right:20px"></el-input>
            <span>是否启用:</span>
            <el-select v-model="status" placeholder="请选择" style="width:100px;margin-right:20px">
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
                label="公司"
                width="150">
                <template slot-scope="scope">{{ scope.row.companyId.name }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="职位名称"
                width="150">
                </el-table-column>
                <el-table-column
                prop="code"
                label="职位代码"
                width="150">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="备注"
                width="150">
                <!-- <template slot-scope="scope">
                  <span>
                    {{scope.row.updatedTime.getFullYear() + '-' + (scope.row.updatedTime.getMonth() + 1) + '-' + scope.row.updatedTime.getDate() + ' ' + scope.row.updatedTime.getHours() + ':' + scope.row.updatedTime.getMinutes() + ':' + scope.row.updatedTime.getSeconds()}}
                  </span>
                  
                </template> -->
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
                <el-button type="primary" @click="deletePositionData">确 定</el-button>
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
                <el-dialog title="增加职位" :visible.sync="dialogFormVisible" width="800px"> 
                  <el-form ref="addForm" :model="addForm" label-width="100px" :rules="rules" >
                  
                  <el-form-item label="所属公司" prop="companyId">
                       <el-select v-model="addForm.companyId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in companyNameAndId"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="职位名" prop="name">
                      <el-input v-model="addForm.name">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="职位代码" readonly="true" prop="code">
                      <el-input v-model="addForm.code">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                      <el-input type="textarea" v-model="addForm.remark"></el-input>
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
              <el-dialog title="编辑职位" :visible.sync="dialogFormVisible2" width="800px"> 
                  <el-form ref="modifyForm" :model="modifyForm" label-width="100px" :rules="rules" >
                  <el-form-item label="职位ID" >
                      <el-input v-model="modifyForm.id" readonly="true">{{}}</el-input>
                  </el-form-item>

                  <el-form-item label="所属公司" prop="companyId">
                       <el-select v-model="modifyForm.companyId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in companyNameAndId"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>


                  <el-form-item label="职位名" prop="name">
                      <el-input v-model="modifyForm.name">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="职位代码" prop="code">
                      <el-input v-model="modifyForm.code">{{}}</el-input>
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
          companyId:'',
          name:'',
          code:'',
          remark:'',
          orgId:'',
          version:"",
          status:''
        },
        formLabelWidth: '120px',
        addForm:{
          id:'',
          companyId:'',
          name:'',
          code:'',
          remark:'',
          orgId:'',
          version:"",
          status:''

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

        //启用条件
        status:1,
        statusList:[
          {label:"全部",value:null},
          {label:"是",value:1},
          {label:"否",value:0},
        ],



        rules: {
          companyId: [
            { required: true, message: '请选择公司类型！', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入职位名!', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入职位代码!', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择是否启用!', trigger: 'change' }
          ]
        },

        //存储公司用的
        companyId:null,
        companyName:null,

        //公司id和名字
        companyNameAndId:[],
 
        }
    },
    methods:{
      evaluationModifyForm(row){
        if(this.$refs['modifyForm'] != undefined ){
              this.$refs['modifyForm'].clearValidate()
          }
        this.modifyForm.id=row.id,
        this.modifyForm.companyId=row.companyId.id,
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
      'gateway/systemModule/doQueryPositionByPage',
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
              status:this.status,
              page: this.page,
              pageSize: this.pageSize
            }
          }
            

        
      }
    ).then(
      (response) => {
        this.count =response.data.body.data.count
        this.tableData = response.data.body.data.positionList
        
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
          alert("请选中一行数据！")
        }
        else{
          alert("只能选择一条数据，请重新选择")
        }
      }
      ,
      updatePositionData(){
          this.$ajax.post(
            'gateway/systemModule/doUpdatePosition',
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
                    // position:this.modifyForm
                    id:    this.modifyForm.id,
                    companyId:    this.modifyForm.companyId,
                    name:    this.modifyForm.name,
                    code:    this.modifyForm.code,
                    remark:    this.modifyForm.remark,
                    version:    this.modifyForm.version,
                    status:    this.modifyForm.status
                  }
                }
                  

              
            }
          ).then(
            (response) => {
              alert(response.data.head.message);
              if(response.data.head.responseCode == "0"){
                this.$refs.multipleTable.clearSelection();
                this.dialogFormVisible2=false;
                this.getdata();
                this.reflashTree();
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
          this.addForm.id="",
          this.addForm.companyId=''
          if(this.companyNameAndId.length == 1){
            this.addForm.companyId = this.companyNameAndId[0].value
          }
          else{
             this.addForm.companyId = ''
          }
          this.addForm.name="",
          this.addForm.code="",
          this.addForm.remark="",
          this.addForm.version="",
          this.addForm.status= 1
          this.dialogFormVisible = true;

      }
      ,

      addPositionData(){
        this.$ajax.post(
            'gateway/systemModule/doAddPosition',
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
                    // position:this.addForm
                    companyId:this.addForm.companyId,
                    name:  this.addForm.name,
                    code:  this.addForm.code,
                    remark:  this.addForm.remark,
                    status: this.addForm.status

                  }
                }
                  

              
            }
          ).then(
            (response) => {
        console.log(response)
              alert(response.data.head.message);
              if(response.data.head.responseCode == "0"){
                this.dialogFormVisible = false;
                this.getdata();
                this.reflashTree();
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
      deletePositionData(){
        this.dialogVisible = false;
        this.$ajax.post(
              'gateway/systemModule/doDeletePosition',
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
                alert("错误码："+response.data.head.responseCode+"\n"+response.data.head.message); 
                
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
                'gateway/systemModule/doDeletePositionList',
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
                                  positionList:deleteList
                                  
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
      },


    updateSubmitForm() {
      this.$refs['modifyForm'].validate((valid) => {
        if (valid) {
          this.updatePositionData();
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    addSubmitForm() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addPositionData();
          
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
                        
                        
                      }
                    }
          
      //  }
    
      }
    ).then(
      (response) => {
      this.companyNameAndId =response.data.body.data
      
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
}
</script>

<style scoped>
#selector{
  width: 100%;
  margin-bottom: 30px;
}
</style>
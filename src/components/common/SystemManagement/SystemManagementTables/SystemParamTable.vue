<template>
  <div>
     <div style="float:left;margin-bottom:20px;">
        <div id="selector">
            <span>参数类型:</span>
            <!-- <el-input v-model="paramType" placeholder="请输入内容" style="width:200px"></el-input> -->
            <el-select v-model="paramType" placeholder="请选择">
              <el-option
                v-for="item in queryDictionary"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span>参数项:</span>
            <el-input v-model="param" placeholder="请输入内容" style="width:200px"></el-input>
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
                >禁用</el-button>

                       
                <el-upload
                    style="float:left"
                    class="upload"
                    action=""
                    :multiple="false"
                    :show-file-list="false"
                    accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    :http-request="httpRequest">
                    <el-button
                      size="mini"
                      type="success"
                      icon="el-icon-download"
                    > <a href="javascript:void(0)" style="text-decoration:none"><font color="white">导入</font></a>
                    </el-button>   
                 </el-upload>
                
                
                    <el-button
                      size="mini"
                      type="info"
                      icon="el-icon-upload2"
                      @click="exp()"
                    > <a id="export"><font color="white">导出</font></a>
                    </el-button> 
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
                label="参数类型"
                :formatter="formatType"
                prop="paramType"
                width="150">
                
                </el-table-column>
                <el-table-column
                prop="param"
                label="参数项"
                width="150">
                </el-table-column>
                <el-table-column
                prop="value"
                label="参数值"
                width="150">
                </el-table-column>
                <el-table-column
                prop="updatedTime"
                :formatter="formatDate"
                label="更新时间"
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
                        :disabled="scope.row.status == 1 ? false:true"
                      >禁用</el-button>
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
              <span>确认禁用？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteSystemParamData">确 定</el-button>
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
                <el-dialog title="增加系统参数" :visible.sync="dialogFormVisible" width="800px"> 
                  <el-form ref="addForm" :model="addForm" label-width="100px" :rules="rules">
                  <!-- <el-form-item label="参数类型" prop="paramType" >
                      <el-input v-model="addForm.paramType">{{}}</el-input>
                  </el-form-item> -->
                  <el-form-item label="参数类型" prop="paramType" >
                    <el-select v-model="addForm.paramType" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in dictionary"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                  </el-form-item>
                  <el-form-item label="参数项" prop="param">
                      <el-input v-model="addForm.param">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="参数值" readonly="true" prop="value">
                      <el-input v-model="addForm.value">{{}}</el-input>
                  </el-form-item>

                  <el-form-item label="所属机构"  prop="orgId">
                       <el-select v-model="addForm.orgId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in orgIdAndName"
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
              <el-dialog title="编辑系统参数" :visible.sync="dialogFormVisible2" width="800px"> 
                  <el-form ref="modifyForm" :model="modifyForm" label-width="100px" :rules="rules">
                  <el-form-item label="参数ID" >
                      <el-input v-model="modifyForm.id" readonly="true">{{}}</el-input>
                  </el-form-item>
                  <!-- <el-form-item label="参数类型" prop="paramType" >
                      <el-input v-model="modifyForm.paramType">{{}}</el-input>
                  </el-form-item> -->
                  <el-form-item label="参数类型" prop="paramType" >
                    <el-select v-model="modifyForm.paramType" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in dictionary"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                  </el-form-item>
                  <el-form-item label="参数项" prop="param">
                      <el-input v-model="modifyForm.param">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="参数值" readonly="true" prop="value">
                      <el-input v-model="modifyForm.value">{{}}</el-input>
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

                  
                  <el-form-item label="是否启用">
                      <el-radio-group v-model="modifyForm.status" prop="status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  
                 <div style="margin-left:60%">
                  <el-form-item>
                      <el-button type="primary" @click="updateSubmitForm()">保存</el-button>
                      <!-- updateSystemParamData() -->
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
import XLSX from 'xlsx' 
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
          orgId:'',
          paramType:'',
          param:'',
          value:'',
          status:'',
          version:""
        },
        formLabelWidth: '120px',
        addForm:{
          id:'',
          orgId:'',
          paramType:'',
          param:'',
          value:'',
          status:'',
          version:""
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

        //规则
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          paramType: [
            { required: true, message: '请选择参数类型！', trigger: 'blur' }
          ],
          param: [
            { required: true, message: '请输入参数项!', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '请输入参数值!', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择是否启用!', trigger: 'change' }
          ],
          orgId: [
            { required: true, message: '请选择组织机构!', trigger: 'change' }
          ]
        },

        //组织id和name
        organizationId:null,
        organizationName:null,
        //组织
        orgIdAndName:[],

        //参数类型
        dictionary:[],
        queryDictionary:[]
        }

      
        
    },
    methods:{
      evaluationModifyForm(row){
        if(this.$refs['modifyForm'] != undefined ){
              this.$refs['modifyForm'].clearValidate()
          }
        this.modifyForm.id=row.id,
        //
        this.modifyForm.orgId=row.orgId,
        this.modifyForm.paramType=row.paramType,
        this.modifyForm.param=row.param,
        this.modifyForm.value=row.value,
        this.modifyForm.status=row.status,
        this.modifyForm.version=row.version
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
      'gateway/systemModule/doQuerySystemParamByPage',
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
              param:this.param,
              paramType:this.paramType,
              page: this.page,
              pageSize: this.pageSize
            }
          }
            

        
      }
    ).then(
      (response) => {
        this.count =response.data.body.data.count
        this.tableData = response.data.body.data.systemParamList
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
      updateSystemParamData(){
          this.$ajax.post(
            'gateway/systemModule/doUpdateSystemParam',
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
                    // systemParam:this.modifyForm
                      id: this.modifyForm.id,
                      orgId:this.modifyForm.orgId,
                      paramType:  this.modifyForm.paramType,
                      param:  this.modifyForm.param,
                      value:  this.modifyForm.value,
                      status:  this.modifyForm.status,
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
              //this.dialogFormVisible2=false;
              console.log('error')
            }
          )
      },
      
      clearAddForm(){
          if(this.$refs['addForm'] != undefined ){
              this.$refs['addForm'].clearValidate()
          }
          
          this.addForm.id="",
          this.addForm.paramType="",
          this.addForm.param="",
          this.addForm.value="",
          this.addForm.status=1,
          this.addForm.version=""
          if(this.orgIdAndName.length == 1){
            this.addForm.orgId = this.orgIdAndName[0].value;
          }
          else{
            this.addForm.orgId=''
          }
          this.dialogFormVisible = true;

      }
      ,

      addSystemParamData(){
        this.$ajax.post(
            'gateway/systemModule/doAddSystemParam',
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
                    // systemParam:this.addForm
                      orgId:this.addForm.orgId,
                      paramType:  this.addForm.paramType,
                      param:  this.addForm.param,
                      value:  this.addForm.value,
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
      deleteSystemParamData(){
        this.dialogVisible = false;
        this.$ajax.post(
              'gateway/systemModule/doDeleteSystemParam',
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
              alert("禁用失败")
              // alert("删除失败")
              console.log('error')
            }
            )
      },
      checkDeleteSelect(){
        if(this.multipleSelection.length == 0){
          alert("请选择数据！")
        }
        else{
          let flag = 0
          this.multipleSelection.forEach(element => {
              if(element.status == 0){
                 flag = 1
                 return
              }
            });
          if(flag == 1){
            alert("请不要勾选已禁用的数据")
            return
          }
          this.$confirm('确定禁用选中数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var deleteList=[];
            this.multipleSelection.forEach(element => {
              deleteList.push({id:element.id,version:element.version})
            });
            this.$ajax.post(
                'gateway/systemModule/doDeleteSystemParamList',
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
                                  systemParamList:deleteList
                                  
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
                alert("禁用失败")
                // alert("删除失败")
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


      //excel导入导出方法
    exp() {
      if(this.multipleSelection == 0){
        alert("请选择数据！")
      }  
      else{
        this.$confirm('确定导出选中的系统参数数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.excelData = this.multipleSelection //你要导出的数据list。
        this.export2Excel()
      }).catch(() => {

      });
      }

    },
    export2Excel() {
      var that = this;
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/excel/export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
            const tHeader = ['参数类型','参数项','参数值','启用标记']; // 导出的表头名信息
            const filterVal = ['paramType','param', 'value', 'status']; // 导出的表头字段名，需要导出表格字段名
            const list = that.excelData;
            const data = that.formatJson(filterVal, list);
 
            export_json_to_excel(tHeader, data, '系统参数');// 导出的表格名称，根据需要自己命名
          })
    },
    //格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },

    //导入
    httpRequest (e) {
	      let file = e.file // 文件信息
	      console.log('e: ', e)
	      console.log('file: ', e.file)

        if (!file) {
          // 没有文件
          return false
        } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
          // 格式根据自己需求定义
          this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
          return false
        }

        const fileReader = new FileReader()
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result
            const workbook = XLSX.read(data, {
              type: 'binary' // 以字符编码的方式解析
            })
            const exlname = workbook.SheetNames[0] // 取第一张表
            const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
            console.log(exl)
            // 将 JSON 数据挂到 data 里
            //this.tableData = exl
            var insertData=[];
            var flag =0;
            exl.forEach(element => {
              if(element.参数类型 == undefined || element.参数项 == undefined || element.参数值 == undefined || element.启用标记== undefined){
                flag=1;
              }
              
          
              insertData.push({paramType:element.参数类型,param:element.参数项,value:element.参数值,status:element.启用标记})
            });
            console.log(exl)

            console.log(insertData)
            if(flag == 1){
              alert("导入的数据不规范")
              return
            }
            this.addSystemParamListData(insertData);
            
            // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
          } catch (e) {
            console.log('出错了：：')
            alert("导入文件出错，可以尝试先下载一份模板再导入")
            return false
          }
	    }
      fileReader.readAsBinaryString(file)
  },

  addSystemParamListData(dataList){
      this.$ajax.post(
      'gateway/systemModule/doAddSystemParamList',
      {
        //params: {
          
                    head: {
                      version: '1',
                      token: this.getCookie( ),
                      businessType: '12',
                      equipId: '1',
                      equipType: 1,
                      encrypt: 1
                    },
                    body: {
                      data: 
                        dataList
                        
                      
                    }
          
      //  }
    
      }
    ).then(
      (response) => {
      alert(response.data.head.message);
      if(response.data.head.responseCode == "0"){
        this.reflashTree();
        this.getdata();
      }
      }, function () { 
      alert("添加失败")
        console.log('error')
      }
    )
  }

  ,

    updateSubmitForm() {
      this.$refs['modifyForm'].validate((valid) => {
        if (valid) {
          this.updateSystemParamData();
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    addSubmitForm() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addSystemParamData();
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getOrgIdAndName(){
      this.$ajax.post(
      'gateway/systemModule/doQueryOrgIdAndName',
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
      this.orgIdAndName =response.data.body.data
      }, function () { 
        console.log('error')
      }
    )
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
                                category:"参数类型"
                              }
                            }
                  
              //  }
           
              }
            ).then(
              (response) => {
              if(response.data.head.responseCode == "0"){
                this.dictionary = response.data.body.data
                this.queryDictionary = JSON.parse(JSON.stringify(this.dictionary))
                this.queryDictionary.unshift({label:'',value:null})
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
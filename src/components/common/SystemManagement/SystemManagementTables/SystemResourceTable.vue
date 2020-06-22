<template>
  <div>
     <div style="float:left;margin-bottom:20px;">
        <div id="selector">
            <span>节点名称:</span>
            <el-input v-model="name" placeholder="请输入内容" style="width:200px"></el-input>
            <span>父亲节点:</span>
            <el-select v-model="parentId" placeholder="请选择">
              <el-option
                v-for="item in options"
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
                label="节点名称"
                width="100">
                <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                prop="code"
                label="编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="parentId.name"
                label="父亲节点"
                width="100">
                </el-table-column>
                <el-table-column
                prop="url"
                label="URL"
                width="100">
                </el-table-column><el-table-column
                prop="resourceType"
                label="资源类型"
                :formatter="formatType"
                width="100">
                </el-table-column><el-table-column
                prop="openImg"
                label="打开图标"
                width="100">
                <template slot-scope="scope"><i :class="scope.row.openImg"> </i></template>
                </el-table-column>
                 
                <el-table-column
                prop="closeImg"
                label="关闭图标"
                width="100">
                 <template slot-scope="scope"><i :class="scope.row.closeImg"> </i></template>
                </el-table-column>
                <el-table-column
                prop="leaf"
                label="叶子节点"
                width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.leaf == 1"><el-tag>是</el-tag></span>
                  <span v-else-if="scope.row.leaf == 0"><el-tag type="info">否</el-tag></span>
                </template>
                </el-table-column>
                <el-table-column 
                prop="status"
                label="不可见"
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
                <el-button type="primary" @click="deleteResourceData">确 定</el-button>
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
                <el-dialog title="增加资源" :visible.sync="dialogFormVisible" width="800px"> 
                  <el-form ref="addForm" :rules="rules" :model="addForm" label-width="110px" >
                  <el-form-item label="节点名称" prop="name">
                      <el-input v-model="addForm.name">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="节点编号" readonly="true" prop="code">
                      <el-input v-model="addForm.code" :disabled="true"  >{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="顺序号" readonly="true" prop="orderIndex">
                      <el-input v-model="addForm.orderIndex">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="父亲节点">
                      <el-select v-model="addForm.parentId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="URL" prop="url">
                      <el-input v-model="addForm.url"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="资源类型" prop="resourceType">
                      <el-input v-model="addForm.resourceType"></el-input>
                  </el-form-item> -->

                  <el-form-item label="资源类型"  prop="resourceType">
                      <el-select v-model="addForm.resourceType" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in dictionary"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="打开图标" prop="openImg">
                          <icon-picker v-model="addForm.openImg"></icon-picker>
                          <!-- <el-input v-model="addForm.openImg" style="width: 20%;" readonly="true"></el-input>
                          <el-button style="width: 20%;margin-left:20px;">选择图标</el-button> -->
                    
                  </el-form-item>
                  <el-form-item label="关闭图标" prop="closeImg">
                      <icon-picker v-model="addForm.closeImg"></icon-picker>
                      <!-- <el-input v-model="addForm.closeImg" style="width: 20%;" readonly="true"></el-input>
                      <el-button style="width: 20%;margin-left:20px;">选择图标</el-button> -->
                  </el-form-item>
                  <el-form-item label="备注">
                      <el-input type="textarea" v-model="addForm.remark"></el-input>
                  </el-form-item>
                  <el-form-item label="是否叶子节点" prop="leaf">
                      <el-radio-group v-model="addForm.leaf">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                      </el-radio-group>
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
              <el-dialog title="编辑资源" :visible.sync="dialogFormVisible2" width="800px"> 
                  <el-form ref="modifyForm" :rules="rules" :model="modifyForm" label-width="110px" >
                  <el-form-item label="节点ID">
                      <el-input v-model="modifyForm.id" readonly="true">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="节点名称" prop="name">
                      <el-input v-model="modifyForm.name">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="节点编号" readonly="true" prop="code">
                      <el-input v-model="modifyForm.code">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="顺序号" readonly="true" prop="orderIndex">
                      <el-input v-model="modifyForm.orderIndex">{{}}</el-input>
                  </el-form-item>
                  <el-form-item label="父亲节点">
                      <el-select v-model="modifyForm.parentId" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="URL" prop="url">
                      <el-input v-model="modifyForm.url"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="资源类型" prop="resourceType">
                      <el-input v-model="modifyForm.resourceType"></el-input>
                  </el-form-item> -->
                  <el-form-item label="资源类型" prop="resourceType">
                      <el-select v-model="modifyForm.resourceType" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="item in dictionary"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="打开图标" prop="openImg">
                          <!-- <el-input v-model="modifyForm.openImg" style="width: 20%;" readonly="true"></el-input> -->
                          <icon-picker v-model="modifyForm.openImg"></icon-picker>
                  </el-form-item>
                  <el-form-item label="关闭图标" prop="closeImg">
                      <!-- <el-input v-model="modifyForm.closeImg" style="width: 20%;" readonly="true"></el-input>
                      <el-button style="width: 20%;margin-left:20px;">选择图标</el-button> -->
                      <icon-picker v-model="modifyForm.closeImg"></icon-picker>
                  </el-form-item>
                  <el-form-item label="备注">
                      <el-input type="textarea" v-model="modifyForm.remark"></el-input>
                  </el-form-item>
                  <el-form-item label="是否叶子节点" prop="leaf">
                      <el-radio-group v-model="modifyForm.leaf">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                      </el-radio-group>
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
          { required: true, message: '请输入节点名称！', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入节点编号！', trigger: 'blur' }
        ],
        orderIndex: [
          { required: true, message: '请输入顺序号！', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择父亲节点！', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入url', trigger: 'blur' }
        ],
        resourceType: [
          { required: true, message: '请输入资源类型', trigger: 'blur' }
        ],
        openImg: [
          { required: true, message: '请选择打开图标', trigger: 'blur' }
        ],
        closeImg: [
          { required: true, message: '请选择关闭图标', trigger: 'blur' }
        ],
        leaf: [
          { required: true, message: '请选择是否叶子节点', trigger: 'blur' }
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
          name: '',
          code: '',
          orderIndex:'',
          parentId: '',
          url: '',
          resourceType: '',
          openImg: '',
          closeImg: '',
          leaf: '',
          status:'',
          remark:'',
          version:'',
          createdBy:'',
          createdTime:''
        },
        formLabelWidth: '120px',
        addForm:{
          id:'',
          name: '',
          code: '',
          orderIndex:'',
          parentId: '',
          url: '',
          resourceType: '',
          openImg: '',
          closeImg: '',
          leaf: '',
          status:'',
          remark:'',
          version:'',

        },

        //页数和size测试数据
        page:1,
        pageSize:5,
        count:0,
        
        //搜索用的数据
        parentId: null,
        name:"",

        //删除提示的
        dialogVisible: false,
        deleteId:"",
        deleteVersion:-1,

 
        //父亲节点的名称
        parentName:[],


        //资源类型
        dictionary:[],

         //token取代值
        token:'eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIxIiwiZGVwYXJ0bWVudElkIjoiMSIsImlzcyI6Im1vb2NfdXNlciIsImV4cCI6MTU4NTY1MTYzNSwidXNlcklkIjoiMSIsIm9yZ0lkIjoiMSIsInVzZXJuYW1lIjoid3NxIn0.rbLmbv1P_OEHR_g2JenncH1gSbp9_0VeEHpuzaQNQOs'

        }


       
        
    },
    props:["options"]
    ,
    methods:{
      evaluationModifyForm(row){
        if(this.$refs['modifyForm'] != undefined ){
              this.$refs['modifyForm'].clearValidate()
          }
        if (row.parentId ==null){
           this.modifyForm.parentId=null
        }
        else{
           this.modifyForm.parentId=row.parentId.id
        }
        
        this.modifyForm.id=row.id,
        this.modifyForm.name= row.name,
        this.modifyForm.code= row.code,
        this.modifyForm.orderIndex=row.orderIndex,
        
        this.modifyForm.url= row.url,
        this.modifyForm.resourceType= row.resourceType+'',
        this.modifyForm.openImg= row.openImg,
        this.modifyForm.closeImg= row.closeImg,
        this.modifyForm.leaf= row.leaf,
        this.modifyForm.status= row.status,
        this.modifyForm.remark=row.remark,
        this.modifyForm.version= row.version,
        this.modifyForm.createdBy=row.createdBy,
        this.modifyForm.createdTime=row.createdTime

      }
      ,
      getRowKeys(row){
          return row.id;
      }
      ,
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
          // alert("我被双击了");
          // console.log(row);
          // console.log(event);
          // console.log(column);
          this.handleEdit(0,row)

      }
      ,
      getdata(){
        // var level;
        // if(this.level==""){
        //   level=null;
        // }
        // else{
        //   level=this.level;
        // }
          this.$ajax.post(
      'gateway/systemModule/doQueryResourceByPage',
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
              parentId:this.parentId,
              page: this.page,
              pageSize: this.pageSize,
              
            }
          }
            

        
      }
    ).then(
      (response) => {
        this.count =response.data.body.data.count
        this.tableData = response.data.body.data.resourceList
        
        
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
          alert("该操作只能选择一条记录")
        }
      }
      ,
      updateResourceData(){

          this.$ajax.post(
            'gateway/systemModule/doUpdateResource',
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
                    // resource:this.modifyForm
                    id: this.modifyForm.id,
                    name: this.modifyForm.name,
                    code: this.modifyForm.code,
                    orderIndex: this.modifyForm.orderIndex,
                    parentId: this.modifyForm.parentId,
                    url:  this.modifyForm.url,
                    resourceType:  this.modifyForm.resourceType,
                    openImg:  this.modifyForm.openImg,
                    closeImg:  this.modifyForm.closeImg,
                    leaf:  this.modifyForm.leaf,
                    status:  this.modifyForm.status,
                    remark:  this.modifyForm.remark,
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
          this.addForm.id='',
          this.addForm.name= '',
          this.addForm.code= this.createUniqueId(),
          this.addForm.orderIndex='',
          this.addForm.parentId='',
          this.addForm.url= '',
          this.addForm.resourceType= '',
          this.addForm.openImg= '',
          this.addForm.closeImg= '',
          this.addForm.leaf= '',
          this.addForm.status= '',
          this.addForm.remark='',
          this.addForm.version= '',

          this.dialogFormVisible = true;

      }
      ,

      addResourceData(){
        this.$ajax.post(
            'gateway/systemModule/doAddResource',
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
                    // resource:this.addForm
                    name: this.addForm.name,
                    code: this.addForm.code,
                    orderIndex: this.addForm.orderIndex,
                    parentId: this.addForm.parentId,
                    url:  this.addForm.url,
                    resourceType:  this.addForm.resourceType,
                    openImg:  this.addForm.openImg,
                    closeImg:  this.addForm.closeImg,
                    leaf:  this.addForm.leaf,
                    status:  this.addForm.status,
                    remark:  this.addForm.remark,
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
      deleteResourceData(){
        this.dialogVisible = false;
        this.$ajax.post(
              'gateway/systemModule/doDeleteResource',
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
                  'gateway/systemModule/doDeleteResourceList',
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
                                    resourceList:deleteList
                                    
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
      },
      getParentNameById(row, column){
        this.options.forEach(element => {
          if(row[column.property] != null){
             if(element.value == row[column.property]){
                let name =element.labe;
                return name;
              // this.parentName.push({ name:element.label} )
          }
          }
         
        });

      },

    
      updateSubmitForm() {
        this.$refs['modifyForm'].validate((valid) => {
          if (valid) {
            if(this.checkOrderIndex(this.modifyForm.orderIndex)){
               this.updateResourceData();
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
            if(this.checkOrderIndex(this.addForm.orderIndex)){
               this.addResourceData();
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      checkOrderIndex(orderIndex){
        var numReg = /^[0-9]+$/
        var numRe = new RegExp(numReg)
        if(orderIndex.length > 10){
          this.$message({
            type: 'error',
            message: '顺序号不能大于十位数',
            duration: 10000,
            showClose: true,
            })
            return false
        }
        if (!numRe.test(orderIndex)) {
          this.$message({
            type: 'error',
            message: '顺序号只能是纯数字 ',
            duration: 10000,
            showClose: true,
            })
            return false
        }
        return true

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
                                category:"资源类型"
                              }
                            }
                  
              //  }
           
              }
            ).then(
              (response) => {
              if(response.data.head.responseCode == "0"){
                this.dictionary = response.data.body.data
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
        if(this.getCookie()==undefined||this.getCookie()=='') {
          window.location.href='/login'
        }
      }
}
</script>

<style scoped>
#selector{
  width: 100%;
  margin-bottom: 30px;
}
</style>
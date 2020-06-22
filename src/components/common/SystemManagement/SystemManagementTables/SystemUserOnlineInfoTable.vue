<template>
  <div>
     <div style="float:left;margin-bottom:20px;">
        <div id="selector">
            <span>工号:</span>
            <el-input v-model="code" placeholder="请输入内容" style="width:200px"></el-input>
            <span>用户名:</span>
            <el-input v-model="name" placeholder="请输入内容" style="width:200px"></el-input>
            <span>在线时间段:</span>
            <el-date-picker
              v-model="onlineTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              v-model="offlineTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="queryDataByName()">搜索</el-button>   
        </div>
        <div style="float:left;">
        <el-button-group>
                <!-- <el-upload
                    style="float:left"
                    class="upload"
                    action=""
                    :multiple="false"
                    :show-file-list="false"
                    accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    :http-request="httpRequest">
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-download"
                    > <a href="javascript:void(0)" style="text-decoration:none"><font color="white">导入</font></a>
                    </el-button>   
                 </el-upload> -->
                
                
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-upload2"
                      @click="expDownList()"
                    > <a id="export"><font color="white">导出</font></a>
                    </el-button>   
                 


                <el-button
                  size="mini"
                  type="danger"
                  @click="checkOfflineSelect"
                  icon="el-icon-warning-outline"
                >强制下线</el-button>  
                     
                  &nbsp;&nbsp;&nbsp;
                  
                  &nbsp;&nbsp;&nbsp; 
          </el-button-group>
        </div>
     </div>
       <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="工号"
                width="100">
                <template slot-scope="scope">{{ scope.row.code }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="用户"
                width="100">
                </el-table-column>
                <el-table-column
                prop="ip"
                label="IP"
                width="150">
                </el-table-column>
                <el-table-column
                prop="onlineTime"
                label="上线时间"
                :formatter="formatDate"
                width="200">
                </el-table-column>
                <el-table-column
                prop="offlineTime"
                label="下线时间"
                :formatter="formatDate"
                width="200">
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态"
                width="150">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 1">在线</span>
                  <span v-else-if="scope.row.status == 0">离线</span>
                </template>
                </el-table-column>
                 <el-table-column
                label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button-group>
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-upload2"
                      @click="expDownOne(scope.row)"
                    > <a id="export"><font color="white">导出</font></a>
                    </el-button>   
                      <el-button
                        size="mini"
                        type="danger"
                        @click="checkOfflineOne(scope.row)"
                        icon="el-icon-warning-outline"
                        :disabled="scope.row.offlineTime == null ? false:true"
                      >强制下线</el-button>
                      
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
              <span>确认强制下线？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="forceOflineUser">确 定</el-button>
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
   </div> 


</template>

<script>
export default {
    data(){
        return{
        //这是表格的测试数据
        tableData: [],
        multipleSelection: [],
       

  
        //页数和size测试数据
        page:1,
        pageSize:5,
        name:'',
        code:null,
        offlineTime:null,
        onlineTime:null,
        count:0,
      


        //删除提示的
        dialogVisible: false,
       

        //删除的id集合
        ids:[],



        //导出的数据集合
        downList:[]



 
        }
    },
    methods:{
      getdata(){
          this.$ajax.post(
      'gateway/systemModule/doQueryCountUserOnlineInfoByPage',
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
              offlineTime:this.offlineTime,
              onlineTime:this.onlineTime,
              page: this.page,
              pageSize: this.pageSize,
            }
          }
            

        
      }
    ).then(
      (response) => {
        this.count = response.data.body.data.count
        this.tableData = response.data.body.data.userOnlineInfoList
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

      checkOfflineOne(row){
        this.ids=[];
        this.ids.push(row.id);
        this.dialogVisible = true;
      }
      ,
      forceOflineUser(){
        this.dialogVisible = false;
        this.$ajax.post(
              'gateway/shiro/doForceUserOffline',
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
                                ids: this.ids,
                              }
                            }
                  
              //  }
           
              }
            ).then(
              (response) => {
              alert(response.data.head.message);
              if(response.data.head.responseCode == "0"){
                this.getdata();
              }   
            }, function () { 
              alert("error")
              console.log('error')
            }
            )
      },
      checkOfflineSelect(){
        if(this.multipleSelection.length == 0){
          alert("请选择数据！")
        }
        else{
          var flag=0;
          this.ids=[];
          this.multipleSelection.forEach(element => {
              if(element.offlineTime == null){
                this.ids.push(element.id);
              }
              else{
                flag=1;
              }
          });
          if(flag ==0){
            this.dialogVisible = true;
          }
          else{
            alert("不能选择已下线的用户数据");
          }
          
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
      this.$confirm('确定下载列表文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.excelData = this.multipleSelection //你要导出的数据list。
        this.export2Excel()
      }).catch(() => {

      });
    },
    export2Excel() {
      var that = this;
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/excel/export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
            const tHeader = ['ID','工号','用户名','IP','上线时间','下线时间','状态']; // 导出的表头名信息
            const filterVal = ['id','code', 'name', 'ip','onlineTime','offlineTime','status']; // 导出的表头字段名，需要导出表格字段名
            const list = that.excelData;
            const data = that.formatJson(filterVal, list);
 
            export_json_to_excel(tHeader, data, 'subject');// 导出的表格名称，根据需要自己命名
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
            this.downList = exl
            
            // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
          } catch (e) {
            console.log('出错了：：')
            return false
          }
	    }
      fileReader.readAsBinaryString(file)
  },
  

      expDownList(){
        if(this.multipleSelection.length == 0){
          alert("请选择数据")
        }
        else{
          this.downList=this.multipleSelection;
          this.$confirm('确定导出选中数据?', '提示', {
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
      expDownOne(row){
        var downloadData=[];
        downloadData.push(row)
          this.$confirm('确定导出数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.excelData = downloadData //你要导出的数据list
            this.export2Excel()
          }).catch(() => {

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
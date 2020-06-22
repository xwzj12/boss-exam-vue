<template>
    <div id="all">
        <!-- <div id="top">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
          </el-breadcrumb>

        </div> -->
        <div id="left">
            <card title="资源管理" :dataTree="dataTree"/>
        </div>

        <div id="right">           
            <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            <stable @reflashTree="getdataTree()"  :options="options"/>
        </div>
    
    </div>
</template>


<script>
import card from '../../common/SystemManagement/SystemCard';
import stable from '../../common/SystemManagement/SystemManagementTables/SystemResourceTable';

  export default {
    data() {
      return {
        //选项框的数据
        options: [],
        dataTree:[]
      };
    },
    components:{
      card,
      stable
      
    },
    methods: {
       getdataTree(){
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
        //this.count =response.data.body.data.count
        this.dataTree = response.data.body.data
        this.getResourceNameAndId()
        
      }, function () { 
        console.log('error')
      }
    )
      },

    getResourceNameAndId(){
      this.$ajax.post(
      'gateway/systemModule/doQueryResourceNameAndId',
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
        //this.count =response.data.body.data.count
        this.options = response.data.body.data
        this.options.unshift({value:null,label:""})
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
     

    }
    ,

    created(){
      this.getdataTree();
      this.getResourceNameAndId();
    }
  };
</script>


<style scoped>
#all{
    width: 100%;
    height: 800px;
    /* overflow:auto; */
   
}

#left{
    float: left;
    width: 15%;
    height: 800px;
    background-color: black;
    margin-right: 2%;
    
}

#right{
    float: left;
    width: 80%;
    height: 800px;
    
}

#top{
  width: 100%;
  height: 20px;
  float: left;
  padding-top: 20px;
  padding-left: 10px;
}

#selector{
  width: 700px;
  margin-bottom: 20px;
}


</style>

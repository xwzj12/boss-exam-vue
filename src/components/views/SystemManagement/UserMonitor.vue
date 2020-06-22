<template>
    <div id="all">
        <div id="left">
            <card title="用户管理" :dataTree="dataTree" />
        </div>

        <div id="right">
            <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            <stable  @reflashTree="getdataTree()" :RoleIdAndName="RoleIdAndName" />
        </div>
    
    </div>
</template>


<script>
import card from '../../common/SystemManagement/SystemCard';
import stable from '../../common/SystemManagement/SystemManagementTables/SystemUserTable';

  export default {
    data() {
      return {
        dataTree:'',
        RoleIdAndName:[],
        //DepartmentIdAndName:null,
        PositionIdAndName:[],
        RoleTree:'',
        companyIdAndName:[],
        
      };
    },
    components:{
      card,
      stable
      
    },
    methods: {
      getdataTree(){
         this.$ajax.post(
      'gateway/systemModule/doQueryUserNameTreeByCompanyId',
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
      }, function () { 
        console.log('error')
      }
    )
      }
    
    
    ,

    getRoleIdAndNameByCompanyID(){
      this.$ajax.post(
      'gateway/systemModule/doQueryRoleIdAndNameByCompanyId',
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
        this.RoleIdAndName= response.data.body.data

      }, function () { 
        console.log('error')
      }
    )
    }
    ,
  
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
      this.getRoleIdAndNameByCompanyID();
      // this.getDepartmentIdAndNameByCompanyID();
      //this.getPositionIdAndNameByCompanyID();
      //this.getRoleNameTreeByCompanyID();
      // this.getCompanyIdAndName();
    }
  };
</script>


<style scoped>
#all{
    width: 100%;
    margin-top: 100px;
   
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


#selector{
  width: 400px;
  margin-bottom: 30px;
}



</style>

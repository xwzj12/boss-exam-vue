<template>
    <div id="all">
        <div id="left">
            <!-- <card title="职位管理" :dataTree="dataTree" /> -->
        </div>

        <div id="right">
            <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            <stable  @reflashTree="getdataTree()"/>
        </div>
    
    </div>
</template>


<script>
import card from '../../common/SystemManagement/SystemCard';
import stable from '../../common/SystemManagement/SystemManagementTables/SystemUserOnlineInfoTable';

  export default {
    data() {
      return {
        
      };
    },
    components:{
      card,
      stable
      
    },
    methods: {

    }
    ,
    created(){
    
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
    width: 5%;
    height: 800px;
    margin-right: 2%;
}

#right{
    float: left;
    width: 85%;
    height: 800px;
    
}


#selector{
  width: 400px;
  margin-bottom: 30px;
}


</style>

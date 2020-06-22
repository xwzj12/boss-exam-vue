<template>
    <div>
        <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <i class="el-icon-menu"></i>
                    <span>{{title}}</span>
                </div>
                <el-tree :data="dataTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-card>
    </div>
</template>



<script> 
export default {
    data(){
        return{
            data: [
        //这是树状图的测试数据
        {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        },]
        }
    },
    created(){
     
    }
    ,
    methods:{
         //树状图的函数
      handleNodeClick(data) {
        console.log(data);
      },
      
      getdata(){
          this.$ajax.post(
      'doQueryCompanyNameByOrgId',
      {
        
        
          head: {
            version: '1',
            token: 'adsajfofjwjpsdf54s6d4f6df6we16f64g4',
            businessType: '12',
            equipId: '1',
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              orgId:1,
     
            }
          }
            

        
      }
    ).then(
      (response) => {
        //this.count =response.data.body.data.count
        this.data = response.data.body.data.names
        console.log(this.data)
      }, function () { 
        console.log('error')
      }
    )
      },
    },
    props:['title','dataTree']
    
          
}
</script>


<style scoped>
.box-card{
    height:800px;
    overflow:auto;
    
    
}

.el-tree{
  overflow:auto;

}
</style>
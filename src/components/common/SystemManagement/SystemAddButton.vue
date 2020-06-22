<template>
    <div id="btn">
        <!-- Form -->
        <el-button type="danger" @click="dialogFormVisible = true"><i class="el-icon-plus"></i>增加</el-button>

        <el-dialog title="新增资源" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="100px" >
            <el-form-item label="节点名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="父亲节点">
                <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="URL">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="资源类型">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="打开图标">
                
                    <el-input v-model="form.name" style="width: 20%;" readonly="true"></el-input>
                    <el-button style="width: 20%;margin-left:20px;">选择图标</el-button>
               
            </el-form-item>
            <el-form-item label="关闭图标">
                <el-input v-model="form.name" style="width: 20%;" readonly="true"></el-input>
                <el-button style="width: 20%;margin-left:20px;">选择图标</el-button>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="是否叶子节点">
                <el-radio-group v-model="form.resource">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否隐藏">
                <el-radio-group v-model="form.resource">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
                </el-radio-group>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
            </el-form-item>
            </el-form>
        <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div> -->
        </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    }
  };
</script>


<style scoped>
#btn{
    width: 0px;
    height: 00px;
    
    
}
</style>
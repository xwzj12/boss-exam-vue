<template>
    <div id="matchPage">
        <!-- Form -->
        <el-button type="text" @click="dialogMatchingVisible = true">打开嵌套表单的 Dialog</el-button>

        <el-dialog title="收货地址" :visible.sync="dialogMatchingVisible">
        <!-- <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item>
        </el-form> -->
        <div id="dataTree">
            <div id="leftTree">
                <h3>角色</h3>
                <el-tree
                :data="data"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
                </el-tree>
            </div>
            <div id="rightTree">
                <h3>资源</h3>
                <el-tree
                :data="data"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
                </el-tree>
            </div>
            <div class="buttons">
                <el-button @click="getCheckedNodes">通过 node 获取</el-button>
                <el-button @click="getCheckedKeys">通过 key 获取</el-button>
                <el-button @click="setCheckedNodes">通过 node 设置</el-button>
                <el-button @click="setCheckedKeys">通过 key 设置</el-button>
                <el-button @click="resetChecked">清空</el-button>
            </div>
            <br>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
        </div>
        </el-dialog>


        <!-- 这里开始是两个数据搭配页面 -->
        <div id="Role_ResourceMatchPage">
        <!-- Form -->
        <el-button type="text" @click="dialogMatchingVisible = true">打开嵌套表单的 Dialog</el-button>

        <el-dialog title="收货地址" :visible.sync="dialogMatchingVisible">
        <div id="dataTree">
            <div id="leftTree">
                <h3>角色</h3>
                <el-tree
                :data="data"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
                </el-tree>
            </div>
            <div id="rightTree">
                <h3>资源</h3>
                <el-tree
                :data="data"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
                </el-tree>
            </div>
            <div class="buttons">
                <el-button @click="getCheckedNodes">通过 node 获取</el-button>
                <el-button @click="getCheckedKeys">通过 key 获取</el-button>
                <el-button @click="setCheckedNodes">通过 node 设置</el-button>
                <el-button @click="setCheckedKeys">通过 key 设置</el-button>
                <el-button @click="resetChecked">清空</el-button>
            </div>
            <br>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
        </div>
        </el-dialog>


    </div>

    </div>
</template>


<script>
export default {
    data(){
        return{
            dialogMatchingVisible: false,
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
                }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
                }],
             defaultProps: {
                children: 'children',
                label: 'label'
                }
        }
    }
    ,
    // props:["dialogMatchingVisible"]
    // ,
    methods:{
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()));
        console.log(this.$refs.tree.getHalfCheckedKeys());
        console.log(this.$refs.tree.getCheckedKeys(true))
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3,7]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    }
}
</script>


<style scoped>
.dataTree{
    width: 100%;
    height: 700px;
    
    
}

.leftTree{
    width: 49%;
    height: 100%;
    float: left;
    background-color: aliceblue;
    overflow:auto;
}

.rightTree{
    width: 49%;
    height:100%;
    float: left;
    background-color: aliceblue;
    overflow:auto;
    margin-left: 2%;
}

.el-tree{
    background-color: aliceblue;
}
</style>
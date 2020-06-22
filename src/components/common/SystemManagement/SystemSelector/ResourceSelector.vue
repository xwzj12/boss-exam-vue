<template>
 <div id="selector">
    <span>节点名称:</span>
    <el-select v-model="value" placeholder="请选择">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>

    <span>父亲节点:</span>
    <el-select v-model="value" placeholder="请选择">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
</div>
</template>

<script>
export default {
    
}
</script>


<style scoped>
#selector{
  width: 500px;
  margin-bottom: 20px;
}
</style>
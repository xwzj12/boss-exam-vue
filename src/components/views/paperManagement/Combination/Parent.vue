<template>
  <!-- 组卷模块 -->
  <div class="parent">
    <el-tabs type="border-card">
      <el-tab-pane label="查询">
        <Query></Query>
      </el-tab-pane>
      <el-tab-pane label="快速组卷">
        <Quick></Quick>
      </el-tab-pane>
      <el-tab-pane label="标准组卷">
        <Standard></Standard>
      </el-tab-pane>
      <el-tab-pane label="模板组卷">
        <Templatego></Templatego>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Query from './Children/Query'
import Quick from './Children/Quick'
import Standard from './Children/Standard'
import Templatego from './Children/Templatego'
export default {
  name: 'Parent',
  components: {
    Query,
    Quick,
    Standard,
    Templatego
  },
  created () {
  }
}
</script>
<style scoped>
.parent {
  height: 800px;
  background-color: rgb(240, 240, 240);
}
</style>

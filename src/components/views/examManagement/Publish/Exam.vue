<template>
  <div class="problem-body">
    <el-card class="box-card">
      <div slot="header">
        考试发布管理
      </div>
      <ExamComponent></ExamComponent>
    </el-card>
  </div>
</template>

<script>
import ExamComponent from "./ExamComponent";
export default {
  components: {
    ExamComponent
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.problem-body {
  width: 100%;
  min-height: 700px;
  padding-top: 0;
  margin: 0;
  margin-bottom: 20px;
  font-family: 微软雅黑, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.box-card {
  width: 80%;
  height: 100%;
  min-height: 500px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}
</style>

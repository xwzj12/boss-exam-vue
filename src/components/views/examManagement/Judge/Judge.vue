<template>
  <div class="problem-body">
    <el-card class="box-card">
      <div slot="header">
        阅卷管理
      </div>
      <JudgeComponent></JudgeComponent>
    </el-card>
  </div>
</template>

<script>
import JudgeComponent from "./JudgeComponent";
export default {
  components: {
    JudgeComponent
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

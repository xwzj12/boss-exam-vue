<template>
  <div class="div-center">
    <el-carousel :interval="4000" height="400px">
      <el-carousel-item v-for="item in newsList" :key="item">
        <div class="div-card-item" v-html="item">{{ item }}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: [
        // TODO: add by [20190703] 滚动栏的内容设置为从数据库获取，暂时没有表，需要增加新表，待做
        "博思考试系统",
        "现任开发团队：康志江 ",
        "当前版本 1.0"
      ]
    };
  }
};
</script>

<style scoped>
.div-center {
  margin-top: 25%;
  height: 400px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.div-card-item {
  width: 80%;
  margin-top: 5%;
  margin-left: 10%;
  font-size: 25px;
  line-height: 300px;
}
</style>

<template>
  <div class="index-body">
    <div class="header-announcement">
      <Carousel></Carousel>
    </div>
    <div class="home-info-body">
      <HomeInfo></HomeInfo>
    </div>
    <div class="border-body"></div>
  </div>
</template>

<script>
import Carousel from "./CarouselGraph";
import HomeInfo from "./HomeInfo";
export default {
  components: {
    Carousel,
    HomeInfo
  }
};
</script>

<style>
.index-body {
  width: 80%;
  margin: auto;
  min-height: 800px;
}

.header-announcement {
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
}

.home-info-body {
  float: left;
  margin-bottom: 10px;
  width: 70%;
}

.border-body {
  float: right;
  width: 28%;
  margin-left: 20px;
  min-height: 400px;
}
</style>

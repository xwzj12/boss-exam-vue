<template>
  <div
    id="app"
    v-loading="loading"
  >

    <Head class="header"></Head>
    <!-- <draggable> -->
    <!-- </draggable> -->
    <div class="main">
      <transition
        name="fade"
        mode="out-in"
      >
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
          </router-view>
        </keep-alive>
      </transition>
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Head from '@/components/common/HeadComponent'
import Foot from '@/components/common/FootComponent'
// import draggeable from 'vuedraggable'

export default {
  name: 'App',
  components: {
    Head,
    Foot,
    // draggeable
  },
  data () {
    return {
      loading: false
    }
  },
  created () {
  },
  methods: {},
  // 自定义指令
  directives: {}
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: black;
  padding: 0;
  margin: 0;
  /* position: relative; */
  background-color: #fafafa;
  min-height: 600px;
}

.header {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
}

.main {
  width: 100%;
  background-color: #fafafa;
  min-height: 650px;
  margin-top: 80px;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s;
}
</style>

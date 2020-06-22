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
        <router-view :key="this.$route.path"></router-view>
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
    <BackTop></BackTop>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '@/components/common/HeadComponent'
import Foot from '@/components/common/FootComponent'
import BackTop from './components/common/BackTopComponent'
// import draggeable from 'vuedraggable'

export default {
  name: 'App',
  components: {
    Head,
    Foot,
    BackTop
    // draggeable
  },
  data () {
    return {
      loading: false
    }
  },
  async created () {
    // 监听plusready事件
    // uni-app项目中不要监听此事件，uni-app中不存在document对象，调用此方法会引起js错误
    document.addEventListener(
      "plusready",
      function() {
        // 扩展API加载完毕，现在可以正常调用扩展API
        // ......
        this.$message.success("可以正常使用");
      },
      false
    );
    // 每次刷新时，将sessionStorge内的内容还原到store内，解决刷新后数据丢失的问题
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    // 页面刷新后store内容会清空，这里在页面刷新前将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });


    let authorArr = ['Login', 'register', 'examLogin','Home'
            ,'faceRec','phoneExam','startExam','endExam']

    let url = window.location.href ;
    url = url.split('/')
    let str = url[url.length-1].split('?')[0]

    if(authorArr.indexOf(str)!=-1) {
      return
    }

    if(this.getCookie()==''||this.getCookie()==null) {
      return
    }

    let routes = this.$router.options.routes
      for(var i=0;i<routes.length;i++) {
        if(routes[i].children!=null) {
          for(let j=0;j<routes[i].children.length;j++) {
            if(routes[i].children[j].path==str) {
              let response = await this.checkAuth({
                head: {
                  version: '1',
                  token: this.getCookie(),
                  businessType: '12',
                  equipId: '1',
                  equipType: 1,
                  encrypt: 1
                },
                body: {
                  data: {
                    url:'/'+str
                  }
                }
              })


              if("success" == response.head.responseCode) {
                return
              } else {
                alert(response.head.message)
                this.$router.push({  
                    path: '/AccessDenied',
                    name: 'AccessDenied',  
                    params: {  
                    }  
                })
              }
            }
          }
        } else {
          if(routes[i].path==str) {
              let response = await this.checkAuth({
                  head: {
                    version: '1',
                    token: this.getCookie(),
                    businessType: '12',
                    equipId: '1',
                    equipType: 1,
                    encrypt: 1
                  },
                  body: {
                    data: {
                      url:'/'+str
                    }
                  }
                })


                if("success" == response.head.responseCode) {
                  return
                } else {
                  alert(response.head.message)
                  // window.location.href = '/AccessDenied'
                  this.$router.push({  
                    path: '/AccessDenied',
                    name: 'AccessDenied',  
                    params: {  
                    }  
                })
                }
              }
            }
      }
  },
  methods: {
    async checkAuth(data) {
      return await this.$http.post('/gateway/shiro/checkAuth',data)
    },
    
    getCookie() {
      if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          for(var i=0;i<arr.length;i++){
          var arr2=arr[i].split('=');//再次切割
          //判断查找相对应的值
          if(arr2[0]=='staffToken'){
              return arr2[1]
          }
          }
      } else {
          return
      }
      },
  },
  // 自定义指令
  directives: {}
}
</script>

<style scoped>
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

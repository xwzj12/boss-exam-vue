<template>
  <div class="header">
    <div class="head-box">
      <el-menu
        :default-active="$route.path"
        :active="navselected"
        @select="selectItems"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF"
        router
      >
        <el-menu-item index="/" class="el-menu-item-size" v-if="flag">主 页</el-menu-item>
　　　　<template v-for="(item , index) in this.routes">
      　　<el-submenu :key="index" :index="index+1" v-if="item.hasChild">
            <template class="el-menu-item-size" slot="title">{{item.menuName}}</template>
        　　<template class="el-menu-item-size" v-for="(itemChild , index) in item.children">
              <el-menu-item class="el-menu-item-size" v-if="itemChild.meta.showFlag" :index="item.path+'/'+itemChild.path" :key="index">
                <i :class="itemChild.checked==true?itemChild.openIcon:itemChild.closeIcon"/>
            　　<span>{{itemChild.meta.menuName}}</span>
          　　</el-menu-item>
        　　</template>
        </el-submenu>		
    　　　　</template>
        
        <el-menu-item style="width: 250px;margin-right:30px" class="el-menu-item-right" v-if="this.name!=''">
          <label style="font-size:12px;color: #33CCFF;">欢迎使用系统  {{this.name}}</label>
          <el-button size="mini" @click="logout()">登出</el-button>
        </el-menu-item>
        <el-menu-item class="el-menu-item-right"  v-if="registerFlag"
          index="/register"  >注册</el-menu-item>
        <el-menu-item  class="el-menu-item-right" v-if="this.name==''"
          :index="loginIndex">登录</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      type: false,
      flag:true,
      navselected : 1,
      datas: [],
      routes : [],
      name : '',
      loginIndex : '/Login',
      isLogin : false,
      registerFlag:true,
      avatarUrl: ''
    }
  },
  async created () {
    let url = window.location.href ;
    url = url.split('/')
    let str = url[url.length-1]==null?'':url[url.length-1].split('?')[0]
    console.log(str)
    if(str=='faceRec'||str=='phoneExam'||str=='startExam'||str=='endExam'
    ||str=='examLogin'||str=='Home'||str=='register') {
      this.registerFlag = true
      this.loginIndex = '/examLogin'
    } else {
      this.registerFlag = false
      this.loginIndex = '/Login'
    }

    if(str=='Login'||str=='register'||str=='forgetPass'||str=='examLogin'||str=='Home') {
      this.name = ''
      this.flag = false
      return
    }

    if(str=='startExam'&&(this.$store.getters.getUserId==null)) {
        this.name = ''
        this.flag = false
        this.$router.push({  
          path: '/examLogin',
          name: 'examLogin',  
          params: {  
          }  
        })
        return
      } else if((str=='faceRec'||str=='phoneExam'||str=='endExam')&&(!this.$store.getters.getEntryExam)) {
        this.name = ''
        this.flag = false
        this.$router.push({  
          path: '/examLogin',
          name: 'examLogin',  
          params: {  
          }  
        })
        return
      } else if((str=='faceRec'||str=='phoneExam'||str=='endExam')&&(this.$store.getters.getEntryExam)) {
        this.name = this.$store.getters.getUserName
        this.flag = false
        return
      } else if(str=='startExam'&&(this.$store.getters.getUserId!=null)) {
        this.name = this.$store.getters.getUserName
        this.flag = false
        return
      }

    if(this.getCookie()==undefined||this.getCookie()=='') {
      this.name = ''
      this.$router.push({  
        path: '/Login',
        name: 'Login',  
        params: {  
        }  
     })
      return
    } else {
      let data = {
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
                token: this.getCookie(),
              }
            }
          }

      await this.getNameByToken(data).then(response => {
        if("success" == response.head.responseCode) {
          this.name = response.body.data

        }else {
          this.$message.error(response.head.message)
          this.logout()
          return
        }
      })

        
        this.flag = true
        let data1 = {
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
              }
            }
          }

        await this.getResources(data1).then(response => {
          if("success" == response.head.responseCode) {
            var resourcesData = response.body.data

            var resources = []

            for(var j=0;j<resourcesData.length;j++) {
              resources.push(resourcesData[j].url)
            }

            

            let routes = this.$router.options.routes
            for(var i=0;i<routes.length;i++) {
              if(routes[i].children!=null) {
                for(let j=0;j<routes[i].children.length;j++) {
                  routes[i].children.checked = false
                  if(resources.indexOf('/'+routes[i].children[j].path)!=-1) {
                    routes[i].children[j].openIcon = resourcesData.find((item,index,arr)=>{
                                                  return item.url == '/'+routes[i].children[j].path
                                                }).openImg
                    routes[i].children[j].closeIcon = resourcesData.find((item,index,arr)=>{
                                                  return item.url == '/'+routes[i].children[j].path
                                                }).closeImg                 
                    routes[i].children[j].meta.showFlag = true
                    routes[i].hasChild = true
                  }
                }
              }
            }
            this.routes = routes
          }else {
            this.$message.error(response.head.message)
            this.logout()
            return
          }
        })
        
    }
   },
  mounted () {
  },
  watch: {
    // 监测store.state
    '$store.state.adminleftnavnum': 'getNavType',
    '$route': 'init'
  },
  methods: {
    async init(){
      let url = window.location.href ;
      url = url.split('/')
      let str = url[url.length-1]==null?'':url[url.length-1].split('?')[0]
      
      if(str=='faceRec'||str=='phoneExam'||str=='startExam'||str=='endExam'
      ||str=='examLogin'||str=='Home'||str=='register') {
        this.registerFlag = true
        this.loginIndex = '/examLogin'
      } else {
        this.registerFlag = false
        this.loginIndex = '/Login'
      }

      if(str=='Login'||str=='register'||str=='forgetPass'||str=='examLogin'||str=='Home') {
        this.name = ''
        this.flag = false
        return
      }

      if(str=='startExam'&&(this.$store.getters.getUserId==null)) {
        this.name = ''
        this.flag = false
        this.$router.push({  
          path: '/examLogin',
          name: 'examLogin',  
          params: {  
          }  
        })
        return
      } else if((str=='faceRec'||str=='phoneExam'||str=='endExam')&&(!this.$store.getters.getEntryExam)) {
        this.name = ''
        this.flag = false
        this.$router.push({  
          path: '/examLogin',
          name: 'examLogin',  
          params: {  
          }  
        })
        return
      } else if((str=='faceRec'||str=='phoneExam'||str=='endExam')&&(this.$store.getters.getEntryExam)) {
        this.name = this.$store.getters.getUserName
        this.flag = false
        return
      } else if(str=='startExam'&&(this.$store.getters.getUserId!=null)) {
        this.name = this.$store.getters.getUserName
        this.flag = false
        return
      }

      if(this.getCookie()==undefined||this.getCookie()=='') {
        this.$message.error("未登录,请先登录!")
        this.name = ''
        this.$router.push({  
          path: '/Login',
          name: 'Login',  
          params: {  
          }  
        })
        return
      } else {
        let data = {
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
                  token: this.getCookie(),
                }
              }
            }

        await this.getNameByToken(data).then(response => {
          if("success" == response.head.responseCode) {
            this.name = response.body.data

          }else {
            this.$message.error(response.head.message)
            this.logout()
            return
          }
        })

          
          this.flag = true
          let data1 = {
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
                }
              }
            }

          await this.getResources(data1).then(response => {
            if("success" == response.head.responseCode) {
              var resourcesData = response.body.data

              var resources = []

              for(var j=0;j<resourcesData.length;j++) {
                resources.push(resourcesData[j].url)
              }

              let routes = this.$router.options.routes
              for(var i=0;i<routes.length;i++) {
                if(routes[i].children!=null) {
                  for(let j=0;j<routes[i].children.length;j++) {
                    routes[i].children.checked = false
                    if(resources.indexOf('/'+routes[i].children[j].path)!=-1) {
                      routes[i].children[j].openIcon = resourcesData.find((item,index,arr)=>{
                                                    return item.url == '/'+routes[i].children[j].path
                                                  }).openImg
                      routes[i].children[j].closeIcon = resourcesData.find((item,index,arr)=>{
                                                    return item.url == '/'+routes[i].children[j].path
                                                  }).closeImg                 
                      routes[i].children[j].meta.showFlag = true
                      routes[i].hasChild = true
                    }
                  }
                }
              }
              console.log(routes)
              this.routes = routes
            }else {
              this.$message.error(response.head.message)
              this.logout()
              return
            }
          })
          
      }
    },

    getResources(data) {
      return this.$http.post('/gateway/shiro/getResources',data)
    },
    getNameByToken(data) {
      return this.$http.post('/gateway/shiro/getNameByToken',data)
    },
    getNavType(){
      this.navselected=this.$store.state.adminleftnavnum;
      console.log(this.navselected)
      //store.state.adminleftnavnum里值变化的时候，设置navselected
    },
    selectItems(index){
      console.log(index)
      if(index!=null){
        let url = index.split('/')
        let str = url[url.length-1]

        this.$store.state.adminleftnavnum=index;
        //按钮选中之后设置当前的index为store里的值。
        let routes = this.$router.options.routes
          for(var i=0;i<routes.length;i++) {
            if(routes[i].children!=null) {
              for(let j=0;j<routes[i].children.length;j++) {
                routes[i].children[j].checked = false
                if(str == routes[i].children[j].path) {
                  routes[i].children[j].checked = true
                }
              }
            }
          }
      }
    },
      getCookie() {
      if (document.cookie.length>0) {
        var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
        for(var i=0;i<arr.length;i++){
          var arr2=arr[i].split('=');//再次切割
          //判断查找相对应的值
          if(arr2[0]=='staffToken'||arr2[0]=='examineeToken'){
            return arr2[1]
          }
        }
      } else {
        return
      }
    },

    logout () {
      this.doOfflineUserByUserId();
      var exdate=new Date();//获取时间
      exdate.setTime(exdate.getTime() + -1);//保存的天数

      let url = window.location.href ;
      url = url.split('/')
      let nowUrl = url[url.length-1].split('?')[0]
      let str = ''
      console.log(nowUrl)
      if(nowUrl == 'paper'||nowUrl == 'EndExam'||nowUrl == 'onLineJavaIde') {
        str = "examineeToken"
      } else {
        str = "staffToken"
      }

      //字符串拼接cookie
      window.document.cookie = str+ "= "+";expires="+exdate.toGMTString()+"; path=/";
      this.name = ''
      let routes = this.$router.options.routes
      for(var i=0;i<routes.length;i++) {
        if(routes[i].children!=null) {
          routes[i].hasChild = false
          for(let j=0;j<routes[i].children.length;j++) {
            routes[i].children[j].meta.showFlag = false
          }
        }
      }
      this.$router.push({  
        path: '/Login',
        name: 'Login',  
        params: {  
        }  
     })
    },

        doOfflineUserByUserId(){
        this.$ajax.post(
        'gateway/systemModule/doOfflineUserByUserId',
        {
            head:{
            version:'1',
            token:this.getCookie(),
            businessType:'12',
            equipId:'1',
            equipType:1,
            encrypt:1
            },
            body:{
            data:{
            }
            }
        }
        ).then(
        (response)=>{
              console.log("response.data.head.message="+response.data.head.message)
              
                      
      },function(){ 
              // alert("error")
        console.log('error')
      }
        )
      },
  }
}
</script>

<style lang="scss" scoped>

.header {
  width: 100%;
}
.head-box {
  width: 100%;
  height: 100%;
}
.el-menu-item-right {
  float: right !important;
  width: 100px;
  border-right: 0;
  font-size: 10px;
}

.el-menu-item:hover{
    color: #409EFF !important;
}
.el-menu-item-size{
  font-size: 10px;
  border-right: 0;
}

</style>

<style>
.el-menu--horizontal>.el-submenu .el-submenu__title {
  height: 100%;
  line-height: 60px;
  font-size: 10px;
  border-right: 0;
  border-left: 0;
  }
</style>

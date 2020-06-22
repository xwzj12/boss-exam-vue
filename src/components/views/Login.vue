<template>
  <div class="login">
    <el-card
      v-loading="loading"
      :body-style="{ padding: '0px' }"
      class="box-card"
    >
      <el-image
        :src="picUrl"
        class="img"
      ></el-image>
      <div class="login-box">
        <h1>登录</h1>
        <el-form
          ref="form"
          :model="form"
        >
          <el-form-item
            prop="name"
            @keyup.enter.native="login('form')"
          >
            <el-input
              name="name"
              autocomplete="on"
              autofocus="autofocus"
              type="text"
              v-model="form.name"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="pwd"
            @keyup.enter.native="login('form')"
          >
            <el-input
              name="pwd"
              type="password"
              show-password
              v-model="form.pwd"
              placeholder="密码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-select v-model="sign" placeholder="请选择">
              <el-option
                v-for="item in personnel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>

          <el-button
            type="primary"
            @click="login()"
          >登录</el-button>
          <!-- <el-button
            type="warning"
            @click="toRegister()"
          >注册</el-button> -->
          <el-button type="primary" @click="phoneLogin()">手机号登录</el-button>

          <el-checkbox style="zoom: 145%;margin-top:5px" v-model="checked"><label>记住账号</label></el-checkbox>
        </el-form>

        <br/><br/>
        <div style="float: right;margin-left: 20px;">
        <a href="javascript:void(0)" @click="gotoForgetPass()"><font color="#409EFF" style="font-size:20px">忘记密码</font></a>
        </div>

    <el-dialog style="margin-top:6%;margin-left:30%;height:100%;width:50%" title="验证" :visible.sync="show">
      <div style="float:right;margin-top:-70px;margin-right:28px">
        <el-button type="primary" round @click="handleClick()">刷新图片</el-button>
      </div>
      <transition name="fade">
        <slideCaptcha @onSubmit="onSubmit" @close="close" ref="child"></slideCaptcha>
      </transition>
    </el-dialog>

    <el-dialog style="height:150%" title="手机号登录" :visible.sync="phoneViewable">
      <el-form ref="phoneForm" :rules="rules" :model="phoneForm" size="big" label-width="100px">
        <el-row>

          <el-form-item
            prop="phone"
          >
            <el-input
              name="phone"
              autocomplete="on"
              autofocus="autofocus"
              type="text"
              v-model="phoneForm.phone"
              placeholder="手机号"
            ></el-input>
            <el-button type="primary" :disabled="disableFlag" @click="send()">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              name="captcha"
              type="text"
              v-model="phoneForm.captcha"
              placeholder="验证码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-select v-model="phoneForm.sign" placeholder="请选择">
              <el-option
                v-for="item in personnel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
          <el-checkbox style="margin-left:250px;margin-top:5px;zoom: 140%;" v-model="phoneChecked"><label>记住手机号</label></el-checkbox>
          <el-button @click="phoneViewable=false">取 消</el-button>
          <el-button type="primary" @click="phoneOnSubmit('phoneForm')">登录</el-button>
        </el-row>
      </el-form>
    </el-dialog>

      </div>
    </el-card>

  </div>
</template>
<script>
import Cookies from 'js-cookie'
import slideCaptcha from "@/components/views/slideCaptcha";
export default {
  components: {
    slideCaptcha
  },
  created() {
    if(this.getCookie()!=undefined && this.getCookie()!='') {
      this.$router.push({  
        path: '/',   
        name: '', 
        params: {   
        }  
      })
    }

    if (document.cookie.length>0) {
      var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
      for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');//再次切割
        //判断查找相对应的值
        if(arr2[0]=='username'){
          this.form.name = arr2[1]
        }
      }
    }

    this.captcha = Math.floor(Math.random() * (9999 - 1000) + 1000)
    console.log(this.captcha)


  },
  data () {
    // add by axiang [20190609] 添加判断是否为管理员逻辑
    var validateUsername = (rule, value, callback) => {
      var reg = /^\w+$/
      if (!reg.test(value)) callback(new Error('请输入字母、数字或者下划线'))
      else callback()
    }
    var validatePhone = (rule, value, callback) => {
      var reg = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/
      if (!reg.test(value)) {
        callback(new Error('电话号码不合法'))
      } else {
        callback()
      }
    }
    return {
      captcha : '',
      loading: false,
      phoneViewable : false,
      disableFlag : false,
      show:false,
      router:'/',
      sign : 1,
      checked:false,
      phoneChecked:false,
      picUrl: require('../../assets/image/login.jpg'),
      form: {
        name: '',
        pwd: ''
      },
      phoneForm : {
        phone: '',
        captcha: '',
        sign : 1
      },
      personnel : [{
        value : 1,
        label : '员工'
      }],
      datas: [],
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'change'
          },
          { validator: validateUsername, trigger: 'change' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        captcha : [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {

    handleClick() {
      this.$refs.child.onRefresh();
    },

    login() {
      if(this.form.name==''||this.form.name==null||this.form.pwd==''||this.form.pwd==null) {
        alert("请填写账号和密码!")
        return;
      }
      this.show = true
      this.$refs.child.onRefresh();
    },

    close(){
      this.show = false
    },

    gotoForgetPass() {
      this.$router.push({path: '/forgetPass',name: 'forgetPass'})
    },

    async sendCaptcha(data) {
      return await this.$http.post('/gateway/shiro/sendCaptcha',data)
    },
    send() {
      if(this.phoneForm.phone==''||this.phoneForm.phone==null) {
        alert("请输入手机号!")
        return
      }
      var reg = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/
      if (!reg.test(this.phoneForm.phone)) {
        alert("请输入正确格式的手机号!")
        return
      } else {
        this.sendCaptcha({
          head: {
            version: '1',
            businessType: '12',
            equipId: '1',
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              phone: this.phoneForm.phone,
            }
          }
        }).then(response => {
          if("success" == response.head.responseCode) {
            this.captcha = response.body.data
            this.disableFlag = true
            this.dataRefreh()
            console.log(this.captcha)
          } else {
            this.$message.error(response.head.message)
          }
        })
      }
    },

    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
          return;
      }
      // 计时器为空，操作
      this.intervalId = setTimeout(() => {
          this.captcha = '' 
          this.disableFlag = false
      }, 5*1000*60);
  }, 

    async phoneDoLogin(data) {
      return await this.$http.post('/gateway/shiro/phoneDoLogin',data)
    },

    phoneOnSubmit(phoneForm) {
      this.$refs[phoneForm].validate(async(valid) => {
        if (!valid) {
          alert("数据未填")
        }else {
          console.log(this.phoneForm)
          if (this.phoneChecked == true) {
            localStorage.setItem("phoneNumber",JSON.stringify(this.phoneForm.phone));
          }else {
          var exdate=new Date();//获取时间
            localStorage.setItem("phoneNumber",JSON.stringify(''));
          }
          if(this.captcha!=this.phoneForm.captcha) {
            alert("验证码错误!")
            return
          }
          this.phoneDoLogin({
          head: {
            version: '1',
            businessType: '12',
            equipId: '1',
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              phone: this.phoneForm.phone,
              sign : this.phoneForm.sign,
              }
            }
          }).then(response => {
          if("success" == response.head.responseCode) {
              alert("登录成功!")
              var exdate=new Date();//获取时间
              exdate.setTime(exdate.getTime() + 24*60*60*1000);//保存的天数
              //字符串拼接cookie
              let str = this.phoneForm.sign==1?"staffToken":"examineeToken";
              // console.log(response.body.data)
              window.document.cookie = str+ "= " +response.body.data+";expires="+exdate.toGMTString();
              
              this.$router.push({  
                path: '/',   
                name: '', 
                params: {   
                }  
              })
            } else {
              alert(response.head.message)
            }
          })
        }
      })
    },
    phoneLogin() {
      this.phoneViewable = true
      this.phoneForm = {
        phone: '',
        captcha: '',
        sign : 1
      }
      let phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'))
      if(phoneNumber!=null&&phoneNumber!='') {
        this.phoneForm.phone = phoneNumber
      }
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

    async doLogin(data) {
      return await this.$http.post('/gateway/shiro/doLogin',data)
    },

    async onSubmit (formName) {

      if (this.checked == true) {
        var exdate=new Date();//获取时间
        exdate.setTime(exdate.getTime() + 24*60*60*1000);//保存的天数
        window.document.cookie = "username = " +this.form.name+";expires="+exdate.toGMTString();
      }else {
       var exdate=new Date();//获取时间
        exdate.setTime(exdate.getTime() + -1);//保存的天数
        window.document.cookie = "username = "+";expires="+exdate.toGMTString();
      }

      let data = {
          head: {
            version: '1',
            businessType: '12',
            equipId: '1',
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              sign : this.sign,
              username: this.form.name,
              password: this.form.pwd,
            }
          }
        }

        let response = await this.doLogin(data)
      
        if("success" == response.head.responseCode) {
          console.log("go")
          alert("登录成功!")
          var exdate=new Date();//获取时间
          exdate.setTime(exdate.getTime() + 24*60*60*1000);//保存的天数
          //字符串拼接cookie
          let str = this.sign==1?"staffToken":"examineeToken";
          window.document.cookie = str+ "= " +response.body.data+";expires="+exdate.toGMTString();
          
          this.$store.commit("setToken", response.body.data);

          this.$router.push({  
            path: '/',   
            name: '', 
            params: {   
            }  
          })
          this.doAddUserOnlineInfo()
        } else {
          alert(response.head.message)
          this.show = false
        }
      
    },
    toRegister () {
      this.$router.push({ name: 'Register' })
    },

    doAddUserOnlineInfo(){
        this.$ajax.post(
        'gateway/systemModule/doAddUserOnlineInfo',
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

<style scoped>
.box-card {
  width: 850px;
  min-height: 380px;
  margin: auto;
  padding: 0;
}

.login {
  width: 100%;
  height: 700px;
  padding-top: 5%;
  margin: 0;
}

.login-box {
  width: 400px;
  height: 100%;
  float: left;
  margin: 20px;
}

h1 {
  letter-spacing: 10px;
  font-size: 40px;
  color: #5d478b;
}

.img {
  float: left;
  /* background-image: url('../../assets/image/login.jpg'); */
  background-size: cover;
  width: 380px;
  height: 380px;
}

.el-button {
  float: right;
  margin-left: 20px;
}

/* .l-captcha {
  height: 100px;
  width: 100px;
} */
</style>

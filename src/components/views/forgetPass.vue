<template>
  <el-card
    class="register-body"
    v-loading="loading"
  >
    <div slot="header">
      重置密码
    </div>
    <div class="left-body">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
      >
        
        <el-form-item
          label="新密码"
          prop="oldpwd"
        >
          <el-input
            show-password
            v-model="form.oldpwd"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="newpwd"
        >
          <el-input
            show-password
            v-model="form.newpwd"
            placeholder="请再次输入密码，需一致"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="电话"
          prop="phone"
        >
          <el-input
            style="width:75%"
            v-model="form.phone"
            placeholder="请输入电话"
          ></el-input>
            <el-button style="float:right" type="primary" :disabled="disableFlag" @click="send()">发送验证码</el-button>
        </el-form-item>

        
        <el-form-item prop="captcha">
            <el-input
              name="captcha"
              type="text"
              v-model="form.captcha"
              placeholder="验证码"
            ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit('form')"
          >确认修改</el-button>
          <el-button @click="this.$router.push({path: '/Login',name: 'Login',})">取消</el-button>
        </el-form-item>

      </el-form>
    </div>
  </el-card>
</template>

<script>

export default {
  components: {
  },
  data () {
    
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.oldpwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
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
      loading: false,
      disableFlag:false,
      captcha:'',
      form: {
        oldpwd: '',
        newpwd: '',
        phone: '',
        captcha:''
      },
      rules: {
        captcha : [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        oldpwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        newpwd: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
      }
    }
  },
  created () {
    this.captcha = Math.floor(Math.random() * (9999 - 1000) + 1000)
    console.log(this.captcha)
  },
  methods: {
    async sendCaptcha(data) {
      return await this.$http.post('/gateway/shiro/sendCaptcha',data)
    },
    send() {
      if(this.form.phone==''||this.form.phone==null) {
        alert("请输入手机号!")
        return
      }
      var reg = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/
      if (!reg.test(this.form.phone)) {
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
                  phone: this.form.phone,
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
  
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          if(this.captcha!=this.form.captcha) {
            alert("验证码错误!")
            this.loading = false
            return
          }
          this.$http.post('/gateway/shiro/forgetPass',
          {
            head: {
              version: '1',
              businessType: '12',
              equipId: '1',
              equipType: 1,
              encrypt: 1
            },
            body: {
              data: {
                phone : this.form.phone,
                password : this.form.newpwd,
              }
            }
          }
        ).then(
          (response) => {
            console.log(response);
            if("success" == response.head.responseCode) {
              alert("重置密码成功!")
              this.$router.push({  
                path: '/Login',   
                name: 'Login', 
                params: {   
                }  
            })
            } else {
              alert(response.head.message)
              this.loading = false
            }
          }, function (e) {
            console.log(e)
            this.loading = false
          }
        )
  
        } else {
          alert("数据填写错误,请检查!")
        }
      })
    },

  }
}
</script>

<style  scoped>
.register-body {
  width: 80%;
  min-height: 600px;
  margin: auto;
}

.left-body {
  float: left;
  width: 50%;
  min-height: 600px;
}

.right-body {
  float: left;
  width: 50%;
  min-height: 600px;
}
</style>

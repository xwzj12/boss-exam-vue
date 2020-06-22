<template>
  <el-card
    class="register-body"
    v-loading="loading"
  >
    <div slot="header">
      用户注册
    </div>
    <div class="left-body">
      <el-form
        ref="regForm"
        :rules="rules"
        :model="registerForm"
        label-width="80px"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名，必须为合法字符，长度在4-16之间"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="oldpwd"
        >
          <el-input
            show-password
            v-model="registerForm.oldpwd"
            placeholder="请输入密码，必须为合法字符，长度在8-16之间"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="重复密码"
          prop="newpwd"
        >
          <el-input
            show-password
            v-model="registerForm.newpwd"
            placeholder="请再次输入密码，需一致"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            v-model="registerForm.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-select v-model="registerForm.gender" placeholder="请选择">
            <el-option
              v-for="item in sex"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="电话"
          prop="phone"
        >
          <el-input
            v-model="registerForm.phone"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>
        
        <el-form-item label="备注">
          <el-input
            v-model="registerForm.faculty"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit('regForm')"
          >立即注册账号</el-button>
          <el-button @click="window.location.href = '/Login'">取消</el-button>
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
    var validateUsername = (rule, value, callback) => {
      var reg = /^\w+$/
      if (!reg.test(value)) {
        callback(new Error('请输入字母、数字或者下划线'))
      } else {
        this.$http.post('/gateway/shiro/checkUsername',
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
                username : this.registerForm.username
              }
            }
          }
        ).then(
          (response) => {
            if("success" == response.head.responseCode) {
              callback()
            } else {
              callback(new Error(response.head.message))
            }
          }, function (e) {
            console.log(e)
          }
        )
      }
    }
    var validatePass = (rule, value, callback) => {
      var reg = /^\w+$/
      if (!reg.test(value)) {
        callback(new Error('请输入字母、数字或者下划线'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.oldpwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    var validateEmail = (rule, value, callback) => {
      var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (!reg.test(value)) {
        callback(new Error('邮箱不合法'))
      } else {
        this.$http.post('/gateway/shiro/checkEmail',
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
              email : this.registerForm.email
            }
          }
        }
      ).then(
        (response) => {
          if("success" == response.head.responseCode) {
            callback()
          } else {
            callback(new Error(response.head.message))
          }
        }, function (e) {
          console.log(e)
        }
      )
      }
    }

    var validatePhone = (rule, value, callback) => {
      var reg = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/
      if (!reg.test(value)) {
        callback(new Error('电话号码不合法'))
      } else {
        this.$http.post('/gateway/shiro/checkPhone',
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
                phone : this.registerForm.phone
              }
            }
          }
        ).then(
          (response) => {
            if("success" == response.head.responseCode) {
              callback()
            } else {
              callback(new Error(response.head.message))
            }
          }, function (e) {
            console.log(e)
          }
        )
      }
    }
    return {
      loading: false,
      sex:[{}],
      registerForm: {
        username: '',
        name: '',
        remark : '',
        oldpwd: '',
        newpwd: '',
        gender: '',
        email: '',
        phone: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在4-16个字符之间', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        oldpwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在8-16个字符之间', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        newpwd: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在8-16个字符之间', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
        ],
      }
    }
  },
  created () {
    this.$http.post('/gateway/shiro/getSex',
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
              }
            }
          }
        ).then(
          (response) => {
            if("success" == response.head.responseCode) {
              console.log(response)
              this.sex = response.body.data
            } else {
              alert(response.head.message)
            }
          }, function (e) {
            console.log(e)
          }
        )
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          console.log(this.registerForm)
          this.registerForm.gender=="1"?1:0;
          this.$http.post('/gateway/shiro/register',
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
                phone : this.registerForm.phone,
                email : this.registerForm.email,
                password : this.registerForm.newpwd,
                username : this.registerForm.username,
                name : this.registerForm.name,
                sex : this.registerForm.gender,
                remark : this.registerForm.remark,
              }
            }
          }
        ).then(
          (response) => {
            console.log(response);
            if("success" == response.head.responseCode) {
              alert("注册成功!")
              window.location.href = '/Login'
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
          alert("数据出错请检查!")
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

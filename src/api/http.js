import axios from 'axios'
import { Message } from 'element-ui'
const config = require('../../config/oj.config.json')
const store = require('../store/index')

Vue.prototype.$ajax= axios;
axios.defaults.baseURL="http://120.26.178.23:8000/"
// axios.defaults.baseURL="http://localhost:8000/"
//axios.defaults.baseURL = config.apiUrl
axios.defaults.timeout = 5000
axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    if (
      String(error)
        .toLowerCase()
        .indexOf('timeout') !== -1
    ) {
      Message.error('服务器繁忙，请稍后重试！')
      
    } else if (error.response.status === 400) {

      var exp = new Date();
      exp.setTime(exp.getTime() - 1);

      //字符串拼接cookie
      let str = 'staffToken'
      window.document.cookie = str+ "="+";expires="+ exp.toGMTString()+"; path=/";
      this.$router.push({path: '/Login',name: 'Login'})

      Message.error(error.response.data.msg)
    } else if (error.response.status === 401) {
      Message.error(error.response.data.msg)
    } 
    // else if (error.response.status === 401) {
    //   Message.error('没有权限，请联系管理员授予')
    //   var exdate=new Date();//获取时间
    //   exdate.setTime(exdate.getTime() + -1);//保存的天数

      
    //   str = "staffToken"

    //   //字符串拼接cookie
    //   window.document.cookie = str+ "= "+";expires="+exdate.toGMTString();
    //   window.location.href = '/Login'
    // }

    else if (error.response.status === 404) {
      Message.error('服务器好像挂了，要不等等试试')
    } else if (error.response.status === 500) {
      Message.error(error.response.data.msg)
    } else {
      Message.error(error.response.data.msg)
    }
    return Promise.reject(error)
  }
)

// add by axiang [20190613] 对axios进行了二次封装， 1.将token封装在请求头部中，方便权限验证； 2.方便
var http = {
  /** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get: function (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: params,
        headers: {
          auth: store.default.getters.getToken
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  /** post 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  post: function (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        // 放在请求体内
        data: params,
        headers: {
          auth: store.default.getters.getToken
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  uploadFile: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: data,
        headers: {
          'auth': store.default.getters.getToken,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
export default http

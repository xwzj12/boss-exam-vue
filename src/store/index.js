import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// add by axiang [20190611] 添加store存储状态
export default new Vuex.Store({
  state: {
    examData: Object,
    avatarUrl: '',
    isLogin: false,
    isAdmin: false,
    isClockIn: false,
    index: '',
    unReadMsgCount: 0,
    token: '',
    adminleftnavnum:"1",
    examPublishRecordId: "",
    examPublishId: "",
    url: "",
    userId: "",
    userName: "",
    userSex: "",
    entryExam: false,
    examRecordId: "",
    phoneExamData: Object,
    queryPublishId: "",
    queryPublishId2: ""
  },
  mutations: {
    setqueryPublishId(state, queryPublishId) {
      state.queryPublishId = queryPublishId;
    },
    setqueryPublishId2(state, queryPublishId) {
      state.queryPublishId2 = queryPublishId;
    },
    setexamPublishRecordId(state, examPublishRecordId) {
      state.examPublishRecordId = examPublishRecordId;
    },
    setExamPublishId(state, examPublishId) {
      state.examPublishId = examPublishId;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setUserSex(state, userSex) {
      state.userSex = userSex;
    },
    setEntryExam(state, entryExam) {
      state.entryExam = entryExam;
    },
    setExamRecordId(state, examRecordId) {
      state.examRecordId = examRecordId;
    },
    setphoneExamData(state, phoneExamData) {
      state.phoneExamData = phoneExamData;
    },
    setAvatarUrl (state, avatarUrl) {
      state.avatarUrl = avatarUrl
    },
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
    },
    setIsAdmin (state, isAdmin) {
      state.isAdmin = isAdmin
    },
    setIsClockIn (state, isClockIn) {
      state.isClockIn = isClockIn
    },
    setUnReadMsgCount (state, unReadMsgCount) {
      state.unReadMsgCount = unReadMsgCount
    },
    setToken (state, token) {
      state.token = token
    },
    setAdminleftnavnum (state,adminleftnavnum) {
      state.adminleftnavnum = adminleftnavnum
    },
    setExamData(state, examData) {
      state.examData = examData;
    },
    seturl(state, url) {
      state.url = url;
    }
  },
  getters: {
    getqueryPublishId: state => state.queryPublishId,
    getqueryPublishId2: state => state.queryPublishId2,
    getAvatarUrl: state => state.avatarUrl,
    getIsLogin: state => state.isLogin,
    getIsAdmin: state => state.isAdmin,
    getIsClockIn: state => state.isClockIn,
    getUnReadMsgCount: state => state.unReadMsgCount,
    getToken: state => state.token,
    getAdminleftnavnum: state => state.adminleftnavnum,
    getExamData: state => state.examData,
    geturl: state => state.eurl,
    getexamPublishRecordId: state => state.examPublishRecordId,
    getExamPublishId: state => state.examPublishId,
    getUserId: state => state.userId,
    getUserName: state => state.userName,
    getUserSex: state => state.userSex,
    getEntryExam: state => state.entryExam,
    getExamRecordId: state => state.examRecordId,
    getphoneExamData: state => state.phoneExamData
  }
})

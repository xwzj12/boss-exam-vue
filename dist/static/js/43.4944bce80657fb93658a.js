webpackJsonp([43],{Krsm:function(e,t){},z2fo:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Xxa5"),r=a.n(s),n=a("exGp"),o=a.n(n),i={data:function(){return{phoneExamData:"",btnDisabled:!1,userName:this.$store.getters.getUserName,userSex:this.$store.getters.getUserSex}},mounted:function(){this.getExamInfo()},methods:{getExamInfo:function(){var e=this;return o()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post("/gateway/exam/publish/queryExam",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:e.$store.getters.getExamPublishId}});case 2:a=t.sent,e.$store.commit("setphoneExamData",a.body.data),e.phoneExamData=a.body.data,(new Date).getTime()>=new Date(e.phoneExamData.endTime)?(e.btnDisabled=!0,e.$message.error("本场考试已经结束！无法加入")):(new Date).getTime()<=new Date(e.phoneExamData.startTime)&&(e.btnDisabled=!0,e.$message.warning("本场考试还未开始！无法加入"));case 6:case"end":return t.stop()}},t,e)}))()},doStartExam:function(){var e=this;return o()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("shuju"),console.log(e.$store.getters.getUserId),console.log(e.$store.getters.getExamPublishId),t.next=5,e.$http.post("/gateway/exam/exam/startExam",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{examPublishRecordId:e.$store.getters.getExamPublishId,examUserId:e.$store.getters.getUserId}}});case 5:!0===(a=t.sent).body.data.isStart?(e.$message.success("开始考试，开始计时"),e.$store.commit("setEntryExam",!0),e.$store.commit("setExamRecordId",a.body.data.examRecordId),e.$router.push("/phoneExam")):e.$message.error(a.head.message);case 7:case"end":return t.stop()}},t,e)}))()}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"body"},[a("h1",[e._v("博思考试系统")]),e._v(" "),a("el-card",[a("p",{staticStyle:{color:"blue"}},[e._v("\n      欢迎您！"+e._s(e.userName)+" "+e._s(0===e.userSex?"先生":"女士")+"\n    ")]),e._v(" "),a("p",[e._v("本场考试编号："+e._s(e.phoneExamData.examPublishRecordId))]),e._v(" "),a("p",[e._v("本场考试名称："+e._s(e.phoneExamData.title))]),e._v(" "),a("p",[e._v("考试开放时间："+e._s(e.phoneExamData.startTime))]),e._v(" "),a("p",[e._v("考试截止时间： "+e._s(e.phoneExamData.endTime))]),e._v(" "),a("p",[e._v("\n      考试类型："+e._s("1"===e.phoneExamData.status?"限时考试":"不限时考试")+"\n    ")]),e._v(" "),a("p",[e._v("请注意，考试过程中请遵守考场纪律")]),e._v(" "),a("p",{staticStyle:{color:"red"}},[e._v("\n      点击开始考试按钮后进入考试界面，并开始计时\n    ")]),e._v(" "),a("p",{staticStyle:{color:"red"}},[e._v("如果被判定作弊，你的成绩将直接作废！")])]),e._v(" "),a("p"),e._v(" "),a("el-button",{attrs:{disabled:e.btnDisabled,type:"primary"},on:{click:function(t){return e.doStartExam()}}},[e._v("开始考试")])],1)},staticRenderFns:[]};var m=a("VU/8")(i,d,!1,function(e){a("Krsm")},"data-v-017c85b6",null);t.default=m.exports}});
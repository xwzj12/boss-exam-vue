webpackJsonp([30],{AXxZ:function(e,t){},F8DZ:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("Xxa5"),a=r.n(s),n=r("exGp"),i=r.n(n),o=r("BO1k"),c=r.n(o),d=r("zL8q"),u={data:function(){return{examStatus:"",paperData:"",examRecord:"",phoneExamData:"",endTimeLeft:"",myAnswers:{},timer1:"",timer2:"",apiUrl:"",examUserId:"",examPublishRecordId:"",evaluateText:""}},mounted:function(){var e=this;this.apiUrl="http://120.26.178.23:8000/",this.phoneExamData=this.$store.getters.getphoneExamData,this.examStatus=this.phoneExamData.status,this.examUserId=this.$store.getters.getUserId,this.examPublishRecordId=this.$store.getters.getExamPublishId,this.endTimeLeft=this.examRecord.tempTime,this.timer1=setInterval(function(){e.getTimeLeft(),e.doUpdateLimitTime()},6e4),this.getPaper(),this.getExamRecord(),this.timer2=setInterval(function(){e.doBackUpAnswer()},6e4)},methods:{handleAvatarSuccess:function(e,t){var r=!0,s=!1,a=void 0;try{for(var n,i=c()(this.paperData.subjects);!(r=(n=i.next()).done);r=!0){var o=n.value;if(o.id===e.body.data[0]){o.pic=URL.createObjectURL(t.raw),o.myAnswer=e.body.data[1];break}}}catch(e){s=!0,a=e}finally{try{!r&&i.return&&i.return()}finally{if(s)throw a}}this.doBackUpAnswer()},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type,r=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),r||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&r},getTimeLeft:function(){this.examRecord.tempTime=this.examRecord.tempTime-1,2==this.examRecord.tempTime&&this.$message.error("考试时间还剩2分钟!"),this.examRecord.tempTime.valueOf()<=0?this.doEndExam():this.endTimeLeft=~~(this.examRecord.tempTime.valueOf()/60)+"小时"+this.examRecord.tempTime.valueOf()%60},getPaper:function(){var e=this;return i()(a.a.mark(function t(){var r,s,n,i,o,u,p,m;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=d.Loading.service(),t.next=3,e.$http.post("/gateway/exam/paper/goPaper",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{examPublishRecordId:e.$store.getters.getExamPublishId,examUserId:e.$store.getters.getUserId}}});case 3:for(s=t.sent,e.paperData=s.body.data,e.examStatus=e.$store.getters.getphoneExamData.status,n=!0,i=!1,o=void 0,t.prev=9,u=c()(e.paperData.subjects);!(n=(p=u.next()).done);n=!0)"367183204926050304"===(m=p.value).subjectTypeId?m.myAnswer="":"413215621381836800"===m.subjectTypeId?m.myAnswer=[]:(m.subjectTypeId,m.myAnswer="");t.next=17;break;case 13:t.prev=13,t.t0=t.catch(9),i=!0,o=t.t0;case 17:t.prev=17,t.prev=18,!n&&u.return&&u.return();case 20:if(t.prev=20,!i){t.next=23;break}throw o;case 23:return t.finish(20);case 24:return t.finish(17);case 25:e.restoreAnswer(),r.close();case 27:case"end":return t.stop()}},t,e,[[9,13,17,25],[18,,20,24]])}))()},getExamRecord:function(){var e=this;return i()(a.a.mark(function t(){var r,s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=d.Loading.service(),t.next=3,e.$http.post("/gateway/exam/exam/queryExamRecord",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{examPublishRecordId:e.$store.getters.getExamPublishId,examUserId:e.$store.getters.getUserId}}});case 3:s=t.sent,e.examRecord=s.body.data,r.close(),e.getTimeLeft();case 7:case"end":return t.stop()}},t,e)}))()},restoreAnswer:function(){var e=this;return i()(a.a.mark(function t(){var r,s,n,i,o,d,u,p,m,v,h,l,y,x,f,w,b,g,A,I,T;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post("/gateway/exam/exam/restoreAnswer",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:e.$store.getters.getExamRecordId}});case 2:if(r=t.sent,0==(s=r.body.data).length){t.next=71;break}n=!0,i=!1,o=void 0,t.prev=8,d=c()(e.paperData.subjects);case 10:if(n=(u=d.next()).done){t.next=57;break}if("413215621381836800"!==(p=u.value).subjectTypeId){t.next=35;break}for(m=[],v=!0,h=!1,l=void 0,t.prev=17,y=c()(s);!(v=(x=y.next()).done);v=!0)(f=x.value).paperSubjectId===p.id&&m.push(f.myAnswer),p.myAnswer=m;t.next=25;break;case 21:t.prev=21,t.t0=t.catch(17),h=!0,l=t.t0;case 25:t.prev=25,t.prev=26,!v&&y.return&&y.return();case 28:if(t.prev=28,!h){t.next=31;break}throw l;case 31:return t.finish(28);case 32:return t.finish(25);case 33:t.next=54;break;case 35:for(w=!0,b=!1,g=void 0,t.prev=38,A=c()(s);!(w=(I=A.next()).done);w=!0)(T=I.value).paperSubjectId===p.id&&(p.myAnswer=T.myAnswer);t.next=46;break;case 42:t.prev=42,t.t1=t.catch(38),b=!0,g=t.t1;case 46:t.prev=46,t.prev=47,!w&&A.return&&A.return();case 49:if(t.prev=49,!b){t.next=52;break}throw g;case 52:return t.finish(49);case 53:return t.finish(46);case 54:n=!0,t.next=10;break;case 57:t.next=63;break;case 59:t.prev=59,t.t2=t.catch(8),i=!0,o=t.t2;case 63:t.prev=63,t.prev=64,!n&&d.return&&d.return();case 66:if(t.prev=66,!i){t.next=69;break}throw o;case 69:return t.finish(66);case 70:return t.finish(63);case 71:case"end":return t.stop()}},t,e,[[8,59,63,71],[17,21,25,33],[26,,28,32],[38,42,46,54],[47,,49,53],[64,,66,70]])}))()},autoEndExam:function(){this.$message.console.warn("考试时间到！自动提交试卷")},confirmEnd:function(){var e=this;this.$confirm("即将提交答案, 确认后无法继续考试，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.doEndExam()}).catch(function(){e.$message({type:"info",message:"已取消"})})},doEndExam:function(){var e=this;return i()(a.a.mark(function t(){var r,s,n,i,o,u,p,m,v,h,l,y,x,f,w,b,g,A,I,T,_,k,$;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:clearInterval(e.timer2),clearInterval(e.timer1),r=d.Loading.service(),e.myAnswers.examUserId=e.$store.getters.getUserId,e.myAnswers.examRecordId=e.$store.getters.getExamRecordId,e.myAnswers.examPublishId=e.$store.getters.getExamPublishId,s=[],n=!0,i=!1,o=void 0,t.prev=10,u=c()(e.paperData.subjects);case 12:if(n=(p=u.next()).done){t.next=61;break}if("413215621381836800"!==(m=p.value).subjectTypeId){t.next=57;break}for(v=[],h=!0,l=!1,y=void 0,t.prev=19,x=c()(m.answers);!(h=(f=x.next()).done);h=!0)"1"===(w=f.value).rightAnswer&&v.push(w.id);t.next=27;break;case 23:t.prev=23,t.t0=t.catch(19),l=!0,y=t.t0;case 27:t.prev=27,t.prev=28,!h&&x.return&&x.return();case 30:if(t.prev=30,!l){t.next=33;break}throw y;case 33:return t.finish(30);case 34:return t.finish(27);case 35:for(b=e.eqSet(m.myAnswer,v),g=!0,A=!1,I=void 0,t.prev=39,T=c()(m.myAnswer);!(g=(_=T.next()).done);g=!0)k=_.value,!0===b?s.push({paperSubjectId:m.id,myAnswer:k,score:m.score/m.answers.length()}):s.push({paperSubjectId:m.id,myAnswer:k,score:0});t.next=47;break;case 43:t.prev=43,t.t1=t.catch(39),A=!0,I=t.t1;case 47:t.prev=47,t.prev=48,!g&&T.return&&T.return();case 50:if(t.prev=50,!A){t.next=53;break}throw I;case 53:return t.finish(50);case 54:return t.finish(47);case 55:t.next=58;break;case 57:"411526617355735040"===m.subjectTypeId||"367183204926050304"===m.subjectTypeId?m.myAnswer===m.rightAnswer?s.push({paperSubjectId:m.id,myAnswer:m.myAnswer,standardAnswer:m.rightAnswer,score:m.score}):s.push({paperSubjectId:m.id,myAnswer:m.myAnswer,standardAnswer:m.rightAnswer,score:0}):s.push({paperSubjectId:m.id,myAnswer:m.myAnswer});case 58:n=!0,t.next=12;break;case 61:t.next=67;break;case 63:t.prev=63,t.t2=t.catch(10),i=!0,o=t.t2;case 67:t.prev=67,t.prev=68,!n&&u.return&&u.return();case 70:if(t.prev=70,!i){t.next=73;break}throw o;case 73:return t.finish(70);case 74:return t.finish(67);case 75:return e.myAnswers.records=s,t.next=78,e.$http.post("/gateway/exam/exam/submitPaper",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:e.myAnswers}});case 78:!0===($=t.sent).body.data?(e.$message.success("保存成功！"),r.close(),e.$router.push("/endExam")):(e.$message.error($.head.message),r.close(),e.$router.push("/endExam")),r.close();case 81:case"end":return t.stop()}},t,e,[[10,63,67,75],[19,23,27,35],[28,,30,34],[39,43,47,55],[48,,50,54],[68,,70,74]])}))()},doBackUpAnswer:function(){this.myAnswers.examUserId=this.$store.getters.getUserId,this.myAnswers.examRecordId=this.$store.getters.getExamRecordId;var e=[],t=!0,r=!1,s=void 0;try{for(var a,n=c()(this.paperData.subjects);!(t=(a=n.next()).done);t=!0){var i=a.value;if("413215621381836800"===i.subjectTypeId){var o=[],d=!0,u=!1,p=void 0;try{for(var m,v=c()(i.answers);!(d=(m=v.next()).done);d=!0){var h=m.value;"1"===h.rightAnswer&&o.push(h.id)}}catch(e){u=!0,p=e}finally{try{!d&&v.return&&v.return()}finally{if(u)throw p}}var l=this.eqSet(i.myAnswer,o),y=!0,x=!1,f=void 0;try{for(var w,b=c()(i.myAnswer);!(y=(w=b.next()).done);y=!0){var g=w.value;!0===l?e.push({paperSubjectId:i.id,myAnswer:g,score:i.score/i.answers.size()}):e.push({paperSubjectId:i.id,myAnswer:g,score:0})}}catch(e){x=!0,f=e}finally{try{!y&&b.return&&b.return()}finally{if(x)throw f}}}else"411526617355735040"===i.subjectTypeId||"367183204926050304"===i.subjectTypeId?i.myAnswer===i.rightAnswer?e.push({paperSubjectId:i.id,myAnswer:i.myAnswer,standardAnswer:i.rightAnswer,score:i.score}):e.push({paperSubjectId:i.id,myAnswer:i.myAnswer,standardAnswer:i.rightAnswer,score:0}):e.push({paperSubjectId:i.id,myAnswer:i.myAnswer})}}catch(e){r=!0,s=e}finally{try{!t&&n.return&&n.return()}finally{if(r)throw s}}this.myAnswers.records=e,this.$http.post("/gateway/exam/exam/backAnswer",{head:{version:"1",token:this.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:this.myAnswers}}),this.$message.success("自动保存成功！")},doUpdateLimitTime:function(){this.$http.post("/gateway/exam/exam/updateExamRecord",{head:{version:"1",token:this.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{examRecordId:this.examRecord.examRecordId,tempTime:this.examRecord.tempTime}}})},eqSet:function(e,t){if(e.size!==t.size)return!1;var r=!0,s=!1,a=void 0;try{for(var n,i=c()(e);!(r=(n=i.next()).done);r=!0){var o=n.value;if(!this.has(o,t))return!1}}catch(e){s=!0,a=e}finally{try{!r&&i.return&&i.return()}finally{if(s)throw a}}return!0},has:function(e,t){var r=!0,s=!1,a=void 0;try{for(var n,i=c()(t);!(r=(n=i.next()).done);r=!0){return e===n.value}}catch(e){s=!0,a=e}finally{try{!r&&i.return&&i.return()}finally{if(s)throw a}}}},beforeDestroy:function(){this.timer1&&clearInterval(this.timer1),this.timer2&&clearInterval(this.timer2)}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"body"},[r("h1",[e._v("博思考试系统")]),e._v(" "),r("h3",{staticStyle:{color:"blue"}},[e._v("正在考试!")]),e._v(" "),e.$store.getters.getEntryExam?r("div",[r("el-card",[r("p",{directives:[{name:"show",rawName:"v-show",value:0===e.examStatus,expression:"examStatus === 0"}],staticStyle:{color:"red"}},[e._v("\n        本场为不限时考试，规定时间内作答即可\n      ")]),e._v(" "),r("p",[e._v("本场考试编号："+e._s(e.phoneExamData.examPublishRecordId))]),e._v(" "),r("p",[e._v("本场考试名称："+e._s(e.phoneExamData.title))]),e._v(" "),r("p",[e._v("考试开放时间："+e._s(e.phoneExamData.startTime))]),e._v(" "),r("p",[e._v("考试截止时间： "+e._s(e.phoneExamData.endTime))]),e._v(" "),r("p",[e._v("考试实际开始于："+e._s(e.examRecord.actualStartTime))]),e._v(" "),r("p",{directives:[{name:"show",rawName:"v-show",value:1===e.examStatus,expression:"examStatus === 1"}]},[e._v("\n        考试限时：\n        "),r("span",{staticStyle:{color:"red","font-weight":"bold"}},[e._v("\n          "+e._s(e.$store.getters.getphoneExamData.limitTime)+"\n        ")]),e._v("\n        小时\n      ")]),e._v(" "),r("p",{directives:[{name:"show",rawName:"v-show",value:1===e.examStatus,expression:"examStatus === 1"}]},[e._v("\n        距离考试结束还有：\n        "),r("span",{staticStyle:{color:"red","font-weight":"bold"}},[e._v(e._s(e.endTimeLeft))]),e._v("\n        分钟\n      ")]),e._v(" "),r("p",[e._v("\n        自动保存：\n        "),r("span",{staticStyle:{color:"red","font-weight":"bold"}},[e._v("每1分钟")])])]),e._v(" "),e._l(e.paperData.subjects,function(t){return r("el-card",{key:t.id},[r("div",[r("p",[r("span",{staticStyle:{color:"red"}},[e._v("\n            ("+e._s(t.score)+"分\n            "+e._s("367183204926050304"===t.subjectTypeId?"单选题":"413215621381836800"===t.subjectTypeId?"多选题":"415836603560972288"===t.subjectTypeId?"主观题":"411526617355735040"===t.subjectTypeId?"判断题":"")+")\n          ")]),e._v(" "),r("span",[e._v(e._s(t.subject))])]),e._v(" "),"367183204926050304"===t.subjectTypeId||"411526617355735040"===t.subjectTypeId?r("div",[r("el-radio-group",{model:{value:t.myAnswer,callback:function(r){e.$set(t,"myAnswer",r)},expression:"item.myAnswer"}},e._l(t.answers,function(t){return r("el-radio",{key:t.id,attrs:{label:t.id}},[e._v(e._s(t.answer))])}),1)],1):"413215621381836800"===t.subjectTypeId?r("div",[r("el-checkbox-group",{model:{value:t.myAnswer,callback:function(r){e.$set(t,"myAnswer",r)},expression:"item.myAnswer"}},e._l(t.answers,function(t){return r("el-checkbox",{key:t.id,attrs:{label:t.id}},[e._v(e._s(t.answer))])}),1)],1):"415836603560972288"===t.subjectTypeId?r("div",[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.apiUrl+"/gateway/exam/exam/backAnswerPic/",data:{paperSubjectId:t.id},name:"answerPic","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[r("div",{staticStyle:{color:"blue"},attrs:{slot:"tip"},slot:"tip"},[e._v("\n              请上传您的解答，注意需要清晰的图片哦（选择图片后自动保存）\n            ")]),e._v(" "),t.myAnswer?r("img",{staticClass:"avatar",attrs:{src:t.myAnswer}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e()])])}),e._v(" "),r("p",[e._v("\n      若因网络问题导致提交不成功，可推出后重新登录，系统自动为您还原答案！\n    ")]),e._v(" "),r("el-button",{attrs:{slot:"reference",type:"primary"},on:{click:function(t){return e.confirmEnd()}},slot:"reference"},[e._v("提交试卷")])],2):r("div",[e._v("对不起，您没有权限进入考试")])])},staticRenderFns:[]};var m=r("VU/8")(u,p,!1,function(e){r("AXxZ")},"data-v-56dd1f94",null);t.default=m.exports}});
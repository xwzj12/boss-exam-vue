webpackJsonp([22],{"/cEI":function(e,t){},pzSg:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),s=a.n(r),n=a("exGp"),o=a.n(n),i=a("BO1k"),c=a.n(i),d={name:"Exam",created:function(){var e=this;localStorage.setItem("Authorization","eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIzNjY4MDUyMjE0NDY2NDc4MDgiLCJjb2RlIjoiMTkxMDUwNTQzMEBxcS5jb20iLCJ1cGRhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJjcmVhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJpcCI6IjEyNy4wLjAuMSIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLkuJPkuJrkurrlkZgiLCJleHAiOjE1OTEzMzM4MjEsInVzZXJJZCI6IjQxMjc3ODA0OTU3NjU1MDQwMCIsIm9yZ0lkIjoiMzY2ODA1MTU1MzIzNDQ1MjQ4In0.b5abDnn7Tqo14ie7ZTbVTOQm6BcIWSUeUQAGKMeqVos"),this.updataFlag=this.$route.query.updataFlag,this.pageId=this.$route.query.pageId,this.pageName=this.$route.query.pageName,this.pageDiscript=this.$route.query.pageDiscript,this.pageScore=this.$route.query.pageScore,this.$ajax.post("/gateway/paper/getTestPaperController",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{id:this.pageId}}}).then(function(t){console.log(t),e.subjectData=t.data.body.data.subjectPojoList,e.answerData=t.data.body.data.answerPojosList;for(var a=0;a<e.answerData.length;a++)1===e.answerData[a].rightAnswer&&(e.answerData[a].rightAnswer="1"),0===e.answerData[a].rightAnswer&&(e.answerData[a].rightAnswer="0");console.log(e.subjectData),console.log(e.answerData)},function(){console.log("error")})},data:function(){return{updataFlag:"",pageId:"",pageName:"",pageDiscript:"",pageScore:"",subjectData:[],answerData:[],paper:{},form:{},dialogFormVisible:!1,examStatus:"",paperData:"",examRecord:"",examData:"",endTimeLeft:0,myAnswers:{},timer1:"",timer2:"",apiUrl:""}},mounted:function(){var e=this;this.apiUrl=Object({NODE_ENV:"production"}).VUE_APP_APIURL,this.examData=this.$store.getters.getExamData,this.examStatus=this.examData.status,"1"===this.examStatus&&(this.timer1=setInterval(function(){e.getTimeLeft(),("string"!=typeof e.endTimeLeft||e.endTimeLeft<0)&&e.doEndExam()},3e3)),this.getPaper(),this.getExamRecord(),this.timer2=setInterval(function(){e.doBackUpAnswer()},2e4)},methods:{getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var a=e[t].split("=");if("staffToken"===a[0])return a[1]}else alert("登录超时!"),this.$router.push({path:"/Login",name:"Login",params:{}})},handleRemove:function(e,t){console.log(e,t)},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},getFile:function(e){console.log(e.file),this.file=e.file},open:function(e){this.dialogFormVisible=!0,this.form=e},upload:function(){var e=this,t=new FormData;t.append("filename",this.file),t.append("id",this.form.id),t.append("token",localStorage.getItem("Authorization")),console.log(t),this.$ajax.post("/gateway/paper/uploading",t).then(function(t){console.log(t),e.answerData=t.data.body.data.answerPojosList,e.dialogFormVisible=!1},function(){console.log("error")})},doUpdata:function(){var e=this;this.dialogFormVisible=!1,console.log(this.form),console.log(this.answerData),this.$ajax.post("/gateway/paper/doUpdataPaper",{head:{version:"1",token:this.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{id:this.pageId,subject:this.form,answers:this.answerData}}}).then(function(t){console.log(t),e.subjectData=t.data.body.data.subjectPojoList,e.answerData=t.data.body.data.answerPojosList;for(var a=0;a<e.answerData.length;a++)1===e.answerData[a].rightAnswer&&(e.answerData[a].rightAnswer="1"),0===e.answerData[a].rightAnswer&&(e.answerData[a].rightAnswer="0");e.pageScore=t.data.body.data.paper.score},function(){console.log("error")})},insertAnswer:function(){var e=this;this.dialogFormVisible=!1,this.$ajax.post("/gateway/paper/insertAnswerController",{head:{version:"1",token:this.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{paperId:this.pageId,subjectId:this.form.id,answer:"新增答案"}}}).then(function(t){console.log(t),e.answerData=t.data.body.data.answerPojosList;for(var a=0;a<e.answerData.length;a++)1===e.answerData[a].rightAnswer&&(e.answerData[a].rightAnswer="1"),0===e.answerData[a].rightAnswer&&(e.answerData[a].rightAnswer="0")},function(){console.log("error")})},deleteAnswer:function(e){var t=this;this.dialogFormVisible=!1,this.$ajax.post("/gateway/paper/deleteAnswerController",{head:{version:"1",token:this.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{paperId:this.pageId,answerId:e}}}).then(function(e){console.log(e),t.answerData=e.data.body.data.answerPojosList;for(var a=0;a<t.answerData.length;a++)1===t.answerData[a].rightAnswer&&(t.answerData[a].rightAnswer="1"),0===t.answerData[a].rightAnswer&&(t.answerData[a].rightAnswer="0")},function(){console.log("error")})},deleteSubject:function(e){var t=this;this.dialogFormVisible=!1,this.$ajax.post("/gateway/paper/deleteSubject",{head:{version:"1",token:this.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{id:e.id,paperId:this.pageId}}}).then(function(a){console.log(a),t.subjectData=a.data.body.data.subjectPojoList,t.answerData=a.data.body.data.answerPojosList;for(var r=0;r<t.answerData.length;r++)1===t.answerData[r].rightAnswer&&(t.answerData[r].rightAnswer="1"),0===t.answerData[r].rightAnswer&&(t.answerData[r].rightAnswer="0");t.pageScore=t.pageScore-e.score},function(){console.log("error")})},handleAvatarSuccess:function(e,t){var a=!0,r=!1,s=void 0;try{for(var n,o=c()(this.paperData.subjects);!(a=(n=o.next()).done);a=!0){var i=n.value;if(i.id===e.body.data[0]){i.pic=URL.createObjectURL(t.raw),i.myAnswer=e.body.data[1];break}}}catch(e){r=!0,s=e}finally{try{!a&&o.return&&o.return()}finally{if(r)throw s}}this.doBackUpAnswer()},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type,a=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),a||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&a},getTimeLeft:function(){this.endTimeLeft=((new Date(this.examRecord.actualStartTime).getTime()+60*this.$store.getters.getExamData.limitTime*60*1e3-(new Date).getTime())/1e3/60).toFixed(0)},getPaper:function(){var e=this;return o()(s.a.mark(function t(){var a,r,n,o,i,d,u;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post("/exam/queryPaper",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{examPublishRecordId:e.$store.getters.getExamPublishId,examUserId:e.$store.getters.getUserId}}});case 2:for(a=t.sent,e.paperData=a.body.data,e.examStatus=e.$store.getters.getExamData.status,r=!0,n=!1,o=void 0,t.prev=8,i=c()(e.paperData.subjects);!(r=(d=i.next()).done);r=!0)0===(u=d.value).categoryId?u.myAnswer="":1===u.categoryId?u.myAnswer=[]:(u.categoryId,u.myAnswer="");t.next=16;break;case 12:t.prev=12,t.t0=t.catch(8),n=!0,o=t.t0;case 16:t.prev=16,t.prev=17,!r&&i.return&&i.return();case 19:if(t.prev=19,!n){t.next=22;break}throw o;case 22:return t.finish(19);case 23:return t.finish(16);case 24:e.restoreAnswer();case 25:case"end":return t.stop()}},t,e,[[8,12,16,24],[17,,19,23]])}))()},getExamRecord:function(){var e=this;return o()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post("/exam/queryExamRecord",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{examPublishRecordId:e.$store.getters.getExamPublishId,examUserId:e.$store.getters.getUserId}}});case 2:a=t.sent,e.examRecord=a.body.data;case 4:case"end":return t.stop()}},t,e)}))()},restoreAnswer:function(){var e=this;return o()(s.a.mark(function t(){var a,r,n,o,i,d,u,p,l,h,g,m,f,v,b,w,y,x,I,k,D;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post("/exam/restoreAnswer",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:e.$store.getters.getExamRecordId}});case 2:if(a=t.sent,0===(r=a.body.data).length){t.next=71;break}n=!0,o=!1,i=void 0,t.prev=8,d=c()(e.paperData.subjects);case 10:if(n=(u=d.next()).done){t.next=57;break}if(1!==(p=u.value).categoryId){t.next=35;break}for(l=[],h=!0,g=!1,m=void 0,t.prev=17,f=c()(r);!(h=(v=f.next()).done);h=!0)(b=v.value).paperSubjectId===p.id&&l.push(b.myAnswer),p.myAnswer=l;t.next=25;break;case 21:t.prev=21,t.t0=t.catch(17),g=!0,m=t.t0;case 25:t.prev=25,t.prev=26,!h&&f.return&&f.return();case 28:if(t.prev=28,!g){t.next=31;break}throw m;case 31:return t.finish(28);case 32:return t.finish(25);case 33:t.next=54;break;case 35:for(w=!0,y=!1,x=void 0,t.prev=38,I=c()(r);!(w=(k=I.next()).done);w=!0)(D=k.value).paperSubjectId===p.id&&(p.myAnswer=D.myAnswer);t.next=46;break;case 42:t.prev=42,t.t1=t.catch(38),y=!0,x=t.t1;case 46:t.prev=46,t.prev=47,!w&&I.return&&I.return();case 49:if(t.prev=49,!y){t.next=52;break}throw x;case 52:return t.finish(49);case 53:return t.finish(46);case 54:n=!0,t.next=10;break;case 57:t.next=63;break;case 59:t.prev=59,t.t2=t.catch(8),o=!0,i=t.t2;case 63:t.prev=63,t.prev=64,!n&&d.return&&d.return();case 66:if(t.prev=66,!o){t.next=69;break}throw i;case 69:return t.finish(66);case 70:return t.finish(63);case 71:case"end":return t.stop()}},t,e,[[8,59,63,71],[17,21,25,33],[26,,28,32],[38,42,46,54],[47,,49,53],[64,,66,70]])}))()},autoEndExam:function(){this.$message.console.warn("考试时间到！自动提交试卷")},doEndExam:function(){var e=this;return o()(s.a.mark(function t(){var a,r,n,o,i,d,u,p,l,h,g,m,f,v;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.myAnswers.examUserId=e.$store.getters.getUserId,e.myAnswers.examRecordId=e.$store.getters.getExamRecordId,e.myAnswers.examPublishId=e.$store.getters.getExamPublishId,a=[],r=!0,n=!1,o=void 0,t.prev=7,i=c()(e.paperData.subjects);case 9:if(r=(d=i.next()).done){t.next=37;break}if(1!==(u=d.value).categoryId){t.next=33;break}for(p=!0,l=!1,h=void 0,t.prev=15,g=c()(u.myAnswer);!(p=(m=g.next()).done);p=!0)f=m.value,a.push({paperSubjectId:u.id,myAnswer:f});t.next=23;break;case 19:t.prev=19,t.t0=t.catch(15),l=!0,h=t.t0;case 23:t.prev=23,t.prev=24,!p&&g.return&&g.return();case 26:if(t.prev=26,!l){t.next=29;break}throw h;case 29:return t.finish(26);case 30:return t.finish(23);case 31:t.next=34;break;case 33:a.push({paperSubjectId:u.id,myAnswer:u.myAnswer});case 34:r=!0,t.next=9;break;case 37:t.next=43;break;case 39:t.prev=39,t.t1=t.catch(7),n=!0,o=t.t1;case 43:t.prev=43,t.prev=44,!r&&i.return&&i.return();case 46:if(t.prev=46,!n){t.next=49;break}throw o;case 49:return t.finish(46);case 50:return t.finish(43);case 51:return e.myAnswers.records=a,t.next=54,e.$http.post("/exam/submitPaper",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:e.myAnswers}});case 54:!0===(v=t.sent).body.data?(e.$message.success("保存成功！"),e.$router.push("/endExam")):(e.$message.error(v.head.message),e.$router.push("/endExam"));case 56:case"end":return t.stop()}},t,e,[[7,39,43,51],[15,19,23,31],[24,,26,30],[44,,46,50]])}))()},doBackUpAnswer:function(){this.myAnswers.examUserId=this.$store.getters.getUserId,this.myAnswers.examRecordId=this.$store.getters.getExamRecordId;var e=[],t=!0,a=!1,r=void 0;try{for(var s,n=c()(this.paperData.subjects);!(t=(s=n.next()).done);t=!0){var o=s.value;if(1===o.categoryId){var i=!0,d=!1,u=void 0;try{for(var p,l=c()(o.myAnswer);!(i=(p=l.next()).done);i=!0){var h=p.value;e.push({paperSubjectId:o.id,myAnswer:h})}}catch(e){d=!0,u=e}finally{try{!i&&l.return&&l.return()}finally{if(d)throw u}}}else e.push({paperSubjectId:o.id,myAnswer:o.myAnswer})}}catch(e){a=!0,r=e}finally{try{!t&&n.return&&n.return()}finally{if(a)throw r}}this.myAnswers.records=e,this.$http.post("/exam/backAnswer",{head:{version:"1",token:this.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:this.myAnswers}}),this.$message.success("自动保存成功！")}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"body"},[a("h1",[e._v("博思考试系统")]),e._v(" "),a("div",[a("el-card",[a("p",[e._v("试卷名："+e._s(e.pageName))]),e._v(" "),a("p",[e._v("总分："+e._s(e.pageScore)+" 分")]),e._v(" "),a("p",[e._v("\n        试卷介绍：\n        "),a("span",{staticStyle:{"font-weight":"bold"}},[e._v(e._s(e.pageDiscript))])])]),e._v(" "),e._l(e.subjectData,function(t){return a("el-card",{key:t.id},[a("div",[a("p",["367183204926050304"===t.subjectTypeId?a("span",{staticStyle:{color:"red"}},[e._v("\n            ("+e._s(t.score)+"分\n            "+e._s("单选题")+"\n            )\n          ")]):e._e(),e._v(" "),"413215621381836800"===t.subjectTypeId?a("span",{staticStyle:{color:"red"}},[e._v("\n            ("+e._s(t.score)+"分\n            "+e._s("多选题")+"\n            )\n          ")]):e._e(),e._v(" "),"411526617355735040"===t.subjectTypeId?a("span",{staticStyle:{color:"red"}},[e._v("\n            ("+e._s(t.score)+"分\n            "+e._s("判断题")+"\n            )\n          ")]):e._e(),e._v(" "),"415836603560972288"===t.subjectTypeId?a("span",{staticStyle:{color:"red"}},[e._v("\n            ("+e._s(t.score)+"分\n            "+e._s("主观题")+"\n            )\n          ")]):e._e(),e._v(" "),a("span",[e._v(e._s(t.subject))]),e._v(" "),"1"===e.updataFlag?a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return e.open(t)}}}):e._e(),e._v(" "),"1"===e.updataFlag?a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return e.deleteSubject(t)}}}):e._e(),e._v(" "),a("el-dialog",{attrs:{title:"题目信息",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"试题ID","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",disabled:!0},model:{value:e.form.id,callback:function(t){e.$set(e.form,"id",t)},expression:"form.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"试题分数","label-width":e.formLabelWidth}},[a("el-input-number",{attrs:{min:1,max:100,label:"描述文字"},model:{value:e.form.score,callback:function(t){e.$set(e.form,"score",t)},expression:"form.score"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"试题描述","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.subject,callback:function(t){e.$set(e.form,"subject",t)},expression:"form.subject"}})],1),e._v(" "),a("div",e._l(e.answerData,function(t){return a("div",{key:t.id},[t.paperSubjectId===e.form.id?a("div",[a("el-form-item",{attrs:{label:"试题答案","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:t.answer,callback:function(a){e.$set(t,"answer",a)},expression:"answer.answer"}})],1),e._v(" "),a("el-tooltip",{attrs:{content:"Switch value: "+e.value,placement:"top"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","active-value":"1","inactive-value":"0","active-text":"正确","inactive-text":"错误"},model:{value:t.rightAnswer,callback:function(a){e.$set(t,"rightAnswer",a)},expression:"answer.rightAnswer"}})],1),e._v(" "),"1"===e.updataFlag?a("el-button",{staticStyle:{float:"right"},attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return e.deleteAnswer(t.id)}}}):e._e()],1):e._e()])}),0)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),"415836603560972288"!==e.form.categoryId?a("el-button",{attrs:{type:"success"},on:{click:function(t){return e.insertAnswer()}}},[e._v("新 增")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.doUpdata()}}},[e._v("确 定")])],1)],1)],1),e._v(" "),a("div",e._l(e.answerData,function(r){return a("div",{key:r.id},["415836603560972288"!==t.categoryId?a("div",[r.paperSubjectId===t.id?a("el-checkbox",{attrs:{disabled:""},model:{value:r.rightAnswer,callback:function(t){e.$set(r,"rightAnswer",t)},expression:"answer.rightAnswer"}},[a("span",[e._v(e._s(r.answer))])]):e._e()],1):e._e(),e._v(" "),"415836603560972288"===t.categoryId?a("div",[r.paperSubjectId===t.id?a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:r.answer,callback:function(t){e.$set(r,"answer",t)},expression:"answer.answer"}}):e._e()],1):e._e()])}),0)])])})],2)])},staticRenderFns:[]};var p=a("VU/8")(d,u,!1,function(e){a("/cEI")},"data-v-95debe14",null);t.default=p.exports}});
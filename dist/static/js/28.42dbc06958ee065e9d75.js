webpackJsonp([28],{"8JWY":function(e,t){},p6tg:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"MaintainPaper",created:function(){var e=this;localStorage.setItem("Authorization","eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIzNjY4MDUyMjE0NDY2NDc4MDgiLCJjb2RlIjoiMTkxMDUwNTQzMEBxcS5jb20iLCJ1cGRhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJjcmVhdGVkQnkiOiI0MTI3NzgwNDk1NzY1NTA0MDAiLCJpcCI6IjEyNy4wLjAuMSIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLkuJPkuJrkurrlkZgiLCJleHAiOjE1OTEzMzM4MjEsInVzZXJJZCI6IjQxMjc3ODA0OTU3NjU1MDQwMCIsIm9yZ0lkIjoiMzY2ODA1MTU1MzIzNDQ1MjQ4In0.b5abDnn7Tqo14ie7ZTbVTOQm6BcIWSUeUQAGKMeqVos"),this.$ajax.post("/gateway/paper/goMaintainpaperController",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{page:this.currentPage,pagesize:this.pageSize}}}).then(function(t){console.log(t),e.tableData=t.data.body.data.list,e.pageSize=t.data.body.data.pagesize,e.pagetotal=t.data.body.data.pagetotal,e.currentPage=t.data.body.data.page},function(){console.log("error")})},methods:{getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var a=e[t].split("=");if("staffToken"===a[0])return a[1]}else alert("登录超时!"),this.$router.push({path:"/Login",name:"Login",params:{}})},handleSelect:function(){var e=this;this.$ajax.post("/gateway/paper/maintainpaperHandleSelect",{head:{version:"1",token:this.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{page:this.currentPage,pagesize:this.pageSize,pageName:this.pageName,createdByName:this.createdByName,createdByStartTime:this.createdByTime[0],createdByEndTime:this.createdByTime[1],pageDifficulty:this.pageDifficulty,pageType:this.pageType}}}).then(function(t){console.log(t),e.tableData=t.data.body.data.list,e.pageSize=t.data.body.data.pagesize,e.pagetotal=t.data.body.data.pagetotal,e.currentPage=t.data.body.data.page},function(){console.log("error")})},handleCurrentChange:function(e){var t=this;console.log("当前页: "+e),this.currentPage=e,this.$ajax.post("/gateway/paper/goMaintainpaperController",{head:{version:"1",token:this.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{page:this.currentPage,pagesize:this.pageSize}}}).then(function(e){console.log(e),t.tableData=e.data.body.data.list,t.pageSize=e.data.body.data.pagesize,t.pagetotal=e.data.body.data.pagetotal,t.currentPage=e.data.body.data.page},function(){console.log("error")})},doupdata:function(e,t){var a=this;this.$ajax.post("/gateway/paper/doUpdataController",{head:{version:"1",token:this.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{id:this.form.id,paperName:this.form.name,paperType:this.form.paperType,difficulty:this.form.difficulty,combExamMan:this.form.combExamMan,discript:this.form.discript,version:this.form.version,page:this.currentPage,pagesize:this.pageSize}}}).then(function(e){console.log(e),a.tableData=e.data.body.data.list,a.pageSize=e.data.body.data.pagesize,a.pagetotal=e.data.body.data.pagetotal,a.currentPage=e.data.body.data.page,a.dialogFormVisible=!1},function(){console.log("error")})},doupdataSubmitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.doupdata()})},open:function(e,t){this.dialogFormVisible=!0,this.form.paperType=t.paperType,this.form.difficulty=t.difficulty,this.form.name=t.name,this.form.discript=t.discript,this.form.combExamMan=t.combExamMan,this.form.id=t.id,this.form.version=t.version},deleteController:function(e,t){var a=this;console.log(e,t),this.$confirm("此操作将删除该配置项明细, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$message({type:"success",message:"删除成功!"}),a.$ajax.post("/gateway/paper/deleteController",{head:{version:"1",token:a.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{id:t.id,version:t.version,page:a.currentPage,pagesize:a.pageSize}}}).then(function(e){console.log(e),a.tableData=e.data.body.data.list,a.pageSize=e.data.body.data.pagesize,a.pagetotal=e.data.body.data.pagetotal,a.currentPage=e.data.body.data.page},function(){console.log("error")})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},forbidden:function(e,t){var a=this;this.$ajax.post("/gateway/paper/forbiddenController",{head:{version:"1",token:this.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{id:t.id,version:t.version,page:this.currentPage,pagesize:this.pageSize}}}).then(function(e){console.log(e),a.tableData=e.data.body.data.list,a.pageSize=e.data.body.data.pagesize,a.pagetotal=e.data.body.data.pagetotal,a.currentPage=e.data.body.data.page},function(){console.log("error")})},startUp:function(e,t){var a=this;this.$ajax.post("/gateway/paper/startUpController",{head:{version:"1",token:this.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{id:t.id,version:t.version,page:this.currentPage,pagesize:this.pageSize}}}).then(function(e){console.log(e),a.tableData=e.data.body.data.list,a.pageSize=e.data.body.data.pagesize,a.pagetotal=e.data.body.data.pagetotal,a.currentPage=e.data.body.data.page},function(){console.log("error")})},seePaper:function(e,t){this.$router.push({path:"/Exam",name:"Exam",params:{},query:{updataFlag:"0",pageId:t.id,pageName:t.name,pageScore:t.score,pageDiscript:t.discript}})},updataPaper:function(e,t){this.$router.push({path:"/Exam",name:"Exam",params:{},query:{updataFlag:"1",pageId:t.id,pageName:t.name,pageScore:t.score,pageDiscript:t.discript}})},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e},seepapers:function(){0===this.multipleSelection.length?alert("请勾选要浏览的试卷"):this.multipleSelection.length>1?alert("只能勾选一行试卷"):this.seePaper(1,this.multipleSelection[0])},deletes:function(e){var t=this;this.$confirm("此操作将删除该配置项明细, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$message({type:"success",message:"删除成功!"});for(var a=0;a<e.length;a++)t.$ajax.post("/gateway/paper/deleteController",{head:{version:"1",token:t.getCookie(),businessType:"bosssoft",equipId:"DELL001",equipType:1,encrypt:0},body:{data:{id:e[a].id,version:e[a].version,page:t.currentPage,pagesize:t.pageSize}}}).then(function(e){console.log(e),t.tableData=e.data.body.data.list,t.pageSize=e.data.body.data.pagesize,t.pagetotal=e.data.body.data.pagetotal,t.currentPage=e.data.body.data.page},function(){console.log("error")})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},deleteSelected:function(){0===this.multipleSelection.length?alert("请勾选要删除的试卷"):this.multipleSelection.length>1?this.deletes(this.multipleSelection):this.deleteController(1,this.multipleSelection[0])}},data:function(){return{let:"",deletelist:[],multipleSelection:[],pageSize:8,pagetotal:2,currentPage:1,pageName:"",createdByName:"",createdByTime:"",pageDifficulty:"",pageType:"",tableData:[{}],options1:[{value:"difficulty",label:"difficulty"},{value:"medium",label:"medium"},{value:"simple",label:"simple"}],options2:[{value:"1601",label:"1601"},{value:"1602",label:"1602"},{value:"1603",label:"1603"}],dialogTableVisible:!1,dialogFormVisible:!1,form:{name:"",id:"",paperType:"",difficulty:"",combExamMan:"",discript:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:"",version:""},formLabelWidth:"120px",rules:{id:[{required:!0,message:"请去标准组卷页面输入配置项名称",trigger:"blur"},{min:2,max:64,message:"配置项名长度应在 2 到 64 个字符",trigger:"blur"}],name:[{required:!0,message:"请输入试卷名",trigger:"blur"},{min:2,max:64,message:"试卷名长度应在 2 到 64 个字符",trigger:"blur"}],paperType:[{required:!0,message:"请选择类别",trigger:"change"}],discript:[{required:!0,message:"请输入试卷名",trigger:"blur"},{min:2,max:64,message:"试卷名长度应在 2 到 64 个字符",trigger:"blur"}],difficulty:[{required:!0,message:"请选择难度",trigger:"change"}]}}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"maintainpaper"},[a("div",{staticClass:"head"},[a("el-input",{staticClass:"bar-search-item-input",attrs:{size:"mini",placeholder:"请输入试卷名"},model:{value:e.pageName,callback:function(t){e.pageName=t},expression:"pageName"}},[a("template",{slot:"prepend"},[e._v("试卷名")])],2),e._v(" "),a("el-input",{staticClass:"bar-search-item-input",attrs:{size:"mini",placeholder:"请输入出卷人"},model:{value:e.createdByName,callback:function(t){e.createdByName=t},expression:"createdByName"}},[a("template",{slot:"prepend"},[e._v("出卷人")])],2),e._v(" "),a("p",{staticClass:"p-font"},[e._v("试卷发布时间:")]),e._v(" "),a("el-date-picker",{staticClass:"date-picker",attrs:{size:"mini",type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.createdByTime,callback:function(t){e.createdByTime=t},expression:"createdByTime"}}),e._v(" "),a("p",{staticClass:"p-font"},[e._v("试卷难度:")]),e._v(" "),a("el-select",{staticClass:"bar-select",attrs:{placeholder:"请选择",size:"mini"},model:{value:e.pageDifficulty,callback:function(t){e.pageDifficulty=t},expression:"pageDifficulty"}},e._l(e.options1,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("p",{staticClass:"p-font"},[e._v("试卷类型:")]),e._v(" "),a("el-select",{staticClass:"bar-select",attrs:{placeholder:"请选择",size:"mini"},model:{value:e.pageType,callback:function(t){e.pageType=t},expression:"pageType"}},e._l(e.options2,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-button",{staticClass:"bar-search-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.handleSelect()}}},[e._v("试卷查找")])],1),e._v(" "),a("div",{staticClass:"middle"},[a("div",{attrs:{id:"icon"}},[a("font",{attrs:{color:"#E6A23C"},on:{click:function(t){return e.seepapers()}}},[a("i",{staticClass:"el-icon-plus"},[e._v("浏览")])]),e._v("\n         \n      "),a("font",{attrs:{color:"#F56C6C"},on:{click:function(t){return e.deleteSelected()}}},[a("i",{staticClass:"el-icon-edit"},[e._v("删除")])]),e._v("\n         \n      "),a("font",{attrs:{color:"#409EFF"}},[a("i",[e._v("已选中："+e._s(this.multipleSelection.length))])])],1),e._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{label:"组卷时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{staticClass:"el-icon-time"}),e._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.combExamTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"试卷名",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v("试卷描述: "+e._s(t.row.discript))]),e._v(" "),a("p",[e._v("试卷总分: "+e._s(t.row.score))]),e._v(" "),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("span",[e._v(e._s(t.row.name))])])])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"试卷类型",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.row.paperType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"试卷难度",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[3==t.row.difficulty?a("el-tag",{attrs:{type:"danger",size:"medium",effect:"dark"}},[e._v("difficulty")]):e._e(),e._v(" "),2==t.row.difficulty?a("el-tag",{attrs:{type:"warning",size:"medium",effect:"dark"}},[e._v("medium")]):e._e(),e._v(" "),1==t.row.difficulty?a("el-tag",{attrs:{type:"success",size:"medium",effect:"dark"}},[e._v("simple")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"出卷人",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.combExamMan))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"状态",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"==t.row.status?a("el-tag",{attrs:{size:"medium",effect:"plain"}},[e._v("已启用")]):e._e(),e._v(" "),"0"==t.row.status?a("el-tag",{attrs:{type:"info",size:"medium",effect:"plain"}},[e._v("未启用")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.startUp(t.$index,t.row)}}},[e._v("启用试卷")]):e._e(),e._v(" "),1==t.row.status?a("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(a){return e.forbidden(t.$index,t.row)}}},[e._v("禁用试卷")]):e._e(),e._v(" "),0==t.row.status?a("el-button",{attrs:{disabled:"",size:"mini",type:"success"},on:{click:function(a){return e.doupload(t.$index,t.row)}}},[e._v("浏览")]):e._e(),e._v(" "),1==t.row.status?a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){return e.seePaper(t.$index,t.row)}}},[e._v("浏览")]):e._e(),e._v(" "),0==t.row.status?a("el-button",{attrs:{disabled:"",size:"mini",type:"warning"},on:{click:function(a){return e.updataPaper(t.$index,t.row)}}},[e._v("修改")]):e._e(),e._v(" "),1==t.row.status?a("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(a){return e.updataPaper(t.$index,t.row)}}},[e._v("修改")]):e._e(),e._v(" "),0==t.row.status?a("el-button",{attrs:{disabled:"",size:"mini",type:"success"},on:{click:function(a){return e.open(t.$index,t.row)}}},[e._v("\n              修改试卷信息\n              "),a("i",{staticClass:"el-icon-edit el-icon--right"})]):e._e(),e._v(" "),1==t.row.status?a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){return e.open(t.$index,t.row)}}},[e._v("\n              修改试卷信息\n              "),a("i",{staticClass:"el-icon-edit el-icon--right"})]):e._e(),e._v(" "),a("el-dialog",{attrs:{title:"模板信息",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-form-item",{attrs:{label:"试卷ID","label-width":e.formLabelWidth,prop:"id"}},[a("el-input",{attrs:{autocomplete:"off",disabled:!0},model:{value:e.form.id,callback:function(t){e.$set(e.form,"id",t)},expression:"form.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"试卷名","label-width":e.formLabelWidth,prop:"name"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"试卷类型","label-width":e.formLabelWidth,prop:"paperType"}},[a("el-select",{attrs:{placeholder:"请选择类型"},model:{value:e.form.paperType,callback:function(t){e.$set(e.form,"paperType",t)},expression:"form.paperType"}},[a("el-option",{attrs:{label:"1601",value:"1601"}}),e._v(" "),a("el-option",{attrs:{label:"1602",value:"1602"}}),e._v(" "),a("el-option",{attrs:{label:"1603",value:"1603"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"试卷难度","label-width":e.formLabelWidth,prop:"difficulty"}},[a("el-select",{attrs:{placeholder:"请选择难度"},model:{value:e.form.difficulty,callback:function(t){e.$set(e.form,"difficulty",t)},expression:"form.difficulty"}},[a("el-option",{attrs:{label:"simple",value:"simple"}}),e._v(" "),a("el-option",{attrs:{label:"medium",value:"medium"}}),e._v(" "),a("el-option",{attrs:{label:"difficulty",value:"difficulty"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"试卷描述","label-width":e.formLabelWidth,prop:"discript"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.discript,callback:function(t){e.$set(e.form,"discript",t)},expression:"form.discript"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.doupdataSubmitForm("form")}}},[e._v("确 定")])],1)],1),e._v(" "),0==t.row.status?a("el-button",{attrs:{disabled:"",size:"mini",type:"danger"},on:{click:function(a){return e.deleteController(t.$index,t.row)}}},[e._v("删除")]):e._e(),e._v(" "),1==t.row.status?a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.deleteController(t.$index,t.row)}}},[e._v("删除")]):e._e()]}}])})],1)],1),e._v(" "),a("div",{staticClass:"page"},[a("el-pagination",{attrs:{"current-page":this.currentPage,"page-sizes":[8],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.pagetotal},on:{"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[]};var s=a("VU/8")(i,o,!1,function(e){a("8JWY")},"data-v-6562c0ea",null);t.default=s.exports}});
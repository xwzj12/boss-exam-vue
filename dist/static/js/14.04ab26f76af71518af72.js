webpackJsonp([14],{H1rR:function(e,t){},IGmD:function(e,t){},Rng0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("Z0lD"),i=a("mvHQ"),r=a.n(i),l=a("iBXH"),n=a.n(l),s={data:function(){return{tableData:[],multipleSelection:[],dialogTableVisible2:!1,dialogFormVisible2:!1,dialogTableVisible:!1,dialogFormVisible:!1,modifyForm:{id:"",orgId:"",paramType:"",param:"",value:"",status:"",version:""},formLabelWidth:"120px",addForm:{id:"",orgId:"",paramType:"",param:"",value:"",status:"",version:""},page:1,pageSize:5,name:"",count:0,param:"",paramType:"",dialogVisible:!1,deleteId:"",deleteVersion:-1,ruleForm:{pass:"",checkPass:"",age:""},rules:{paramType:[{required:!0,message:"请选择参数类型！",trigger:"blur"}],param:[{required:!0,message:"请输入参数项!",trigger:"blur"}],value:[{required:!0,message:"请输入参数值!",trigger:"blur"}],status:[{required:!0,message:"请选择是否启用!",trigger:"change"}],orgId:[{required:!0,message:"请选择组织机构!",trigger:"change"}]},organizationId:null,organizationName:null,orgIdAndName:[],dictionary:[],queryDictionary:[]}},methods:{evaluationModifyForm:function(e){void 0!=this.$refs.modifyForm&&this.$refs.modifyForm.clearValidate(),this.modifyForm.id=e.id,this.modifyForm.orgId=e.orgId,this.modifyForm.paramType=e.paramType,this.modifyForm.param=e.param,this.modifyForm.value=e.value,this.modifyForm.status=e.status,this.modifyForm.version=e.version},getRowKeys:function(e){return e.id},handleEdit:function(e,t){this.dialogFormVisible2=!0,this.dialogTableVisible2=!0,this.evaluationModifyForm(t)},handledbClick:function(e,t,a){this.handleEdit(0,e)},getdata:function(){var e=this;this.$ajax.post("gateway/systemModule/doQuerySystemParamByPage",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{param:this.param,paramType:this.paramType,page:this.page,pageSize:this.pageSize}}}).then(function(t){e.count=t.data.body.data.count,e.tableData=t.data.body.data.systemParamList},function(){console.log("error")})},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e},handleSizeChange:function(e){this.pageSize=e,this.getdata()},handleCurrentChange:function(e){this.page=e,this.getdata()},queryDataByName:function(){this.page=1,this.getdata()},checkModifySelectOne:function(){1==this.multipleSelection.length?(this.dialogFormVisible2=!0,this.evaluationModifyForm(this.multipleSelection[0])):alert("请选中一行数据！")},updateSystemParamData:function(){var e=this;this.$ajax.post("gateway/systemModule/doUpdateSystemParam",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{id:this.modifyForm.id,orgId:this.modifyForm.orgId,paramType:this.modifyForm.paramType,param:this.modifyForm.param,value:this.modifyForm.value,status:this.modifyForm.status,version:this.modifyForm.version}}}).then(function(t){alert(t.data.head.message),"0"==t.data.head.responseCode&&(e.$refs.multipleTable.clearSelection(),e.dialogFormVisible2=!1,e.reflashTree(),e.getdata())},function(){alert("保存失败"),console.log("error")})},clearAddForm:function(){void 0!=this.$refs.addForm&&this.$refs.addForm.clearValidate(),this.addForm.id="",this.addForm.paramType="",this.addForm.param="",this.addForm.value="",this.addForm.status=1,this.addForm.version="",1==this.orgIdAndName.length?this.addForm.orgId=this.orgIdAndName[0].value:this.addForm.orgId="",this.dialogFormVisible=!0},addSystemParamData:function(){var e=this;this.$ajax.post("gateway/systemModule/doAddSystemParam",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{orgId:this.addForm.orgId,paramType:this.addForm.paramType,param:this.addForm.param,value:this.addForm.value,status:this.addForm.status}}}).then(function(t){alert(t.data.head.message),"0"==t.data.head.responseCode&&(e.dialogFormVisible=!1,e.reflashTree(),e.getdata())},function(){alert("增加失败"),console.log("error")})},checkDelete:function(e){this.deleteId=e.id,this.deleteVersion=e.version,this.dialogVisible=!0},deleteSystemParamData:function(){var e=this;this.dialogVisible=!1,this.$ajax.post("gateway/systemModule/doDeleteSystemParam",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{id:this.deleteId,version:this.deleteVersion}}}).then(function(t){alert(t.data.head.message),"0"==t.data.head.responseCode&&(e.$refs.multipleTable.clearSelection(),e.reflashTree(),e.getdata())},function(){alert("禁用失败"),console.log("error")})},checkDeleteSelect:function(){var e=this;if(0==this.multipleSelection.length)alert("请选择数据！");else{var t=0;if(this.multipleSelection.forEach(function(e){0!=e.status||(t=1)}),1==t)return void alert("请不要勾选已禁用的数据");this.$confirm("确定禁用选中数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t=[];e.multipleSelection.forEach(function(e){t.push({id:e.id,version:e.version})}),e.$ajax.post("gateway/systemModule/doDeleteSystemParamList",{head:{version:"1",token:e.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{systemParamList:t}}}).then(function(t){alert(t.data.head.message),"0"==t.data.head.responseCode&&(e.$refs.multipleTable.clearSelection(),e.reflashTree(),e.getdata())},function(){alert("禁用失败"),console.log("error")})}).catch(function(){})}},reflashTree:function(){this.$emit("reflashTree")},formatDate:function(e,t){if(null!=e[t.property]){var a=e[t.property],o=new Date(a);return o.getFullYear()+"-"+(o.getMonth()+1)+"-"+o.getDate()+" "+o.getHours()+":"+o.getMinutes()+":"+o.getSeconds()}},exp:function(){var e=this;0==this.multipleSelection?alert("请选择数据！"):this.$confirm("确定导出选中的系统参数数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.excelData=e.multipleSelection,e.export2Excel()}).catch(function(){})},export2Excel:function(){var e=this;a.e(46).then(function(){var t=a("TCVE").export_json_to_excel,o=e.excelData;t(["参数类型","参数项","参数值","启用标记"],e.formatJson(["paramType","param","value","status"],o),"系统参数")}.bind(null,a)).catch(a.oe)},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})},httpRequest:function(e){var t=this,a=e.file;if(console.log("e: ",e),console.log("file: ",e.file),!a)return!1;if(!/\.(xls|xlsx)$/.test(a.name.toLowerCase()))return this.$message.error("上传格式不正确，请上传xls或者xlsx格式"),!1;var o=new FileReader;o.onload=function(e){try{var a=e.target.result,o=n.a.read(a,{type:"binary"}),i=o.SheetNames[0],r=n.a.utils.sheet_to_json(o.Sheets[i]);console.log(r);var l=[],s=0;if(r.forEach(function(e){void 0!=e.参数类型&&void 0!=e.参数项&&void 0!=e.参数值&&void 0!=e.启用标记||(s=1),l.push({paramType:e.参数类型,param:e.参数项,value:e.参数值,status:e.启用标记})}),console.log(r),console.log(l),1==s)return void alert("导入的数据不规范");t.addSystemParamListData(l)}catch(e){return console.log("出错了：："),alert("导入文件出错，可以尝试先下载一份模板再导入"),!1}},o.readAsBinaryString(a)},addSystemParamListData:function(e){var t=this;this.$ajax.post("gateway/systemModule/doAddSystemParamList",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:e}}).then(function(e){alert(e.data.head.message),"0"==e.data.head.responseCode&&(t.reflashTree(),t.getdata())},function(){alert("添加失败"),console.log("error")})},updateSubmitForm:function(){var e=this;this.$refs.modifyForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.updateSystemParamData()})},addSubmitForm:function(){var e=this;this.$refs.addForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.addSystemParamData()})},resetForm:function(e){this.$refs[e].resetFields()},getOrgIdAndName:function(){var e=this;this.$ajax.post("gateway/systemModule/doQueryOrgIdAndName",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{}}}).then(function(t){e.orgIdAndName=t.data.body.data},function(){console.log("error")})},getDictionaryOptionsByCategory:function(){var e=this;this.$ajax.post("gateway/systemModule/doQueryDictionaryOptionsByCategory",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{category:"参数类型"}}}).then(function(t){"0"==t.data.head.responseCode&&(e.dictionary=t.data.body.data,e.queryDictionary=JSON.parse(r()(e.dictionary)),e.queryDictionary.unshift({label:"",value:null}))},function(){console.log("error")})},formatType:function(e,t){if(null!=e[t.property]){var a=e[t.property],o=null;return this.dictionary.forEach(function(e){e.value!=a||(o=e.label)}),o}},getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var a=e[t].split("=");if("staffToken"==a[0])return a[1]}else alert("登录超时!"),this.$router.push({path:"/Login",name:"Login",params:{}})}},components:{},created:function(){this.getDictionaryOptionsByCategory(),this.getdata(),this.getOrgIdAndName()}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{float:"left","margin-bottom":"20px"}},[a("div",{attrs:{id:"selector"}},[a("span",[e._v("参数类型:")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.paramType,callback:function(t){e.paramType=t},expression:"paramType"}},e._l(e.queryDictionary,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("span",[e._v("参数项:")]),e._v(" "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入内容"},model:{value:e.param,callback:function(t){e.param=t},expression:"param"}}),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.queryDataByName()}}},[e._v("搜索")])],1),e._v(" "),a("div",{staticStyle:{float:"left"}},[a("el-button-group",[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:e.clearAddForm}},[e._v("增加")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"warning",icon:"el-icon-edit"},on:{click:e.checkModifySelectOne}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:e.checkDeleteSelect}},[e._v("禁用")]),e._v(" "),a("el-upload",{staticClass:"upload",staticStyle:{float:"left"},attrs:{action:"",multiple:!1,"show-file-list":!1,accept:"csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","http-request":e.httpRequest}},[a("el-button",{attrs:{size:"mini",type:"success",icon:"el-icon-download"}},[a("a",{staticStyle:{"text-decoration":"none"},attrs:{href:"javascript:void(0)"}},[a("font",{attrs:{color:"white"}},[e._v("导入")])],1)])],1),e._v(" "),a("el-button",{attrs:{size:"mini",type:"info",icon:"el-icon-upload2"},on:{click:function(t){return e.exp()}}},[a("a",{attrs:{id:"export"}},[a("font",{attrs:{color:"white"}},[e._v("导出")])],1)])],1)],1)]),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark","row-key":e.getRowKeys},on:{"row-dblclick":e.handledbClick,"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{"reserve-selection":"true",type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{label:"参数类型",formatter:e.formatType,prop:"paramType",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"param",label:"参数项",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"value",label:"参数值",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"updatedTime",formatter:e.formatDate,label:"更新时间",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"启用标记",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("span",[a("el-tag",[e._v("是")])],1):0==t.row.status?a("span",[a("el-tag",{attrs:{type:"info"}},[e._v("否")])],1):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button-group",[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:e.clearAddForm}},[e._v("增加")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"warning",icon:"el-icon-edit"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete",disabled:1!=t.row.status},on:{click:function(a){return e.checkDelete(t.row)}}},[e._v("禁用")])],1)]}}])})],1),e._v(" "),a("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("span",[e._v("确认禁用？")]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.deleteSystemParamData}},[e._v("确 定")])],1)]),e._v(" "),a("div",{staticClass:"page",staticStyle:{"margin-top":"50px"}},[a("el-pagination",{attrs:{"current-page":e.currentPage4,"page-sizes":[5,6,7,8],"page-size":5,layout:"total, sizes, prev, pager, next, jumper",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("div",{attrs:{id:"btn1"}},[a("el-dialog",{attrs:{title:"增加系统参数",visible:e.dialogFormVisible,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"addForm",attrs:{model:e.addForm,"label-width":"100px",rules:e.rules}},[a("el-form-item",{attrs:{label:"参数类型",prop:"paramType"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.addForm.paramType,callback:function(t){e.$set(e.addForm,"paramType",t)},expression:"addForm.paramType"}},e._l(e.dictionary,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"参数项",prop:"param"}},[a("el-input",{model:{value:e.addForm.param,callback:function(t){e.$set(e.addForm,"param",t)},expression:"addForm.param"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"参数值",readonly:"true",prop:"value"}},[a("el-input",{model:{value:e.addForm.value,callback:function(t){e.$set(e.addForm,"value",t)},expression:"addForm.value"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"所属机构",prop:"orgId"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.addForm.orgId,callback:function(t){e.$set(e.addForm,"orgId",t)},expression:"addForm.orgId"}},e._l(e.orgIdAndName,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"是否启用",prop:"status"}},[a("el-radio-group",{model:{value:e.addForm.status,callback:function(t){e.$set(e.addForm,"status",t)},expression:"addForm.status"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),a("div",{staticStyle:{"margin-left":"60%"}},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addSubmitForm()}}},[e._v("创建")]),e._v(" "),a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")])],1)],1)],1)],1)],1),e._v(" "),a("div",{attrs:{id:"btn2"}},[a("el-dialog",{attrs:{title:"编辑系统参数",visible:e.dialogFormVisible2,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible2=t}}},[a("el-form",{ref:"modifyForm",attrs:{model:e.modifyForm,"label-width":"100px",rules:e.rules}},[a("el-form-item",{attrs:{label:"参数ID"}},[a("el-input",{attrs:{readonly:"true"},model:{value:e.modifyForm.id,callback:function(t){e.$set(e.modifyForm,"id",t)},expression:"modifyForm.id"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"参数类型",prop:"paramType"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.modifyForm.paramType,callback:function(t){e.$set(e.modifyForm,"paramType",t)},expression:"modifyForm.paramType"}},e._l(e.dictionary,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"参数项",prop:"param"}},[a("el-input",{model:{value:e.modifyForm.param,callback:function(t){e.$set(e.modifyForm,"param",t)},expression:"modifyForm.param"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"参数值",readonly:"true",prop:"value"}},[a("el-input",{model:{value:e.modifyForm.value,callback:function(t){e.$set(e.modifyForm,"value",t)},expression:"modifyForm.value"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"所属机构",prop:"orgId"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.modifyForm.orgId,callback:function(t){e.$set(e.modifyForm,"orgId",t)},expression:"modifyForm.orgId"}},e._l(e.orgIdAndName,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"是否启用"}},[a("el-radio-group",{attrs:{prop:"status"},model:{value:e.modifyForm.status,callback:function(t){e.$set(e.modifyForm,"status",t)},expression:"modifyForm.status"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),a("div",{staticStyle:{"margin-left":"60%"}},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.updateSubmitForm()}}},[e._v("保存")]),e._v(" "),a("el-button",{on:{click:function(t){e.dialogFormVisible2=!1}}},[e._v("取消")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var u=a("VU/8")(s,d,!1,function(e){a("H1rR")},"data-v-1a9dd426",null).exports,c={data:function(){return{dataTree:""}},components:{card:o.a,stable:u},methods:{getdataTree:function(){var e=this;this.$ajax.post("gateway/systemModule/doQueryDictionaryForSystemParamTypeTreeByOrgId",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{}}}).then(function(t){e.dataTree=t.data.body.data},function(){console.log("error")})},getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var a=e[t].split("=");if("staffToken"==a[0])return a[1]}else alert("登录超时!"),this.$router.push({path:"/Login",name:"Login",params:{}})}},created:function(){this.getdataTree()}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"all"}},[a("div",{attrs:{id:"left"}},[a("card",{attrs:{title:"参数管理",dataTree:e.dataTree}})],1),e._v(" "),a("div",{attrs:{id:"right"}},[a("stable",{on:{reflashTree:function(t){return e.getdataTree()}}})],1)])},staticRenderFns:[]};var p=a("VU/8")(c,m,!1,function(e){a("IGmD")},"data-v-7e78c42c",null);t.default=p.exports}});
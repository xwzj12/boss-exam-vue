webpackJsonp([9],{"+h5e":function(e,t){},rC65:function(e,t){},w98f:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o("Z0lD"),i=o("bOdI"),r=o.n(i),l={data:function(){return{tableData:[],multipleSelection:[],rules:r()({name:[{required:!0,message:"请输入公司名称！",trigger:"blur"}],mnemonicCode:[{required:!0,message:"请输入助记码！",trigger:"blur"}],code:[{required:!0,message:"请输入公司编号！",trigger:"blur"}],master:[{required:!0,message:"请输入法人",trigger:"blur"}],tax:[{required:!0,message:"请输入税号",trigger:"blur"}],fax:[{required:!0,message:"请输入传真地址",trigger:"blur"}],tel:[{required:!0,message:"请输入电话",trigger:"blur"}],address:[{required:!0,message:"请输入地址",trigger:"blur"}],website:[{required:!0,message:"请输入网站",trigger:"blur"}],orgId:[{required:!0,message:"请输入所属机构",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"}],status:[{required:!0,message:"请选择是否启用",trigger:"blur"}]},"orgId",[{required:!0,message:"请选择机构",trigger:"blur"}]),dialogTableVisible2:!1,dialogFormVisible2:!1,dialogTableVisible:!1,dialogFormVisible:!1,modifyForm:{id:"",orgId:"",name:"",code:"",mnemonicCode:"",master:"",tax:"",fax:"",tel:"",address:"",email:"",website:"",status:"",version:"123"},formLabelWidth:"120px",addForm:{id:"",orgId:"",name:"",code:"",mnemonicCode:"",master:"",tax:"",fax:"",tel:"",address:"",email:"",website:"",status:"",version:"123"},page:1,pageSize:5,name:"",count:0,dialogVisible:!1,deleteId:"",deleteVersion:-1,orgName:null,orgId:null,orgIdAndName:[]}},methods:{evaluationModifyForm:function(e){void 0!=this.$refs.modifyForm&&this.$refs.modifyForm.clearValidate(),this.modifyForm.id=e.id,this.modifyForm.name=e.name,this.modifyForm.code=e.code,this.modifyForm.mnemonicCode=e.mnemonicCode,this.modifyForm.master=e.master,this.modifyForm.tax=e.tax,this.modifyForm.fax=e.fax,this.modifyForm.tel=e.tel,this.modifyForm.website=e.website,this.modifyForm.orgId=e.orgId.id,this.modifyForm.email=e.email,this.modifyForm.status=e.status,this.modifyForm.version=e.version,this.modifyForm.address=e.address},getRowKeys:function(e){return e.id},handleEdit:function(e,t){this.dialogFormVisible2=!0,this.dialogTableVisible2=!0,this.evaluationModifyForm(t)},handledbClick:function(e,t,o){this.handleEdit(0,e)},getdata:function(){var e=this;this.$ajax.post("gateway/systemModule/doQueryCompanyByPage",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{name:this.name,orgName:this.orgName,page:this.page,pageSize:this.pageSize}}}).then(function(t){e.count=t.data.body.data.count,e.tableData=t.data.body.data.companyList,console.log(t.data.body.data)},function(){console.log("error")})},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e},handleSizeChange:function(e){this.pageSize=e,this.getdata()},handleCurrentChange:function(e){this.page=e,this.getdata()},queryDataByName:function(){this.page=1,this.getdata()},checkModifySelectOne:function(){1==this.multipleSelection.length?(this.dialogFormVisible2=!0,this.evaluationModifyForm(this.multipleSelection[0])):alert("请选中一行数据！")},updateCompanyData:function(){var e=this;this.$ajax.post("gateway/systemModule/doUpdateCompany",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{id:this.modifyForm.id,name:this.modifyForm.name,code:this.modifyForm.code,mnemonicCode:this.modifyForm.mnemonicCode,master:this.modifyForm.master,tax:this.modifyForm.tax,fax:this.modifyForm.fax,tel:this.modifyForm.tel,address:this.modifyForm.address,email:this.modifyForm.email,website:this.modifyForm.website,status:this.modifyForm.status,version:this.modifyForm.version,orgId:this.modifyForm.orgId}}}).then(function(t){alert(t.data.head.message),"0"==t.data.head.responseCode?(e.$refs.multipleTable.clearSelection(),e.dialogFormVisible2=!1,e.reflashTree(),e.getdata()):"250103-2"==t.data.head.responseCode?document.getElementById("modifyRepeatCode").focus():"250103-1"==t.data.head.responseCode&&document.getElementById("modifyRepeatName").focus()},function(){alert("保存失败"),this.dialogFormVisible2=!1,console.log("error")})},clearAddForm:function(){void 0!=this.$refs.addForm&&this.$refs.addForm.clearValidate(),this.addForm.id="",this.orgIdAndName.length,this.addForm.orgId=this.orgIdAndName[0].value,this.addForm.name="",this.addForm.code="",this.addForm.mnemonicCode="",this.addForm.master="",this.addForm.tax="",this.addForm.fax="",this.addForm.tel="",this.addForm.address="",this.addForm.email="",this.addForm.website="",this.addForm.status="",this.addForm.version="",this.dialogFormVisible=!0},addCompanyData:function(){var e=this;this.$ajax.post("gateway/systemModule/doAddCompany",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{name:this.addForm.name,code:this.addForm.code,mnemonicCode:this.addForm.mnemonicCode,master:this.addForm.master,tax:this.addForm.tax,fax:this.addForm.fax,tel:this.addForm.tel,address:this.addForm.address,email:this.addForm.email,website:this.addForm.website,status:this.addForm.status,orgId:this.addForm.orgId}}}).then(function(t){console.log(t),alert(t.data.head.message),"0"==t.data.head.responseCode?(e.dialogFormVisible=!1,e.reflashTree(),e.getdata()):"250101-2"==t.data.head.responseCode?document.getElementById("addRepeatCode").focus():"250101-1"==t.data.head.responseCode&&document.getElementById("addRepeatName").focus()},function(){alert("增加失败"),console.log("error")})},checkDelete:function(e){this.deleteId=e.id,this.deleteVersion=e.version,this.dialogVisible=!0},deleteCompanyData:function(){var e=this;this.dialogVisible=!1,this.$ajax.post("gateway/systemModule/doDeleteCompany",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{id:this.deleteId,version:this.deleteVersion}}}).then(function(t){"0"==t.data.head.responseCode?(e.$refs.multipleTable.clearSelection(),e.reflashTree(),e.getdata(),alert(t.data.head.message)):e.$message({message:t.data.head.message,type:"error"})},function(){alert("删除失败"),console.log("error")})},checkDeleteSelect:function(){var e=this;0==this.multipleSelection.length?alert("请选择数据！"):this.$confirm("确定删除选中数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t=[];e.multipleSelection.forEach(function(e){t.push({id:e.id,version:e.version})}),e.$ajax.post("gateway/systemModule/doDeleteCompanyList",{head:{version:"1",token:e.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{companyList:t}}}).then(function(t){"0"==t.data.head.responseCode?(alert(t.data.head.message),e.$refs.multipleTable.clearSelection(),e.reflashTree(),e.getdata()):alert("错误码："+t.data.head.responseCode+"\n"+t.data.head.message)},function(){alert("删除失败"),console.log("error")})}).catch(function(){})},reflashTree:function(){this.$emit("reflashTree")},updateSubmitForm:function(){var e=this;this.$refs.modifyForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.checkFax(e.modifyForm.fax)&&e.checkTel(e.modifyForm.tel)&&e.checkEmail(e.modifyForm.email)&&e.checkUrl(e.modifyForm.website)&&e.updateCompanyData()})},addSubmitForm:function(){var e=this;this.$refs.addForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.checkFax(e.addForm.fax)&&e.checkTel(e.addForm.tel)&&e.checkEmail(e.addForm.email)&&e.checkUrl(e.addForm.website)&&e.addCompanyData()})},checkEmail:function(e){return!(""!=e&&!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e))||(this.$message({message:"邮箱格式不正确，邮箱格式如：12345678@qq.com",type:"error"}),!1)},checkFax:function(e){return!!/^(\d{3,4}-)?\d{7,8}$/.test(e)||(this.$message({message:"传真格式不正确，传真格式如:0376-1234567",type:"error"}),!1)},checkUrl:function(e){return!!/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(e)||(this.$message({message:"网站格式不正确,网站格式如:https://www.baidu.com",type:"error"}),!1)},checkTel:function(e){return!!/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,4}))?$/.test(e)||(this.$message({message:"电话格式不正确,电话格式如:0591-12345678",type:"error"}),!1)},getOrgIdAndName:function(){var e=this;this.$ajax.post("gateway/systemModule/doQueryOrgIdAndName",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{}}}).then(function(t){console.log("response.data.head.message="+t.data.head.message),e.orgIdAndName=t.data.body.data},function(){console.log("error")})},getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var o=e[t].split("=");if("staffToken"==o[0])return o[1]}else alert("登录超时!"),this.$router.push({path:"/Login",name:"Login",params:{}})}},components:{},created:function(){this.getdata(),this.getOrgIdAndName()}},s={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticStyle:{float:"left","margin-bottom":"20px"}},[o("div",{staticStyle:{floar:"left"},attrs:{id:"selector"}},[o("span",[e._v("公司名称:")]),e._v(" "),o("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入内容"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),o("span",[e._v("组织名称:")]),e._v(" "),o("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入内容"},model:{value:e.orgName,callback:function(t){e.orgName=t},expression:"orgName"}}),e._v(" "),o("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.queryDataByName()}}},[e._v("搜索")])],1),e._v(" "),o("div",{staticStyle:{float:"left"}},[o("el-button-group",[o("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:e.clearAddForm}},[e._v("增加")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"warning",icon:"el-icon-edit"},on:{click:e.checkModifySelectOne}},[e._v("编辑")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:e.checkDeleteSelect}},[e._v("删除")])],1)],1)]),e._v(" "),o("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark","row-key":e.getRowKeys},on:{"row-dblclick":e.handledbClick,"selection-change":e.handleSelectionChange}},[o("el-table-column",{attrs:{"reserve-selection":"true",type:"selection",width:"55"}}),e._v(" "),o("el-table-column",{attrs:{label:"公司名称",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.name))]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"code",label:"公司编号",width:"100"}}),e._v(" "),o("el-table-column",{attrs:{prop:"mnemonicCode",label:"助记码",width:"100"}}),e._v(" "),o("el-table-column",{attrs:{prop:"master",label:"法人",width:"100"}}),o("el-table-column",{attrs:{prop:"orgId.name",label:"所在机构",width:"100"}}),o("el-table-column",{attrs:{prop:"tax",label:"税号",width:"100"}}),o("el-table-column",{attrs:{prop:"fax",label:"传真",width:"100"}}),e._v(" "),o("el-table-column",{attrs:{prop:"tel",label:"电话",width:"100"}}),e._v(" "),o("el-table-column",{attrs:{prop:"address",label:"地址",width:"100"}}),e._v(" "),o("el-table-column",{attrs:{prop:"email",label:"邮箱","show-overflow-tooltip":""}}),e._v(" "),o("el-table-column",{attrs:{prop:"website",label:"网站","show-overflow-tooltip":""}}),e._v(" "),o("el-table-column",{attrs:{prop:"status",label:"是否启用","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?o("span",[o("el-tag",[e._v("是")])],1):0==t.row.status?o("span",[o("el-tag",{attrs:{type:"info"}},[e._v("否")])],1):e._e()]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button-group",[o("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:e.clearAddForm}},[e._v("增加")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"warning",icon:"el-icon-edit"},on:{click:function(o){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(o){return e.checkDelete(t.row)}}},[e._v("删除")])],1)]}}])})],1),e._v(" "),o("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[o("span",[e._v("确认删除？")]),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.deleteCompanyData}},[e._v("确 定")])],1)]),e._v(" "),o("div",{staticClass:"page",staticStyle:{"margin-top":"50px"}},[o("el-pagination",{attrs:{"current-page":e.currentPage4,"page-sizes":[5,6,7,8],"page-size":5,layout:"total, sizes, prev, pager, next, jumper",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),o("div",{attrs:{id:"btn1"}},[o("el-dialog",{attrs:{title:"增加公司",visible:e.dialogFormVisible,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("el-form",{ref:"addForm",attrs:{rules:e.rules,model:e.addForm,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"公司名称",prop:"name"}},[o("el-input",{attrs:{id:"addRepeatName"},model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}},[e._v("{{}}")])],1),e._v(" "),o("el-form-item",{attrs:{label:"公司编号",prop:"code"}},[o("el-input",{attrs:{id:"addRepeatCode"},model:{value:e.addForm.code,callback:function(t){e.$set(e.addForm,"code",t)},expression:"addForm.code"}},[e._v("{{}}")])],1),e._v(" "),o("el-form-item",{attrs:{label:"助记码",readonly:"true",prop:"mnemonicCode"}},[o("el-input",{model:{value:e.addForm.mnemonicCode,callback:function(t){e.$set(e.addForm,"mnemonicCode",t)},expression:"addForm.mnemonicCode"}},[e._v("{{}}")])],1),e._v(" "),o("el-form-item",{attrs:{label:"法人",prop:"master"}},[o("el-input",{model:{value:e.addForm.master,callback:function(t){e.$set(e.addForm,"master",t)},expression:"addForm.master"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"税号",prop:"tax"}},[o("el-input",{model:{value:e.addForm.tax,callback:function(t){e.$set(e.addForm,"tax",t)},expression:"addForm.tax"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"传真",prop:"fax"}},[o("el-input",{model:{value:e.addForm.fax,callback:function(t){e.$set(e.addForm,"fax",t)},expression:"addForm.fax"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"电话",prop:"tel"}},[o("el-input",{attrs:{type:"input"},model:{value:e.addForm.tel,callback:function(t){e.$set(e.addForm,"tel",t)},expression:"addForm.tel"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"地址",prop:"address"}},[o("el-input",{attrs:{type:"input"},model:{value:e.addForm.address,callback:function(t){e.$set(e.addForm,"address",t)},expression:"addForm.address"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"网站",prop:"website"}},[o("el-input",{attrs:{type:"input"},model:{value:e.addForm.website,callback:function(t){e.$set(e.addForm,"website",t)},expression:"addForm.website"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"所属机构",prop:"orgId"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.addForm.orgId,callback:function(t){e.$set(e.addForm,"orgId",t)},expression:"addForm.orgId"}},e._l(e.orgIdAndName,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[o("el-input",{attrs:{type:"input"},model:{value:e.addForm.email,callback:function(t){e.$set(e.addForm,"email",t)},expression:"addForm.email"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"是否启用",prop:"status"}},[o("el-radio-group",{model:{value:e.addForm.status,callback:function(t){e.$set(e.addForm,"status",t)},expression:"addForm.status"}},[o("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),o("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),o("div",{staticStyle:{"margin-left":"60%"}},[o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addSubmitForm()}}},[e._v("创建")]),e._v(" "),o("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")])],1)],1)],1)],1)],1),e._v(" "),o("div",{attrs:{id:"btn2"}},[o("el-dialog",{attrs:{title:"编辑公司",visible:e.dialogFormVisible2,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible2=t}}},[o("el-form",{ref:"modifyForm",attrs:{rules:e.rules,model:e.modifyForm,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"公司ID"}},[o("el-input",{attrs:{readonly:"true"},model:{value:e.modifyForm.id,callback:function(t){e.$set(e.modifyForm,"id",t)},expression:"modifyForm.id"}},[e._v("{{}}")])],1),e._v(" "),o("el-form-item",{attrs:{label:"公司名称",prop:"name"}},[o("el-input",{attrs:{id:"modifyRepeatName"},model:{value:e.modifyForm.name,callback:function(t){e.$set(e.modifyForm,"name",t)},expression:"modifyForm.name"}},[e._v("{{}}")])],1),e._v(" "),o("el-form-item",{attrs:{label:"公司编号",prop:"code"}},[o("el-input",{attrs:{id:"modifyRepeatCode"},model:{value:e.modifyForm.code,callback:function(t){e.$set(e.modifyForm,"code",t)},expression:"modifyForm.code"}},[e._v("{{}}")])],1),e._v(" "),o("el-form-item",{attrs:{label:"助记码",readonly:"true",prop:"mnemonicCode"}},[o("el-input",{model:{value:e.modifyForm.mnemonicCode,callback:function(t){e.$set(e.modifyForm,"mnemonicCode",t)},expression:"modifyForm.mnemonicCode"}},[e._v("{{}}")])],1),e._v(" "),o("el-form-item",{attrs:{label:"法人",prop:"master"}},[o("el-input",{model:{value:e.modifyForm.master,callback:function(t){e.$set(e.modifyForm,"master",t)},expression:"modifyForm.master"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"税号",prop:"tax"}},[o("el-input",{model:{value:e.modifyForm.tax,callback:function(t){e.$set(e.modifyForm,"tax",t)},expression:"modifyForm.tax"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"传真",prop:"fax"}},[o("el-input",{model:{value:e.modifyForm.fax,callback:function(t){e.$set(e.modifyForm,"fax",t)},expression:"modifyForm.fax"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"电话",prop:"tel"}},[o("el-input",{attrs:{type:"input"},model:{value:e.modifyForm.tel,callback:function(t){e.$set(e.modifyForm,"tel",t)},expression:"modifyForm.tel"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"地址",prop:"address"}},[o("el-input",{attrs:{type:"input"},model:{value:e.modifyForm.address,callback:function(t){e.$set(e.modifyForm,"address",t)},expression:"modifyForm.address"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"网站",prop:"website"}},[o("el-input",{attrs:{type:"input"},model:{value:e.modifyForm.website,callback:function(t){e.$set(e.modifyForm,"website",t)},expression:"modifyForm.website"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[o("el-input",{attrs:{type:"input"},model:{value:e.modifyForm.email,callback:function(t){e.$set(e.modifyForm,"email",t)},expression:"modifyForm.email"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"所属机构",prop:"orgId"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.modifyForm.orgId,callback:function(t){e.$set(e.modifyForm,"orgId",t)},expression:"modifyForm.orgId"}},e._l(e.orgIdAndName,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"是否启用",prop:"status"}},[o("el-radio-group",{model:{value:e.modifyForm.status,callback:function(t){e.$set(e.modifyForm,"status",t)},expression:"modifyForm.status"}},[o("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),o("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),o("div",{staticStyle:{"margin-left":"60%"}},[o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.updateSubmitForm()}}},[e._v("保存")]),e._v(" "),o("el-button",{on:{click:function(t){e.dialogFormVisible2=!1}}},[e._v("取消")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var d=o("VU/8")(l,s,!1,function(e){o("rC65")},"data-v-5b565cec",null).exports,n={data:function(){return{dataTree:""}},components:{card:a.a,stable:d},methods:{getdataTree:function(){var e=this;this.$ajax.post("gateway/systemModule/doQueryCompanyNameTreeByCompanyId",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{}}}).then(function(t){e.dataTree=t.data.body.data},function(){console.log("error")})},getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var o=e[t].split("=");if("staffToken"==o[0])return o[1]}else alert("登录超时!"),this.$router.push({path:"/Login",name:"Login",params:{}})}},created:function(){this.getdataTree()}},m={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"all"}},[o("div",{attrs:{id:"left"}},[o("card",{attrs:{title:"公司管理",dataTree:e.dataTree}})],1),e._v(" "),o("div",{attrs:{id:"right"}},[o("stable",{on:{reflashTree:function(t){return e.getdataTree()}}})],1)])},staticRenderFns:[]};var c=o("VU/8")(n,m,!1,function(e){o("+h5e")},"data-v-725ac471",null);t.default=c.exports}});
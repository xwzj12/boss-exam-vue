webpackJsonp([19],{A73p:function(e,t){},Ho9S:function(e,t){},Iwpg:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("Z0lD"),i={data:function(){return{tableData:[],multipleSelection:[],dialogTableVisible2:!1,dialogFormVisible2:!1,dialogTableVisible:!1,dialogFormVisible:!1,modifyForm:{id:"",companyId:"",name:"",code:"",remark:"",orgId:"",version:"",status:""},formLabelWidth:"120px",addForm:{id:"",companyId:"",name:"",code:"",remark:"",orgId:"",version:"",status:""},page:1,pageSize:5,name:"",count:0,param:"",paramType:"",dialogVisible:!1,deleteId:"",deleteVersion:-1,status:1,statusList:[{label:"全部",value:null},{label:"是",value:1},{label:"否",value:0}],rules:{companyId:[{required:!0,message:"请选择公司类型！",trigger:"blur"}],name:[{required:!0,message:"请输入职位名!",trigger:"blur"}],code:[{required:!0,message:"请输入职位代码!",trigger:"blur"}],status:[{required:!0,message:"请选择是否启用!",trigger:"change"}]},companyId:null,companyName:null,companyNameAndId:[]}},methods:{evaluationModifyForm:function(e){void 0!=this.$refs.modifyForm&&this.$refs.modifyForm.clearValidate(),this.modifyForm.id=e.id,this.modifyForm.companyId=e.companyId.id,this.modifyForm.name=e.name,this.modifyForm.code=e.code,this.modifyForm.remark=e.remark,this.modifyForm.version=e.version,this.modifyForm.status=e.status},getRowKeys:function(e){return e.id},handleEdit:function(e,t){this.dialogFormVisible2=!0,this.dialogTableVisible2=!0,this.evaluationModifyForm(t)},handledbClick:function(e,t,a){this.handleEdit(0,e)},getdata:function(){var e=this;this.$ajax.post("gateway/systemModule/doQueryPositionByPage",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{name:this.name,status:this.status,page:this.page,pageSize:this.pageSize}}}).then(function(t){e.count=t.data.body.data.count,e.tableData=t.data.body.data.positionList},function(){console.log("error")})},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e},handleSizeChange:function(e){this.pageSize=e,this.getdata()},handleCurrentChange:function(e){this.page=e,this.getdata()},queryDataByName:function(){this.page=1,this.getdata()},checkModifySelectOne:function(){1==this.multipleSelection.length?(this.dialogFormVisible2=!0,this.evaluationModifyForm(this.multipleSelection[0])):0==this.multipleSelection.length?alert("请选中一行数据！"):alert("只能选择一条数据，请重新选择")},updatePositionData:function(){var e=this;this.$ajax.post("gateway/systemModule/doUpdatePosition",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{id:this.modifyForm.id,companyId:this.modifyForm.companyId,name:this.modifyForm.name,code:this.modifyForm.code,remark:this.modifyForm.remark,version:this.modifyForm.version,status:this.modifyForm.status}}}).then(function(t){alert(t.data.head.message),"0"==t.data.head.responseCode&&(e.$refs.multipleTable.clearSelection(),e.dialogFormVisible2=!1,e.getdata(),e.reflashTree())},function(){alert("保存失败"),this.dialogFormVisible2=!1,console.log("error")})},clearAddForm:function(){void 0!=this.$refs.addForm&&this.$refs.addForm.clearValidate(),this.addForm.id="",this.addForm.companyId="",1==this.companyNameAndId.length?this.addForm.companyId=this.companyNameAndId[0].value:this.addForm.companyId="",this.addForm.name="",this.addForm.code="",this.addForm.remark="",this.addForm.version="",this.addForm.status=1,this.dialogFormVisible=!0},addPositionData:function(){var e=this;this.$ajax.post("gateway/systemModule/doAddPosition",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{companyId:this.addForm.companyId,name:this.addForm.name,code:this.addForm.code,remark:this.addForm.remark,status:this.addForm.status}}}).then(function(t){console.log(t),alert(t.data.head.message),"0"==t.data.head.responseCode&&(e.dialogFormVisible=!1,e.getdata(),e.reflashTree())},function(){alert("增加失败"),console.log("error")})},checkDelete:function(e){this.deleteId=e.id,this.deleteVersion=e.version,this.dialogVisible=!0},deletePositionData:function(){var e=this;this.dialogVisible=!1,this.$ajax.post("gateway/systemModule/doDeletePosition",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{id:this.deleteId,version:this.deleteVersion}}}).then(function(t){"0"==t.data.head.responseCode?(alert(t.data.head.message),e.$refs.multipleTable.clearSelection(),e.reflashTree(),e.getdata()):alert("错误码："+t.data.head.responseCode+"\n"+t.data.head.message)},function(){alert("删除失败"),console.log("error")})},checkDeleteSelect:function(){var e=this;0==this.multipleSelection.length?alert("请选择数据！"):this.$confirm("确定删除选中数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t=[];e.multipleSelection.forEach(function(e){t.push({id:e.id,version:e.version})}),e.$ajax.post("gateway/systemModule/doDeletePositionList",{head:{version:"1",token:e.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{positionList:t}}}).then(function(t){"0"==t.data.head.responseCode?(alert(t.data.head.message),e.$refs.multipleTable.clearSelection(),e.reflashTree(),e.getdata()):alert("错误码："+t.data.head.responseCode+"\n"+t.data.head.message)},function(){alert("删除失败"),console.log("error")})}).catch(function(){})},reflashTree:function(){this.$emit("reflashTree")},formatDate:function(e,t){if(null!=e[t.property]){var a=e[t.property],o=new Date(a);return o.getFullYear()+"-"+(o.getMonth()+1)+"-"+o.getDate()+" "+o.getHours()+":"+o.getMinutes()+":"+o.getSeconds()}},updateSubmitForm:function(){var e=this;this.$refs.modifyForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.updatePositionData()})},addSubmitForm:function(){var e=this;this.$refs.addForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.addPositionData()})},getCompanyIdAndName:function(){var e=this;this.$ajax.post("gateway/systemModule/queryCompanyIdAndName",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{}}}).then(function(t){e.companyNameAndId=t.data.body.data},function(){console.log("error")})},getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var a=e[t].split("=");if("staffToken"==a[0])return a[1]}else alert("登录超时!"),this.$router.push({path:"/Login",name:"Login",params:{}})}},components:{},created:function(){this.getdata(),this.getCompanyIdAndName()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{float:"left","margin-bottom":"20px"}},[a("div",{attrs:{id:"selector"}},[a("span",[e._v("职位名称:")]),e._v(" "),a("el-input",{staticStyle:{width:"200px","margin-right":"20px"},attrs:{placeholder:"请输入内容"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),a("span",[e._v("是否启用:")]),e._v(" "),a("el-select",{staticStyle:{width:"100px","margin-right":"20px"},attrs:{placeholder:"请选择"},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},e._l(e.statusList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.queryDataByName()}}},[e._v("搜索")])],1),e._v(" "),a("div",{staticStyle:{float:"left"}},[a("el-button-group",[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:e.clearAddForm}},[e._v("增加")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"warning",icon:"el-icon-edit"},on:{click:e.checkModifySelectOne}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:e.checkDeleteSelect}},[e._v("删除")])],1)],1)]),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark","row-key":e.getRowKeys},on:{"row-dblclick":e.handledbClick,"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{"reserve-selection":"true",type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{label:"公司",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.companyId.name))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"职位名称",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"code",label:"职位代码",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"启用标记",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("span",[a("el-tag",[e._v("是")])],1):0==t.row.status?a("span",[a("el-tag",{attrs:{type:"info"}},[e._v("否")])],1):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button-group",[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:e.clearAddForm}},[e._v("增加")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"warning",icon:"el-icon-edit"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(a){return e.checkDelete(t.row)}}},[e._v("删除")])],1)]}}])})],1),e._v(" "),a("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("span",[e._v("确认删除？")]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.deletePositionData}},[e._v("确 定")])],1)]),e._v(" "),a("div",{staticClass:"page",staticStyle:{"margin-top":"50px"}},[a("el-pagination",{attrs:{"current-page":e.currentPage4,"page-sizes":[5,6,7,8],"page-size":5,layout:"total, sizes, prev, pager, next, jumper",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("div",{attrs:{id:"btn1"}},[a("el-dialog",{attrs:{title:"增加职位",visible:e.dialogFormVisible,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"addForm",attrs:{model:e.addForm,"label-width":"100px",rules:e.rules}},[a("el-form-item",{attrs:{label:"所属公司",prop:"companyId"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.addForm.companyId,callback:function(t){e.$set(e.addForm,"companyId",t)},expression:"addForm.companyId"}},e._l(e.companyNameAndId,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"职位名",prop:"name"}},[a("el-input",{model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"职位代码",readonly:"true",prop:"code"}},[a("el-input",{model:{value:e.addForm.code,callback:function(t){e.$set(e.addForm,"code",t)},expression:"addForm.code"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.addForm.remark,callback:function(t){e.$set(e.addForm,"remark",t)},expression:"addForm.remark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否启用",prop:"status"}},[a("el-radio-group",{model:{value:e.addForm.status,callback:function(t){e.$set(e.addForm,"status",t)},expression:"addForm.status"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),a("div",{staticStyle:{"margin-left":"60%"}},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addSubmitForm()}}},[e._v("创建")]),e._v(" "),a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")])],1)],1)],1)],1)],1),e._v(" "),a("div",{attrs:{id:"btn2"}},[a("el-dialog",{attrs:{title:"编辑职位",visible:e.dialogFormVisible2,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible2=t}}},[a("el-form",{ref:"modifyForm",attrs:{model:e.modifyForm,"label-width":"100px",rules:e.rules}},[a("el-form-item",{attrs:{label:"职位ID"}},[a("el-input",{attrs:{readonly:"true"},model:{value:e.modifyForm.id,callback:function(t){e.$set(e.modifyForm,"id",t)},expression:"modifyForm.id"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"所属公司",prop:"companyId"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.modifyForm.companyId,callback:function(t){e.$set(e.modifyForm,"companyId",t)},expression:"modifyForm.companyId"}},e._l(e.companyNameAndId,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"职位名",prop:"name"}},[a("el-input",{model:{value:e.modifyForm.name,callback:function(t){e.$set(e.modifyForm,"name",t)},expression:"modifyForm.name"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"职位代码",prop:"code"}},[a("el-input",{model:{value:e.modifyForm.code,callback:function(t){e.$set(e.modifyForm,"code",t)},expression:"modifyForm.code"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",readonly:"true"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.modifyForm.remark,callback:function(t){e.$set(e.modifyForm,"remark",t)},expression:"modifyForm.remark"}},[e._v("{{}}")])],1),e._v(" "),a("el-form-item",{attrs:{label:"是否启用",prop:"status"}},[a("el-radio-group",{model:{value:e.modifyForm.status,callback:function(t){e.$set(e.modifyForm,"status",t)},expression:"modifyForm.status"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),a("div",{staticStyle:{"margin-left":"60%"}},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.updateSubmitForm()}}},[e._v("保存")]),e._v(" "),a("el-button",{on:{click:function(t){e.dialogFormVisible2=!1}}},[e._v("取消")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(i,n,!1,function(e){a("A73p")},"data-v-01b73c36",null).exports,l={data:function(){return{dataTree:""}},components:{card:o.a,stable:r},methods:{getdataTree:function(){var e=this;this.$ajax.post("gateway/systemModule/doQueryPositionNameTreeByCompanyId",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{}}}).then(function(t){e.dataTree=t.data.body.data},function(){console.log("error")})},getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var a=e[t].split("=");if("staffToken"==a[0])return a[1]}else alert("登录超时!"),this.$router.push({path:"/Login",name:"Login",params:{}})}},created:function(){this.getdataTree()}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"all"}},[a("div",{attrs:{id:"left"}},[a("card",{attrs:{title:"职位管理",dataTree:e.dataTree}})],1),e._v(" "),a("div",{attrs:{id:"right"}},[a("stable",{on:{reflashTree:function(t){return e.getdataTree()}}})],1)])},staticRenderFns:[]};var d=a("VU/8")(l,s,!1,function(e){a("Ho9S")},"data-v-7b838dae",null);t.default=d.exports}});
webpackJsonp([25],{WsyX:function(e,t){},bz1C:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("bOdI"),l=i.n(a),o={components:{},created:function(){localStorage.setItem("Authorization","eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIxMDEwMDEiLCJjb21wYW55TmFtZSI6IuWNmuaAnemVv-S5kOWIhuWFrOWPuCIsImlzcyI6Im1vb2NfdXNlciIsIm5hbWUiOiLlvKDkuIkiLCJleHAiOjE1ODk2MDIxODcsInVzZXJJZCI6IjAwMSIsIm9yZ0lkIjoiMTAxIn0.19UGb2w-GjrwxWfN3nlGRDIoR1hzs4WpqqAmDmsKQdY"),this.reflashAll()},data:function(){return{currentPage1:5,currentPage2:5,currentPage3:5,currentPage4:4,pageSize:10,pageIndex:0,total:10,index:0,formInline:{name:"",categoryId:"java",subjectTypeId:"单选题"},dialogImageUrl:"",dialogVisible:!1,dialogImageUrl2:"",dialogVisible2:!1,fileList:[{name:"题目内容.jpg",url:""}],file:{},multipleSelection:[],deleteTable:[{id:"",version:""}],tableData:[{id:"001",name:"spring的特点",imageUrl:"",categoryId:"java",subjectTypeId:"单选题",difficulty:"简单",updatedTime:"2016-05-02",remark:"",status:"是",version:"",items:[{id:"",answer:"",rightAnswer:"是",subjectId:""}]}],addItemTableData:[{id:"",answer:"java天下第一",rightAnswer:"否",subjectId:""}],editItemTableData:[{id:"",combExamId:"",num:"10",difficulty:"简单",score:"50",subjectTypeId:"单选题",categoryId:"java"}],editAddItemTableData:[{id:"",combExamId:"",difficulty:"简单",num:"10",score:"50",subjectTypeId:"单选题",categoryId:"语文"}],editEditItemTableData:[{id:"",combExamId:"",num:"10",difficulty:"简单",score:"50",subjectTypeId:"单选题",categoryId:"java"}],value:"",addVisible:!1,itemAddVisible:!1,itemAddEditVisible:!1,addForm:{id:"",name:"测试",imageUrl:"",categoryId:"java",subjectTypeId:"单选题",difficulty:"简单",remark:"",status:"是",version:"",items:[{id:"",answer:"java天下",rightAnswer:"是",subjectId:""}]},itemAddForm:{id:"",answer:"java天下",rightAnswer:"否",subjectId:""},itemAddEditForm:{id:"",answer:"java天下",rightAnswer:"否",subjectId:""},rules:{name:[{required:!0,message:"请输入题目内容",trigger:"blur"},{min:2,max:1e3,message:"长度在 2 到 1000 个字符",trigger:"blur"}],categoryId:[{required:!0,message:"请选择题目类别",trigger:"change"}],subjectTypeId:[{required:!0,message:"请选择题目类型",trigger:"change"}],difficulty:[{required:!0,message:"请选择难度",trigger:"change"}],status:[{required:!0,message:"请选择状态",trigger:"change"}]},answer:[{required:!0,message:"请输入答案内容",trigger:"blur"},{min:2,max:100,message:"长度在 2 到 100 个字符",trigger:"blur"}],typeOptions:[{value:"null",label:"null"}],categoryOptions:[{value:"null",label:"null"}],options:[{value:"简单",label:"简单"},{value:"中等",label:"中等"},{value:"困难",label:"困难"}],editVisible:!1,itemEditAddVisible:!1,itemEditEditVisible:!1,editForm:{id:"",name:"测试",imageUrl:"",categoryId:"java",subjectTypeId:"单选题",difficulty:"简单",remark:"",status:"是",version:"",items:[{id:"",answer:"java天下",rightAnswer:"是",subjectId:""}]},itemEditAddForm:{id:"",answer:"java天下",rightAnswer:"否",subjectId:""},itemEditEditForm:{id:"",answer:"java天下",rightAnswer:"否",subjectId:""},downloadLoading:!1}},methods:{reflashAll:function(){this.getData(),this.getCategoryOptions(),this.getTypeOptions()},getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var i=e[t].split("=");if("staffToken"==i[0])return i[1]}else alert("登录超时!"),this.$router.push({path:"/Login",name:"Login",params:{}})},getCategoryOptions:function(){var e=this;this.$ajax.post("/gateway/basedata/category/queryOptions",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{parentId:"0"}}}).then(function(t){var i=t.data.body.data;console.log("categoryOptions查询成功:"),i.shift(),i.unshift({value:"null",label:"null"}),e.categoryOptions=i,console.log(e.categoryOptions)},function(){console.log("error"),console.log("categoryOptions查询失败")})},getTypeOptions:function(){var e=this;this.$ajax.post("/gateway/basedata/type/queryOptions",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{parentId:"0"}}}).then(function(t){var i=t.data.body.data;console.log("typeOptions查询成功:"),i.unshift({value:"null",label:"null"}),e.typeOptions=i,console.log(e.typeOptions)},function(){console.log("error"),console.log("typeOptions查询失败")})},getData:function(){var e=this;this.$ajax.post("/gateway/basedata/subject/queryPage",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{name:this.formInline.name,categoryId:this.formInline.categoryId,subjectTypeId:this.formInline.subjectTypeId,pageIndex:this.pageIndex,pageSize:this.pageSize}}}).then(function(t){e.tableData=[];var i=t.data.body.data;console.log(i);for(var a=0;a<i.length;a++){e.tableData[a]=i[a],e.tableData[a].status=1==e.tableData[a].status?"是":"否",e.tableData[a].items=i[a].answers;for(var l=0;l<e.tableData[a].items.length;l++)e.tableData[a].items[l].rightAnswer=1==e.tableData[a].items[l].rightAnswer?"是":"否"}console.log("分页查询成功"),console.log(e.tableData),e.queryTotal()})},queryTotal:function(){var e=this;this.$ajax.post("/gateway/basedata/subject/queryTotal",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{name:this.formInline.name,categoryId:this.formInline.categoryId,subjectTypeId:this.formInline.subjectTypeId}}}).then(function(t){var i=t.data.body.data;console.log("查询total成功"+i),e.total=i},function(){console.log("error"),console.log("total查询失败")})},getFile:function(e){console.log(e.file),this.file=e.file},upload:function(){var e=this,t=new FormData;t.append("filename",this.file);this.$ajax.post("/gateway/basedata/subject/uploading",t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){e.$message.success(t.data.head.message);var i=t.data.body.data;e.addForm.imageUrl=i,e.editForm.imageUrl=i,console.log(i)},function(){this.addForm.imageUrl="",console.log("error"),console.log("total查询失败")})},handleRemove:function(e,t){console.log(e,t)},handlePictureCardPreview:function(e){console.log("图片预览："),this.dialogVisible=!0,this.dialogImageUrl=e.url},handleChange:function(e,t){t.splice(0),t.push(e);var i=new FormData;i.append("file",e),console.log(i.getAll("file")),this.addForm.imageUrl=e.url,this.editForm.imageUrl=e.url,console.log("editForm图片地址："+this.editForm.imageUrl),console.log("addForm图片地址："+this.addForm.imageUrl)},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.handleAdd()})},editSubmitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.handleEdit()})},showAddEdit:function(e,t){console.log("add明细修改弹出框数据处理"),this.itemAddEditVisible=!0,this.itemAddEditForm.answer=t.answer,this.itemAddEditForm.rightAnswer=t.rightAnswer,this.index=e},handleAddAdd:function(e,t){console.log(e,t),this.itemAddForm.answer.length<2?alert("请输入答案"):(this.addItemTableData.push(this.itemAddForm),this.itemAddForm={id:"",answer:"java天下",rightAnswer:"否",subjectId:""},this.itemAddVisible=!1)},handleAddEdit:function(){this.itemAddEditForm.answer.length<2?alert("请输入答案"):(console.log("add明细修改弹出框 保存按钮方法"),console.log("itemAddEditForm"+this.itemAddEditForm.subjectTypeId),this.addItemTableData.splice(this.index,1),this.addItemTableData.push(this.itemAddEditForm),this.itemAddEditForm={id:"",answer:"java天下",rightAnswer:"否",subjectId:""},this.itemAddEditVisible=!1)},addHandleDelete:function(e,t){var i=this;console.log(e,t),this.$confirm("此操作将删除该题目答案, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.$message({type:"success",message:"删除成功!"}),i.addItemTableData.splice(e,1)}).catch(function(){i.$message({type:"info",message:"已取消删除"})})},handleAdd:function(){var e=this;if(0==this.addItemTableData.length)alert("请增加相应答案");else{for(var t=!1,i=0;i<this.addItemTableData.length;i++)if("是"==this.addItemTableData[i].rightAnswer){t=!0;break}if(0==t)alert("请添加正确答案");else{console.log("执行增加"),this.addVisible=!1,this.addForm.items=this.addItemTableData;for(var a=0;a<this.addForm.items.length;a++)this.addForm.items[a].rightAnswer="是"==this.addForm.items[a].rightAnswer?1:0;console.log(this.addForm),this.$ajax.post("/gateway/basedata/subject/add",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{id:"1",name:this.addForm.name,imageUrl:this.addForm.imageUrl,remark:this.addForm.remark,status:"是"==this.addForm.status?1:0,version:"1",categoryId:this.addForm.categoryId,subjectTypeId:this.addForm.subjectTypeId,difficulty:this.addForm.difficulty,answers:this.addForm.items}}}).then(function(t){console.log("response.data.head.message="+t.data.head.message),alert("增加成功"),e.dialogFormVisible=!1,e.addItemTableData=[],e.addForm.imageUrl="",e.dialogImageUrl="",e.reflashAll()},function(){alert("增加失败"),console.log("error")})}}},showEditForm:function(e,t){if(this.fileList.splice(0),null!=t.imageUrl){var i={name:"修改图片"};i.url=t.imageUrl,this.fileList.push(i),console.log("点击修改按钮:fileList表imageUrl为:"),console.log(this.fileList[0].url)}else console.log("点击修改按钮:fileList表imageUrl为:"),console.log("null");this.editItemTableData=[],this.editVisible=!0,this.editForm.id=t.id,this.editForm.categoryId=t.categoryId,this.editForm.subjectTypeId=t.subjectTypeId,this.editForm.difficulty=t.difficulty,this.editForm.name=t.name,this.editForm.imageUrl=t.imageUrl,this.editForm.remark=t.remark,this.editForm.status=t.status,this.editForm.version=t.version;for(var a=0;a<t.items.length;a++)this.editItemTableData[a]=t.items[a]},handleItemEditAdd:function(){this.itemEditAddForm.answer.length<2?alert("请输入答案"):(this.editItemTableData.push(this.itemEditAddForm),this.itemEditAddForm={id:"",answer:"java",rightAnswer:"否",subjectId:""},this.itemEditAddVisible=!1,console.log("点击修改增加item的保存按钮:"),console.log(this.editItemTableData))},showEditEdit:function(e,t){console.log("edit明细修改弹出框数据处理"),this.itemEditEditVisible=!0,this.itemEditEditForm.answer=t.answer,this.itemEditEditForm.rightAnswer=t.rightAnswer,this.index=e},handleEditEdit:function(){this.itemEditEditForm.answer.length<2?alert("请输入答案"):(console.log("edit明细修改弹出框 保存按钮方法"),console.log("itemEditEditForm"+this.itemEditEditForm.subjectTypeId),this.editItemTableData.splice(this.index,1),this.editItemTableData.push(this.itemEditEditForm),this.itemEditEditForm={id:"",answer:"java",rightAnswer:"否",subjectId:""},this.itemEditEditVisible=!1)},editHandleDelete:function(e,t){var i=this;console.log(e,t),this.$confirm("此操作将删除该答案, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.$message({type:"success",message:"删除成功!"}),i.editItemTableData.splice(e,1)}).catch(function(){i.$message({type:"info",message:"已取消删除"})})},handleEdit:function(){var e=this;if(0==this.editItemTableData.length)alert("请添加相应的答案");else{var t;this.editVisible=!1,this.editForm.items=[];for(var i=this.editItemTableData,a=0;a<i.length;a++)this.editForm.items[a]=i[a],this.editForm.items[a].rightAnswer="是"==this.editForm.items[a].rightAnswer?1:0;console.log("this.editForm"),console.log(this.editForm),this.$ajax.post("/gateway/basedata/subject/update",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:(t={id:this.editForm.id,categoryId:this.editForm.categoryId},l()(t,"categoryId",this.editForm.categoryId),l()(t,"subjectTypeId",this.editForm.subjectTypeId),l()(t,"difficulty",this.editForm.difficulty),l()(t,"name",this.editForm.name),l()(t,"imageUrl",this.editForm.imageUrl),l()(t,"remark",this.editForm.remark),l()(t,"status","是"==this.editForm.status?1:0),l()(t,"version",this.editForm.version),l()(t,"answers",this.editForm.items),t)}}).then(function(t){console.log("response.data.head.message="+t.data.head.message),alert("修改成功"),e.dialogFormVisible=!1,e.editItemTableData=[],e.reflashAll()},function(){alert("修改失败,请刷新重试"),console.log("error")})}},handleDelete:function(e,t){var i=this;console.log(t.id+"\n"+t.version),console.log(t.status),this.$confirm("此操作将永久删除该题目, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.$message({type:"success",message:"执行删除!"}),i.tableData.splice(e,1)}).then(function(){i.$ajax.post("/gateway/basedata/subject/delete",{head:{version:"1",token:i.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{id:t.id,version:t.version}}}).then(function(e){console.log(e);var t=e.data.body.data;alert(e.data.head.message+"\n"+t),i.reflashAll()},function(){console.log("error"),alert("删除失败,请刷新重试")})}).catch(function(){i.$message({type:"info",message:"已取消删除"})})},filterTag:function(e,t){return t.status===e},handleSizeChange:function(e){console.log("每页 "+e+" 条"),console.log("当前页:"+this.pageIndex),this.pageSize=e,this.reflashAll()},handleCurrentChange:function(e){console.log("当前页: "+e),this.pageIndex=e,console.log("当前页:"+this.pageIndex),this.reflashAll()},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e,this.deleteTable=[];for(var t=0;t<e.length;t++){var i={};i.id=e[t].id,i.version=e[t].version,this.deleteTable.push(i)}console.log("选中的deletetable"),console.log(this.deleteTable)},updateSelected:function(){if(0==this.multipleSelection.length)alert("请勾选要修改的数据");else if(this.multipleSelection.length>1)alert("只能修改一个数据");else{var e=this.multipleSelection[0];this.showEditForm(0,e)}},deleteSelected:function(){var e=this;if(0==this.multipleSelection.length)alert("请勾选要删除的数据");else{this.multipleSelection.length>0&&(console.log("将执行删除："),console.log(this.multipleSelection),this.$confirm("此操作将永久删除选中的文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$message({type:"success",message:"开始执行批量删除!"})}).then(function(){e.$ajax.post("/gateway/basedata/subject/deleteSelected",{head:{version:"1",token:e.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{deleteVOList:e.deleteTable}}}).then(function(t){console.log(t);t.data.body.data;alert(t.data.head.message),e.reflashAll()},function(){console.log("error"),alert("删除失败")})}).catch(function(){e.$message({type:"info",message:"已取消删除"})}))}},handleCancel:function(){this.$emit("getCancel")},handleCloseBindWarnStandard:function(){this.$emit("closeBindWarnStandard")},importf:function(e){var t=this;this.$refs.inputer;this.file=event.currentTarget.files[0];var a=this.file,l=new FileReader;FileReader.prototype.readAsBinaryString=function(e){var a,l="",o=new FileReader;o.onload=function(e){for(var s=new Uint8Array(o.result),r=s.byteLength,n=0;n<r;n++)l+=String.fromCharCode(s[n]);var d=i("iBXH");a=d.read(l,{type:"binary"});var c=[];d.utils.sheet_to_json(a.Sheets[a.SheetNames[0]]).map(function(e){var t={};t.name=e.题目内容,t.categoryId=e.题目类别,t.subjectTypeId=e.题目类型,t.difficulty=e.题目难度,t.remark=e.备注,t.status=e.是否启用,t.answerA=e.答案A,t.rightAnswerA=e.是否正确A,t.answerB=e.答案B,t.rightAnswerB=e.是否正确B,t.answerC=e.答案C,t.rightAnswerC=e.是否正确C,t.answerD=e.答案D,t.rightAnswerD=e.是否正确D,c.push(t)}),t.importList=[].concat(c),t.reload()},o.readAsArrayBuffer(e)},l.readAsBinaryString(a)},reload:function(){var e=this;console.log("before执行增加this.importList"),console.log(this.importList);var t=[{id:"001",name:"spring的特点",imageUrl:"",categoryId:"java",subjectTypeId:"单选题",difficulty:"简单",remark:"",status:"是",version:"",answers:[]}];t=this.importList;for(var i=0;i<this.importList.length;i++){t[i].status="是"==this.importList[i].status?1:0,t[i].answers=[];var a={};a.answer=this.importList[i].answerA,a.rightAnswer="是"==this.importList[i].rightAnswerA?1:0,t[i].answers.push(a);var l={};l.answer=this.importList[i].answerB,l.rightAnswer="是"==this.importList[i].rightAnswerB?1:0,t[i].answers.push(l);var o={};o.answer=this.importList[i].answerC,o.rightAnswer="是"==this.importList[i].rightAnswerC?1:0,t[i].answers.push(o);var s={};s.answer=this.importList[i].answerD,s.rightAnswer="是"==this.importList[i].rightAnswerD?1:0,t[i].answers.push(s)}console.log("执行增加this.importList"),console.log(this.importList),console.log("执行增加subjectList"),console.log(t),this.$ajax.post("/gateway/basedata/subject/addList",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{subjectList:t}}}).then(function(t){var i=t.data.head.responseCode,a=t.data.head.message;console.log("response.data.head.message="+i+a),alert(+i+" + "+a),e.reflashAll()},function(){alert("导入失败,题目解析错误"),console.log("error")})},exportExcel:function(e){var t=this;this.downloadLoading=!0,i.e(47).then(i.bind(null,"/9IP")).then(function(i){for(var a=e,l=0;l<e.length;l++)e[l].items.length>0&&(a[l].answerA=e[l].items[0].answer,a[l].rightAnswerA=e[l].items[0].rightAnswer),e[l].items.length>1&&(a[l].answerB=e[l].items[1].answer,a[l].rightAnswerB=e[l].items[1].rightAnswer),e[l].items.length>2&&(a[l].answerC=e[l].items[2].answer,a[l].rightAnswerC=e[l].items[2].rightAnswer),e[l].items.length>3&&(a[l].answerD=e[l].items[3].answer,a[l].rightAnswerD=e[l].items[3].rightAnswer);console.log("导出的 excels"),console.log(a);var o=t.formatJson(["name","categoryId","subjectTypeId","difficulty","remark","status","answerA","rightAnswerA","answerB","rightAnswerB","answerC","rightAnswerC","answerD","rightAnswerD"],a);i.export_json_to_excel({header:["题目内容","题目类别","题目类型","题目难度","备注","是否启用","答案A","是否正确A","答案B","是否正确B","答案C","是否正确C","答案D","是否正确D"],data:o,filename:"题目数据_"+t.formInline.categoryId+"_"+t.formInline.subjectTypeId}),t.downloadLoading=!1})},handleDownload:function(){0==this.multipleSelection.length?alert("请勾选要导出的数据"):this.exportExcel(this.multipleSelection)},getDownload:function(){var e=this;this.downloadLoading=!0,i.e(47).then(i.bind(null,"/9IP")).then(function(t){var i=e.formatJson(["name","categoryId","subjectTypeId","difficulty","remark","status","answerA","rightAnswerA","answerB","rightAnswerB","answerC","rightAnswerC","answerD","rightAnswerD"],[]);t.export_json_to_excel({header:["题目内容","题目类别","题目类型","题目难度","备注","是否启用","答案A","是否正确A","答案B","是否正确B","答案C","是否正确C","答案D","是否正确D"],data:i,filename:"题目导入模板"}),e.downloadLoading=!1})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})},exportExcelAll:function(){var e=this;this.$ajax.post("/gateway/basedata/subject/exportExcelAll",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{name:this.formInline.name,categoryId:this.formInline.categoryId,subjectTypeId:this.formInline.subjectTypeId,pageIndex:1,pageSize:1e4}}}).then(function(t){var i=[],a=t.data.body.data;console.log(a);for(var l=0;l<a.length;l++){i[l]=a[l],i[l].status=1==a[l].status?"是":"否",i[l].items=a[l].answers;for(var o=0;o<a[l].answers.length;o++)i[l].items[o].rightAnswer=1==i[l].items[o].rightAnswer?"是":"否"}console.log("查询到所有题目成功"),console.log(i),e.exportExcel(i)})}}},s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-container",{staticStyle:{height:"800px",border:"1px solid #eee"}},[i("el-main",[i("div",{attrs:{id:"serchs"}},[i("el-form",{attrs:{inline:!0,model:e.formInline}},[i("el-form-item",{attrs:{label:"题目"}},[i("el-input",{attrs:{placeholder:"请输入关键字"},model:{value:e.formInline.name,callback:function(t){e.$set(e.formInline,"name",t)},expression:"formInline.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"题目类别"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formInline.categoryId,callback:function(t){e.$set(e.formInline,"categoryId",t)},expression:"formInline.categoryId"}},e._l(e.categoryOptions,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"题型"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formInline.subjectTypeId,callback:function(t){e.$set(e.formInline,"subjectTypeId",t)},expression:"formInline.subjectTypeId"}},e._l(e.typeOptions,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.getData()}}},[e._v("查询")])],1)],1)],1),e._v(" "),i("div",{attrs:{id:"icon"}},[i("font",{attrs:{color:"#409EFF"},on:{click:function(t){e.addVisible=!0}}},[i("i",{staticClass:"el-icon-plus"},[e._v("增加")])]),e._v("\n           \n        "),i("font",{attrs:{color:"#E6A23C"},on:{click:function(t){return e.updateSelected()}}},[i("i",{staticClass:"el-icon-delete"},[e._v("修改")])]),e._v("\n           \n        "),i("font",{attrs:{color:"#F56C6C"},on:{click:function(t){return e.deleteSelected()}}},[i("i",{staticClass:"el-icon-edit"},[e._v("删除")])]),e._v("\n           \n        "),i("font",{attrs:{color:"#409EFF"}},[i("i",[e._v("已选中："+e._s(this.multipleSelection.length))])]),e._v(" "),i("input",{attrs:{type:"file",accept:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"},on:{change:function(t){return e.importf(this)}}}),e._v("\n           \n        "),i("font",{attrs:{color:"#F56C6C"}},[i("el-button",{attrs:{loading:e.downloadLoading,type:"danger",size:"small",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v("导出选中数据")])],1),e._v(" "),i("font",{attrs:{color:"#F56C6C"}},[i("el-button",{attrs:{loading:e.downloadLoading,type:"primary",size:"small",icon:"el-icon-download"},on:{click:e.getDownload}},[e._v("获取导入模板")])],1),e._v(" "),i("font",{attrs:{color:"#F56C6C"}},[i("el-button",{attrs:{loading:e.downloadLoading,type:"danger",size:"small",icon:"el-icon-download"},on:{click:e.exportExcelAll}},[e._v("导出所有")])],1)],1),e._v(" "),i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"default-sort":{prop:"updatedTime",order:"descending"},"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),e._e(),e._v(" "),i("el-table-column",{attrs:{prop:"name",label:"题目",width:"360"}}),e._v(" "),e._e(),e._v(" "),i("el-table-column",{attrs:{prop:"categoryId",label:"题目类别",sortable:"",width:"180"}}),e._v(" "),i("el-table-column",{attrs:{prop:"subjectTypeId",label:"题型",sortable:"",width:"180"}}),e._v(" "),i("el-table-column",{attrs:{prop:"difficulty",label:"难度",sortable:"",width:"180"}}),e._v(" "),i("el-table-column",{attrs:{prop:"updatedTime",label:"更新时间",sortable:"",width:"180"}}),e._v(" "),i("el-table-column",{attrs:{prop:"remark",label:"备注",width:"180"}}),e._v(" "),i("el-table-column",{attrs:{prop:"status",label:"状态",width:"120",filters:[{text:"是",value:"是"},{text:"否",value:"否"}],"filter-method":e.filterTag,"filter-placement":"bottom-end"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tag",{attrs:{type:"是"===t.row.status?"success":"danger",effect:"dark","disable-transitions":""}},[e._v(e._s(t.row.status))])]}}])}),e._v(" "),e._e(),e._v(" "),i("el-table-column",{attrs:{label:"操作",width:"360"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"big",type:"primary"},on:{click:function(t){e.addVisible=!0}}},[e._v("增加")]),e._v(" "),i("el-button",{attrs:{size:"big",type:"warning"},on:{click:function(i){return e.showEditForm(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{size:"big",type:"danger"},on:{click:function(i){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),i("div",{staticClass:"page"},[i("span",{staticClass:"demonstration"},[e._v("完整功能")]),e._v(" "),i("el-pagination",{attrs:{"current-page":1,"page-sizes":[10,20,40,80,160],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"添加题目",visible:e.addVisible},on:{"update:visible":function(t){e.addVisible=t}}},[i("el-form",{ref:"addForm",staticClass:"demo-ruleForm",attrs:{rules:e.rules,model:e.addForm,size:"big","label-width":"100px"}},[i("el-row",[i("el-form-item",{attrs:{label:"题目类别：",prop:"categoryId"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.addForm.categoryId,callback:function(t){e.$set(e.addForm,"categoryId",t)},expression:"addForm.categoryId"}},e._l(e.categoryOptions,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"题型：",prop:"subjectTypeId"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.addForm.subjectTypeId,callback:function(t){e.$set(e.addForm,"subjectTypeId",t)},expression:"addForm.subjectTypeId"}},e._l(e.typeOptions,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"难度：",prop:"difficulty"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.addForm.difficulty,callback:function(t){e.$set(e.addForm,"difficulty",t)},expression:"addForm.difficulty"}},e._l(e.options,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"题目内容：",prop:"name"}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:4}},model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"题目图片："}},[i("el-upload",{attrs:{action:"https://jsonplaceholder.typicode.com/posts/","list-type":"picture-card","on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"on-change":e.handleChange,"file-list":e.fileList,"http-request":e.getFile}},[i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})]),e._v(" "),i("i",{staticClass:"el-icon-plus"})],1),e._v(" "),i("el-button",{attrs:{size:"small",type:"success"},on:{click:e.upload}},[e._v("确认上传")])],1),e._v(" "),i("el-form-item",{attrs:{label:"备注："}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:4}},model:{value:e.addForm.remark,callback:function(t){e.$set(e.addForm,"remark",t)},expression:"addForm.remark"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"是否启用",prop:"status"}},[i("el-radio-group",{model:{value:e.addForm.status,callback:function(t){e.$set(e.addForm,"status",t)},expression:"addForm.status"}},[i("el-radio",{attrs:{label:"是",value:"是"}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:"否",value:"否"}},[e._v("否")])],1)],1)],1)],1),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.itemAddVisible=!0}}},[e._v("新增答案按钮")]),e._v(" "),i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.addItemTableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),e._e(),e._v(" "),i("el-table-column",{attrs:{prop:"answer",label:"答案",width:"360"}}),e._v(" "),i("el-table-column",{attrs:{prop:"rightAnswer",label:"正确",width:"120","filter-placement":"bottom-end"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tag",{attrs:{type:"是"===t.row.rightAnswer?"success":"danger",effect:"dark","disable-transitions":""}},[e._v(e._s(t.row.rightAnswer))])]}}])}),e._v(" "),e._e(),e._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.itemAddVisible=!0}}},[e._v("增加")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(i){return e.showAddEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.addHandleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.addVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("addForm")}}},[e._v("确认添加题目")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"添加具体题目参数",visible:e.itemAddVisible},on:{"update:visible":function(t){e.itemAddVisible=t}}},[i("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,size:"big","label-width":"100px"}},[i("el-row",[i("el-form-item",{attrs:{label:"答案：",prop:"answer"}},[i("el-input",{model:{value:e.itemAddForm.answer,callback:function(t){e.$set(e.itemAddForm,"answer",t)},expression:"itemAddForm.answer"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"是否正确"}},[i("el-radio-group",{model:{value:e.itemAddForm.rightAnswer,callback:function(t){e.$set(e.itemAddForm,"rightAnswer",t)},expression:"itemAddForm.rightAnswer"}},[i("el-radio",{attrs:{label:"是",value:"是"}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:"否",value:"否"}},[e._v("否")])],1)],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.itemAddVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.handleAddAdd}},[e._v("确定增加答案")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"添加具体题目参数",visible:e.itemAddEditVisible},on:{"update:visible":function(t){e.itemAddEditVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.itemAddEditForm,size:"big","label-width":"100px",rules:e.rules}},[i("el-row",[i("el-form-item",{attrs:{label:"答案：",prop:"answer"}},[i("el-input",{model:{value:e.itemAddEditForm.answer,callback:function(t){e.$set(e.itemAddEditForm,"answer",t)},expression:"itemAddEditForm.answer"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"是否正确"}},[i("el-radio-group",{model:{value:e.itemAddEditForm.rightAnswer,callback:function(t){e.$set(e.itemAddEditForm,"rightAnswer",t)},expression:"itemAddEditForm.rightAnswer"}},[i("el-radio",{attrs:{label:"是",value:"是"}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:"否",value:"否"}},[e._v("否")])],1)],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.itemAddEditVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.handleAddEdit}},[e._v("保存答案")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"修改题目类别",visible:e.editVisible},on:{"update:visible":function(t){e.editVisible=t}}},[i("el-form",{ref:"editForm",staticClass:"demo-ruleForm",attrs:{rules:e.rules,model:e.editForm,size:"big","label-width":"100px"}},[i("el-row",[i("el-form-item",{attrs:{label:"题目类别：",prop:"categoryId"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.editForm.categoryId,callback:function(t){e.$set(e.editForm,"categoryId",t)},expression:"editForm.categoryId"}},e._l(e.categoryOptions,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"题型：",prop:"subjectTypeId"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.editForm.subjectTypeId,callback:function(t){e.$set(e.editForm,"subjectTypeId",t)},expression:"editForm.subjectTypeId"}},e._l(e.typeOptions,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"难度：",prop:"difficulty"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.editForm.difficulty,callback:function(t){e.$set(e.editForm,"difficulty",t)},expression:"editForm.difficulty"}},e._l(e.options,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"题目内容：",prop:"name"}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:4}},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"上传图片"}},[i("el-upload",{attrs:{action:"https://jsonplaceholder.typicode.com/posts/","list-type":"picture-card","on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"on-change":e.handleChange,"file-list":e.fileList,"http-request":e.getFile}},[i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})]),e._v(" "),i("i",{staticClass:"el-icon-plus"})],1),e._v(" "),i("el-button",{attrs:{size:"small",type:"success"},on:{click:e.upload}},[e._v("确认上传")])],1),e._v(" "),i("el-form-item",{attrs:{label:"备注："}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:4}},model:{value:e.editForm.remark,callback:function(t){e.$set(e.editForm,"remark",t)},expression:"editForm.remark"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"是否启用",prop:"status"}},[i("el-radio-group",{model:{value:e.editForm.status,callback:function(t){e.$set(e.editForm,"status",t)},expression:"editForm.status"}},[i("el-radio",{attrs:{label:"是",value:"是"}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:"否",value:"否"}},[e._v("否")])],1)],1),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.itemEditAddVisible=!0}}},[e._v("新增答案按钮")]),e._v(" "),i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.editItemTableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{prop:"answer",label:"答案内容",width:"360"}}),e._v(" "),i("el-table-column",{attrs:{prop:"rightAnswer",label:"正确",width:"120","filter-placement":"bottom-end"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tag",{attrs:{type:"是"===t.row.rightAnswer?"success":"danger",effect:"dark","disable-transitions":""}},[e._v(e._s(t.row.rightAnswer))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.itemEditAddVisible=!0}}},[e._v("增加")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(i){return e.showEditEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.editHandleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editSubmitForm("editForm")}}},[e._v("确定修改")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"添加答案",visible:e.itemEditAddVisible},on:{"update:visible":function(t){e.itemEditAddVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.itemEditAddForm,size:"big","label-width":"100px",rules:e.rules}},[i("el-row",[i("el-form-item",{attrs:{label:"题目数量："}},[i("el-input",{model:{value:e.itemEditAddForm.answer,callback:function(t){e.$set(e.itemEditAddForm,"answer",t)},expression:"itemEditAddForm.answer"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"是否正确"}},[i("el-radio-group",{model:{value:e.itemEditAddForm.rightAnswer,callback:function(t){e.$set(e.itemEditAddForm,"rightAnswer",t)},expression:"itemEditAddForm.rightAnswer"}},[i("el-radio",{attrs:{label:"是",value:"是"}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:"否",value:"否"}},[e._v("否")])],1)],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.itemEditAddVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.handleItemEditAdd}},[e._v("增加答案")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"添加具体配置项参数",visible:e.itemEditEditVisible},on:{"update:visible":function(t){e.itemEditEditVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.itemEditEditForm,size:"big","label-width":"100px",rules:e.rules}},[i("el-row",[i("el-form-item",{attrs:{label:"答案内容：",prop:"answer"}},[i("el-input",{model:{value:e.itemEditEditForm.answer,callback:function(t){e.$set(e.itemEditEditForm,"answer",t)},expression:"itemEditEditForm.answer"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"是否正确"}},[i("el-radio-group",{model:{value:e.itemEditEditForm.rightAnswer,callback:function(t){e.$set(e.itemEditEditForm,"rightAnswer",t)},expression:"itemEditEditForm.rightAnswer"}},[i("el-radio",{attrs:{label:"是",value:"是"}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:"否",value:"否"}},[e._v("否")])],1)],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.itemEditEditVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.handleEditEdit}},[e._v("保存答案修改")])],1)],1)],1)},staticRenderFns:[]};var r=i("VU/8")(o,s,!1,function(e){i("WsyX")},"data-v-7d263b30",null);t.default=r.exports}});
webpackJsonp([13],{"1SNW":function(e,t){},eD8g:function(e,t){},zcOu:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("Z0lD"),o={data:function(){return{tableData:[],multipleSelection:[],page:1,pageSize:5,name:"",code:null,offlineTime:null,onlineTime:null,count:0,dialogVisible:!1,ids:[],downList:[]}},methods:{getdata:function(){var e=this;this.$ajax.post("gateway/systemModule/doQueryCountUserOnlineInfoByPage",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{name:this.name,code:this.code,offlineTime:this.offlineTime,onlineTime:this.onlineTime,page:this.page,pageSize:this.pageSize}}}).then(function(t){e.count=t.data.body.data.count,e.tableData=t.data.body.data.userOnlineInfoList},function(){console.log("error")})},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e},handleSizeChange:function(e){this.pageSize=e,this.getdata()},handleCurrentChange:function(e){this.page=e,this.getdata()},queryDataByName:function(){this.page=1,this.getdata()},checkOfflineOne:function(e){this.ids=[],this.ids.push(e.id),this.dialogVisible=!0},forceOflineUser:function(){var e=this;this.dialogVisible=!1,this.$ajax.post("gateway/shiro/doForceUserOffline",{head:{version:"1",token:this.getCookie(),businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{ids:this.ids}}}).then(function(t){alert(t.data.head.message),"0"==t.data.head.responseCode&&e.getdata()},function(){alert("error"),console.log("error")})},checkOfflineSelect:function(){var e=this;if(0==this.multipleSelection.length)alert("请选择数据！");else{var t=0;this.ids=[],this.multipleSelection.forEach(function(n){null==n.offlineTime?e.ids.push(n.id):t=1}),0==t?this.dialogVisible=!0:alert("不能选择已下线的用户数据")}},reflashTree:function(){this.$emit("reflashTree")},formatDate:function(e,t){if(null!=e[t.property]){var n=e[t.property],i=new Date(n);return i.getFullYear()+"-"+(i.getMonth()+1)+"-"+i.getDate()+" "+i.getHours()+":"+i.getMinutes()+":"+i.getSeconds()}},exp:function(){var e=this;this.$confirm("确定下载列表文件?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.excelData=e.multipleSelection,e.export2Excel()}).catch(function(){})},export2Excel:function(){var e=this;n.e(46).then(function(){var t=n("TCVE").export_json_to_excel,i=e.excelData;t(["ID","工号","用户名","IP","上线时间","下线时间","状态"],e.formatJson(["id","code","name","ip","onlineTime","offlineTime","status"],i),"subject")}.bind(null,n)).catch(n.oe)},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})},httpRequest:function(e){var t=this,n=e.file;if(console.log("e: ",e),console.log("file: ",e.file),!n)return!1;if(!/\.(xls|xlsx)$/.test(n.name.toLowerCase()))return this.$message.error("上传格式不正确，请上传xls或者xlsx格式"),!1;var i=new FileReader;i.onload=function(e){try{var n=e.target.result,i=XLSX.read(n,{type:"binary"}),o=i.SheetNames[0],a=XLSX.utils.sheet_to_json(i.Sheets[o]);console.log(a),t.downList=a}catch(e){return console.log("出错了：："),!1}},i.readAsBinaryString(n)},expDownList:function(){var e=this;0==this.multipleSelection.length?alert("请选择数据"):(this.downList=this.multipleSelection,this.$confirm("确定导出选中数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.excelData=e.multipleSelection,e.export2Excel()}).catch(function(){}))},expDownOne:function(e){var t=this,n=[];n.push(e),this.$confirm("确定导出数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.excelData=n,t.export2Excel()}).catch(function(){})},getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var n=e[t].split("=");if("staffToken"==n[0])return n[1]}else alert("登录超时!"),this.$router.push({path:"/Login",name:"Login",params:{}})}},components:{},created:function(){this.getdata(),void 0!=this.getCookie()&&""!=this.getCookie()||(window.location.href="/login")}},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticStyle:{float:"left","margin-bottom":"20px"}},[n("div",{attrs:{id:"selector"}},[n("span",[e._v("工号:")]),e._v(" "),n("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入内容"},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}}),e._v(" "),n("span",[e._v("用户名:")]),e._v(" "),n("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入内容"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),n("span",[e._v("在线时间段:")]),e._v(" "),n("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.onlineTime,callback:function(t){e.onlineTime=t},expression:"onlineTime"}}),e._v(" "),n("span",[e._v("至")]),e._v(" "),n("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.offlineTime,callback:function(t){e.offlineTime=t},expression:"offlineTime"}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.queryDataByName()}}},[e._v("搜索")])],1),e._v(" "),n("div",{staticStyle:{float:"left"}},[n("el-button-group",[n("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-upload2"},on:{click:function(t){return e.expDownList()}}},[n("a",{attrs:{id:"export"}},[n("font",{attrs:{color:"white"}},[e._v("导出")])],1)]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-warning-outline"},on:{click:e.checkOfflineSelect}},[e._v("强制下线")]),e._v("  \n                   \n                   \n                \n                    \n        ")],1)],1)]),e._v(" "),n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{label:"工号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.code))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"name",label:"用户",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{prop:"ip",label:"IP",width:"150"}}),e._v(" "),n("el-table-column",{attrs:{prop:"onlineTime",label:"上线时间",formatter:e.formatDate,width:"200"}}),e._v(" "),n("el-table-column",{attrs:{prop:"offlineTime",label:"下线时间",formatter:e.formatDate,width:"200"}}),e._v(" "),n("el-table-column",{attrs:{prop:"status",label:"状态",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?n("span",[e._v("在线")]):0==t.row.status?n("span",[e._v("离线")]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button-group",[n("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-upload2"},on:{click:function(n){return e.expDownOne(t.row)}}},[n("a",{attrs:{id:"export"}},[n("font",{attrs:{color:"white"}},[e._v("导出")])],1)]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-warning-outline",disabled:null!=t.row.offlineTime},on:{click:function(n){return e.checkOfflineOne(t.row)}}},[e._v("强制下线")])],1)]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("span",[e._v("确认强制下线？")]),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.forceOflineUser}},[e._v("确 定")])],1)]),e._v(" "),n("div",{staticClass:"page",staticStyle:{"margin-top":"50px"}},[n("el-pagination",{attrs:{"current-page":e.currentPage4,"page-sizes":[5,6,7,8],"page-size":5,layout:"total, sizes, prev, pager, next, jumper",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var l=n("VU/8")(o,a,!1,function(e){n("1SNW")},"data-v-287d8f96",null).exports,r={data:function(){return{}},components:{card:i.a,stable:l},methods:{},created:function(){}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"all"}},[n("div",{attrs:{id:"left"}}),e._v(" "),n("div",{attrs:{id:"right"}},[n("stable",{on:{reflashTree:function(t){return e.getdataTree()}}})],1)])},staticRenderFns:[]};var c=n("VU/8")(r,s,!1,function(e){n("eD8g")},"data-v-67c15b5a",null);t.default=c.exports}});
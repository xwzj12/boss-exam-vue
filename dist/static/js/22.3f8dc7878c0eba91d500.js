webpackJsonp([22],{q7xC:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),l=a.n(n),o=a("exGp"),r=a.n(o),i={components:{},created:function(){console.log(this.$store.getters.getqueryPublishId),this.getData()},data:function(){return{examPublishRecordId:"",multipleSelection:[],tableData:[{}],currentPage1:5,currentPage2:5,currentPage3:5,currentPage4:4,pageSize:5,pageIndex:1,total:5}},methods:{getData:function(){var e=this;return r()(l.a.mark(function t(){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.tableData=[],t.next=3,e.$http.post("/gateway/exam/queryExamRecord/queryRecordByCondition",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{currentPage:e.pageIndex,size:e.pageSize,examPublishRecordId:e.$store.getters.getqueryPublishId}}});case 3:(a=t.sent)&&(e.tableData=[],e.tableData=a.body.data.list);case 5:case"end":return t.stop()}},t,e)}))()},handleDownload:function(){var e=this;0==this.multipleSelection.length?alert("请勾选要导出的数据"):(this.downloadLoading=!0,a.e(48).then(a.bind(null,"UFsA")).then(function(t){var a;a=e.multipleSelection,console.log("导出的报表详情"),console.log(a);var n=e.formatJson(["code","examiner","sex","title","subjectvieSubjectScore","objectiveSubjectScore","score","rank","time","systemEvaluate"],a);t.export_json_to_excel({header:["序号","姓名","性别","考试名","主观题得分","客观题得分","总分","排名","考试耗时","能力标签"],data:n,filename:"报表详情"}),e.downloadLoading=!1}))},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})},filterTag:function(e,t){return t.status===e},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.pageSize=e,this.reflashAll()},handleCurrentChange:function(e){console.log("当前页: "+e),this.pageIndex=e,this.reflashAll()},handleSelectionChange:function(e){this.multipleSelection=e},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-container",{staticStyle:{height:"700px",border:"1px solid #eee"}},[a("el-main",[a("el-button",{attrs:{type:"primary"},on:{click:e.getData}},[e._v("刷新")]),e._v(" "),a("div",{attrs:{id:"icon"}},[e._v("\n                   \n           \n        "),a("font",{attrs:{color:"#F56C6C"}},[a("el-button",{attrs:{loading:e.downloadLoading,type:"danger",size:"small",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v("导出报表详情")])],1)],1),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{stripe:"",data:e.tableData,border:"","tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"code",label:"序号",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"examiner",label:"名字",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sex",label:"性别",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"考试名",width:"300"}}),e._v(" "),a("el-table-column",{attrs:{prop:"subjectvieSubjectScore",label:"主观题得分",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"objectiveSubjectScore",label:"客观题得分",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"score",label:"总分",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"rank",label:"排名",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"time",label:"考试耗时",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"systemEvaluate",label:"能力标签",width:"400"}})],1),e._v(" "),a("div",{staticClass:"page"},[a("el-pagination",{attrs:{"current-page":0,"page-sizes":[5,10,20,40,80],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(i,s,!1,function(e){a("x5wr")},null,null);t.default=c.exports},x5wr:function(e,t){}});
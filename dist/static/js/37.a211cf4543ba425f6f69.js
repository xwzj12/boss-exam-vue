webpackJsonp([37],{"/mF+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),o=a("exGp"),i=a.n(o),s=a("zL8q"),u={components:{},mounted:function(){this.queryAll()},data:function(){return{currentPage:1,pageSize:1,total:0,publisher:"",title:"",publishTime:"",examTime:"",tableData:[],formLabelWidth:"120px",multipleSelection:[]}},methods:{queryAll:function(){this.queryTotal(),this.queryExamRecord()},queryExamRecord:function(){var e=this;return i()(n.a.mark(function t(){var a,r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=s.Loading.service(),t.next=3,e.$http.post("/gateway/exam/queryExamRecord/queryRecordByCondition",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{currentPage:e.currentPage,size:e.pageSize,publisher:e.$store.getters.getqueryPublishId}}});case 3:(r=t.sent)&&(e.tableData=r.body.data.list,e.total=r.body.data.total,e.examTime="",e.publishTime=""),a.close();case 6:case"end":return t.stop()}},t,e)}))()},queryTotal:function(){var e=this;return i()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post("/gateway/exam/queryExamRecord/queryRecordByCondition",{head:{version:"1",token:e.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{currentPage:e.currentPage,size:e.pageSize,publisher:e.$store.getters.getqueryPublishId}}});case 2:(a=t.sent)&&(e.total=a.body.data.total);case 4:case"end":return t.stop()}},t,e)}))()},ShowRecord:function(e){this.$store.commit("setExamData",e),this.$router.push({path:"/QueryExam"})},handleSizeChange:function(e){var t=this;return i()(n.a.mark(function a(){var r;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.pageSize=e,a.next=3,t.$http.post("/gateway/exam/queryExamRecord/queryRecordByCondition",{head:{version:"1",token:t.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{currentPage:t.currentPage,size:t.pageSize,publisher:t.$store.getters.getqueryPublishId}}});case 3:(r=a.sent)&&(t.tableData=r.body.data.list);case 5:case"end":return a.stop()}},a,t)}))()},handleCurrentChange:function(e){var t=this;return i()(n.a.mark(function a(){var r;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.currentPage=e,a.next=3,t.$http.post("/gateway/exam/queryExamRecord/queryRecordByCondition",{head:{version:"1",token:t.$store.getters.getToken,businessType:"12",equipId:"1",equipType:1,encrypt:1},body:{data:{currentPage:t.currentPage,size:t.pageSize,publisher:t.$store.getters.getqueryPublishId}}});case 3:(r=a.sent)&&(t.tableData=r.body.data.list);case 5:case"end":return a.stop()}},a,t)}))()},getRowKey:function(e){return e.id}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"exam-body"},[a("div",{staticClass:"function-bar"},[a("div",[a("el-table",{key:e.examPublishRecordId,ref:"multipleTable",attrs:{data:e.tableData,"highlight-current-row":"","row-key":"getRowKey"},on:{"row-click":e.clickRow,"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{label:"序号",type:"index"}}),e._v(" "),a("el-table-column",{attrs:{label:"场次",prop:"examid"}}),e._v(" "),a("el-table-column",{attrs:{label:"考试名称",prop:"title"}}),e._v(" "),a("el-table-column",{attrs:{label:"截止时间",prop:"markingStopTime"}}),e._v(" "),a("el-table-column",{attrs:{label:"考试人员",prop:"examiner"}}),e._v(" "),a("el-table-column",{attrs:{label:"手机号",prop:"tel"}}),e._v(" "),a("el-table-column",{staticStyle:{width:"50"},attrs:{label:"开始时间",prop:"actualStartTime"}}),e._v(" "),a("el-table-column",{staticStyle:{width:"50"},attrs:{prop:"actualEndTime",label:"交卷时间"}}),e._v(" "),a("el-table-column",{attrs:{label:"客观题得分",prop:"objectiveSubjectScore"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"750"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.ShowRecord(t.row)}}},[e._v("\n              查看答卷详情")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"page"},[a("el-pagination",{attrs:{"current-page":this.currentPage,"page-sizes":[1,2,3,4,5],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[]};var c=a("VU/8")(u,l,!1,function(e){a("Uq+2")},"data-v-28e374e6",null);t.default=c.exports},"Uq+2":function(e,t){}});
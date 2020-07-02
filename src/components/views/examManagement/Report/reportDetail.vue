<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-main>
        <el-button type="primary" @click="getData">刷新</el-button>
        <div id="icon">
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;
          <font color="#F56C6C">
            <el-button
              :loading="downloadLoading"
              type="danger"
              size="small"
              icon="el-icon-download"
              @click="handleDownload"
              >导出报表详情</el-button
            >
          </font>
        </div>
        <el-table
          ref="multipleTable"
          stripe
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="code"
            label="序号"
            type="index"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="examiner"
            label="名字"
            width="200"
          ></el-table-column>
          <el-table-column label="性别" width="100">
            <template slot-scope="scope">
              {{ scope.row.sex == 1 ? "女" : "男" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="考试名"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="subjectiveSubjectScore"
            label="主观题得分"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="objectiveSubjectScore"
            label="客观题得分"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="score"
            label="总分"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="rank"
            type="index"
            label="排名"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="useTime"
            label="考试耗时(分钟)"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="systemEvaluate"
            label="能力标签"
            width="400"
          ></el-table-column>
          <el-table-column
            prop="peopleEvaluate"
            label="考官评价"
            width="400"
          ></el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="0"
            :page-sizes="[5, 10, 20, 40, 80]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  created() {
    console.log(this.$store.getters.getqueryPublishId);
    this.reflashAll();
  },
  data() {
    return {
      //考试发布记录ID
      examPublishRecordId: "",
      //表格的多选框
      multipleSelection: [],
      tableData: [{}],

      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      pageSize: 20,
      pageIndex: 1,
      total: ""
    };
  },

  methods: {
    reflashAll() {
      this.getData();
      this.getTotal();
    },
    //分页查询
    async getData() {
      this.tableData = [];
      let data = await this.$http.post(
        "/gateway/exam/queryExamRecord/queryRecordByCondition",
        {
          head: {
            version: "1",
            token: this.$store.getters.getToken,
            businessType: "12",
            equipId: "1",
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              currentPage: this.pageIndex,
              size: this.pageSize,
              examPublishId: this.$store.getters.getqueryPublishId
            }
          }
        }
      );
      if (data) {
        this.tableData = [];
        this.tableData = data.body.data.list;
      }
    },
    async getTotal() {
      this.tableData = [];
      let data = await this.$http.post(
        "/gateway/exam/queryExamRecord/queryRecordByCondition",
        {
          head: {
            version: "1",
            token: this.$store.getters.getToken,
            businessType: "12",
            equipId: "1",
            equipType: 1,
            encrypt: 1
          },
          body: {
            data: {
              currentPage: this.pageIndex,
              size: this.pageSize,
              examPublishId: this.$store.getters.getqueryPublishId
            }
          }
        }
      );
      if (data) {
        this.total = data.body.data.total;
      }
    },
    // 导出表格数据
    handleDownload() {
      if (this.multipleSelection.length == 0) {
        alert("请勾选要导出的数据");
      } else {
        this.downloadLoading = true;
        import("@/components/views/examManagement/excel/Export2Excel").then(excel => {
          const tHeader = [
            "序号",
            "姓名",
            "性别",
            "考试名",
            "主观题得分",
            "客观题得分",
            "总分",
            "排名",
            "考试耗时",
            "能力标签"
          ];

          const filterVal = [
            "code",
            "examiner",
            "sex",
            "title",
            "subjectvieSubjectScore",
            "objectiveSubjectScore",
            "score",
            "rank",
            "time",
            "systemEvaluate"
          ];
          let subjectList = [];
          subjectList = this.multipleSelection;
          console.log("导出的报表详情");
          console.log(subjectList);
          const data = this.formatJson(filterVal, subjectList);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "报表详情"
          });
          this.downloadLoading = false;
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(i => {
          return v[i];
        })
      );
    },
    //标签处理 过滤
    filterTag(value, row) {
      return row.status === value;
    },

    //分页 改变pagesize
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.reflashAll();
    },
    //分页 改变pageIndex
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.reflashAll();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //多选框全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
#icon {
  margin-bottom: 20px;
  float: left;
}
</style>

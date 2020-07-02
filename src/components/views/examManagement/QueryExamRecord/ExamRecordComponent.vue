<template>
  <div class="exam-body">
    <div class="function-bar">
      <div>
        <el-table
          :data="tableData"
          ref="multipleTable"
          highlight-current-row
          @row-click="clickRow"
          @selection-change="handleSelectionChange"
          :key="examPublishRecordId"
          row-key="getRowKey"
        >
          <el-table-column label="序号" type="index"> </el-table-column>
          <el-table-column label="场次" prop="examid"> </el-table-column>
          <el-table-column label="考试名称" prop="title"></el-table-column>
          <el-table-column label="截止时间" prop="markingStopTime">
          </el-table-column>
          <el-table-column label="考试人员" prop="examiner"> </el-table-column>
          <el-table-column label="手机号" prop="tel"> </el-table-column>
          <el-table-column
            label="开始时间"
            prop="actualStartTime"
            style="width:50;"
          ></el-table-column>
          <el-table-column
            prop="actualEndTime"
            label="交卷时间"
            style="width:50;"
          ></el-table-column>
          <el-table-column
            label="客观题得分"
            prop="objectiveSubjectScore"
          ></el-table-column>
          <el-table-column label="操作" width="750">
            <template slot-scope="scope">
              <el-button size="mini" @click="ShowRecord(scope.row)">
                查看答卷详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.currentPage"
          :page-sizes="[1, 2, 3, 4, 5]"
          :page-size="this.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
        >
        </el-pagination>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  components: {},
  mounted() {
    this.queryAll();
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 1,
      total: 0,
      publisher: "",
      title: "",
      publishTime: "",
      examTime: "",
      tableData: [],
      formLabelWidth: "120px",
      multipleSelection: []
    };
  },
  methods: {
    queryAll() {
      this.queryTotal();
      this.queryExamRecord();
    },
    async queryExamRecord() {
      let loadingInstance = Loading.service();
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
              currentPage: this.currentPage,
              size: this.pageSize,
              examPublishId: this.$store.getters.getqueryPublishId
            }
          }
        }
      );
      if (data) {
        this.tableData = data.body.data.list;
        this.examTime = "";
        this.publishTime = "";
      }
      loadingInstance.close();
    },
    async queryTotal() {
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
              examPublishId: this.$store.getters.getqueryPublishId
            }
          }
        }
      );
      if (data) {
        this.total = data.body.data.total;
      }
    },
    ShowRecord(row) {
      this.$store.commit("setExamData", row);
      this.$router.push({ path: "/QueryExam" });
    },
    async handleSizeChange(val) {
      this.pageSize = val;
      this.queryAll()
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
      this.queryAll()
    },
    //分页 改变pageIndex
    getRowKey(row) {
      return row.id;
    }
  }
};
</script>

<style scoped>
.exam-body {
  width: 100%;
  min-height: 700px;
  padding-top: 0;
  margin: 0;
  margin-bottom: 20px;
  font-family: 微软雅黑, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.function-bar {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
}
.date-picker {
  margin-left: 10px;
  margin-right: 10px;
  width: 200px;
}
.bar-search-item-input {
  float: left;
  width: 200px;
  margin-right: 10px;
  font-size: 1px;
}
.p-font {
  font-size: 1px;
  line-height: 100%;
}
.bar-search-item-select {
  float: left;
  width: 200px;
  margin-right: 20px;
}
.button {
  width: 100%;
  float: left;
}
.table {
  font-size: 1px;
}
.bar-search-item {
  float: left;
  margin-right: 20px;
  height: 30px;
}
.search-button {
  float: left;
}
</style>

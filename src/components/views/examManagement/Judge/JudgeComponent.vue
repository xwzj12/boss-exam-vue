<template>
  <div class="exam-body">
    <div class="function-bar">
      <el-input
        v-model="examSessions"
        class="bar-search-item-input"
        size="mini"
        placeholder="请输入场次号"
      >
        <template slot="prepend">场次号</template></el-input
      >
      <p class="p-font">交卷时间</p>
      <el-date-picker
        class="date-picker"
        v-model="publishTime"
        size="mini"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <p class="p-font">是否批阅:</p>
      <el-select v-model="value" placeholder="请选择" size="mini">
        <el-option
          v-for="item of Markingstatus"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-button
        size="mini"
        class="bar-search-item"
        type="primary"
        icon="el-icon-search"
        @click="queryAll()"
        >筛选</el-button
      >
    </div>
    <el-table
      :data="tableData"
      ref="multipleTable"
      highlight-current-row
      @selection-change="handleSelectionChange"
      @row-dblclick="ShowPaper"
      v-loading="loading"
      :key="examPublishRecordId"
      row-key="getRowKey"
    >
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column label="场次" prop="examSessions"> </el-table-column>
      <el-table-column label="考试名称" prop="title"></el-table-column>
      <el-table-column label="截止时间" prop="markingStopTime">
      </el-table-column>
      <el-table-column label="考试人员" prop="examiner"> </el-table-column>
      <el-table-column label="手机号" prop="tel"> </el-table-column>
      <el-table-column
        label="实际开始时间"
        prop="actualStartTime"
        style="width:50;"
      ></el-table-column>
      <el-table-column
        prop="actualEndTime"
        label="实际结束时间"
        style="width:50;"
      ></el-table-column>
      <el-table-column
        label="客观题得分"
        prop="objectiveSubjectScore"
      ></el-table-column>
      <el-table-column label="发布状态">
        <template slot-scope="scope">
          {{ scope.row.status == 0 ? "已批阅" : "未批阅" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="750">
        <template slot-scope="scope">
          <el-button size="mini" @click="ShowPaper(scope.row)">
            查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
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
      examSessions: "",
      tableData: [
        {
          examid: "",
          examPublishRecordId: "",
          examinerCode: "",
          title: "",
          examSessions: "",
          markingStopTime: "",
          examiner: "",
          tel: "",
          actualStartTime: "",
          actualEndTime: "",
          objectiveSubjectScore: ""
        }
      ],
      Markingstatus: [
        {
          id: 0,
          name: "已批阅"
        },
        {
          id: 1,
          name: "未批阅"
        }
      ],
      formLabelWidth: "120px",
      multipleSelection: [],
      value: 1
    };
  },
  methods: {
    queryAll() {
      this.queryExamRecord();
      this.queryTotal();
    },
    async queryExamRecord() {
      let loadingInstance = Loading.service();
      let data = await this.$http.post(
        "/gateway/exam/evaluate/doQueryExamRecordForJudge",
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
              examSessions: this.examSessions,
              actualStartTime: this.publishTime[0],
              actualEndTime: this.publishTime[1],
              status: this.value
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
      let loadingInstance = Loading.service();
      let data = await this.$http.post(
        "/gateway/exam/evaluate/doQueryExamRecordForJudge",
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
              currentPage: "",
              size: "",
              examSessions: this.examSessions,
              actualStartTime: this.publishTime[0],
              actualEndTime: this.publishTime[1],
              status: this.value
            }
          }
        }
      );
      if (data) {
        this.total = data.body.data.total;
        this.examTime = "";
        this.publishTime = "";
      }
      loadingInstance.close();
    },
    async handleSizeChange(val) {
      this.pageSize = val;
      this.queryAll();
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
      this.queryAll();
    },
    ShowPaper(row) {
      this.$store.commit("setExamData", row);
      this.$router.push({ path: "/JudgePaper" });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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

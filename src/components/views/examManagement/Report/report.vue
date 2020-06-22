<template>
  <div class="exam-body">
    <h1>查询符合条件的考试记录，点击详情即可查看每一场的考生记录</h1>
    <div class="function-bar">
      <el-input
        v-model="publisher"
        class="bar-search-item-input"
        size="mini"
        placeholder="请输入试卷发布人"
      >
        <template slot="prepend">试卷发布人</template>
      </el-input>
      <el-input
        v-model="examSessions"
        class="bar-search-item-input"
        size="mini"
        placeholder="请输入场次号"
      >
        <template slot="prepend">场次号</template>
      </el-input>
      <el-input
        v-model="title"
        class="bar-search-item-input"
        size="mini"
        placeholder="请输入考试标题"
      >
        <template slot="prepend">考试标题</template></el-input
      >
      <p class="p-font">试卷发布时间:</p>
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
      <p class="p-font">考试时间:</p>
      <el-date-picker
        class="date-picker"
        v-model="examTime"
        size="mini"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
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
      :key="examPublishRecordId"
    >
      <el-table-column
        type="selection"
        reserve-selection="true"
        width="55"
      ></el-table-column>
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column
        label="试卷发布人"
        prop="publisherName"
      ></el-table-column>
      <el-table-column label="发布时间" prop="updatedTime"> </el-table-column>
      <el-table-column label="考试开始时间" prop="startTime"> </el-table-column>
      <el-table-column
        prop="examSessions"
        label="场次号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="planPeopleNum"
        label="计划人数"
        style="width:50;"
      ></el-table-column>
      <el-table-column
        prop="totalPeople"
        label="实际人数"
        style="width:50;"
      ></el-table-column>
      <el-table-column prop="endTime" label="考试结束时间"> </el-table-column>
      <el-table-column prop="markingStopTime" label="阅卷截止时间">
      </el-table-column>
      <el-table-column label="考试说明" prop="descript"></el-table-column>
      <el-table-column label="考试状态">
        <template slot-scope="scope">
          {{ scope.row.status == 1 ? "已结束" : "未结束" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="750">
        <template slot-scope="scope">
          <el-button size="mini" @click="detailClick(scope.row)">
            查看考试记录</el-button
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
</template>
<script>
import { Loading } from "element-ui";
export default {
  mounted() {
    this.queryAll();
  },
  data() {
    return {
      eid: 0,
      text: "",
      currentPage: 1,
      pageSize: 1,
      total: 0,
      publisher: "",
      title: "",
      publishTime: "",
      examTime: "",
      examSessions: "",
      tableData: []
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
        "/gateway/exam/publish/doQueryPublishForPaperAndReport",
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
              publisher: this.publisher,
              title: this.title,
              publishStartTime: this.publishTime[0],
              publishEndTime: this.publishTime[1],
              examStartTime: this.examTime[0],
              examEndTime: this.examTime[1],
              examSessions: this.examSessions
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
        "/gateway/exam/publish/doQueryPublishForPaperAndReport",
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
              publisher: this.publisher,
              title: this.title,
              publishStartTime: this.publishTime[0],
              publishEndTime: this.publishTime[1],
              examStartTime: this.examTime[0],
              examEndTime: this.examTime[1],
              examSessions: this.examSessions
            }
          }
        }
      );
      if (data) {
        this.total = data.body.data.total;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页 改变pagesize
    async handleSizeChange(val) {
      this.pageSize = val;
      this.queryExamRecord();
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
      this.queryExamRecord();
    },
    //分页 改变pageIndex
    getRowKey(row) {
      return row.id;
    },
    //点击查看详情
    detailClick(row) {
      this.$store.commit("setqueryPublishId", row.examPublishRecordId);
      console.log(row.examPublishRecordId);
      console.log(this.$store.getters.getqueryPublishId);
      this.$router.push({ path: "/reportDetail" });
    },

    //标签处理 过滤
    filterTag(value, row) {
      return row.status === value;
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

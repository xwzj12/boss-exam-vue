<template>
  <div class="exam-body">
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

    <div class="button">
      <el-button size="mini" @click="dialogFormVisible = true"
        >添加发布</el-button
      >
      <el-button size="mini" @click="confirmBatchRemove()">批量删除</el-button>
    </div>
    <el-table
      :data="tableData"
      ref="multipleTable"
      highlight-current-row
      @selection-change="handleSelectionChange"
      @row-dblclick="updateId"
      :key="examPublishRecordId"
    >
      <el-table-column
        type="selection"
        reserve-selection="true"
        width="55"
      ></el-table-column>
      <el-table-column
        prop="examPublishRecordId"
        label="发布记录 ID"
        width="120"
      ></el-table-column>
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column
        label="试卷发布人"
        prop="publisherName"
      ></el-table-column>
      <el-table-column label="发布时间" prop="updatedTime"> </el-table-column>
      <el-table-column label="考试开始时间" prop="startTime"> </el-table-column>
      <el-table-column prop="endTime" label="考试结束时间"> </el-table-column>
      <el-table-column prop="markingStopTime" label="阅卷截止时间">
      </el-table-column>
      <el-table-column
        prop="planPeopleNum"
        label="计划人数"
        style="width:50;"
      ></el-table-column>
      <el-table-column
        prop="limitTime"
        label="考试时长"
        style="width:50;"
      ></el-table-column>
      <el-table-column label="考试说明" prop="descript"></el-table-column>
      <el-table-column label="发布状态">
        <template slot-scope="scope">
          {{ scope.row.status == 1 ? "发布中" : "未发布" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="750">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="ShowJudge(scope.row.examPublishRecordId)"
          >
            查看阅卷官</el-button
          >
          <el-button
            size="mini"
            :disabled="scope.row.status == 1 ? false : true"
            @click="showQcode(scope.row.examPublishRecordId)"
          >
            查看二维码</el-button
          >
          <el-button
            size="mini"
            :disabled="scope.row.status == 0 ? false : true"
            @click="
              updateStatus(scope.row.examPublishRecordId, scope.row.status)
            "
          >
            发布考试</el-button
          >
          <el-button
            size="mini"
            :disabled="scope.row.status == 1 ? false : true"
            @click="
              updateStatus(scope.row.examPublishRecordId, scope.row.status)
            "
          >
            停止考试</el-button
          >
          <el-button size="mini" @click="confirmStopTime(scope.row)">
            停止阅卷</el-button
          >
          <el-button size="mini" @click="updateId(scope.row)"> 修改</el-button>
          <el-button
            size="mini"
            slot="reference"
            @click="
              confirmRemove(scope.row.examPublishRecordId, scope.row.status)
            "
            >删除</el-button
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
    <el-dialog
      title="新发布记录"
      :visible.sync="dialogFormVisible"
      :before-close="closeExpertFormDialog"
    >
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item
          label="试卷名称"
          :label-width="formLabelWidth"
          prop="paperId"
        >
          <el-select v-model="addForm.paperId" placeholder="请选择">
            <el-option
              v-for="item in papers"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="考试标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="addForm.title" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item
          label="阅卷方式"
          :label-width="formLabelWidth"
          prop="markingMode"
        >
          <el-select v-model="addForm.mode" placeholder="请选择">
            <el-option
              v-for="item in mode"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阅卷官" :label-width="formLabelWidth" prop="judge">
          <el-select
            v-model="addForm.judge"
            multiple
            placeholder="请选择"
            value-key="judgeid"
          >
            <el-option
              v-for="item in this.judge"
              :key="item.judgeid"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="考试时间"
          :label-width="formLabelWidth"
          prop="startTime"
        >
          <el-date-picker
            v-model="addForm.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择考试开始时间"
            @change="changeStopTime"
            :picker-options="startTimeOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="考试结束时间"
          :label-width="formLabelWidth"
          prop="endTime"
        >
          <el-date-picker
            v-model="addForm.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="changeMarkingMode"
            :picker-options="endTimeOptions"
            placeholder="选择考试结束时间"
          ></el-date-picker
        ></el-form-item>
        <el-form-item
          label="计划参与人数"
          :label-width="formLabelWidth"
          prop="planPepoleNum"
        >
          <el-input-number
            :min="0"
            v-model="addForm.planPeopleNum"
          ></el-input-number
        ></el-form-item>
        <el-form-item
          label="考试时长"
          :label-width="formLabelWidth"
          prop="limitTime"
        >
          <el-input-number
            v-model="addForm.limitTime"
            :min="1"
          ></el-input-number
        ></el-form-item>
        <el-form-item
          label="阅卷截止时间"
          :label-width="formLabelWidth"
          prop="markingStopTime"
        >
          <el-date-picker
            v-model="addForm.markingStopTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择阅卷截止时间"
            :picker-options="endOptions"
          ></el-date-picker
        ></el-form-item>
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
          prop="descript"
        >
          <el-input v-model="addForm.descript" type="textarea"></el-input
        ></el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeAdd()">取 消</el-button>
        <el-button type="primary" @click="submitForm(addForm)">确 定</el-button>
      </div></el-dialog
    >
    <el-dialog
      title="修改考试"
      :visible.sync="dialogFormVisible2"
      :before-close="closeExpertFormDialog2"
    >
      <el-form :model="updateForm" :rules="rules" ref="updateForm">
        <el-form-item
          label="试卷名称"
          :label-width="formLabelWidth"
          prop="paperId"
        >
          <el-select v-model="updateForm.paperId" placeholder="请选择">
            <el-option
              v-for="item in papers"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button @click="updatePaper()">修改试卷</el-button>
        </el-form-item>
        <el-form-item
          label="考试标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="updateForm.title" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item
          label="阅卷方式"
          :label-width="formLabelWidth"
          prop="markingMode"
        >
          <el-select v-model="updateForm.mode" placeholder="请选择">
            <el-option
              v-for="item in mode"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阅卷官" :label-width="formLabelWidth" prop="judge">
          <el-select
            v-model="updateForm.judge"
            multiple
            placeholder="请选择"
            id="updateJudge"
            value-key="judgeid"
          >
            <el-option
              v-for="item in judge"
              :key="item.judgeid"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="考试开始时间"
          :label-width="formLabelWidth"
          prop="startTime"
        >
          <el-date-picker
            v-model="updateForm.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择考试开始时间"
            :picker-options="UpdatestartTimeOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="考试结束时间"
          :label-width="formLabelWidth"
          prop="endTime"
        >
          <el-date-picker
            v-model="updateForm.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择考试结束时间"
            :picker-options="UpdateendTimeOptions"
          ></el-date-picker
        ></el-form-item>
        <el-form-item
          label="计划参与人数"
          :label-width="formLabelWidth"
          prop="planPeopleNum"
        >
          <el-input-number
            :min="0"
            v-model="updateForm.planPeopleNum"
          ></el-input-number
        ></el-form-item>
        <el-form-item
          label="考试时长"
          :label-width="formLabelWidth"
          prop="limitTime"
        >
          <el-input-number
            :min="1"
            v-model="updateForm.limitTime"
          ></el-input-number
        ></el-form-item>
        <el-form-item
          label="阅卷截止时间"
          :label-width="formLabelWidth"
          prop="markingStopTime"
        >
          <el-date-picker
            v-model="updateForm.markingStopTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择阅卷截止时间"
            :picker-options="UpdateendOptions"
          ></el-date-picker
        ></el-form-item>
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
          prop="descript"
        >
          <el-input v-model="updateForm.descript" type="textarea"></el-input
        ></el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeAdd2()">取 消</el-button>
        <el-button type="primary" @click="submitForm2(updateForm)"
          >确 定</el-button
        >
      </div></el-dialog
    >
    <el-dialog
      title="考官信息"
      :visible.sync="dialogFormVisible1"
      v-loading="loading"
    >
      <el-table :data="judgetable">
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column label="考官号" prop="judgeid"> </el-table-column>
        <el-table-column label="考官名" prop="name"> </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      title="考试二维码"
      :visible.sync="dialogFormVisible3"
      @close="closeCode"
    >
      <div id="qrcode" ref="qrcode"></div>
    </el-dialog>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import { Loading } from "element-ui";
import moment from "moment";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { QRCode },
  mounted() {
    this.queryAll();
    this.getPaper();
    this.getJudge();
  },
  data() {
    return {
      eid: 0,
      text: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      publisher: "",
      title: "",
      publishTime: "",
      examTime: "",
      qrcodeUrl: "",
      judgetable: [{}],
      tableData: [],
      judge: [],
      papers: [],
      mode: [
        {
          id: "1",
          name: "随机阅卷"
        },
        {
          id: "2",
          name: "平均阅卷"
        }
      ],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      loading: false,
      visible: false,
      addForm: {
        paperId: "",
        title: "",
        startTime: "",
        endTime: moment()
          .add(7, "days")
          .format("YYYY-MM-DD HH:mm:ss"),
        planPeopleNum: "",
        limitTime: "",
        judge: [],
        mode: "2",
        markingStopTime: moment()
          .add(14, "days")
          .format("YYYY-MM-DD HH:mm:ss"),
        descript: ""
      },
      updateForm: {
        paperId: "",
        title: "",
        startTime: "",
        endTime: "",
        planPeopleNum: "",
        limitTime: "",
        judge: [],
        mode: "",
        markingStopTime: "",
        descript: ""
      },
      startTimeOptions: {
        disabledDate: time => {
          //还没有选择结束时间的时候，让他只能选择今天之后的时间包括今天
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      endTimeOptions: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      endOptions: {
        disabledDate: time => {
          //还没有选择开始时间的时候，让他只能选择今天之后的时间包括今天
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      UpdatestartTimeOptions: {
        disabledDate: time => {
          //还没有选择结束时间的时候，让他只能选择今天之后的时间包括今天
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      UpdateendTimeOptions: {
        disabledDate: time => {
          //还没有选择开始时间的时候，让他只能选择今天之后的时间包括今天
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      UpdateendOptions: {
        disabledDate: time => {
          //还没有选择开始时间的时候，让他只能选择今天之后的时间包括今天
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      rules: {
        paperId: [
          { required: true, message: "请选择试卷！", trigger: "change" }
        ],
        title: [{ required: true, message: "请输入标题！", trigger: "change" }],

        limitTime: [
          {
            required: true,
            message: "请选择考试时长！",
            trigger: "change"
          }
        ],
        judge: [{ required: true, message: "请选择评卷管", trigger: "change" }],
        endTime: [
          { required: true, message: "请选择截止时间", trigger: "change" }
        ],
        markingStopTime: [
          { required: true, message: "请选择阅卷截止时间", trigger: "change" }
        ]
      },
      formLabelWidth: "120px",
      multipleSelection: []
    };
  },
  methods: {
    changeStopTime() {
      if (this.addForm.startTime != "" && this.addForm.startTime != null) {
        this.$set(
          (this.addForm.endTime = moment(this.addForm.startTime)
            .add(7, "days")
            .format("YYYY-MM-DD HH:mm:ss"))(
            (this.addForm.markingStopTime = moment(this.addForm.startTime)
              .add(14, "days")
              .format("YYYY-MM-DD HH:mm:ss"))
          )
        );
      } else {
        this.addForm.endTime = moment()
          .add(7, "days")
          .format("YYYY-MM-DD HH:mm:ss");
      }
      this.addForm.markingStopTime = moment()
        .add(14, "days")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    changeMarkingMode() {
      if (this.addForm.endTime != "" && this.addForm.endTime != null) {
        this.$set(
          (this.addForm.markingStopTime = moment(this.addForm.endTime)
            .add(7, "days")
            .format("YYYY-MM-DD HH:mm:ss"))
        );
      } else {
        this.addForm.markingStopTime = moment(this.addForm.endTime)
          .add(7, "days")
          .format("YYYY-MM-DD HH:mm:ss");
      }
    },
    //需要修改
    async updateId(row) {
      console.log(row);
      this.eid = row.examPublishRecordId;
      this.updateForm.paperId = row.paperId;
      this.updateForm.title = row.title;
      this.updateForm.startTime = row.startTime;
      this.updateForm.endTime = row.endTime;
      this.updateForm.limitTime = row.limitTime;
      this.updateForm.planPeopleNum = row.planPeopleNum;
      this.updateForm.markingStopTime = row.markingStopTime;
      this.updateForm.judge = [];
      let data = await this.$http.post("/gateway/exam/publish/queryJudgeId", {
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
            examPublishRecordId: row.examPublishRecordId
          }
        }
      });
      if (data) {
        data = data.body.data.judgeVos;
        console.log(data);
        this.judge.forEach(item => {
          for (let i of data) {
            if (i.judgeid === item.judgeid) {
              this.updateForm.judge.push(item);
            }
          }
        });
        console.log(this.updateForm.judge);
      }
      this.updateForm.mode = row.markingMode;

      if (row.status === 1) {
        this.$message.success("该记录正在发布中，请停用后进行修改！");
      } else {
        this.dialogFormVisible2 = true;
      }
    },
    queryAll() {
      this.queryPublish();
      this.queryTotal();
    },
    async queryPublish() {
      let loadingInstance = Loading.service();
      let data = await this.$http.post("/gateway/exam/publish/doQueryList", {
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
            examEndTime: this.examTime[1]
          }
        }
      });
      if (data) {
        loadingInstance.close();
        this.tableData = data.body.data.list;
        this.$message.success(data.head.message);
        this.examTime = "";
        this.publishTime = "";
      }
    },
    async queryTotal() {
      let data = await this.$http.post("/gateway/exam/publish/doQueryList", {
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
            examEndTime: this.examTime[1]
          }
        }
      });
      if (data) {
        this.total = data.body.data.total;
      }
    },
    async ShowJudge(examPublishRecordId) {
      this.loading = true;
      this.dialogFormVisible1 = true;
      let data = await this.$http.post("/gateway/exam/publish/queryJudgeId", {
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
            examPublishRecordId: examPublishRecordId
          }
        }
      });
      if (data) {
        this.judgetable = data.body.data.judgeVos;
      }
      this.loading = false;
    },
    async updateStatus(examPublishRecordId, status) {
      let loadingInstance = Loading.service();
      if (status === 0) {
        let data = await this.$http.post(
          "/gateway/exam/publish/doUpdateStatus",
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
                examPublishRecordId: examPublishRecordId,
                status: 1
              }
            }
          }
        );
        if (data.body.data === true) {
          this.queryAll();
          this.$message.success("发布成功！");
        } else {
          this.$message.success("400：发布失败！");
        }
      } else {
        let data = await this.$http.post(
          "/gateway/exam/publish/doUpdateStatus",
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
                examPublishRecordId: examPublishRecordId,
                status: 0
              }
            }
          }
        );
        if (data.body.data === true) {
          this.$message.success("停止发布！");
          this.queryPublish();
        } else {
          this.$message.success("400：停止失败！");
        }
      }
      loadingInstance.close();
    },
    async updatePublish(form) {
      let loadingInstance = Loading.service();
      if (form.mode == "平均阅卷") {
        form.mode = "2";
      }
      const FormattedJudge = [];
      for (const value of form.judge) {
        FormattedJudge.push({
          judgeid: value.judgeid,
          name: value.name
        });
      }
      console.log(FormattedJudge);
      let maxLimit =
        (new Date(form.endTime).getTime() -
          new Date(form.startTime).getTime()) /
        3600000;
      console.log(maxLimit);
      if (form.startTime >= form.endTime) {
        this.$message.success("考试结束时间必须晚于开始时间！");
      } else if (form.markingStopTime <= form.endTime) {
        this.$message.success("阅卷截止时间必须晚于考试截止时间！");
      } else if (form.limitTime > maxLimit) {
        this.$message.success("考试时间过长！");
      } else {
        let data = await this.$http.post("/gateway/exam/publish/doUpdate", {
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
              examPublishRecordId: this.eid,
              paperId: form.paperId,
              title: form.title,
              publisher: form.publisher,
              startTime: form.startTime,
              endTime: form.endTime,
              planPeopleNum: form.planPeopleNum,
              limitTime: form.limitTime,
              descript: form.descript,
              markingStopTime: form.markingStopTime,
              markingMode: form.mode,
              judges: FormattedJudge
            }
          }
        });
        if (data.body.data === true) {
          this.$message.success("更新成功！即将刷新数据");
          this.dialogFormVisible2 = false;
          this.$refs["updateForm"].resetFields();
          this.queryAll();
        } else {
          this.$message.success("400：更新失败！");
        }
        loadingInstance.close();
      }
    },
    async savePublish(form) {
      console.log(form.endTime);
      console.log(form.markingStopTime);
      if (form.mode == "平均阅卷") {
        form.mode = "2";
      }
      const FormattedJudge = [];
      console.log(this.addForm.judge);
      for (const value of form.judge) {
        FormattedJudge.push({
          judgeid: value.judgeid,
          name: value.name
        });
      }
      console.log("让我看看是什么东西");
      console.log(FormattedJudge);
      let maxLimit =
        (new Date(form.endTime).getTime() -
          new Date(form.startTime).getTime()) /
        3600000;
      console.log(new Date().getTime());
      if (
        (new Date(form.startTime).getTime() + 60000 < new Date().getTime()) &
        (form.startTime !== "") &
        (form.startTime !== null)
      ) {
        this.$message.success("考试开始必须晚于或者等于现在时间！");
      } else if (
        (form.startTime >= form.endTime) &
        (form.startTime !== "") &
        (form.startTime !== null)
      ) {
        this.$message.success("考试结束时间必须晚于开始时间！");
      } else if (form.markingStopTime <= form.endTime) {
        this.$message.success("阅卷截止时间必须晚于考试截止时间！");
      } else if (form.limitTime > maxLimit) {
        this.$message.success("考试时间过长！");
      } else {
        {
          let data = await this.$http.post("/gateway/exam/publish/doSave", {
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
                paperId: form.paperId,
                title: form.title,
                publisher: form.publisher,
                startTime: form.startTime,
                endTime: form.endTime,
                planPeopleNum: form.planPeopleNum,
                limitTime: form.limitTime,
                descript: form.descript,
                markingStopTime: form.markingStopTime,
                markingMode: form.mode,
                judges: FormattedJudge
              }
            }
          });
          if (data.body.data.flag === true) {
            this.$message.success("发布成功！即将刷新数据");
            this.queryAll();
            this.dialogFormVisible = false;
            this.$refs["addForm"].resetFields();
          } else {
            this.$message.success("400：保存失败！");
          }
        }
      }
    },
    confirmStopTime(row) {
      this.$confirm(
        "此操作将永久停止阅卷，变更需要通过修改进行, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.StopMarking(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async StopMarking(row) {
      let loadingInstance = Loading.service();
      if (row.status === 1) {
        this.$message.success("该记录正在发布中，请停用后进行修改！");
      } else {
        let data = await this.$http.post(
          "/gateway/exam/publish/doStopMarking",
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
                examPublishRecordId: row.examPublishRecordId,
                markingStopTime: new Date().getTime()
              }
            }
          }
        );
        if (data.body.data === true) {
          this.$message.success("中止阅卷成功！");
          this.queryAll();
        } else {
          this.$message.success("400：中止阅卷失败！");
        }
      }
      loadingInstance.close();
    },
    showQcode(examPublishRecordId) {
      this.qrcodeUrl =
        "http://120.26.178.23:8091/#/Home?examId=" + examPublishRecordId;
      console.log(this.qrcodeUrl);
      this.dialogFormVisible3 = true;
      this.$nextTick(function() {
        this.createQrcode();
      });
    },
    createQrcode() {
      // eslint-disable-next-line no-unused-vars
      let qrcode = new QRCode("qrcode", {
        width: 124,
        height: 124, // 高度
        text: this.qrcodeUrl // 二维码内容
      });
    },
    closeCode() {
      this.$refs.qrcode.innerHTML = "";
    },
    closeAdd() {
      this.$refs["addForm"].resetFields();
      this.dialogFormVisible = false;
    },
    closeAdd2() {
      this.$refs["updateForm"].resetFields();
      this.dialogFormVisible2 = false;
    },
    submitForm(form) {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.savePublish(form);
        } else {
          return false;
        }
      });
    },
    submitForm2(form) {
      this.$refs["updateForm"].validate(valid => {
        if (valid) {
          this.updatePublish(form);
        } else {
          return false;
        }
      });
    },
    confirmRemove(examPublishRecordId, status) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.removePublish(examPublishRecordId, status);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    confirmBatchRemove() {
      if (this.$refs.multipleTable.store.states.selection.length == 0) {
        this.$message.success("请先选择要批量删除的数据！");
      } else {
        this.$confirm("此操作将永久删除这些记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.batchRemovePublish();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    async removePublish(examPublishRecordId, status) {
      if (status === 1) {
        this.$message.success("不能删除！正在发布状态！");
      } else {
        let data = await this.$http.post("/gateway/exam/publish/doRemove", {
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
              examPublishRecordId: examPublishRecordId
            }
          }
        });
        if (data.body.data === true) {
          this.$message.success("删除成功！");
          this.queryAll();
          this.visible = false;
        }
      }
    },
    async batchRemovePublish() {
      let flag = this.$refs.multipleTable.store.states.selection.length;
      let id = [];
      for (
        let i = 0;
        i < this.$refs.multipleTable.store.states.selection.length;
        i++
      ) {
        if (this.$refs.multipleTable.store.states.selection[i].status === 1) {
          id.push(
            this.$refs.multipleTable.store.states.selection[i]
              .examPublishRecordId
          );
          flag--;
        }
      }
      if (flag != this.$refs.multipleTable.store.states.selection.length) {
        this.$message.success("不能删除！存在" + id + "记录处于发布状态！");
      } else {
        let loadingInstance = Loading.service();
        for (
          let i = 0;
          i < this.$refs.multipleTable.store.states.selection.length;
          i++
        ) {
          this.removePublish(
            this.$refs.multipleTable.store.states.selection[i]
              .examPublishRecordId,
            this.$refs.multipleTable.store.states.selection[i].status
          );
        }
        loadingInstance.close();
      }
    },
    async updatePaper() {
      let data = await this.$http.post("/gateway/exam/paper/selectPaperInfo", {
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
            id: this.updateForm.paperId
          }
        }
      });
      if (data.body.data) {
        this.$router.push({
          path: "/Exam",
          name: "Exam",
          params: {},
          query: {
            updataFlag: "1",
            pageId: data.body.data.paperPojo.id,
            pageName: data.body.data.paperPojo.name,
            pageScore: data.body.data.paperPojo.score,
            pageDiscript: data.body.data.paperPojo.discript
          }
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页 改变pagesize
    async handleSizeChange(val) {
      this.pageSize = val;
      let data = await this.$http.post("/gateway/exam/publish/doQueryList", {
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
            examEndTime: this.examTime[1]
          }
        }
      });
      if (data) {
        this.tableData = data.body.data.list;
      }
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
      let data = await this.$http.post("/gateway/exam/publish/doQueryList", {
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
            examEndTime: this.examTime[1]
          }
        }
      });
      if (data) {
        this.tableData = data.body.data.list;
      }
    },
    closeExpertFormDialog(done) {
      this.$refs["addForm"].resetFields();
      done(); //done 用于关闭 Dialog
    },
    closeExpertFormDialog2(done) {
      this.$refs["updateForm"].resetFields();
      done(); //done 用于关闭 Dialog
    },
    //调用梁栋的接口，具体是否成功未知。获取全部试卷的信息
    async getPaper() {
      let data = await this.$http.post("/gateway/exam/paper/selectPaperList", {
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
            page: 1,
            pagesize: 1000
          }
        }
      });
      if (data) {
        this.papers = data.body.data.list;
        this.$store.commit("setPaperList", this.papers);
      }
    },
    //调用绳锵的接口，获取到全部考官信息
    async getJudge() {
      let data = await this.$http.post(
        "/gateway/exam/System/queryUserJudgeByCompanyId",
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
            data: {}
          }
        }
      );
      if (data) {
        const FormattedJudge = [];
        for (const value of data.body.data) {
          FormattedJudge.push({
            judgeid: value.value,
            name: value.text
          });
        }
        this.judge = FormattedJudge;
      }
      console.log(this.judge);
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

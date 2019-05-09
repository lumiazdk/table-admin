<template>
  <d2-container :filename="filename">
    <el-card class="box-card">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查询日期">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="page.where.time"
            value-format="yyyy-MM-dd"
            size="small"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="链接编号">
          <el-input
            placeholder="请输入内容"
            class="input-width"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="true"
            v-if="page.loading"
            size="small"
            >查询中</el-button
          >
          <el-button
            type="primary"
            v-if="!page.loading"
            @click="search"
            size="small"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :data="page.tableData"
        style="width: 100%"
        v-loading="page.loading"
        size="small"
      >
        <template slot="empty">
          <div>
            <img src="/image/noData.png" alt class="noData" />
            <div style="line-height:0px">无数据</div>
          </div>
        </template>
        <el-table-column prop="date" label="日期" sortable align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="渠道ID"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="渠道名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="链接编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="结算方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="注册数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="进件笔数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="放款笔数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="放款额(元)"
          align="center"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </el-card>
  </d2-container>
</template>

<script>
import { GetCPSList } from "@api/sys.table";
export default {
  name: "CPS",
  data() {
    return {
      filename: __filename,
      page: {
        tableData: [],
        loading: false,
        page: 1,
        total: 0,
        pageSize: 10,
        where: {
          time: [
            this.moment().format("YYYY-MM-DD"),
            this.moment()
              .add(1, "months")
              .format("YYYY-MM-DD")
          ]
        }
      }
    };
  },
  methods: {
    //列表搜索
    search() {
      this.page.loading = true;
      setTimeout(() => {
        this.page.loading = false;
      }, 1000);
    },
    currentChange(page) {
      console.log(page);
    }
  }
};
</script>

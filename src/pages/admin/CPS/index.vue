<template>
  <d2-container :filename="filename">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>CPS日报</span>
      </div>
      <div class="search-input">
        <span class="d2-ml-10 text">查询日期：</span>
        <el-date-picker
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <span class="d2-ml-10 text">链接编号：</span>

        <el-input placeholder="请输入内容" class="input-width"></el-input>
        <el-button type="primary" class="d2-ml-10">查询</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="渠道ID"></el-table-column>
        <el-table-column prop="address" label="渠道名称"></el-table-column>
        <el-table-column prop="address" label="链接编号"></el-table-column>
        <el-table-column prop="address" label="结算方式"></el-table-column>
        <el-table-column prop="address" label="注册数"></el-table-column>
        <el-table-column prop="address" label="进件笔数"></el-table-column>
        <el-table-column prop="address" label="放款笔数"></el-table-column>
        <el-table-column prop="address" label="放款额(元)"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>
  </d2-container>
</template>

<script>
export default {
  name: "CPS",
  data() {
    return {
      filename: __filename,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

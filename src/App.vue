<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";
.box-card {
  min-width: 1000px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.el-table th {
  background: #e5e9f2 !important;
}
.theme-tomorrow-night-blue {
  .el-button--primary,
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #0288b9 !important;
  }

  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success .el-input__inner:focus,
  .el-form-item.is-success .el-textarea__inner,
  .el-form-item.is-success .el-textarea__inner:focus,
  .el-range-editor.is-active,
  .el-range-editor.is-active:hover {
    border-color: #0288b9 !important;
  }
  .el-table .descending .sort-caret.descending {
    border-top-color: #0288b9;
}
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #0288b9 !important;
  }
}
</style>

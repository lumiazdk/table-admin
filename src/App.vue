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
.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.input-width {
  width: auto !important;
}
.search-input {
  padding-bottom: 10px;
}
.el-button--primary {
  background-color: #0288b9 !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0288b9 !important;
}
.box-card {
  min-width: 1000px;
}
.text {
  color: #909399;
}
.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner,
.el-form-item.is-success .el-textarea__inner:focus,
.el-range-editor.is-active,
.el-range-editor.is-active:hover {
  border-color: #0288b9 !important;
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #0288b9 !important;
}
</style>

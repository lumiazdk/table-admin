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

</style>

<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">
      <div class="photo">
        <img src="/image/icon_admin.png" alt>
      </div>
      {{info.name ? `${info.name}` : '未登录'}}
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("admin/user", ["info"])
  },
  methods: {
    ...mapActions("admin/account", ["logout"]),
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        vm: this,
        confirm: true
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-text {
  display: flex;
  align-items: center;
}
.photo {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.photo img {
  height: 100%;
  width: 100%;
}
</style>


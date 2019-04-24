<template>
  <div class="page-login">
    <!-- <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>-->
    <!-- <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center">
      {{time}}
    </div>-->
    <!-- <div flex="main:center cross:center">
      <img src="./image/bg.png" class="bg">
    </div>-->
    <div class="page-login--layer">
      <div class="page-login--content" flex="dir:top main:justify cross:center box:justify">
        <div class="page-login--content-header"></div>
        <div class="page-login--content-main" flex="dir:top main:center cross:center">
          <!-- logo -->
          <!-- 表单 -->
          <div class="page-login--form">
            <el-card shadow="never">
              <img class="page-login--logo" src="./image/logo.png">

              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default"
              >
                <el-form-item prop="name">
                  <el-input type="text" v-model="formLogin.name" placeholder="用户名">
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="formLogin.password" placeholder="密码">
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <div class="yzm">
                    <el-input
                      type="text"
                      v-model="formLogin.code"
                      placeholder="- - - -"
                      style="width:auto"
                    ></el-input>
                    <div class="canvas">
                      <canvas id="canvas" width="78" height="38"></canvas>
                    </div>
                    <span class="change">
                      <el-button type="text" @click="drawImg">换一张</el-button>
                    </span>
                  </div>
                </el-form-item>
                <el-button size="default" @click="submit" type="primary" class="button-login">登录</el-button>
              </el-form>
            </el-card>
            <!-- <p
              class="page-login--options"
              flex="main:justify cross:center">
              <span><d2-icon name="question-circle"/> 忘记密码</span>
              <span>注册用户</span>
            </p>-->
            <!-- 快速登录按钮 -->
            <!-- <el-button class="page-login--quick" size="default" type="info" @click="dialogVisible = true">
              快速选择用户（测试功能）
            </el-button>-->
          </div>
        </div>
        <div class="page-login--content-footer">
          <!-- <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>-->
          <p class="page-login--content-footer-copyright"></p>
        </div>
      </div>
    </div>
    <el-dialog title="快速选择用户" :visible.sync="dialogVisible" width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px;">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="page-login--quick-user" @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o"/>
            <span>{{user.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <div class="footer">
      <d2-icon name="copyright"/>2019 恒智普惠金融科技有限公司版权所有
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      // 快速选择用户
      dialogVisible: false,
      users: [
        {
          name: "朱定坤",
          name: "admin",
          password: "admin"
        },
        {
          name: "编辑",
          name: "editor",
          password: "editor"
        },
        {
          name: "用户1",
          name: "user1",
          password: "user1"
        }
      ],
      // 表单
      formLogin: {
        name: "admin",
        password: "admin",
        code: ""
      },
      // 校验
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ validator: this.checkYZM, trigger: "blur" }]
      },
      verification_code: ""
    };
  },
  mounted() {
    this.drawImg();
    document.onkeydown = e => {
      var key = window.event.keyCode;
      if (key == 13) {
        this.submit();
      }
    };
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  methods: {
    ...mapActions("admin/account", ["login"]),
    checkYZM(rule, value, callback) {
      callback();
      return;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value != this.verification_code.toLowerCase()) {
        console.log(this.verification_code.toLowerCase());
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    },

    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.name = user.name;
      this.formLogin.password = user.password;
      this.submit();
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            vm: this,
            name: this.formLogin.name,
            password: this.base64encoder(this.formLogin.password.toString()),
            verification: this.verification_code
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || "/");
          });
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败");
        }
      });
    },
    drawImg() {
      console.log(22);
      this.verification_code = "";
      let cas = document.querySelector("canvas");
      let width = cas.width;
      let height = cas.height;
      let ctx = cas.getContext("2d");
      ctx.textBaseline = "bottom";
      /**背景色**/
      ctx.fillStyle = "#f7f7f7";
      ctx.fillRect(0, 0, width, height);
      /**绘制文字**/
      let str = "ABCDEFGHJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 4; i++) {
        let txt = str[this.randomNum(0, str.length)];
        this.verification_code += txt;
        ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
        ctx.font = this.randomNum(20, 30) + "px SimHei"; //随机生成字体大小
        let x = 10 + i * 15;
        let y = this.randomNum(30, 38);
        let deg = this.randomNum(-20, 20);
        //修改坐标原点和旋转角度
        ctx.translate(x, y);
        ctx.rotate((deg * Math.PI) / 180);
        ctx.fillText(txt, 0, 0);
        //恢复坐标原点和旋转角度
        ctx.rotate((-deg * Math.PI) / 180);
        ctx.translate(-x, -y);
      }
      /**绘制干扰线**/
      for (let j = 0; j < 2; j++) {
        ctx.strokeStyle = this.randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
        ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
        ctx.stroke();
      }
      /**绘制干扰点**/
      for (let k = 0; k < 50; k++) {
        //感染点颜色
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          this.randomNum(0, width),
          this.randomNum(0, height),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    base64encoder(Context) {
      let encoder = new Buffer(Context).toString("base64");
      return encoder;
    }
  }
};
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  min-width: 1300px;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
      span {
        color: $color-text-sub;
      }
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 340px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
.bg {
  width: 100%;
  height: 100%;
}
[flex~="cross:center"] {
  align-items: flex-end;
}
.page-login--layer {
  transform: translateX(-200px);
}
.page-login .page-login--logo {
  width: 60%;
  height: auto;
  display: block;
  margin: auto;
  padding: 20px 0 30px 0;
}
.page-login {
  background: url(./image/bg.png);
  background-size: cover;
}
.footer {
  height: 48px;
  background: #1f2d3d;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8492a6;
  font-size: 12px;
}
.yzm {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.canvas {
  height: 38px;
  width: 78px;
  margin-left: 5px;
  border-radius: 4px;
  border: 1px solid rgba(192, 204, 218, 1);
}
.change {
  margin-left: 5px;
  font-size: 14px;
  color: #0099ce;
  width: 50px;
  display: block;
}
.el-button--text {
  color: #0099ce;
}
.el-button--primary {
  background-color: #0099ce;
}
</style>

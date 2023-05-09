<template>
  <div style="height: 100vh; overflow: hidden; position: relative;">
    <el-card class="cover" v-if="loginAdmin.adminId">
      <slide-verify
        :l="42"
        :r="10"
        :w="310"
        :h="155"
        slider-text="向右滑动"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
      ></slide-verify>
    </el-card>

    <div class="adminLogin">
      <div class="text">管理员登录</div>
      <el-form :rules="rules" :model="admin" ref="loginForm">
        <el-form-item prop="adminName">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            size="medium"
            v-model="admin.adminName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            size="medium"
            v-model="admin.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            size="medium"
            type="primary"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import httpReq from "@/api/http.js";
import Cookies from "js-cookie";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      admin: {},
      loginAdmin: {},
      rules: {
        adminName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          httpReq.post("/admin/login", this.admin).then((res) => {
            if (res.code === "200") {
              console.log('res',res.data)
              this.loginAdmin = res.data  // 滑块组件出现
            } else {
              this.$notify.error(res.msg);
            }
          });
        }
      });
    },

    onSuccess() {
      Cookies.set('admin', JSON.stringify(this.loginAdmin))
      this.$notify.success("登录成功");
      this.$router.push('/')
    },

    onFail() {
      console.log('onFail')
    },

    onRefresh() {

    },

  },
};
</script>

<style lang="css" scoped>
.adminLogin {
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  margin: 150px auto;
  padding: 50px;
}
.text {
  margin: 30px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: aqua;
}
.cover {
  width: fit-content;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
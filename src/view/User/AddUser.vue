<template>
  <div class="main">
    <div class="text">
      <h2>新增用户</h2>
      <span class="text1">请填写用户信息</span>
    </div>

    <div class="user">
      <div>
        <el-form :model="formInline" :rules="rules" ref="ruleForm" :inline="true" class="demo-form-inline" label-width="110px">
          <el-form-item label="用户昵称:" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="formInline.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="formInline.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-radio-group v-model="formInline.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄:" prop="age">
            <el-input v-model="formInline.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="联系方式:" prop="phone">
            <el-input v-model="formInline.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="头像:" prop="headpic">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8085/api/film/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center; margin-top: 50px">
        <el-button type="primary" @click="addUser('ruleForm')">提交</el-button>
        <el-button type="danger" @click="backList">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import httpReq from "@/api/http.js";
export default {
  name: "AddUser",
  data() {
    // 校验年龄
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      if (!/^[0-9]+$/.test(value)) {
        callback(new Error("请输入整数"));
      }
      if (parseInt(value) > 120 || parseInt(value) <= 0) {
        callback(new Error("请输入合理年龄"));
      }
      callback();
    };
    // 校验手机号
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      if (!/^[0-9]+$/.test(value)) {
        callback(new Error("请输入数字值"));
      }
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
        callback(new Error("请输入合法手机号"));
      }
      callback();
    };

    return {
      imageUrl: null,
      formInline: {
        userId: null,
        headpic: null,
      },
      rules: {
        name: [
          { required: true, message: "请输入您的昵称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名账号", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" },
        ],
        age: [{ validator: checkAge, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 新增用户
    addUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          httpReq.post("/user/adduser", this.formInline).then((res) => {
            // console.log("res是", res)
            if (res.code === "200") {
              this.$notify.success("新增成功");
              this.formInline = {};
              this.$router.push("/usermanger");
            } else {
              this.$notify.error("新增失败");
            }
          });
        }
      });
    },

    backList() {
      this.$router.push("/usermanger");
    },

    handleAvatarSuccess(res, file) {
      console.log(file.response)
      this.imageUrl = file.response.data;
      this.formInline.headpic = this.imageUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    // this.load();
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text {
  width: 95%;
  height: 80px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  border-radius: 20px;
  background-color: #fff;
  padding: 5px;
  padding-left: 40px;
  margin-top: 20px;
}
.text1 {
  margin-left: 30px;
}
.user {
  background-color: #fff;
  width: 95%;
  border-radius: 20px;
  margin-top: 20px;
  height: 600px;
  padding: 20px;
}
.demo-form-inline {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar { 
  width: 100px;
  height: 100px;
}
</style>

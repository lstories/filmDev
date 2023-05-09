<template>
  <div class="main">
    <!-- 头 -->
    <div class="head">
      <h2>修改用户信息</h2>
      <span>请修改用户信息</span>
    </div>
    <!-- 主体内容 -->
    <div class="comment">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="110px">
        <el-form-item label="用户昵称:">
          <el-input v-model="formInline.name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户名(禁填):">
          <el-input v-model="formInline.username" readonly="true" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="formInline.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
            <el-radio-group v-model="formInline.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
        <el-form-item label="年龄:">
          <el-input v-model="formInline.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="联系方式:">
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
      <div style="text-align: center; margin-top: 20px;">
        <el-button type="primary" @click="editUser">提交</el-button>
        <el-button type="danger" @click="backList">取消</el-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import httpReq from "@/api/http.js";
export default {
  name: "EditUser",
  data() {
    return {
      formInline: {
        userId: null,
      },
      imageUrl: null,
    };
  },
  methods: {
    // 修改用户
    editUser() {
      httpReq.put('/user/update', this.formInline).then(res => {
        if (res.code === '200'){
          this.$notify.success('修改成功')
          this.$router.push("/usermanger")
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
    backList() {
      this.$router.push('/usermanger')
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
    const userId = this.$route.query.userId
    httpReq.get('/user/' + userId).then(res=> {
      console.log('res', res);
      this.formInline = res.data
      this.imageUrl = res.data.headpic
    }) 
  },

};
</script>

<style scoped>
.main {
  padding: 20px;

}
.head {
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  height: 80px;
}
.head span {
  margin-left: 40px;
}
.comment {
  background-color: #fff;
  border-radius: 20px;
  margin-top: 20px;
  height: 600px;
  padding: 40px;
}

.demo-form-inline {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 100px;
}
</style>
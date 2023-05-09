<template>
  <div style="width: 77%;">
    <h1>修改电影信息</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="110px">
      <el-form-item label="电影名称:">
        <el-input v-model="formInline.filmName" placeholder="请输入电影名称"></el-input>
      </el-form-item>
      <el-form-item label="电影类型:">
        <el-cascader :props="{value:'name',label:'name'}" v-model="formInline.categories" :options="categories"></el-cascader>
      </el-form-item>
      <el-form-item label="上映时间:">
        <el-date-picker v-model="formInline.time" type="date" value-format="yyyy-MM-dd" placeholder="请选择上映日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="参演演员:">
        <el-input v-model="formInline.actor" placeholder="请输入参演人员"></el-input>
      </el-form-item>
      <el-form-item label="导演:">
        <el-input v-model="formInline.director" placeholder="请输入导演"></el-input>
      </el-form-item>
      <el-form-item label="价格:">
        <el-input v-model="formInline.price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="简介:">
        <el-input v-model="formInline.profiles" type="textarea" cols="35" rows="6" placeholder="请输入简介"></el-input>
      </el-form-item>
      <el-form-item label="重新上传封面:">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8081/api/film/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div style="text-align: center; margin-top: 20px;">
      <el-button type="primary" @click="editFilm">提交</el-button>
      <el-button type="danger" @click="backList">取消</el-button>
    </div>
  </div>
</template>

<script>
import httpReq from "@/api/http.js";
export default {
  name: "EditFilm",
  data() {
    return {
      imageUrl: null,
      categories:[],
      formInline: {
        pic: null,

      },
    };
  },
  methods: {
    // 修改用户
    editFilm() {
      httpReq.put('/film/update', this.formInline).then(res => {
        if (res.code === '200'){
          this.$notify.success('修改成功')
          this.$router.push("/filmlist")
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
    backList() {
      this.$router.push('/filmlist')
    },
  
  handleAvatarSuccess(res, file) {
      console.log(file.response)
      this.imageUrl = file.response.data;
      this.formInline.pic = this.imageUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 4MB!');
      }
      return isJPG && isLt2M;
    },
  },
  created() { 
    const id = this.$route.query.id
    httpReq.get('/category/tree').then(res => {
      this.categories = res.data;
    }),
    httpReq.get('/film/' + id).then(res=> {
      this.formInline = res.data
      if(this.formInline.category) {
        this.formInline.categories = this.formInline.category.split('>')
      }
    })

  },

};
</script>

<style lang="css" scoped>
.avatar-uploader .el-upload {
  border: 1px solid black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
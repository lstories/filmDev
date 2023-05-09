<template>
  <div class="main">
    <div class="add-head">
      <h2>新增电影</h2>
      <span class="text">请输入电影信息</span>
    </div>
    <div class="comment">
      <el-form :model="formInline" :rules="rules" ref="ruleForm" :inline="true" class="demo-form-inline" label-width="110px">
        <div class="one">
          <el-form-item label="电影名称:" prop="filmName">
            <el-input v-model="formInline.filmName" placeholder="请输入电影名称"></el-input>
          </el-form-item>
          <el-form-item label="电影类型:" prop="category">
            <el-cascader :props="{value:'name',label:'name'}" v-model="formInline.category" @change="formInline.category = $event[$event.length-1]" :options="categories"></el-cascader>
          </el-form-item>
          <el-form-item label="上映时间:" prop="time">
            <el-date-picker v-model="formInline.time" type="date" value-format="yyyy-MM-dd" placeholder="请选择上映日期"></el-date-picker>
          </el-form-item>
        </div>

        <div class="two">
          <el-form-item label="演员:" prop="actor">
            <el-input v-model="formInline.actor" placeholder="请输入演员"></el-input>
          </el-form-item>
          <el-form-item label="导演:" prop="director">
            <el-input v-model="formInline.director" placeholder="请输入导演"></el-input>
          </el-form-item>
          <el-form-item label="价格:" prop="price">
            <el-input v-model="formInline.price" placeholder="请输入价格"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="简介:" prop="profiles">
            <el-input v-model="formInline.profiles" type="textarea" cols="20" rows="9" placeholder="请输入相关简介"></el-input>
          </el-form-item>
          <el-form-item label="电影封面:" prop="pic" class="film-pic">
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
          <el-form-item label="影片视频:" prop="video">
            <el-upload
              class="upload-demo"
              action="http://localhost:8085/api/film/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="successUpload"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过10mb</div>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="addFilm('ruleForm')">提交</el-button>
        <el-button type="danger" @click="backList">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import httpReq from "@/api/http.js";
export default {
  name: "AddFilm",
  data() {
    var checPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("价格不能为空"));
      }
      if (parseInt(value) > 1000 || parseInt(value) <= 0) {
        callback(new Error("请输入合理价格"));
      }
      callback();
    };
    return {
      imageUrl: null,
      categories: [],
      fileList: [],
      formInline: {
        pic: null,
        video: null,
      },
      rules: {
        filmName: [
          { required: true, message: "请输入您的昵称", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" },
        ],
        price: [{ validator: checPrice, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 上传
    handleAvatarSuccess(res, file) {
      console.log(file.response)
      this.imageUrl = file.response.data;
      this.formInline.pic = this.imageUrl;
    },
    // 给文件加限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPEG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    // 上传视频以及移除操作
    successUpload(file, fileList) {
      console.log(file, fileList);
      this.formInline.video = file.data
    },

    handleRemove(file, fileList) {
        console.log(file, fileList);
        
    },
    handlePreview(file) {
      console.log(file, "111");
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    // 新增
    addFilm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          httpReq.post("/film/add", this.formInline).then((res) => {
            // console.log("res是", res)
            if (res.code === "200") {
              this.$notify.success("新增成功");
              this.formInline = {};
              this.$router.push("/filmlist");
            } else {
              this.$notify.error(res.msg);
            }
          });
        }
      });
    },

    backList() {
      this.$router.push("/filmlist");
    },
  },
  created() {
    httpReq.get('/category/tree').then(res => {
      this.categories = res.data;
    })
  },
};
</script>

<style lang="css" scoped>
.main {
  padding: 15px;
}
.add-head {
  display: flex;
  background-color: #fff;
  padding: 20px;
  height: 80px;
  align-items: center;
  border-radius: 20px;
}
.text {
  margin-left: 40px;
}
.comment {
  background-color: #fff;
  border-radius: 20px;
  margin-top: 15px;
  height: 620px;
  padding: 20px;
}
.one {
  margin-bottom: 30px;
}
.two {
  margin-bottom: 30px;
}
.three {
  margin-bottom: 30px;
}
.btn {
  text-align: center; 
}
.film-pic {
  margin-right: 20px;
}

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
  background-color: skyblue;
  border-radius: 20px;
} 
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
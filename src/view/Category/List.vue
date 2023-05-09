<template>
  <div class="main-cate">
    <!-- 搜索表单 -->
    <div class="select-input">
      <span class="span-text">类型列表</span>
      <span style="font-size: 16px; margin-right: 10px">电影类型:</span>
      <el-input style="width: 240px" v-model="params.name" placeholder="请输入搜索类型"></el-input>
      <el-button style="margin-left: 5px" type="paimary" @click="load">搜索</el-button>
      <el-button style="margin-left: 5px" type="paimary" @click="reset">重置</el-button>
      <el-button type="primary" round style="margin-left: 30px" @click="dialogFormVisible = true">添加分类</el-button>
    </div>

    <div class="cate-list">
      <el-table :data="tableData" style="width: 550px" height="630" row-key="id">
        <el-table-column fixed prop="name" label="类型名称" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="备注" prop="remark" width="120" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="添加时间" prop="createTime" width="120"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm class="deleteQue" title="确定删除吗?" @confirm="handleDelete(scope.$index, scope.row)">
              <el-button size="mini" slot="reference" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="params.pageSize"
          :current-page="params.pageNum"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

    <div class="pic-table">
      <cate-pie></cate-pie>
    </div>

    <div class="tab-pic">
      <cate-charts></cate-charts>
    </div>

    <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
      <el-form :model="userForm">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="userForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类备注" :label-width="formLabelWidth">
          <el-input v-model="userForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改分类" :visible.sync="dialogFormVisible1">
      <el-form :model="edit">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="edit.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类备注" :label-width="formLabelWidth">
          <el-input v-model="edit.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editInfo()">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import httpReq from "@/api/http.js";
import Cookies from "js-cookie";
import CatePie from '@/components/CatePie.vue';
import CateCharts from "@/components/CateCharts.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "List",
  components: { CatePie, CateCharts },
  data() {
    return {
      admin: Cookies.get("admin")
        ? JSON.stringify(Cookies.get("admin"))
        : {},
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {},
      total: 0,
      pid: null,
      userForm: {
        name:null,
        remark:null,
      },
      params: {
        pageNum: 1,
        pageSize: 15,
      },
      edit: { 
        name:null,
        remark:null,
        id: null,
      },

      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 1, max: 10, message: "请输入1-10个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: '70px'

    };
  },
  methods: {
    // 加载
    load() {
      httpReq.get("/category/page", {
          params: this.params,
        }).then((res) => {
          if (res.code === "200") {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        });
    },
    // 重置
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 15,
      };
      this.load();
    },

    
    // 新增分类
    addCate() {
      httpReq.post("/category/add", this.userForm).then((res) => {
          if (res.code === "200") {
            this.$notify.success("新增成功");
            this.dialogFormVisible = false;
            this.userForm = {name:null, remark:null,};
            this.load();
          } else {
            this.$notify.error("新增失败");
          }
        });
    },

    // 分页
    handleCurrentChange(pageNum) {
      // 点击分页按钮触发分页
      console.log(pageNum);
      this.params.pageNum = pageNum;
      this.load();
    },

    // 编辑
    handleEdit(index, row) {
      // this.$router.push("/editcategory?id=" + row.id);
      console.log(row);
      this.edit.name = row.name;
      this.edit.remark = row.remark;
      this.edit.id = row.id;
      this.dialogFormVisible1 = true;
    },

    // 修改
    editInfo() {
      httpReq.put('/category/update', this.edit).then(res => {
        if (res.code === '200'){
          this.$notify.success('修改成功')
          this.dialogFormVisible1 = false;
          this.edit.name = null;
          this.edit.remark = null;
          this.edit.id = null;
          this.load();
        } else {
          this.$notify.error("修改失败")
        }
      })
    },

    // 删除
    handleDelete(index, row) {
      httpReq.delete("/category/delete/" + row.id).then((res) => {
        if (res.code === "200") {
          this.$notify.success("删除成功");
          this.load();
        } else {
          this.$notify.error(res.msg);
        }
      });
      console.log(index, row);
    },

    
  },
  // 生命周期函数
  created() {
    this.load();
  },
};
</script>

<style scoped>
.main-cate {
  padding: 20px;
}

.select-input {
  margin-left: 5px; 
  margin-bottom: 5px
}

.cate-list {
  background-color: #fff;
  border-radius: 15px;
  width: 550px;
  height: 680px;
  padding: 10px;
}

.span-text {
  margin-right: 10px;
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}


.page {
  width: 550px;
  display: flex;
  justify-content: center;
}

.deleteQue {
  margin-left: 5px
}

.pic-table {
  width: 740px;
  height: 300px;
  border-radius: 30px;
  padding: 20px;
  background-color: #fff;
  margin-top: -680px;
  margin-left: 570px;
}

.tab-pic {
  width: 740px;
  height: 365px;
  border-radius: 30px;
  padding: 20px;
  background-color: #fff;
  margin-top: 15px;
  margin-left: 570px;
}

</style>
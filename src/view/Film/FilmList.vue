<template>
  <div class="main">
    <!-- 搜索表单 -->
    <div class="film-select-text">
      <span class="film-list-text">电影列表</span>
      <span style="font-size: 16px;margin-right: 10px;">电影名称:</span>
      <el-input class="input-text" v-model="params.filmName" placeholder="请输入电影名称"></el-input>
      <el-button style="margin-left: 5px" type="paimary" @click="load">搜索</el-button>
      <el-button style="margin-left: 5px" type="paimary" @click="reset">重置</el-button>
      <el-button type="primary" round style="margin-left: 30px" @click="goAdd">新增电影</el-button>
    </div>

    <!-- 用户信息表 -->
    <div class="list-tab">
      <el-table :data="filmTable" stripe row-key="id" default-expand-all style="width: 900px;" height=600 >
        <el-table-column fixed label="电影名称" prop="filmName" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="pic" label="封面" width="120">
          <template slot-scope="scope">
            <el-image style="height: 95px; width: 70px;" :preview-src-list="[scope.row.pic]" :src="scope.row.pic" fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="价格(元)" prop="price" width="70"></el-table-column>
        <el-table-column label="简介" prop="profiles" :show-overflow-tooltip="true" width="130"></el-table-column>
        <el-table-column label="电影类型" prop="category" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="上映时间" prop="time" width="100"></el-table-column>
        <el-table-column label="演员" prop="actor" width="80" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="导演" prop="director" width="80" :show-overflow-tooltip="true"></el-table-column>
  
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗?" @confirm="handleDelete(scope.$index, scope.row)" style="margin-left: 5px;">
              <el-button size="mini" slot="reference" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page" style="">
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

    <div class="year-film">
      <year-film-vue></year-film-vue>
    </div>

    <div class="other-film">
      <film-charts></film-charts>
    </div>



  </div>
</template>

<script>
import httpReq from "@/api/http.js";
import YearFilmVue from '@/components/YearFilm.vue';
import FilmCharts from "@/components/FilmCharts.vue";
export default {
  name: 'UserManger',
  components: {YearFilmVue, FilmCharts},
  data() {
    return {
      filmTable: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 8,
      },
    };
  },
  methods: {
    // 加载
    load() {
      httpReq
        .get("/film/page", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "200") {
            this.filmTable = res.data.list;
            this.total = res.data.total;
          }
        });
    },
    // 重置
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 8,
        // username: null,
      };
      this.load();
    },
    // 添加
    goAdd() {
      this.$router.push("/addfilm");
    },

    // 分页
    handleCurrentChange(pageNum) {
      // 点击分页按钮触发分页
      this.params.pageNum = pageNum;
      this.load();
    },

    handleEdit(index, row) {
      this.$router.push('/editfilm?id=' + row.id)
    },
    handleDelete(index, row) {
      httpReq.delete('/film/delete/'+row.id).then(res => {
        if (res.code === '200'){
          this.$notify.success('删除成功');
          this.load();
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
  },
  // 生命周期函数
  created() {
    this.load();
  },
};
</script>

<style scoped>
.main {
  padding: 10px;
}

.film-select-text {
  margin-left: 5px; 
  margin-bottom: 5px;
}

.film-list-text {
  margin-right: 10px;
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.input-text {
  width: 240px;
}

.list-tab {
  width: 900px;
  height: 700px;
  background-color: #fff;
  margin-top: -2px;
  padding: 10px;
  border-radius: 15px;
}

.page {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  width: 900px;
}

.year-film {
  margin-top: -700px;
  margin-left: 915px;
}

.other-film {
  margin-left: 915px;
  margin-top: 10px;
  width: 400px;
  height: 320px;
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
}

</style>
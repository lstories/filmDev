<template>
  <div class="main">
    <!-- 搜索表单 -->
    <div class="select">
      <span class="order-text">订单列表</span>
      <span class="username">购买用户名:</span>
      <el-input style="width: 240px;" v-model="params.name" placeholder="请输入用户名"></el-input>
      <el-button style="margin-left: 5px;" type="paimary" @click="load">搜索</el-button>
      <el-button style="margin-left: 5px;" type="paimary" @click="reset">重置</el-button>
    </div>

    <div class="order-table">
      <!-- 用户信息表 -->
      <el-table class="el-table" style="width: 900px;" height=580 :data="orderList" stripe row-key="id" default-expand-all>
        <el-table-column label="用户昵称" prop="name" width="80" :show-overflow-tooltip="true" fixed></el-table-column>
        <el-table-column label="订单号" prop="code" width="120" fixed></el-table-column>
        <el-table-column label="电影名称" prop="filmName" width="80" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="订单类型" prop="brand" width="70"></el-table-column>
        <el-table-column label="创建时间" prop="createtime" width="130"></el-table-column>
        <el-table-column label="开始时间" prop="begintime" width="130"></el-table-column>
        <el-table-column label="结束时间" prop="endtime" width="130"></el-table-column>
        <el-table-column label="验证码" prop="captcha" width="80"></el-table-column>
        <el-table-column label="订单状态" prop="status" width="80"></el-table-column>
        <el-table-column label="房间风格" prop="styleBrand" width="80"></el-table-column>
        <el-table-column label="空间" prop="spaceBrand" width="80"></el-table-column>
        <el-table-column label="金额" prop="price" width="80" fixed="right"></el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-popconfirm title="确定删除吗?" @confirm="handleDelete(scope.$index, scope.row)">
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
    
    <div class="pie1">
      <order-charts></order-charts>
    </div>
    <div class="pie2">
      <order-chart></order-chart>
    </div>
  </div>
</template>

<script>
import $http from "@/api/http.js";
import OrderCharts from "@/components/OrderCharts.vue";
import OrderChart from "@/components/OrderChart.vue";
export default {
  components: { OrderCharts, OrderChart },
  name: "OrderManager",
  data() { 
    return {
      orderList: null,
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 15,
        name: null,
      },
    }
  },

  methods: {
    // 加载
    load() {
      $http
        .get("/orders/page", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "200") {
            console.log("orderList", res.data)
            this.orderList = res.data.list;
            this.total = res.data.total;
          }
        });
    },

    // 重置
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 15,
        username: null,
      };
      this.load();
    },

    // 分页
    handleCurrentChange(pageNum) {
      // 点击分页按钮触发分页
      // console.log(pageNum);
      this.params.pageNum = pageNum;
      this.load();
    },

    handleEdit(index, row) {
      this.$router.push('/edituser?userId=' + row.userId)
      // console.log(index, row);
    },
    handleDelete(index, row) {
      $http.delete('/user/delete/'+row.userId).then(res => {
        if (res.code === '200'){
          this.$notify.success('删除成功');
          this.load();
        } else {
          this.$notify.error(res.msg)
        }
      })
      // console.log(index, row);
    },


  },
  // 生命周期函数
  created() {
    this.load();
  },


}
</script>

<style scoped>
.main {
  padding: 15px;
}

.select {
  margin-left: 5px;
  margin-bottom: 10px;
  font-size: 24px;
  color: coral;
  font-weight: bold;
}

.order-text {
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; 
}

.username {
  margin-left: 20px;
  font-size: 18px;
  margin-right: 10px;
  color: black;
}

.order-table {
  width: 950px;
  height: 650px;
  border-radius: 20px;
  background-color: white;
  padding: 20px;
}

.page {
  display: flex; 
  justify-content: center;
  padding-top: 5px;
}

.pie1 {
  background-color: #fff;
  height: 320px;
  width: 350px;
  border-radius: 15px;
  margin-top: -650px;
  margin-left: 965px;
  padding: 10px;
}

.pie2 {
  background-color: #fff;
  height: 320px;
  width: 350px;
  border-radius: 15px;
  margin-top: 10px;
  margin-left: 965px;
  padding: 10px;
}


</style>

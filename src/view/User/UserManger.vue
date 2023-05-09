<template>
  <div class="main">
    <!-- 搜索表单 -->
    <div style="margin-left: 5px; margin-bottom: 5px;">
      <span class="user-list">用户列表</span>
      <span style="font-size: 16px;margin-right: 10px;">用户名:</span>
      <el-input style="width: 240px;" v-model="params.name" placeholder="请输入用户昵称"></el-input>
      <el-button style="margin-left: 5px;" type="paimary" @click="load">搜索</el-button>
      <el-button style="margin-left: 5px;" type="paimary" @click="reset">重置</el-button>
      <el-button style="margin-left: 5px;" round type="primary" @click="addUser()">新增用户</el-button>
    </div>

    <div class="user-tab">
      <el-table :data="userTable" stripe default-expand-all style="width: 1000px" height="650" row-key="id">
        <el-table-column fixed prop="name" label="昵称" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="username" label="账号" width="120"></el-table-column>
        <el-table-column prop="age" label="年龄" width="70"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
        <el-table-column label="性别" prop="sex" width="70"></el-table-column>
        <el-table-column label="消费次数" prop="order_count" width="70"></el-table-column>
        <el-table-column label="消费金额" prop="sum_price" width="100"></el-table-column>
        <el-table-column label="电话" prop="phone" width="120"></el-table-column>
        <el-table-column label="头像" prop="headpic" width="120">
          <template slot-scope="scope">
            <el-image style="height: 70px; width: 70px;" :preview-src-list="[scope.row.headpic]" :src="scope.row.headpic" fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm
            title="确定删除吗?"
            @confirm="handleDelete(scope.$index, scope.row)"
            style="margin-left: 5px;" 
            >
              <el-button size="mini" slot="reference" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

        
      <!-- 分页 -->
      <div style="display: flex; justify-content: center; margin-top: 3px;">
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
    
    <div class="ranking-list">
      <div class="block">
        <div class="radio">
          <span>用户消费排行榜：</span>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in activities"
            :key="index"
          >
            <span class="rank-text">{{ item.name }}</span>
            , 共消费<span class="rank-text">{{ item.userNum }}</span>次<br>
            消费总金额为：<span class="rank-text">{{ item.sumPrice }}</span>
          </el-timeline-item>
        </el-timeline>
      </div>    
    </div>
  </div>
</template>

<script>
import httpReq from "@/api/http.js";
export default {
  name: 'UserManger',
  data() {
    return {
      activities: null,
      userTable: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        name: null,
      },
    };
  },
  methods: {
    getTenHeight() {
      httpReq.get("/orders/tenHeight").then((res) => {
        // console.log('activities', res)
        this.activities = res.data;
      })
    },

    // 加载
    load() {
      httpReq
        .get("/user/page", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "200") {
            this.userTable = res.data.list;
            this.total = res.data.total;
          }
        });
    },

    // 重置
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        name: null,
      };
      this.load();
    },

    // 新增用户
    addUser() {
      this.$router.push('/adduser')
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
      httpReq.delete('/user/delete/'+row.userId).then(res => {
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
    this.getTenHeight();
  },
};
</script>

<style scoped>
.main {
  padding: 10px;
}

.user-tab {
  border-radius: 15px;
  height: 700px;
  width: 1050px;
  padding: 10px;
  border-radius: 15px;
  background-color: #fff;
}
.user-list {
  margin-right: 20px;
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

}

.left {
  width: 300px;
  height: 500px;
  position: fixed;
  bottom: 150px;
  right: 10px;
  border-radius: 45px;
  background-color: #fff;
}
.left div p {
  margin-left: 50px;
}

.ranking-list {
  margin-top: -703px;
  margin-left: 1060px;
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
  
}

.radio {
  font-weight: bold;
  color: orange;
  margin-bottom: 5px;
}

.block {
  height: 680px;
  padding: 10px;
}

.rank-text {
  color: crimson;
  font-weight: bold;
}

</style>
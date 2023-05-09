<template>
  <div class="main">
    <!-- 搜索表单 -->
    <div class="select-list">
      <span class="order-text">影房管理</span>
      <span style="font-size: 16px; margin-right: 10px">用户名:</span>
      <el-input
        class="input-room"
        v-model="params.styleBrand"
        placeholder="请输入影房类型"
      ></el-input>
      <el-button style="margin-left: 5px" type="paimary" @click="load"
        >搜索</el-button
      >
      <el-button style="margin-left: 5px" type="paimary" @click="reset"
        >重置</el-button
      >
    </div>
    <div class="list-tab">
      <el-table
        :data="roomsList"
        stripe
        row-key="id"
        default-expand-all
        height="510"
      >
        <el-table-column
          label="房间风格"
          prop="styleBrand"
          width="80"
        ></el-table-column>
        <el-table-column
          label="空间"
          prop="spaceBrand"
          width="80"
        ></el-table-column>
        <el-table-column label="金额" prop="price" width="80"></el-table-column>
        <el-table-column
          label="使用状态"
          prop="status"
          width="80"
        ></el-table-column>
        <el-table-column label="订阅次数" prop="" width="80"></el-table-column>
        <el-table-column label="操作" width="200">
          <div slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定删除吗?"
              @confirm="handleDelete(scope.$index, scope.row)"
              style="margin-left: 5px"
            >
              <el-button size="mini" slot="reference" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </div>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div style="display: flex; justify-content: center; margin-top: 15px">
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

      <div class="pie">
        <room-zhu></room-zhu>
      </div>
      <div class="mychart">
        <rooms-charts></rooms-charts>
      </div>
    </div>
    <el-dialog title="修改影房信息" :visible.sync="dialogFormVisible">
      <el-form :model="edit">
        <el-form-item label="房间风格">
          <el-input v-model="edit.styleBrand" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="空间大小">
          <el-input v-model="edit.spaceBrand" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="edit.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用状态">
          <br>
          <el-radio-group v-model="edit.status">
            <el-radio label="使用中"></el-radio>
            <el-radio label="空闲中"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $http from "@/api/http.js";
import RoomsCharts from "@/components/RoomsCharts.vue";
import RoomZhu from '@/components/RoomZhu.vue';
export default {
  components: { RoomsCharts, RoomZhu },
  name: "OrderManager",
  data() {
    return {
      roomsList: [],
      dialogFormVisible: false,
      edit: {},
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 20,
        styleBrand: null,

      },
    };
  },

  methods: {
    // 加载
    load() {
      $http
        .get("/room/page", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "200") {
            console.log("orderList", res.data);
            this.roomsList = res.data.list;
            this.total = res.data.total;
          }
        });
    },

    // 重置
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 20,
        styleBrand: null,
      };
      this.load();
    },

    // 分页
    handleCurrentChange(pageNum) {
      // 点击分页按钮触发分页
      this.params.pageNum = pageNum;
      this.load();
    },

    handleEdit(index, row) {
      this.dialogFormVisible = true;
      console.log(index, row, '.......');
      this.edit = row
    },
    handleDelete(index, row) {
      $http.delete("/user/delete/" + row.userId).then((res) => {
        if (res.code === "200") {
          this.$notify.success("删除成功");
          this.load();
        } else {
          this.$notify.error(res.msg);
        }
      });
    },

    // 修改
    editInfo() {
      $http.put("/room/update", this.edit).then((res) => {
        if (res.code === '200'){
          this.$notify.success('修改成功');
          this.load();
          this.dialogFormVisible = false;
          this.edit = {}
        } else {
          this.$notify.error("修改失败")
        }
      })
    },

    
  },
  // 生命周期函数
  created() {
    this.load();
    this.getPrice();
  },
  mounted() {},
};
</script>

<style scpoed>
.main {
  padding: 15px;
}

.select-list {
  margin-bottom: 5px;
}

.order-text {
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-right: 15px;
}

.input-room {
  width: 240px;
}

.list-tab {
  width: 700px;
  height: 600px;
  border-radius: 20px;
  background-color: #fff;
  padding: 30px;
  margin-top: 20px;
}

.pie {
  width: 550px;
  height: 350px;
  margin-top: -590px;
  margin-left: 700px;
  background-color: #fff;
  border-radius: 15px;
  padding-left: 120px;
  padding: 20px;
}

.mychart {
  width: 550px;
  height: 300px;
  margin-top: 15px;
  margin-left: 700px;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
}
</style>

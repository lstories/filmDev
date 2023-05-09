<template>
  <div class="main">
        <div class="mess-text">
            <div>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }" class="text" >首页</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/messagelist"></a>信息中心</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="btn">
                <el-input style="width: 240px;" placeholder="请输入用户名"></el-input>
                <el-button style="margin-left: 5px;" type="primary" @click="getMess">搜索</el-button>
                <el-button style="margin-left: 5px;" type="primary" @click="reset">重置</el-button>
            </div>
        </div>

        <div class="mess-tab">
            <el-table style="width: 900px;" height=580 :data="message" stripe row-key="id" default-expand-all>
                <el-table-column label="用户昵称" prop="name" width="80" :show-overflow-tooltip="true" fixed></el-table-column>
                <el-table-column label="订单号" prop="code" width="120" fixed></el-table-column>
                <el-table-column label="电影名称" prop="filmName" width="80" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="订单结束时间" prop="endtime" width="130"></el-table-column>
                <el-table-column label="用户评论" prop="comment" width="130" show-overflow-tooltip></el-table-column>
                <el-table-column label="运营回评" prop="commented" width="130" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作" width="140" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">回评</el-button>
                        <el-popconfirm title="确定删除吗?" @confirm="handleDelete(scope.$index, scope.row)">
                            <el-button size="mini" slot="reference" type="danger">删除</el-button>
                        </el-popconfirm>
                    </template>
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
        </div>
        <el-dialog title="回复评论" :visible.sync="dialogFormVisible">
            <el-form :model="edit">
              <el-form-item>
                <el-input v-model="edit.commented" type="textarea" cols="20" rows="9" placeholder="请回复评论～"></el-input>
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
export default {
    data() {
        return {
            message: [],
            total: 0,
            dialogFormVisible: false,
            edit: {},
            params: {
                pageNum: 1,
                pageSize: 15,
                name: null,
            },
        }
    },
    methods: { 
        getMess() {
            $http.get("/orders/comment", {
                params: this.params,
            }).then((res) => {
                console.log("res", res)
                this.message = res.data.list;
                this.total = res.data.total;
            })
        },

        // 重置
        reset() {
            this.params = {
                pageNum: 1,
                pageSize: 15,
                name: null,
            };
            this.getMess();
        },

        // 分页
        handleCurrentChange(pageNum) {
            // 点击分页按钮触发分页
            this.params.pageNum = pageNum;
            this.getMess();
        },

        handleEdit(index, row) {
            this.edit = row;
            this.dialogFormVisible = true;
        },
        handleDelete(index, row) {
            $http.delete('/film/delete/'+row.id).then(res => {
                if (res.code === '200'){
                    this.$notify.success('删除成功');
                    this.getMess();
                } else {
                    this.$notify.error(res.msg)
                }
            })
        },

        // 新增评论
        editInfo() {
            $http.put("/orders/update", this.edit).then((res) => {
              if (res.code === '200'){
                this.$notify.success('回评成功');
                this.getMess();
                this.dialogFormVisible = false;
                this.edit = {}
              } else {
                this.$notify.error("回评失败")
              }
            })
        },

    },
    created() {
        this.getMess();
    },

}
</script>

<style scoped>
.main {
    padding: 15px;
}

.mess-text {
    height: 55px;
    width: 100%;
    padding-left: 10px;
    display: flex;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    padding-right: 15px;
}

.text {
    background: linear-gradient(to right, red, blue);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.btn { 
    margin-left: auto;
    
}

.mess-tab {
    margin-top: 10px;
    width: 950px;
    background-color: #fff;
    border-radius: 20px;
    padding: 10px;
}



/* 修改弹出层的样式 */
.el-tooltip__popper {
   max-width: 50px;
   background: #dfeaf5 !important;
   color: #393e49 !important;
}
</style>
<template>
  <div class="main">
    <div class="top">
      <div class="admin-message">
        <div class="item-head">
          <div class="item">
            <el-image style="width: 40px; height: 40px; border-radius: 30px;" :src="admin.headpic" fit="fill"></el-image>
          </div>
          <div class="item item-name">{{ admin.name }}</div>
        </div>
        <div class="item">管理员账号: {{ admin.adminName }}</div>
        <div class="item">手机号: {{ admin.phone }}</div>
      </div>
      <UserTab class="userTab"></UserTab>
    </div>
    <div>
      <Ranking></Ranking>
      <OrderTab></OrderTab>
    </div>

    
  </div>
</template>

<script>
import Cookies from "js-cookie";
import httpReq from "@/api/http.js";
import UserTab from '@/components/UserTab.vue';
import OrderTab from '@/components/OrderTab.vue';
import Ranking from '@/components/Ranking.vue';
export default {
  name: "HomeView",
  components: {
    UserTab,
    OrderTab,
    Ranking,
  },
  data() {
    return {
      admin: Cookies.get("admin") ? JSON.parse(Cookies.get("admin")) : [],
    }
  },

  methods: {

  },

  created() {
    httpReq.get("/admin/" + this.admin.adminId).then((res) => {
      this.admin = res.data;
    });
    // console.log(JSON.parse(Cookies.get("user")));
  },
};
</script>

<style scoped>

.main {
  padding: 10px;
}

.top {
  display: flex;
}

.admin-message {
  background-color: #fff;
  width: 370px;
  height: 150px;
  margin-top: 10px;
  padding: 20px;
  border-radius: 40px;
  margin-right: 20px;
  
}
.item-head {
  display: flex;
  width: 150px;
  align-items: center;  
}

.item {
  margin: 10px 10px 0 10px;
  
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.userTab {
  height: 500px;
}
</style>
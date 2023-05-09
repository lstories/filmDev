<template>
  <div class="all">
    <!-- 头部区域 -->
    <div class="header">
      <div class="pic-text" style="width: 300px">
        <img src="@/assets/image/logo.png" alt="电影" class="logo" />
        <span class="text">影咖购票管理系统</span>
      </div>
      <el-menu
        default-active="['/home']"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="/">影咖首页</el-menu-item>
        <el-menu-item index="/usermanger" >用户管理</el-menu-item>
        <el-submenu index="2">
          <template slot="title">电影资源管理</template>
          <el-menu-item index="/categorylist">电影分类</el-menu-item>
          <el-menu-item index="/filmlist">影片管理</el-menu-item>
          <el-menu-item index="/rooms">影房管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/ordermanager">订单管理</el-menu-item>
        <el-menu-item index="/messagelist">消息中心</el-menu-item>
      </el-menu>

      <!-- 头像信息 -->
      <div style="flex: 1; text-align: right; padding-right: 20px">
        <el-dropdown szie="medium">
          <span class="el-dropdown-link" style="cursor: pointer">
            <el-image
              style="width: 50px; height: 50px; border-radius: 30px"
              :src="admin.headpic"
              fit="fill"
            ></el-image>
          </span>
          <el-dropdown-menu slot="dropdown" style="margin-top: -5px">
            <el-dropdown-item>
              <div style="width: 50px; text-align: center" @click="logout">信息</div>
              <div style="width: 50px; text-align: center" @click="logout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="comment">
      <!-- 路由 -->
      <div class="router-abc">
        <router-view></router-view>
      </div>

      <!-- 脚标 -->
      <div class="foo">
        <Footer></Footer>
      </div>

    </div>

  </div>
</template>

<script>
import Cookies from "js-cookie";
import httpReq from "@/api/http.js";
import Footer from "@/components/Footer.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
  components: { Footer },
  data() {
    return {
      admin: Cookies.get("admin") ? JSON.parse(Cookies.get("admin")) : {},
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    logout() {
      // 清楚浏览器用户信息
      Cookies.remove("admin");
      this.$router.push("/login");
    },
  },
  created() {
    httpReq.get("/admin/" + this.admin.adminId).then((res) => {
      this.admin = res.data;
    });
  },
};
</script>

<style scoped>
.all {
  height: 100%;
}

/* 导航样式 */
.header {
  height: 60px;
  background-color: white;
  line-height: 60px;
  margin-bottom: 2px;
  display: flex;
  color: orange;

}

.el-menu-item.is-active {
  background-color: white !important;
}

.pic-text {
  display: flex;
  justify-content: center;
  margin-right: 50px;
}

/* logo样式 */
.logo {
  width: 50px;
  position: relative;
  top: 4px;
  left: 20px;
}

.text {
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 24px;
  font-weight: bold;
  margin-left: 25px;
}

.comment {
  display: flex;
  flex-direction: column;
}

.router-abc {
  background-color: #e5e5e5;
  margin: auto;
  width: 85%;
  height: 750px;
}

.foo {
  flex: 1;
  width: 100%;
  height: 5%;
}
</style>

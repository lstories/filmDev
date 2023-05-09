import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/view/Layout/Layout.vue";
import Cookies from "js-cookie";

Vue.use(VueRouter);

const router = new VueRouter({
  made: "hash",

  routes: [
    // ===========登录=========
    {
      path: "/login",
      name: "Login",
      component: () => import("@/view/Login/Login.vue"),
    },

    // =========首页==========
    {
      path: "/",
      name: "Layout",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "home",
          name: "Home",
          component: () => import("@/view/Home/HomeView.vue"),
        },

        // ==========User==========
        // 用户信息列表管理
        {
          path: "usermanger",
          name: "UserManger",
          component: () => import("@/view/User/UserManger.vue"),
        },
        // 添加用户
        {
          path: "adduser",
          name: "AddUser",
          component: () => import("@/view/User/AddUser.vue"),
        },
        // 编辑用户信息管理
        {
          path: "edituser",
          name: "EditUser",
          component: () => import("@/view/User/EditUser.vue"),
        },
        // 订单管理
        {
          path: "ordermanager",
          name: "OrderManager",
          component: () => import("@/view/Order/OrderManager.vue"),
        },

        // 电影分类列表
        {
          path: "categorylist",
          name: "categoryList",
          component: () => import("@/view/Category/List.vue"),
        },

        // 影片管理
        {
          path: "filmlist",
          name: "FilmList",
          component: () => import("@/view/Film/FilmList.vue"),
        },
        {
          path: "addfilm",
          name: "addFilm",
          component: () => import("@/view/Film/AddFilm.vue"),
        },
        {
          path: "editfilm",
          name: "EditFilm",
          component: () => import("@/view/Film/EditFilm.vue"),
        },
        // 影房管理
        {
          path: "rooms",
          name: "rooms",
          component: () => import("@/view/Rooms/RoomsList.vue"),
        },
        // 消息中心
        {
          path: "messagelist",
          name: "messagelist",
          component: () => import("@/view/Message/MessageList.vue"),
        },

      ],
    },
    {
      path: "*",
      name: "Four_0_Four",
      component: () => import("@/view/Layout/NF404.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") next();
  const admin = Cookies.get("admin");
  if (!admin && to.path !== "/login") return next("/login");
  // 访问 /home 的时候, 并且cookie里面存在数据,这时候我就直接放行
  next();
});

export default router;

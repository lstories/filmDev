import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/global.css";
import SlideVerify from "vue-monoplasty-slide-verify";

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.use(SlideVerify);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

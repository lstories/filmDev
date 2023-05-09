<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="block">
      <div class="radio">
        <span class="text">用户消费排行榜：</span>
      </div>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in activities"
          :show-overflow-tooltip="true"
          :key="index"
        >
          {{ item.name }}, 共消费{{ item.userNum }}次, 消费总金额为：{{ item.sumPrice }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import $http from "@/api/http.js";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Ranking",
  data() {
    return {
      activities: null,
    };
  },
  methods: { 
    getTenHeight() {
      $http.get("/orders/tenHeight").then((res) => {
        console.log('activities', res)
        this.activities = res.data;
      })
    }
  },
  created() {
    this.getTenHeight()
  }
};
</script>

<style scoped>
.block {
  background-color: #fff;
  width: 385px;
  height: 540px;
  padding: 5px;
  border-radius: 30px;
  margin-top: -320px;
}
.radio {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: coral;
  margin-left: 20px;
}

.text {
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>

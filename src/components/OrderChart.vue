<template>
  <div>
    <div id="order"></div>
  </div>
</template>

<script>
import $http from "@/api/http.js";
export default {
  data() {
    return {
      orderList: [],
    };
  },
  watch: {
    orderList: function () {
      this.chartOrder();
    },
  },
  methods: {
    getOrder() {
      $http.get("/orders/getMonTur").then((res) => {
        console.log(res)
        this.orderList = res.data;
      });
    },
    chartOrder() {
      var chartDom = document.getElementById("order");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "月份营业额"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.orderList.map((item) => item.month),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.orderList.map((item) => item.total_income),
            type: "line",
            areaStyle: {},
            color: 'skyblue'
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>

<style scoped>
#order {
  height: 300px;
  width: 330px;
}
</style>

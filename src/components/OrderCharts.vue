<template>
  <div>
    <div id="order-chart1"></div>
  </div>
</template>

<script>
import $http from "@/api/http.js";
export default {
  data() {
    return {
      ordersList: [],
    };
  },
  watch: {
    ordersList: function () {
      this.order();
    },
  },
  methods: {
    getOrder() { 
      $http.get("orders/getTurnover").then((res) => {
        this.ordersList = res.data
      })
    },

    order() {
      var chartDom = document.getElementById("order-chart1");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "周营业额",
        },
        xAxis: {
          type: "category",
          data: this.ordersList.map((item) => item.day),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.ordersList.map((item) => item.total_income),
            type: "line",
            smooth: true,
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
#order-chart1{
    height: 320px;
    width: 360px;
}    
    
</style>

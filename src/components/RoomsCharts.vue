<template>
  <div>
    <div id="rooms-charts"></div>
  </div>
</template>

<script>
import $http from "@/api/http.js";
export default {
  data() {
    return {
      roomData: [],
      total: 0,
    };
  },
  watch: {
    roomData: function () {
      this.rooms();
    },
  },
  methods: {

    getPrice() {
      $http.get("/room/price").then((res) => {
        this.roomData = res.data;
        this.total = this.roomData.length;
        console.log("res", this.roomData, this.total);
      });
    },

    rooms() {
      var chartDom = document.getElementById("rooms-charts");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "各类型收益面积图",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.roomData.map(item => item.styleBrand),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.roomData.map(item => item.total_amount),
            type: "line",
            areaStyle: {},
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.getPrice();
  },
};
</script>

<style scoped>
#rooms-charts {
  width: 530px;
  height: 280px;
}
</style>

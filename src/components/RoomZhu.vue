<template>
  <div>
    <div id="room-charts"></div>
  </div>
</template>

<script>
import $http from "@/api/http.js";
export default {
  data() {
    return {
      roomsData: [],
      total: 0,
    };
  },
  watch: {
    roomsData: function () {
      this.rooms();
    },
  },
  methods: {
    getPrice() {
      $http.get("/room/price").then((res) => {
        this.roomsData = res.data;
        this.total = this.roomsData.length;
        console.log("res", this.roomsData, this.total);
      });
    },

    rooms() {
      var chartDom = document.getElementById("room-charts");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        title: {
            text: "房间类型收益"
        },
        xAxis: {
          type: "category",
          data: this.roomsData.map(item => item.styleBrand),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.roomsData.map(item => item.total_amount),
            type: "bar",
            color: 'skyblue'
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
#room-charts {
  width: 530px;
  height: 280px;
}
</style>

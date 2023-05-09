<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import $http from "@/api/http";

export default {
  data() {
    return {
        cateList: null,
    };
  },
  methods: {
    // 获取数据
    getCate() { 
        $http.get("/").then((res) => {
        if (res.code === "200") {
          console.log(res);
          this.cateList = res.data
          console.log("18", typeof this.userNum[0]);
          console.log("7", typeof 7);
        }
      });
    },

    // 画图
    setPie() {
      var chartDom = document.getElementById("main");
      var myChart = this.$echarts.init(chartDom);
      var option;
      option = {
        title: [
          {
            text: "各影片类型数量极坐标柱状图",
          },
        ],
        polar: {
          radius: [30, "80%"],
        },
        angleAxis: {
          max: 4,
          startAngle: 75,
        },
        radiusAxis: {
          type: "category",
          data: ["a", "b", "c", "d"],
        },
        tooltip: {},
        series: {
          type: "bar",
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: "polar",
          label: {
            show: true,
            position: "middle",
            formatter: "{b}: {c}",
          },
        },
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.setPie();
  }
};
</script>

<style scoped>
#main {
    width: 700px;
    height: 270px;
}
</style>

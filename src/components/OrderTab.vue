<template>
  <div class="main-box">
    <div class="box">
      <div id="main"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    draw() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          text: "影房营业额",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            "浪漫(小)",
            "浪漫(中)",
            "休闲(小)",
            "休闲(中)",
            "豪华(中)",
            "豪华(大)",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "浪漫(小)",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "浪漫(中)",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "休闲(小)",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "休闲(中)",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "豪华(中)",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
          {
            name: "豪华(大)",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
    },
  },
  mounted() {
    this.draw();
  },
};
</script>

<style scoped>
.main-box {
  margin-top: -365px;
  margin-left: 400px;
}

.box {
  width: 880px;
  height: 360px;
  background-color: #fff;
  border-radius: 40px;
  padding: 20px;
  margin-top: 20px;

}

#main {
  width: 760px;
  height: 320px;
}
</style>

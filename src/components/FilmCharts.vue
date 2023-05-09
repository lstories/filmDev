<template>
  <div>
    <div id="abc"></div>
  </div>
</template>

<script>
import $http from "@/api/http.js";
export default {
  data() {
    return {
      filmData: [],
      total: 0
    };
  },
  watch: {
    filmData: function () {
      this.charts();
    },
  },
  methods: {
    // 获取数据
    getYear() {
      $http.get("/film/yearFilm").then((res) => {
        this.filmData = res.data;
        this.total = this.filmData.length;
        console.log("res", this.filmData, this.total);
      });
    },

    charts() {
      var chartDom = document.getElementById("abc");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "各年份电影数量面积图",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.filmData.map((item) => item.year),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.filmData.map((item) => item.movie_count),
            type: "line",
            areaStyle: {},
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  created() {
    this.getYear();
  },
};
</script>

<style scoped>
#abc {
  width: 380px;
  height: 300px;
}
</style>

<template>
  <div class="year">
    <div id="main"></div>
  </div>
</template>

<script>
import $http from "@/api/http.js";

export default {
  data() {
    return {
      yearList: [],
      total: 0,
    };
  },
  watch: {
    yearList: function () {
      this.drawn();
    },
  },
  methods: {
    getYear() {
      $http.get("/film/yearFilm").then((res) => {
        this.yearList = res.data;
        this.total = this.yearList.length;
        console.log("res", this.yearList, this.total);
      });
    },

    drawn() {
      var chartDom = document.getElementById("main");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "各年份电影数量曲线图",
        },
        xAxis: {
          type: "category",
          data: this.yearList.map((item) => item.year),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.yearList.map((item) => item.movie_count),
            type: "line",
            smooth: true,
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.getYear();
  },
  created() {},
};
</script>

<style scoped>
.year {
  width: 400px;
  height: 370px;
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
}
#main {
  width: 350px;
  height: 350px;
}
</style>

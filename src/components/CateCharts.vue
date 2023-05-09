<template>
  <div>
    <div id="cate-chars"></div>
  </div>
</template>

<script>
import $http from "@/api/http.js";
export default {
  data() {
    return {
      userData: [],
      orderList: [],
      filmData: [],
    };
  },

  watch: {
    userData: function () {
      this.charts();
    },
    orderList: function () {
      this.charts();
    },
    filmData: function() { 
      this.charts();
    }
  },

  methods: {
    // 用户月注册量
    getUserData() {
      $http.get("/user/getMonLogin").then((res) => {
        // console.log(res)
        this.userData = res.data;
      });
    },
    // 月营业额
    getOrder() {
      $http.get("/orders/getMonTur").then((res) => {
        console.log(res);
        this.orderList = res.data;
      });
    },
    // 今年每月上映的电影
    getFilm() {
      $http.get("/film/monthFilm").then((res) => {
        console.log(res);
        this.filmData = res.data;
      });
    },

    charts() {
      var chartDom = document.getElementById("cate-chars");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: [
            "每月用户新增数",
            "今年月营业额",
            "每月新增电影数",
          ],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.userData.map((item) => item.logonMonth),
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "每月用户新增数",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.userData.map((item) => item.logonCount),
          },
          {
            name: "今年月营业额",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.orderList.map((item) => item.total_income),
          },
          {
            name: "每月新增电影数",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.filmData.map((item) => item.filmCount),
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.getUserData();
    this.getOrder();
    this.getFilm();
  },
};
</script>

<style scoped>
#cate-chars {
  width: 720px;
  height: 350px;
}
</style>

<template>
  <div class="hello">
    <div class="myChart">
      <div id="myChart" :style="{ width: '600px', height: '300px' }"></div>
      <div>
        <!-- 2018年-2023年共新增注册用户: <input type="text" v-model="sum"> -->
      </div>
    </div>
    <div class="pieChart">
      <br>
      <span style="padding-left: 40px; margin-top: 20px;">用户新增年数据占比</span>
      <div id="pieChart" :style="{ width: '300px', height: '300px' }"></div>
    </div>
  </div>
</template>

<script>
import $http from "@/api/http";
export default {
  name: "outerErrorStatus",
  data() {
    return {
      userNum: [],
      sum: 0,
    };
  },
  mounted() {
    this.drawLine();
    this.drawPie();
  },
  created() {
    this.getUserList18();
    this.getUserList19();
    this.getUserList20();
    this.getUserList21();
    this.getUserList22();
  },
  methods: {
    getUserList18() {
      $http.get("/user/year18").then((res) => {
        if (res.code === "200") {
          console.log(res);
          this.userNum[0] = res.data.length;
          console.log("18", typeof this.userNum[0]);
          console.log("7", typeof 7);
        }
      });
    },
    getUserList19() {
      $http.get("/user/year19").then((res) => {
        if (res.code === "200") {
          console.log(res);
          this.userNum[1] = res.data.length;
        }
      });
    },
    getUserList20() {
      $http.get("/user/year20").then((res) => {
        if (res.code === "200") {
          console.log(res);
          this.userNum[2] = res.data.length;
        }
      });
    },
    getUserList21() {
      $http.get("/user/year21").then((res) => {
        if (res.code === "200") {
          console.log(res);
          this.userNum[3] = res.data.length;
        }
      });
    },
    getUserList22() {
      $http.get("/user/year22").then((res) => {
        if (res.code === "200") {
          console.log(res);
          this.userNum[4] = res.data.length;
        }
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "用户注册数据表",
        },
        tooltip: {},
        xAxis: {
          data: ["2018", "2019", "2020", "2021", "2022", "2023"],
          itemStyle: {
            barBorderRadius: 5,
            borderWidth: 1,
            borderType: "solid",
            borderColor: "#73c0de",
            shadowColor: "#5470c6",
            shadowBlur: 3,
          },
        },
        yAxis: {},
        series: [
          {
            name: "用户注册数据表",
            type: "bar",
            data: this.userNum,
            itemStyle: {
              barBorderRadius: 5,
              borderWidth: 1,
              borderType: "solid",
              borderColor: "#73c0de",
              shadowColor: "#5470c6",
              color: "#5470c6",
              shadowBlur: 3,
            },
          },
        ],
      });
      // 请求23年的数据, 并重新赋值给表格
      $http.get("/user/year23").then((res) => {
        if (res.code === "200") {
          console.log(res);
          this.userNum[5] = res.data.length;
        }
        myChart.setOption({
          yAxis: {},
          series: [
            {
              name: "新增用户量",
              type: "bar",
              data: this.userNum,
            },
          ],
        });
      });
    },

    // 画饼状图
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      let pieChart = this.$echarts.init(document.getElementById("pieChart"));
      pieChart.setOption({
        series: [
          {
            name: "访问来源",
            type: "pie", // 设置图表类型为饼图
            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [
              // 数据数组，name 为数据项名称，value 为数据项值
              { value: this.userNum[0], name: "2018" },
              { value: this.userNum[1], name: "2019" },
              { value: this.userNum[2], name: "2020" },
              { value: this.userNum[3], name: "2021" },
              { value: this.userNum[4], name: "2022" },
              { value: 200, name: "2023" },
            ],
          },
        ],
      });

      $http.get("/user/year23").then((res) => {
        if (res.code === "200") {
          console.log(res);
          this.userNum[5] = res.data.length;
        }
        pieChart.setOption({
          series: [
            {
              data: [
                // 数据数组，name 为数据项名称，value 为数据项值
                { value: this.userNum[0], name: "2018" },
                { value: this.userNum[1], name: "2019" },
                { value: this.userNum[2], name: "2020" },
                { value: this.userNum[3], name: "2021" },
                { value: this.userNum[4], name: "2022" },
                { value: 200, name: "2023" },
              ],
            },
          ],
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
}
.myChart {
  width: 580px;
  height: 350px;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 40px;
}
#myChart {
  margin-left: 15px;
  padding-top: 10px;
}
.pieChart {
  width: 300px;
  height: 350px;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 40px;
  margin-left: 20px;
  margin-right: 10px  ;
}
</style>

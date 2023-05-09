<template>
  <div class="_404">
    <h2 class="m-0">
      <span>抱歉，页面未找到，请点击跳转到&nbsp;</span>
      <a href="javascript:;" @click="goHome" style="color: coral;">首页</a>
    </h2>
    <img src="@/assets/image/404.png" alt="页面未找到" />
  </div>
</template>

<script>
export default {
  name: "NF404",
  data() {
    return {

    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
  created() {

  },
};
</script>

<style scoped>
._404 {
  width: 30%;
  margin: 5rem auto;
}

._404 img {
  width: 30rem;
}

._404 a {
  color: #010101;
}

._404 a:hover {
  color: skyblue;
}
</style>
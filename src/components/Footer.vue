<template>
  <div class="footer">
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Footer",
    data() {
        return {
            name: "lizhi © lstories@163.com"
        }
    },
}
</script>

<style scoped>
    .footer {
        background-color: #fff;
        height: 35px;
        line-height: 35px;
        padding-left: 50px;
        border-radius: 10px 10px 0 0;
    }

    .name {
        background: linear-gradient(to right, red, blue);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

</style>
<template>
  <div class="main-view" style="text-align: center">
    <h2 style="text-align: center;margin-top: 10px">404</h2>
    <p style="text-align: center;margin-top: 10px">这部分我们还没开发，请和管理员联系</p>
    <img alt="working" :src="img_url">
  </div>
</template>

<script>
export default {
  name: "CannotLogin",
  data() {
    return {
      img_url: require("../../assets/working.jpg")
    }
  }
}
</script>

<style scoped>
.main-view {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
</style>

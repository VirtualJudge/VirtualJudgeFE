<template>
  <div class="main-view">
    <h2>{{ $t('pages.help.help') }}</h2>
    <p>本网站使用<a target="_blank" href="https://cn.gravatar.com/">Gravatar</a>头像</p>
  </div>
</template>

<script>

export default {
  name: "Help",
  mounted() {
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

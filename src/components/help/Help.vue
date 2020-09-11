<template>
  <div class="main-view">
    <h2>{{ $t('pages.help.help') }}</h2>
    <ul>
      <li><p>本网站使用<a target="_blank" href="https://cn.gravatar.com/">Gravatar</a>头像</p>
      </li>
      <li><p>推荐使用
        <a target="_blank" href="https://www.google.cn/chrome/">Google Chrome</a>
        或者
        <a target="_blank" href="https://www.microsoft.com/zh-cn/edge">Microsoft Edge</a>
        或者
        <a target="_blank" href="https://www.mozilla.org/zh-CN/firefox/">Mozilla Firefox</a>
        浏览器访问本网站（<strong>排名分先后</strong>）</p>
      </li>
    </ul>


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

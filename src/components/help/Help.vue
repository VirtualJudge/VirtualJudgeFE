<template>
  <div class="main-view">

    <h2>帮助信息</h2>
    <ul style="margin-top: 10px">
      <li class="help-li">
        <p>本网站使用<a
            target="_blank"
            href="https://cn.gravatar.com/"
          >Gravatar</a>头像</p>
      </li>
      <li class="help-li">
        <p>推荐使用
          <a
            target="_blank"
            href="https://www.google.cn/chrome/"
          >Google Chrome</a>
          或者
          <a
            target="_blank"
            href="https://www.microsoft.com/zh-cn/edge"
          >Microsoft Edge</a>
          或者
          <a
            target="_blank"
            href="https://www.mozilla.org/zh-CN/firefox/"
          >Mozilla Firefox</a>
          浏览器访问本网站（<strong>排名分先后</strong>）
        </p>
      </li>
    </ul>
    <h2>关于此平台</h2>
    <ul style="margin-top: 10px">
      <li class="help-li">项目源码 <a
          target="_blank"
          href="https://github.com/VirtualJudge"
        >https://github.com/VirtualJudge</a></li>
    </ul>
  </div>
</template>

<script>


export default {
  name: "Help"
}
</script>

<style scoped>
.main-view {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
.help-li {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>

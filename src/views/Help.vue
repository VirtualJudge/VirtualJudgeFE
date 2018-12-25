<template>
  <Card style="margin: 10px;min-height: 400px">
    <p slot="title">
      <Icon type="md-alert"></Icon>
      帮助
    </p>
    <ul>
      <li><p>欢迎使用Virtual Judge</p></li>
      <li>
        <p>欢迎关注此项目，<a target="_blank" href="https://github.com/VirtualJudge/VirtualJudge">GitHub</a>
        </p>
      </li>
    </ul>
  </Card>
</template>

<script>
  export default {
    name: "Help",
    data() {
      return {}
    },
    mounted() {
      document.title = '帮助';
    }
  }
</script>

<style scoped>
  ul li {
    list-style-type: none;
    padding: 20px;
  }
</style>

<template>
  <div style="text-align: center;font-size: 14px">
    <p>Inspired by <a href="https://qduoj.com">QDUOJ</a>.</p>
    <p>Powered by <a href="https://github.com/VirtualJudge">Virtual Judge</a>.</p>
    <p>All Copyright Reserved &copy; {{year}}. Designer and developer: <a href="mailto:xudian.cn@gmail.com">PrefixAI</a></p>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "Footer",
    data() {
      return {
        year: null
      }
    },
    mounted(){
      this.year = moment.utc().local().format('YYYY')
    }
  }
</script>

<style scoped>

</style>

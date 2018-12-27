<template>
  <Tag :color="color">{{verdict}}</Tag>
</template>

<script>
  export default {
    name: "Verdict",
    data() {
      return {
        color: 'default',
      }
    },
    props: {
      verdict: {
        required: false,
        default: ''
      },
      verdict_code: {
        required: false,
        default: ''
      }
    },
    mounted() {
      this.init()
    },
    updated() {
      this.init()
    },
    methods: {
      init() {
        let color_list = {
          'Accepted': 'success',
          'Running': 'primary',
          'Compile Error': 'warning',
          'Result Error': 'error',
          'Submit Failed': '#FFA2D3'
        }
        if (color_list[this.verdict_code]) {
          this.color = color_list[this.verdict_code]
        }
      }
    }
  }
</script>

<style scoped>

</style>

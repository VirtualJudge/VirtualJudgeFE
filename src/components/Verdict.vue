<template>
  <Tag v-if="verdict==='Running' && reloadable" @click.native="handleClick" :color="color">
    <Icon type="md-refresh"/>
    {{verdict_info}}
  </Tag>
  <Tag v-else :color="color">
    {{verdict_info}}
  </Tag>
</template>

<script>
  import api from '@/api'
  export default {
    name: "Verdict",
    data() {
      return {
        color: '#FFA2D3',
      }
    },
    props: {
      submission_id: {
        required: true,
      },
      reloadable: {
        required: false,
        default: false
      },
      verdict: {
        required: false,
        default: ''
      },
      verdict_info: {
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
      handleClick() {
        console.log(this.submission_id, this.reloadable, this.verdict, this.verdict_info)
        api.reloadSubmission(this.submission_id).then(res=>{
          console.log(res);
          this.$emit('click')
        })
      },
      init() {
        let color_list = {
          'AC': 'success',
          'Running': 'primary',
          'CE': 'warning',
          'WA': 'error',
        }
        if (color_list[this.verdict]) {
          this.color = color_list[this.verdict]
        }
      }
    }
  }
</script>

<style scoped>

</style>

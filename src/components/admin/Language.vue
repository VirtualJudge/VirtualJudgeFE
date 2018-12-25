<template>
  <div>
    <Button type="primary" @click="updateLanguage">更新</Button>
    <Divider/>
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    name: "Language",
    data() {
      return {
        columns: [{
          title: '平台', key: 'oj_name'
        }, {
          title: '键', key: 'oj_language'
        }, {
          title: '值', key: 'oj_language_name'
        }],
        data: []
      }
    },
    mounted() {
      this.getLanguages()
    },
    methods: {
      updateLanguage() {
        api.updateLanguageAdmin({}, {}).then(res => {
          this.$Message.success('更新成功')
        }, res => {
          this.$Message.error('更新失败')
        })
      },
      getLanguages() {
        api.getLanguageAdmin().then(res => {
          if (res.data.status === 0) {
            this.data = res.data.data
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>

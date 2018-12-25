<template>
  <div>
    <Form :label-width="120">
      <FormItem label="链接">
        <a>{{url}}</a>

      </FormItem>
      <FormItem label="统计">
        <p>{{count}}</p>
      </FormItem>

      <Divider/>
      <FormItem label="更新链接">
        <Input type="text" v-model="new_url" style="width: 500px" clearable>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submitData">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    name: "WebHook",
    data() {
      return {
        url: '',
        count: 0x12231,
        new_url: ''
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        api.getHook().then(res => {
          if (res.data.status === 0) {
            this.url = res.data.data.hook
            this.count = res.data.data.hook_times
          }
        })
      },
      submitData() {
        api.updateHook({
          hook: this.new_url
        }).then(res => {
          this.$Message.success('提交成功')
          this.getData()
        }, res => {
          this.$Message.error('提交失败')
        })
      }
    }
  }
</script>

<style scoped>

</style>

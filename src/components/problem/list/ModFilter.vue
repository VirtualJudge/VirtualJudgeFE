<template>
  <div>
    <Card dis-hover>
      <p slot="title">筛选</p>
      <Form label-position="right" :label-width="50">
        <FormItem label="编号">
          <label>
            <Input v-model="formItem.id"/>
          </label>
        </FormItem>
        <FormItem label="标题">
          <label>
            <Input v-model="formItem.title"/>
          </label>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handlerFilter" class="btn">
            提交
          </Button>
        </FormItem>
      </Form>
    </Card>

  </div>
</template>

<script>
export default {
  name: "ModFilter",
  data() {
    return {
      formItem: {
        id: '',
        title: ''
      }
    }
  }, methods: {
    handlerFilter() {
      this.$emit('handlerFilter')
    }
  }
}
</script>

<style scoped>

</style>

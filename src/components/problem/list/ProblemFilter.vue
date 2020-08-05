<template>
  <div>
    <Card dis-hover>
      <p slot="title">筛选</p>
      <Form label-position="right" :label-width="50">
        <FormItem label="编号">
          <label>
            <Input v-model="tableFilters.id"/>
          </label>
        </FormItem>
        <FormItem label="标题">
          <label>
            <Input v-model="tableFilters.title"/>
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
  name: "ProblemFilter",
  props: {
    tableFilters: {
      id: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    }
  },
  methods: {
    handlerFilter() {
      this.$emit('handlerFilter')
    }
  }
}
</script>

<style scoped>

</style>

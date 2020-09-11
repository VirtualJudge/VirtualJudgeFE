<template>
  <div>
    <Card dis-hover>
      <Form label-position="right" :label-width="50">
        <FormItem label="编号">
          <label>
            <Input type="number" v-model="tableFilters.id"/>
          </label>
        </FormItem>
        <FormItem label="标题">
          <label>
            <Input v-model="tableFilters.title"/>
          </label>
        </FormItem>
        <FormItem label="来源">
          <label>
            <Input v-model="tableFilters.source"/>
          </label>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="buttonLoading" @click="handlerFilter" class="btn">
            筛选
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
    buttonLoading: {
      type: Boolean,
      default: false
    },
    tableFilters: {
      id: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      source: {
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

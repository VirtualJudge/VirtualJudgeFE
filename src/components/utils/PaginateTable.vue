<template>
  <Card dis-hover>
    <Page :disabled="tableLoading"
          :total="total"
          :current="current"
          :page-size="page_size"
          :page-size-opts="page_size_opts"
          size="small"
          show-total
          show-sizer
          style="margin-bottom: 10px;"/>
    <Table :context-menu="true"
           :columns="columns"
           :data="data"
           @on-row-click="handleRowClick"
           :loading="tableLoading"></Table>
    <Page
        :disabled="tableLoading"
        :total="total"
        :current="current"
        :page-size="page_size"
        :page-size-opts="page_size_opts"
        size="small"
        show-total show-sizer
        style="margin-top: 10px;"/>
  </Card>
</template>

<script>
export default {
  name: "ModTable",
  props: {
    tableLoading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 1
    },
    page_size: {
      type: Number,
      default: 10,
    },
    page_size_opts: {
      type: Array,
      default: function () {
        return [10, 20, 50, 100]
      }
    }
  },
  methods: {
    handleRowClick(params) {
      if (params.public === 2) {
        this.$Message.error('不可查看')
      } else if (params.public === 1) {
        this.$Message.info('不可提交')
      } else {
        this.$Message.success(params.title)
      }

    }
  }
}
</script>

<style scoped>

</style>

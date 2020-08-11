<template>
  <Card dis-hover>
    <Page :disabled="tableLoading"
          :total="total"
          :current="current"
          :page-size="page_size"
          :page-size-opts="page_size_opts"
          :transfer="true"
          size="small"
          @on-change="onPageChange"
          @on-page-size-change="onPageSizeChange"
          show-total
          show-sizer
          style="margin-bottom: 10px;"/>
    <Table :context-menu="true"
           :columns="columns"
           :data="data"
           @on-row-click="handleRowClick"
           :loading="tableLoading"></Table>
    <Page
        :transfer="true"
        :disabled="tableLoading"
        :total="total"
        :current="current"
        :page-size="page_size"
        :page-size-opts="page_size_opts"
        @on-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        size="small"
        show-total show-sizer
        style="margin-top: 10px;"/>
  </Card>
</template>

<script>
export default {
  name: "PaginateTable",
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
    onPageChange(data) {

      this.$emit('on-page-change', data)
    },
    onPageSizeChange(data) {
      this.$emit('on-page-size-change', data)
    },
    handleRowClick(params) {
      this.$emit('on-row-click', params)
    }
  }
}
</script>

<style scoped>

</style>

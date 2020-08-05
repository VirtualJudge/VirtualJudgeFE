<template>
  <div class="main-view">
    <h2 style="text-align: center">题目列表</h2>
    <Row style="margin-top: 10px">
      <Col span="16">
        <ModTable
            v-bind:total="total"
            v-bind:page_size="page_size"
            v-bind:page_size_opts="page_size_opts"
            v-bind:data="data"
            v-bind:columns="columns"
            v-bind:current="current"
            v-bind:tableLoading="tableLoading"/>
      </Col>
      <Col span="8" style="padding-left: 20px">
        <ModFilter @handlerFilter="handlerFilter"/>
      </Col>
    </Row>

  </div>
</template>

<script>
import ModTable from "@/components/utils/PaginateTable";
import ModFilter from "@/components/problem/list/ProblemFilter";

export default {
  name: "ProblemList",
  components: {ModFilter, ModTable},
  data() {
    return {
      tableLoading: false,
      total: 0,
      page_size: 10,
      page_size_opts: [10, 20, 50, 100],
      columns: [{
        title: '编号',
        key: 'id'
      }, {
        title: '标题',
        key: 'title'
      }],
      data: [{'id': 1, 'title': 'A+B'}],
      current: 1
    }
  }, mounted() {
    // TODO: 这里处理题目表格数据的初始化。
  },
  methods: {
    handlerFilter() {
      // TODO: 这里处理题目筛选操作。
      this.tableLoading = !this.tableLoading
    }
  }
}
</script>

<style scoped>
.main-view {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
</style>

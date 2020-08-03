<template>
  <div class="main-view">
    <h2 style="text-align: center">题目列表</h2>
    <Row style="margin-top: 10px">
      <Col span="16">
        <ModTable v-bind:tableLoading="tableLoading"/>
      </Col>
      <Col span="8" style="padding-left: 20px">
        <ModFilter @handlerFilter="handlerFilter"/>
      </Col>
    </Row>

  </div>
</template>

<script>
import ModTable from "@/components/problem/list/ModTable";
import ModFilter from "@/components/problem/list/ModFilter";

export default {
  name: "ProblemList",
  components: {ModFilter, ModTable},
  data() {
    return {
      tableLoading: true
    }
  }, methods: {
    handlerFilter() {
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

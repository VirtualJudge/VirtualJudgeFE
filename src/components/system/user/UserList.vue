<template>
  <PaginateTable
      v-bind:total="total"
      v-bind:page_size="page_size"
      v-bind:data="data"
      v-bind:columns="columns"
      v-bind:current="current"
      v-bind:tableLoading="tableLoading"/>
</template>

<script>
import PaginateTable from "@/components/utils/PaginateTable";

export default {
  name: "ManageUserList",
  components: {PaginateTable},
  data(){
    return {
      tableLoading: false,
      data: [],
      columns: [],
      page_size: 10,
      total: 0,

    }
  }
}
</script>

<style scoped>

</style>

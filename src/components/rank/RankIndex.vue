<template>
  <div class="main-view">
    <h2 style="text-align: center">排行列表</h2>
    <PaginateTable style="margin-top: 10px"
                   @on-page-size-change="onPageSizeChange"
                   @on-page-change="onPageChange"
                   :table-loading="tableLoading"
                   :page_size="page_size"
                   :current="current"
                   :data="tData"
                   :total="total"
                   :columns="columns"/>
  </div>
</template>

<script>
import PaginateTable from "@/components/utils/PaginateTable";
import api from "@/utils/api";

export default {
  name: "RankIndex",
  components: {PaginateTable},
  data() {
    return {
      page_size: 10,
      current: 1,
      tData: [],
      total: 0,
      columns: [
        {
          title: '序号',
          render: (h, params) => {
            return h('span', params.index + 1 + (this.current - 1) * this.page_size)
          }
        },
        {
          title: '用户名',
          key: 'username',
          render: (h, params) => {
            return h('span', {
              style: {
                color: '#3399ff',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.$router.push(`/user/${params.row.id}`)
                }
              }
            }, params.row.username)
          }
        },
        {
          title: '通过',
          key: 'total_passed',
          width: 100
        },
        {
          title: '提交',
          key: 'total_submitted',
          width: 100
        },
        {
          title: 'AC',
          key: 'total_accepted',
          width: 100
        }
      ],
      tableLoading: false
    }
  },
  mounted() {
    this.updateTableData()
  },
  methods: {
    updateTableData() {
      this.tableLoading = true
      api.getUserRank({
        page: this.current,
        page_size: this.page_size
      }).then(res => {
        if (res.data.err === null) {
          this.tData = res.data.data.results || []
          this.total = res.data.data.count || 0
        }
        this.tableLoading = false
      })
    },
    onPageSizeChange(page_size) {
      this.page_size = page_size
      this.updateTableData()
    },
    onPageChange(page) {
      this.current = page
      this.updateTableData()
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

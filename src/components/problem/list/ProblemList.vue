<template>
  <div class="main-view">
    <h2 style="text-align: center">题目列表</h2>
    <Row style="margin-top: 10px">
      <Col span="18">
        <PaginateTable
            @on-page-change="onPageChange"
            @on-page-size-change="onPageSizeChange"
            v-bind:total="total"
            v-bind:page_size="page_size"
            v-bind:data="data"
            v-bind:columns="columns"
            v-bind:current="current"
            v-bind:tableLoading="tableLoading"/>
      </Col>
      <Col span="6" style="padding-left: 20px">
        <ProblemFilter v-bind:tableFilters="table_filters" v-bind:buttonLoading="tableLoading"
                       @handlerFilter="handlerFilter"/>
      </Col>
    </Row>

  </div>
</template>

<script>
import PaginateTable from "@/components/utils/PaginateTable";
import ProblemFilter from "@/components/problem/list/ProblemFilter";
import api from "@/utils/api";
import {PROBLEM_PUBLIC_TYPE} from "@/utils/constant";
import message from "@/utils/message";

export default {
  name: "ProblemList",
  components: {ProblemFilter, PaginateTable},
  data() {
    return {
      tableLoading: false,
      total: 0,
      page_size: 50,
      columns: [
        {
          title: this.$t('pages.problem.number'),
          key: 'id',
          align: 'center',
          maxWidth: 100
        },
        {
          align: 'center',
          title: this.$t('pages.problem.title'),
          render: (h, params) => {
            return h('span', {
              style: {
                color: '#3399ff',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.$router.push(`/problem/${params.row.id}`)
                }
              }
            }, params.row.title)
          }
        },
        {
          align: 'center',
          title: this.$t('pages.problem.source'),
          key: 'source',
          ellipsis: true,
        }, {
          maxWidth: 100,
          title: '题目权限',
          align: 'center',
          render: (h, params) => {
            return h('Icon', {
              props: {
                type: PROBLEM_PUBLIC_TYPE[params.row.public].iconType,
                color: PROBLEM_PUBLIC_TYPE[params.row.public].color
              }
            }, params.row.public)
          }
        },
        {
          maxWidth: 120,
          align: 'center',
          title: this.$t('pages.problem.ac/submit'),
          render: (h, params) => {
            return h('span', `${params.row.total_accepted}/${params.row.total_submitted}`)
          }
        }],
      data: [],
      current: 1,
      table_filters: {
        id: '',
        title: '',
        source: ''
      }
    }
  }, mounted() {
    // TODO: 这里处理题目表格数据的初始化。
    this.requestTableData()
  },
  methods: {
    requestTableData() {
      this.tableLoading = true
      api.getProblemList({
        page: this.current,
        page_size: this.page_size,
        id: this.table_filters.id,
        title: this.table_filters.title,
        source: this.table_filters.source
      }).then((res) => {
        if (res.data.err == null) {
          this.data = res.data.data.results || []
          this.total = res.data.data.count || 0
          this.tableLoading = false
        } else {
          this.$Message.error(message.err(res.data.err));
          this.tableLoading = false
        }
      })
    },
    onPageChange(page_number) {
      this.current = page_number
      this.requestTableData()
    },
    onPageSizeChange(page_size) {
      this.page_size = page_size
      this.current = 1
      this.requestTableData()
    },
    handlerFilter() {
      this.current = 1
      this.requestTableData()
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

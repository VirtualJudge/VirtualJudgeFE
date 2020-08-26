<template>
  <div class="main-view">
    <h2 style="text-align: center">题目列表</h2>
    <PaginateTable
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        v-bind:total="total"
        v-bind:page_size="page_size"
        v-bind:data="data"
        v-bind:columns="columns"
        v-bind:current="current"
        v-bind:tableLoading="tableLoading"/>
    <Button type="success" style="margin-top: 10px" @click="handleAddClick">
      <Icon type="md-add"/>
      新增
    </Button>
  </div>
</template>

<script>
import PaginateTable from "@/components/utils/PaginateTable";
import api from "@/utils/api";
import message from "@/utils/message";

export default {
  name: "ManageProblem",
  components: {PaginateTable},
  data() {
    return {
      tableLoading: false,
      total: 0,
      page_size: 10,
      columns: [{
        title: '编号',
        key: 'id',
        width: 100
      }, {
        title: '标题',
        key: 'title',
        render: (h, params) => {
          return h('a', {
            on: {
              click: () => {
                window.open(`/problem/${params.row.id}`)
              }
            }
          }, params.row.title)
        }
      }, {
        title: '权限',
        key: 'public',
        width: 200,
        render: (h, params) => {
          return h('Select', {
            props: {
              transfer: true,
              value: params.row.public,
              size: 'small'
            }
          }, [
            h('Option', {
              props: {
                value: 0
              }
            }, '查看且提交'),
            h('Option', {
              props: {
                value: 1
              }
            }, '仅查看'),
            h('Option', {
              props: {
                value: 2
              }
            }, '不允许查看和提交'),
          ])
        }
      }, {
        title: '操作',
        width: 250,
        render: (h, params) => {
          return h('div', {}, [
            h('Button', {
              props: {
                type: 'warning',
                size: 'small'
              }, style: {
                marginLeft: '5px'
              }, on: {
                click: () => {
                  this.$router.push(`/system/update_problem/${params.row.id}`)
                }
              }
            }, '修改'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginLeft: '5px'
              },
              on: {
                click: () => {
                  this.handleProblemDelete(params.row.id)
                }
              }
            }, '删除')
          ])
        }
      }],
      data: [],
      current: 1,
      table_filters: {
        id: '',
        title: ''
      }
    }
  }, mounted() {
    this.requestTableData()
  },
  methods: {
    requestTableData() {
      this.tableLoading = true
      api.getProblemList({
        page: this.current,
        page_size: this.page_size,
        id: this.table_filters.id,
        title: this.table_filters.title
      }).then(res => {
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
      this.requestTableData()
    },
    handleAddClick() {
      this.$router.push('/system/add_problem')
    },
    handleProblemDelete(id) {
      api.deleteProblemDestroy(id).then(res => {
        if (res.data.err == null) {
          this.requestTableData()
          this.$Message.success('删除成功')
        } else {
          this.$Message.error('删除失败，' + message.err(res.data.err))
        }
      })
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

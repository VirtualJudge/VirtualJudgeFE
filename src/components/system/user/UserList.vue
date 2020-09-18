<template>
  <PaginateTable
      @on-page-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
      v-bind:total="total"
      v-bind:page_size="page_size"
      v-bind:data="data"
      v-bind:columns="columns"
      v-bind:current="current"
      v-bind:tableLoading="tableLoading"/>
</template>

<script>
import PaginateTable from "@/components/utils/PaginateTable";
import api from "@/utils/api";
import message from "@/utils/message";

export default {
  name: "ManageUserList",
  components: {PaginateTable},
  data() {
    return {
      tableLoading: false,
      data: [],
      columns: [
        {
          key: 'id',
          title: '编号',
          width: 100
        },
        {
          key: 'username',
          title: '用户名',
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
          key: 'email',
          title: '邮箱'
        },
        {
          title: '禁用',
          width: 100,
          render: (h, params) => {
            if (this.data[params.index].ban) {
              return h('Icon', {
                props: {
                  type: 'md-checkmark-circle',
                  color: '#ed4014',
                  size: 'large'
                },
                on: {
                  click: () => {
                    this.handleItemUpdate(params.index, {
                      ban: !this.data[params.index].ban
                    })
                  }
                }
              })
            } else {
              return h('Icon', {
                props: {
                  type: 'md-close-circle',
                  color: '#19be6b',
                  size: 'large'
                },
                on: {
                  click: () => {
                    this.handleItemUpdate(params.index, {
                      ban: !this.data[params.index].ban
                    })
                  }
                }
              })
            }
          }
        },
        {
          title: '管理员',
          width: 100,
          render: (h, params) => {
            if (this.data[params.index].is_superuser) {
              return h('Icon', {
                props: {
                  type: 'md-checkmark-circle',
                  color: '#19be6b',
                  size: 'large'
                },
                on: {
                  click: () => {
                    this.handleItemUpdate(params.index, {
                      is_superuser: !this.data[params.index].is_superuser
                    })
                  }
                }
              })
            } else {
              return h('Icon', {
                props: {
                  type: 'md-close-circle',
                  color: '#ed4014',
                  size: 'large'
                },
                on: {
                  click: () => {
                    this.handleItemUpdate(params.index, {
                      is_superuser: !this.data[params.index].is_superuser
                    })
                  }
                }
              })
            }
          }
        },
        {
          title: '操作',
          maxWidth: 200,
          render: (h, params) => {
            return h('Poptip', {
              props: {
                transfer: true,
                confirm: true,
                title: '提醒',
                content: '确认删除？',
              },
              on: {
                'on-ok': () => {
                  api.postAdvancedUserPasswordUpdate(params.row.id).then(res => {
                    if (res.data.err === null && res.data.data.new_password !== null) {
                      this.$copyText(res.data.data.new_password).then(() => {
                        this.$Message.success({
                          duration: 3,
                          content: `新密码 ${res.data.data.new_password} 已复制到剪切板`,
                        })
                      })
                    } else {
                      this.$Message.error('提交失败')
                    }
                  })
                }
              }
            }, [h('Button', {
              props: {
                disabled: this.data[params.index].is_superuser,
                type: 'info'
              }
            }, '重置密码')])
          }
        }
      ],
      page_size: 10,
      total: 0,
      current: 1
    }
  },
  mounted() {
    this.requestTableData()
  },
  methods: {
    requestTableData() {
      this.tableLoading = true
      api.getAdvancedUserList({
        page_size: this.page_size,
        page: this.current
      }).then(res => {
        if (res.data.err === null) {
          this.data = res.data.data.results || []
          this.total = res.data.data.count || 0
        }
        this.tableLoading = false
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
    handleItemUpdate(index, request_data) {
      api.patchAdvancedUserUpdate(this.data[index].id, request_data).then(res => {
        if (res.data.err === null) {
          this.$Message.success('修改成功')
          for (let item in request_data) {
            if (Object.prototype.hasOwnProperty.call(request_data, item)) {
              this.data[index][item] = request_data[item]
            }
          }
        } else {
          this.$Message.error(message.err(res.data.err))
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

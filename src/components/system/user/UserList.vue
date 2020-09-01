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
          title: '用户名'
        },
        {
          key: 'email',
          title: '邮箱'
        },
        {
          title: '激活',
          width: 100,
          render: (h, params) => {
            return h('Select', {
              props: {
                transfer: true,
                value: params.row.activated ? 'true' : 'false'
              },

              on: {
                'on-change': (value) => {
                  console.log(value)
                  this.$Message.success(value)
                  params.row.activated = value
                  this.handleItemUpdate(params.row.id, {
                    activated: value === 'true'
                  })
                }
              }
            }, [
              h('Option', {
                props: {
                  value: 'true'
                }
              }, '是'),
              h('Option', {
                props: {
                  value: 'false'
                }
              }, '否'),
            ])
          }
        },
        {
          title: '禁用',
          width: 100,
          render: (h, params) => {
            return h('span', params.row.ban ? '是' : '否')
          }
        },
        {
          title: '管理员',
          width: 100,
          render: (h, params) => {
            return h('span', params.row.is_superuser ? '是' : '否')
          }
        }
      ],
      page_size: 10,
      total: 0,
      current: 1
    }
  },
  mounted() {
    api.getAdvancedUserList().then(res => {
      if (res.data.err === null) {
        this.data = res.data.data.results
      }
    })
  },
  methods: {
    handleItemUpdate(user_id, request_data) {
      api.patchAdvancedUserUpdate(user_id, request_data).then(res => {
        if (res.data.err === null) {
          this.$Message.success('修改成功')
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

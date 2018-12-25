<template>
  <div>
    <Form ref="formInline" :model="formInline" inline>
      <FormItem>
        <Select v-model="formInline.platform" style="width:200px">
          <Option v-for="item in supports" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="username">
        <Input type="text" v-model="formInline.username" placeholder="账号">
          <Icon type="md-person" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="密码">
          <Icon type="md-lock" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="loading" @click="updateAccount">
          <span v-if="!loading">添加</span>
          <span v-else>等待中...</span>
        </Button>
      </FormItem>
    </Form>
    <Divider/>
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    name: "Account",
    data() {
      return {
        columns: [
          {
            title: '平台',
            key: 'platform',
            align: "center",
            sortable: true
          },
          {
            title: '账号',
            key: 'username',
            align: "center",
            sortable: true
          },
          {
            title: '密码',
            align: "center",
            key: 'password',
            render: (h, params) => {
              return h('Tooltip', {
                props: {
                  content: params.row.password
                },
              }, '查看密码')
            }
          },
          {
            title: 'Cookies',
            key: 'cookies',
            align: "center",
            render: (h, params) => {
              if (params.row.cookies) {
                return h('Poptip', {
                  props: {
                    'max-width': 200,
                    'content': JSON.stringify(params.row.cookies),
                  }
                }, [h('Button', {}, '查看Cookies')])
              }
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'error'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      closable: true,
                      content: '确认删除这个账号吗?',
                      onOk: () => {
                        api.deleteSpiderAccount(params.row.platform, params.row.username).then(res => {
                          this.getAccounts()
                        })
                      },
                      onCancel: () => {
                        this.$Modal.remove()
                      }

                    })
                  }
                }
              }, '删除')
            }
          }
        ],
        data: [],
        formInline: {
          platform: '',
          username: '',
          password: ''
        },
        supports: [],
        loading: false
      }
    },
    mounted() {
      this.getSupport()
      this.getAccounts()
    },
    methods: {
      updateAccount() {
        api.updateSpiderAccount({
          oj_name: this.formInline.platform,
          oj_username: this.formInline.username,
          oj_password: this.formInline.password
        }).then(res => {
          this.getAccounts()
          this.$Message.success('添加成功')
        }, res => {
          this.$Message.error('添加失败')
        })
      },
      getSupport() {
        api.getSupport().then(res => {
          this.supports = res.data.data
          this.formInline.platform = this.supports[0]
        })
      },
      getAccounts() {
        api.getSpiderAccounts().then(res => {
          this.data = []
          for (let i = 0; i < res.data.data.length; ++i) {
            let item = {
              platform: res.data.data[i].oj_name,
              username: res.data.data[i].oj_username,
              password: res.data.data[i].oj_password,
              cookies: res.data.data[i].cookies,
            }
            this.data.push(item)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>

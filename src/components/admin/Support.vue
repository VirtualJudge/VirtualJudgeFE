<template>
  <div>
    <Table border :columns="columns"
           :data="platforms"></Table>
    <Divider></Divider>
    <Button type="primary" :loading="loading" @click="checkStatus">
      <span v-if="!loading">检查状态</span>
      <span v-else>等待中...</span>
    </Button>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    name: "Support",
    data() {
      return {
        columns: [
          {
            title: '平台',
            key: 'Platform',
            align: "center"
          },
          {
            title: '代理',
            key: 'Proxies',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('Input', {
                props: {
                  value: params.row.Proxies,
                  type: 'url',
                  placeholder: '支持http,https,socks'
                },
                on: {
                  'input': (val) => {
                    params.row.Proxies = val;
                  },
                  'on-blur': () => {
                    this.updateProxies(params.row.Platform, params.row.Proxies)
                  }
                }
              })
            }
          },
          {
            title: '可用',
            key: 'Status',
            align: "center",
            render: (h, params) => {
              if (params.row.Status === 'SUCCESS') {
                return h('Tag', {
                  props: {
                    color: 'success'
                  }
                }, params.row.Status)
              } else if (params.row.Status === 'FAILED') {
                return h('Tag', {
                  props: {
                    color: 'error'
                  }
                }, params.row.Status)
              } else {
                return h('Tag', {
                  props: {
                    color: 'warning'
                  }
                }, params.row.Status)
              }
            }
          },
          {
            title: '开启',
            key: 'Enable',
            align: "center",
            render: (h, params) => {
              if (params.row.Status === 'SUCCESS') {
                return h('i-switch', {
                  props: {
                    value: params.row.Enable
                  },
                  on: {
                    'on-change': (val) => {
                      this.updateEnable(params.row.Platform, val)
                    }
                  }
                })
              } else {
                return h('i-switch', {
                  props: {
                    value: params.row.Enable,
                    disabled: true
                  },
                  on: {
                    'on-change': (val) => {
                      this.updateEnable(params.row.Platform, val)
                    }
                  }
                })


              }
            }
          },
          {
            title: '结果复用',
            key: 'Reuse',
            align: "center",
            renderHeader: (h, params) => {
              return h('Tooltip', {
                props: {
                  'max-width': 200,
                  'content': '代码提交结果重用功能（codeforces强制生效），提交相同sha128的代码的时候采用之前提交运行的结果',
                }
              }, '结果复用')
            },
            render: (h, params) => {
              if (params.row.Status === 'SUCCESS' && params.row.Platform !== 'Codeforces') {
                return h('i-switch', {
                  props: {
                    value: params.row.Enable
                  },
                  on: {
                    'on-change': (val) => {
                      this.updateReuse(params.row.Platform, val)
                    }
                  }
                })
              } else {
                return h('i-switch', {
                  props: {
                    value: params.row.Enable,
                    disabled: true
                  },
                  on: {
                    'on-change': (val) => {
                      this.updateReuse(params.row.Platform, val)
                    }
                  }
                })


              }
            }
          },
        ],
        platforms: [],
        loading: true,
        timer: null
      }
    },
    mounted() {
      this.getSupport()
    },
    methods: {
      getSupport() {
        this.loading = true
        api.getAdminSupport().then(res => {
          if (res.data.status === 0) {
            let stop_interval = true
            let item_list = []
            for (let i = 0; i < res.data.data.length; ++i) {
              let item = {
                Platform: res.data.data[i].oj_name,
                Proxies: res.data.data[i].oj_proxies,
                Status: res.data.data[i].oj_status,
                Enable: res.data.data[i].oj_enable,
                Loading: false
              }
              item_list.push(item)
              if (item.Status === 'PENDING') {
                stop_interval = false
              }
            }
            if (stop_interval === true || this.platforms.length === 0) {
              this.platforms = item_list
              this.loading = false
              clearInterval(this.timer)
            }
          } else {
            this.$Message.error('system error')
            this.loading = false
            clearInterval(this.timer)
          }
        })
      },
      checkStatus() {
        this.loading = true
        let params = {
          type: 'fresh'
        }
        api.updateAdminSupport(params, {}).then(res => {
          this.timer = setInterval(() => {
            this.getSupport();
          }, 1000)
        })
      },
      updateEnable(platform, val) {
        let params = {
          type: 'enable'
        }
        let data = {
          platform: platform,
          enable: val
        }
        api.updateAdminSupport(params, data).then(res => {
          if (res.data.status === 0) {
            this.$Message.success('修改成功')
          } else {
            this.$Message.error('修改失败')
            this.getSupport()
          }
        })
      },
      updateReuse(platform, val) {
        let params = {
          type: 'reuse'
        }
        let data = {
          platform: platform,
          reuse: val
        }
        api.updateAdminSupport(params, data).then(res => {
          if (res.data.status === 0) {
            this.$Message.success('修改成功')
          } else {
            this.$Message.error('修改失败')
            this.getSupport()
          }
        })
      },
      updateProxies(platform, url) {
        let params = {
          type: 'proxies'
        }
        let data = {
          platform: platform,
          url: url
        }
        api.updateAdminSupport(params, data).then(res => {
          if (res.data.status === 0) {
            this.$Message.success('修改成功')
          } else {
            this.$Message.error('修改失败')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>

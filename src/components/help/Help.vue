<template>
  <div class="main-view">

    <h2>帮助信息</h2>
    <ul style="margin-top: 10px">
      <li class="help-li"><p>本网站使用<a target="_blank" href="https://cn.gravatar.com/">Gravatar</a>头像</p>
      </li>
      <li class="help-li"><p>推荐使用
        <a target="_blank" href="https://www.google.cn/chrome/">Google Chrome</a>
        或者
        <a target="_blank" href="https://www.microsoft.com/zh-cn/edge">Microsoft Edge</a>
        或者
        <a target="_blank" href="https://www.mozilla.org/zh-CN/firefox/">Mozilla Firefox</a>
        浏览器访问本网站（<strong>排名分先后</strong>）</p>
      </li>
    </ul>
    <Divider/>
    <h2>消息队列</h2>
    <Table :loading="tableLoading" style="margin-top: 10px" :columns="columns" :data="tableData"/>
    <Divider/>
    <h2>关于此平台</h2>
    <ul style="margin-top: 10px">
      <li class="help-li">项目源码 <a target="_blank" href="https://github.com/wustacm">https://github.com/wustacm</a></li>
    </ul>
  </div>
</template>

<script>

import api from "@/utils/api";

export default {
  name: "Help",
  data() {
    return {
      tableLoading: false,
      columns: [{
        title: '主机',
        render: (h, params) => {
          return h('code', params.row.name)
        }
      }, {
        title: '队列',
        key: 'queue',
        render: (h, param) => {
          let queues = []
          for (let item in param.row.queue) {
            if (Object.prototype.hasOwnProperty.call(param.row.queue, item)) {
              queues.push(h('code', {
                style: {
                  background: '#eee',
                  padding: '5px',
                  borderRadius: '30%',
                  margin: '5px'
                }
              }, param.row.queue[item]))
            }
          }
          return h('span', {}, queues)
        }
      }],
      tableData: []
    }
  },
  mounted() {
    this.tableLoading = true
    api.getMessageQueueInfo().then(res => {
      if (res.data.err === null) {
        this.tableData = res.data.data
      } else {
        console.log(res.data.err)
      }
    }).finally(() => {
      this.tableLoading = false
    })
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
.help-li{
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>

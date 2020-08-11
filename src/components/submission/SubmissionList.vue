<template>
  <div class="main-view">
    <h2 style="text-align: center">提交列表</h2>
    <div>
      <i-switch v-model="myself" size="large" false-color="#13ce66">
        <span slot="open">我的</span>
        <span slot="close">全部</span>
      </i-switch>

      <label>
        <Select style="width: 200px; margin-left: 10px">
          <Option value="ALL">All</Option>
          <Option value="P">Pending</Option>
          <Option value="R">Running</Option>
          <Option value="AC">Accepted</Option>
          <Option value="WA">Wrong Answer</Option>
          <Option value="PE">Presentation Error</Option>
          <Option value="RE">Runtime Error</Option>
          <Option value="MLE">Memory Limit Exceeded</Option>
          <Option value="TLE">Time Limit Exceeded</Option>
          <Option value="CE">Compile Error</Option>
          <Option value="SE">System Error</Option>
        </Select>
      </label>

      <label>
        <Input type="text" placeholder="筛选提交者" style="width: 200px;margin-left: 10px"/>
      </label>
    </div>

    <PaginateTable style="margin-top: 10px"
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
  name: "SubmissionList",
  components: {PaginateTable},
  data() {
    return {
      columns: [
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '题目',
          key: 'problem'
        },
        {
          title: '用户',
          key: 'user'
        },
        {
          title: '时间花费',
          key: 'time_spend'
        },
        {
          title: '内存花费',
          key: 'memory_spend'
        }, {
          title: '提交语言',
          key: 'lang'
        },
        {
          title: '结果',
          key: 'verdict'
        }
      ],
      tData: [],
      current: 1,
      page_size: 10,
      total: 0,
      myself: false,
      tableLoading: false
    }
  }, mounted() {
    this.handleScreenResize()
    window.onresize = () => {
      return (() => {
        this.handleScreenResize()
      })()
    }
  },
  methods: {
    handleScreenResize() {
      window.screenWidth = document.body.clientWidth
      if (window.screenWidth < 1200) {
        this.columns = [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '题目',
            key: 'problem'
          },
          {
            title: '用户',
            key: 'user'
          },
          {
            title: '结果',
            key: 'verdict'
          },
          {
            title: '提交时间',
            key: 'create_time'
          }
        ]
      } else {
        this.columns = [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '题目',
            key: 'problem'
          },
          {
            title: '用户',
            key: 'user'
          },
          {
            title: '时间花费',
            key: 'time_spend'
          },
          {
            title: '内存花费',
            key: 'memory_spend'
          }, {
            title: '提交语言',
            key: 'lang'
          },
          {
            title: '结果',
            key: 'verdict'
          },
          {
            title: '提交时间',
            key: 'create_time'
          }
        ]
      }
    },
    requestTableData() {
      api.getSubmissionList({
        page: this.current,
        page_size: this.page_size,
        myself: this.myself
      }).then(res => {
        if (res.data.err === null) {
          this.tData = res.data.data.results || []
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

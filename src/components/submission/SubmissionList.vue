<template>
  <div class="main-view">
    <h2 style="text-align: center">提交列表</h2>
    <div>
      <i-switch
          v-if="isAuthenticated"
          @on-change="handleSwitchChange"
          v-model="list_filter.myself"
          size="large"
          false-color="#13ce66">
        <span slot="open">我的</span>
        <span slot="close">全部</span>
      </i-switch>

      <label>
        <Select
            @on-change="handleSelectedChange"
            v-model="list_filter.verdict"
            style="width: 200px; margin-left: 10px">
          <Option :key="item" :value="item"
                  v-for="item in Object.keys(submission_verdicts)">
            {{ submission_verdicts[item].info }}
          </Option>
        </Select>
      </label>
    </div>

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
import moment from 'moment'
import {
  ACCEPT_LOCALES,
  DEFAULT_LOCALE,
  PROBLEM_SUBMIT_LANGUAGES,
  SUBMISSION_VERDICTS
} from '@/utils/constant'
import {mapGetters} from "vuex";

export default {
  name: "SubmissionList",
  components: {PaginateTable},
  data() {
    return {
      list_filter: {
        myself: false,
        verdict: 'A',
        lang: ''
      },
      columns: [
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '题目',
          key: 'problem',
          render: (h, params) => {
            return h('a', {
              on: {
                click: () => {
                  this.$router.push(`/problem/${params.row.problem.id}`)
                }
              }
            }, params.row.problem.title)
          }
        },
        {
          title: '用户',
          key: 'user',
          render: (h, params) => {
            return h('a', {
              on: {
                click: () => {
                  this.$router.push(`/user/${params.row.user.id}`)
                }
              }
            }, params.row.user.username)
          }
        },
        {
          title: '时间花费',
          key: 'time_spend',
          render: (h, params) => {
            if (params.row.time_spend !== null) {
              return h('span', params.row.time_spend)
            } else {
              return h('span', '-')
            }
          }
        },
        {
          title: '内存花费',
          key: 'memory_spend',
          render: (h, params) => {
            if (params.row.memory_spend !== null) {
              return h('span', params.row.memory_spend)
            } else {
              return h('span', '-')
            }
          }
        }, {
          title: '提交语言',
          key: 'lang',
          render: (h, params) => {
            if (this.profile.id !== null
                && (params.row.user.id === this.profile.id
                    || this.isAdminRole)) {
              return h('a', {
                on: {
                  click: () => {
                    this.$router.push(`/submission/${params.row.id}`)
                  }
                }
              }, PROBLEM_SUBMIT_LANGUAGES[params.row.lang].withVersion)
            } else {
              return h('span', PROBLEM_SUBMIT_LANGUAGES[params.row.lang].withVersion)
            }

          },

        },
        {
          title: '结果',
          key: 'verdict',
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: SUBMISSION_VERDICTS[params.row.verdict].color
              }
            }, SUBMISSION_VERDICTS[params.row.verdict].info)
          },
        },
        {
          title: '提交时间',
          key: 'create_time',
          render: (h, params) => {
            moment.locale(ACCEPT_LOCALES[DEFAULT_LOCALE].moment)
            return h('Tooltip', {
              props: {
                transfer: true,
                content: moment(params.row.create_time).format('lll')
              }
            }, moment(params.row.create_time).fromNow())
          }
        }
      ],
      tData: [],
      current: 1,
      page_size: 20,
      total: 0,

      tableLoading: false,
      submission_verdicts: SUBMISSION_VERDICTS
    }
  }, mounted() {
    this.requestTableData()
  },
  methods: {
    requestTableData() {
      this.tableLoading = true
      api.getSubmissionList({
        page: this.current,
        page_size: this.page_size,
        user: (this.list_filter.myself ? this.profile.id : ''),
        verdict: (this.list_filter.verdict === 'A' ? '' : this.list_filter.verdict)
      }).then(res => {
        if (res.data.err === null) {
          this.tData = res.data.data.results || []
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
    handleSwitchChange() {
      this.requestTableData()
    },
    handleSelectedChange(val) {
      console.log('val', val)
      this.requestTableData()
    }
  },
  computed: {
    ...mapGetters(['profile', 'isAdminRole', 'isAuthenticated'])
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

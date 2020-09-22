<template>
  <div class="main-view">
    <h2 style="text-align: center">提交列表</h2>
    <div>
      <i-switch
          v-if="isAuthenticated"
          @on-change="handleSwitchChange"
          v-model="list_filter.myself"
          :disabled="tableLoading"
          size="large"
          false-color="#13ce66">
        <span slot="open">我的</span>
        <span slot="close">全部</span>
      </i-switch>

      <label>
        <Select
            @on-change="handleFilterChange"
            v-model="list_filter.verdict"
            :disabled="tableLoading"
            style="width: 200px; margin-left: 10px">
          <Option :key="item" :value="item"
                  v-for="item in Object.keys(submission_verdicts)">
            {{ submission_verdicts[item].info }}
          </Option>
        </Select>
      </label>
      <label>
        <Input @on-blur="handleFilterChange"
               :disabled="tableLoading"
               v-model="list_filter.problem_id" type="text" placeholder="题目编号"
               style="width: 100px;margin-left: 10px"></Input>
      </label>
      <label>
        <Select
            @on-change="handleFilterChange"
            v-model="list_filter.language"
            :disabled="tableLoading"
            style="width: 200px; margin-left: 10px">
          <Option :key="item" :value="item"
                  v-for="item in Object.keys(submission_language)">
            {{ submission_language[item].info }}
          </Option>
        </Select>
      </label>
      <Button style=" margin-left: 10px" type="info" @click="requestTableData" :loading="tableLoading">刷新</Button>
    </div>

    <PaginateTable style="margin-top: 10px"
                   @on-page-size-change="onPageSizeChange"
                   @on-page-change="onPageChange"
                   :table-loading="tableLoading"
                   :page_size="page_size"
                   :current="current"
                   :data="tData"
                   :total="total"
                   :columns="tColumns"/>
  </div>
</template>

<script>
import PaginateTable from "@/components/utils/PaginateTable";
import api from "@/utils/api";
import moment from 'moment'
import {PROBLEM_SUBMIT_LANGUAGES, SUBMISSION_VERDICTS} from '@/utils/constant'
import {mapGetters} from "vuex";
import message from "@/utils/message";

export default {
  name: "SubmissionList",
  components: {PaginateTable},
  data() {
    return {
      list_filter: {
        myself: false,
        verdict: 'A',
        language: 'a',
        problem_id: ''
      },
      tColumns: [],
      columns: [
        {
          title: '编号',
          key: 'id',
          align: 'center',
          maxWidth: 100
        },
        {
          title: '用户',
          key: 'user',
          ellipsis: true,
          align: 'center',
          render: (h, params) => {
            return h('span', {
              style: {
                color: '#3399ff',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.$router.push(`/user/${params.row.user.id}`)
                }
              }
            }, params.row.user.username)
          }
        },
        {
          title: '题目',
          key: 'problem',
          align: 'center',
          ellipsis: true,
          render: (h, params) => {
            return h('span', {
              style: {
                color: '#3399ff',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.$router.push(`/problem/${params.row.problem.id}`)
                }
              }
            }, `${params.row.problem.id}`)
          }
        },
        {
          title: '时间花费',
          key: 'time_spend',
          align: 'center',
          ellipsis: true,
          render: (h, params) => {
            if (params.row.time_cost !== null) {
              return h('span', params.row.time_cost + ' ms')
            } else {
              return h('span', '-')
            }
          }
        },
        {
          title: '内存花费',
          align: 'center',
          ellipsis: true,
          render: (h, params) => {
            if (params.row.memory_cost !== null) {
              return h('span', params.row.memory_cost + ' MiB')
            } else {
              return h('span', '-')
            }
          }
        },
        {
          title: '提交语言',
          key: 'lang',
          align: 'center',
          ellipsis: true,
          render: (h, params) => {
            if (params.row.is_public === true) {
              return h('span', {
                style: {
                  color: '#19be6b',
                  cursor: 'pointer',
                  'font-weight': 'bold'
                },
                on: {
                  click: () => {
                    this.$router.push(`/submission/${params.row.id}`)
                  }
                }
              }, [h('code', PROBLEM_SUBMIT_LANGUAGES[params.row.lang].short)])
            } else if (this.profile.id !== null
                && (params.row.user.id === this.profile.id
                    || this.isAdminRole)) {
              return h('span', {
                style: {
                  color: '#3399ff',
                  cursor: 'pointer',
                  'font-weight': 'bold'
                },
                on: {
                  click: () => {
                    this.$router.push(`/submission/${params.row.id}`)
                  }
                }
              }, [h('code', PROBLEM_SUBMIT_LANGUAGES[params.row.lang].short)])
            } else {
              return h('code', PROBLEM_SUBMIT_LANGUAGES[params.row.lang].short)
            }

          },

        },
        {
          title: '结果',
          key: 'verdict',
          align: 'center',
          render: (h, params) => {
            if (SUBMISSION_VERDICTS[params.row.verdict]) {
              return h('Tag', {
                props: {
                  color: SUBMISSION_VERDICTS[params.row.verdict].color
                }
              }, SUBMISSION_VERDICTS[params.row.verdict].info)
            } else {
              return h('span', '-')
            }
          },
        },
        {
          title: '提交时间',
          key: 'create_time',
          align: 'center',
          ellipsis: true,
          render: (h, params) => {
            moment.locale('zh-cn')
            return h('Tooltip', {
              props: {
                transfer: true,
                theme: 'light',
                content: moment(params.row.create_time).format('YYYY/MM/DD hh:mm:ss')
              }
            }, moment(params.row.create_time).calendar())
          }
        }
      ],
      tData: [],
      current: 1,
      page_size: 50,
      total: 0,

      tableLoading: false,
      submission_verdicts: SUBMISSION_VERDICTS,
      submission_language: PROBLEM_SUBMIT_LANGUAGES
    }
  }, mounted() {
    this.initColumns()
    this.requestTableData()
  },
  methods: {
    initColumns() {
      if (this.isAdminRole) {
        this.tColumns = this.columns.concat({
          title: '操作',

          align: 'center',
          maxWidth: 120,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'info',
                icon: 'md-refresh'
              },
              on: {
                click: () => {
                  this.handleRejudge(params.row.id)
                }
              }
            }, '重判')
          }

        })
      } else {
        this.tColumns = this.columns
      }
    },
    handleRejudge(submission_id) {
      api.getRejudgeRequest(submission_id).then(res => {
        if (res.data.err === null) {
          this.$Message.success('重新判题任务提交成功')
        } else {
          this.$Message.error(message.err(res.data.err))
        }
      })
    },
    requestTableData() {
      this.tableLoading = true
      api.getSubmissionList({
        page: this.current,
        page_size: this.page_size,
        user: (this.list_filter.myself ? this.profile.id : ''),
        verdict: (this.list_filter.verdict === 'A' ? '' : this.list_filter.verdict),
        problem_id: this.list_filter.problem_id,
        language: (this.list_filter.language === 'a' ? '' : this.list_filter.language)
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
      this.current = 1
      this.page_size = page_size
      this.requestTableData()
    },
    handleSwitchChange() {
      this.current = 1
      this.requestTableData()
    },
    handleFilterChange() {
      this.current = 1
      this.requestTableData()
    }
  },
  computed: {
    ...mapGetters(['profile', 'isAdminRole', 'isAuthenticated', 'web_lang'])
  },
  watch: {
    isAdminRole() {
      this.initColumns()
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

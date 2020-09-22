<template>
  <div class="main-view">
    <h2 style="text-align: center">排行列表</h2>
    <div>
      <i-switch
          v-if="isAuthenticated"
          @on-change="onFollowSwitchChange"
          v-model="showFollowing"
          size="large"
          false-color="#13ce66">
        <span slot="open">关注</span>
        <span slot="close">全部</span>
      </i-switch>
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
import {mapGetters} from 'vuex'
import {VALID_SCHOOLS} from "@/utils/constant";

export default {
  name: "RankIndex",
  components: {PaginateTable},
  data() {
    return {
      page_size: 50,
      current: 1,
      tData: [],
      total: 0,
      columns: [
        {
          title: '序号',
          align: 'center',
          maxWidth: 100,
          render: (h, params) => {
            return h('span', params.index + 1 + (this.current - 1) * this.page_size)
          }
        },
        {
          title: '用户名',
          key: 'username',
          align: 'center',
          maxWidth: 200,
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
          title: '学校',
          align: 'center',
          render: (h, params) => {
            if (params.row.student) {
              let school = params.row.student.school || 'OTHER'
              return h('span', VALID_SCHOOLS[school])
            }
            return h('span', '-')
          }
        },
        {
          title: '通过',
          key: 'total_passed',
          align: "center",
          maxWidth: 100
        },
        {
          title: '提交',
          key: 'total_submitted',
          align: "center",
          maxWidth: 100
        },
        {
          title: 'AC',
          key: 'total_accepted',
          align: "center",
          maxWidth: 100
        }
      ],
      tableLoading: false,
      showFollowing: false
    }
  },
  mounted() {
    this.updateTableData()
  },
  methods: {
    updateTableData() {
      this.tableLoading = true
      if (this.showFollowing) {
        api.getUserFollowingRank({
          page: this.current,
          page_size: this.page_size
        }).then(res => {
          if (res.data.err === null) {
            this.tData = res.data.data.results || []
            this.total = res.data.data.count || 0
          }
          this.tableLoading = false
        })
      } else {
        api.getUserRank({
          page: this.current,
          page_size: this.page_size
        }).then(res => {
          if (res.data.err === null) {
            this.tData = res.data.data.results || []
            this.total = res.data.data.count || 0
          }
          this.tableLoading = false
        })
      }

    },
    onFollowSwitchChange() {
      this.current = 1
      this.updateTableData()
    },
    onPageSizeChange(page_size) {
      this.page_size = page_size
      this.current = 1
      this.updateTableData()
    },
    onPageChange(page) {
      this.current = page
      this.updateTableData()
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
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

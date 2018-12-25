<template>
  <div>
    <Form>
      <FormItem label="来源" prop="">
        <Select v-model="problem.remote_oj">
          <Option v-for="item in supports" :key="item" :value="item">
            {{item}}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="题目编号">
        <Input type="text" v-model="problem.remote_id" clearable/>
      </FormItem>
      <FormItem>
        <Button :loading="loading" @click="handleSearchStart">查询</Button>
        <div><a v-if="problem.title" @click="handleMove">{{problem.title}}</a>
          <Tag v-else-if="problem.status">{{problem.status}}</Tag>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    name: "Search",
    data() {
      return {
        problem: {
          title: null,
          remote_oj: '',
          remote_id: '1000',
          status: null
        },
        loading: false,
        timer: null,
        supports: [],
      }
    },
    mounted() {
      this.getSupport()
    },
    methods: {
      handleSearchStart() {
        this.loading = true;
        this.timer = setInterval(() => {
          this.handleSearch()
        }, 1000)
      },
      handleSearch() {
        this.problem.title = null
        this.problem.status = null
        api.getProblem(this.problem.remote_oj, this.problem.remote_id).then(res => {
          if (res.data.data.request_status !== 'Pending' && res.data.data.request_status !== 'Running') {
            this.loading = false
            clearInterval(this.timer);
          }
          this.problem.status = res.data.data.request_status
          if (res.data.data.title !== null) {
            this.problem.title = res.data.data.title
          }

        })
      },
      handleMove() {
        this.$router.push({
          name: 'problem', params: {
            remote_oj: this.problem.remote_oj,
            remote_id: this.problem.remote_id
          }
        })
      },
      getSupport() {
        api.getSupport().then(res => {
          this.supports = res.data.data;
          this.problem.remote_oj = this.supports[0]
        }, res => {

        })
      }
    }
  }
</script>

<style scoped>

</style>

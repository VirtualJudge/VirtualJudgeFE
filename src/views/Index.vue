<template>
  <div style="margin: 0 auto">
    <Card v-if="loaded" style="margin: 10px auto">
      <IndexChart :submitted="submissions_data" :accepted="accepted_data" :labels="labels"/>
    </Card>
    <Spin size="large" fix v-if="!loaded"></Spin>
  </div>
</template>

<script>
  import moment from "moment";
  import api from '../api';
  import IndexChart from "../components/IndexChart";

  export default {
    name: "Index",
    components: {
      IndexChart,
    },
    data() {
      return {
        loaded: false,
        labels: [],
        chartdata: null,
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        submissions_data: [],
        accepted_data: []
      }
    },
    mounted() {
      document.title = 'Virtual Judge';
      this.getLabels()
      this.getSubmissionsCount();
    },
    methods: {
      getLabels() {
        moment.locale('zh-CN');
        this.labels = [];
        for (let offset = 6; offset >= 0; offset--) {
          this.labels.push(moment().subtract(offset, 'days').format('dddd').toString())
        }
      },
      getSubmissionsCount() {
        api.getStatistics('submission').then(res => {
          console.log(res.data.data)
          for (let i = 0; i < res.data.data.length; ++i) {
            this.submissions_data.push(res.data.data[i][0])
            this.accepted_data.push(res.data.data[i][1])
          }
          this.loaded = true
        })
      },
    },
  }
</script>

<style scoped>
  .container {
    margin: 0 auto;
  }

</style>

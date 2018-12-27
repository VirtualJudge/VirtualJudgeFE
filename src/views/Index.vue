<template>
  <div class="container">
    <div class="Chart">
      <Spin size="large" fix v-if="!loaded"></Spin>
      <h1 v-if="loaded" style="text-align:center;">提交统计</h1>
      <line-chart v-if="loaded" :chartdata="chartdata" :options="options" :style="chartStyle"/>
    </div>

  </div>
</template>

<script>
  import LineChart from "./LineChart.js";
  import moment from "moment";
  import api from '../api';

  export default {
    name: "Index",
    components: {
      LineChart
    },
    data() {
      return {
        loaded: false,
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
      this.getSubmissionsCount();
    },
    methods: {
      getLabels() {
        moment.locale('zh-CN');
        let labels = [];
        for (let offset = 6; offset >= 0; offset--) {
          labels.push(moment().subtract(offset, 'days').format('dddd').toString())
        }
        return labels
      },
      getSubmissionsCount() {
        api.getStatistics('submission').then(res => {
          for (let i = 0; i < res.data.data.length; ++i) {
            this.submissions_data.push(res.data.data[i][0])
            this.accepted_data.push(res.data.data[i][1])
          }
          this.fillData();
        })
      },
      fillData() {
        this.chartdata = {
          labels: this.getLabels(),
          datasets: [
            {
              label: '日通过',
              backgroundColor: '#19be6b',
              data: this.accepted_data
            },
            {
              label: '日提交',
              backgroundColor: '#f90',
              data: this.submissions_data
            },

          ]
        };
        this.loaded = true;
      }
    },
    computed: {
      chartStyle() {
        return {
          width: '600px',
          height: '400px'
        }

      }
    }

  }
</script>

<style scoped>
  .container {
    margin: 0 auto;
  }

  h1 {
    color: #464646;
    text-transform: uppercase;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
    font-size: 28px;
    margin-top: 0;
  }

  .Chart {
    padding: 20px;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, .4);
    margin: 50px 0;
  }
</style>

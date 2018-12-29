<template>
  <v-chart :options="options"/>
</template>


<script>
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/polar'

  export default {
    name: 'IndexChart',
    components: {
      'v-chart': ECharts
    },
    props: {
      labels: {
        default: []
      },
      submitted: {
        default: null
      },
      accepted: {
        default: null
      }
    },
    data: function () {
      let options = {
        title: {
          text: '提交统计'
        },
        legend: {
          data: ['提交量', '通过量']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.labels
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        color: ['#19be6b', '#f90'],
        series: [
          {
            name: '提交量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            smooth: true,
            data: this.submitted
          },
          {
            name: '通过量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            smooth: true,
            data: this.accepted
          },
        ]
      }
      return {
        options: options
      }
    }
  }
</script>

<style>
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>

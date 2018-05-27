<template>
  <Row>
    <Col span="18">
      <Card style="margin: 10px">
        <div slot="title">
          <Row type="flex" justify="end">
            <Col>
              <i-switch v-model="mine_contests" size="large" @on-change="switch_change">
                <span slot="open">我的</span>
                <span slot="close">全部</span>
              </i-switch>
            </Col>
          </Row>

        </div>
        <Table></Table>
      </Card>
    </Col>
    <Col span="6">
      <Card style="margin: 10px">
        <p slot="title">
          <Icon type="flag"></Icon>
          操作
        </p>
        <ul style="list-style: none">
          <li>
            <router-link to="/contests/new">新建题组</router-link>
          </li>
        </ul>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import api from '../../api'

  export default {
    name: "Contests",
    data() {
      return {
        isAuthenticated: false,
        mine_contests: false,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getAuth();
      },
      getAuth() {
        api.getAuth().then(res => {
          this.isAuthenticated = true;
          console.log(this.isAuthenticated);
        }, res => {
          console.log(res);
        })
      },
      switch_change(status){
        console.log('switch');
        console.log(status);
      }
    }
  }
</script>

<style scoped>

</style>

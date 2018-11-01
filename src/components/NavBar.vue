<template>
  <Menu mode="horizontal" @on-select="handleRoute" style="min-width: 900px">
    <div class="logo">
      <span>
        Virtual Judge<sup><span
        style="color:white;font-size: 12px;background: #00bb00;border-radius: 15px;padding: 4px;">Beta 1</span></sup>
      </span>
    </div>
    <MenuItem name="/">
      <Icon type="home"></Icon>
      首页
    </MenuItem>
    <MenuItem name="/problems">
      <Icon type="ios-game-controller-b"/>
      题目
    </MenuItem>
    <MenuItem name="/submissions">
      <Icon type="md-document"/>
      提交
    </MenuItem>
    <MenuItem name="/contests">
      <Icon type="ios-folder"/>
      题组
    </MenuItem>
    <MenuItem name="/rank">
      <Icon type="md-stats"/>
      排行榜
    </MenuItem>
    <MenuItem name="/help">
      <Icon type="md-help-circle"/>
      帮助
    </MenuItem>
    <template v-if="!isAuthenticated">
      <div class="right-item">
        <Button shape="circle" @click="modalLogin=true">
          <Icon type="md-log-in"/>
          登录
        </Button>
        <Button shape="circle" @click="modalRegister=true">
          <Icon type="md-person-add"/>
          注册
        </Button>
      </div>
    </template>
    <template v-else>
      <div class="right-item">
        <Submenu name="/profile">
          <template slot="title">
            <Avatar>{{username}}</Avatar>
          </template>
          <MenuGroup title="基础">
            <MenuItem name="/profile">个人资料</MenuItem>
            <MenuItem name="/setting">设置</MenuItem>
            <MenuItem name="/logout">登出</MenuItem>
          </MenuGroup>
        </Submenu>

      </div>
    </template>

    <Modal v-model="modalLogin" width="360">
      <div slot="header">
        登录
      </div>
      <Login></Login>
      <div slot="footer" style="display: none"></div>
    </Modal>
    <Modal v-model="modalRegister" width="360">
      <div slot="header">
        注册
      </div>
      <Register></Register>
      <div slot="footer" style="display: none"></div>
    </Modal>
  </Menu>
</template>

<script>
  import api from '../api'
  import Login from "../views/account/Login";
  import Register from "../views/account/Register";

  export default {
    name: "NavBar",
    components: {Login, Register},
    data() {
      return {
        loading: false,
        modalRegister: false,
        modalLogin: false,
        isAuthenticated: false,
        username: ''
      }
    },
    mounted() {
      this.getAuth()
    },
    methods: {
      handleRoute(route) {
        this.$router.push(route)
      },
      logout() {
        api.logout().then(res => {
          this.$router.go(0);
        }, res => {
          this.$router.go(0);
        })
      },
      getAuth() {
        api.getAuth().then(res => {
          this.username = res.data.data;
          this.isAuthenticated = true;
        }, res => {
          this.isAuthenticated = false;
        })
      }
    }
  }
</script>

<style scoped>
  .right-item {
    float: right;
    margin-left: 10px;
    margin-right: 10px;
  }

  .logo {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
    float: left;
    line-height: 60px;
  }

</style>

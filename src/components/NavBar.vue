<template>
  <Menu mode="horizontal" @on-select="handleRoute" style="min-width: 900px">
    <div class="logo">
      <span>
        Virtual Judge<sup><span
        style="color:white;font-size: 12px;background: #00bb00;border-radius: 15px;padding: 4px;">freeze</span></sup>
      </span>
    </div>
    <MenuItem name="/">
      <Icon type="md-home"></Icon>
      首页
    </MenuItem>
    <MenuItem name="/problem">
      <Icon type="md-school" />
      题目
    </MenuItem>
    <MenuItem name="/submission">
      <Icon type="md-code-working" />
      提交
    </MenuItem>
    <!--<MenuItem name="/rank">-->
      <!--<Icon type="md-stats"/>-->
      <!--排行榜-->
    <!--</MenuItem>-->
    <MenuItem name="/help">
      <Icon type="md-alert"/>
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
          <MenuGroup v-if="isAdministrator" title="高级">
            <MenuItem name="/admin">系统管理</MenuItem>
          </MenuGroup>
          <MenuGroup title="基础">
            <MenuItem name="/setting">我的设置</MenuItem>
            <MenuItem name="/logout">退出登录</MenuItem>
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
        username: '',
        isAdministrator: false
      }
    },
    mounted() {
      this.getAuth();
      this.getPrivilege();
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
      },
      getPrivilege() {
        this.isAdministrator = false;
        api.getPrivilege().then(res => {

          if (res.data.data === true) {
            this.isAdministrator = true;
          }
        }, res => {

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

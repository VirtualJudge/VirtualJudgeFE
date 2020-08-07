<template>
  <Layout style="width: 100%">
    <Sider :style="{background: '#fff'}">
      <Menu width="auto" theme="light" active-name="1" style="height: 100%" @on-select="handleMenuSelect">
        <MenuGroup title="信息">
          <MenuItem name="user-info">
            <Icon type="md-document"/>
            个人信息
          </MenuItem>
          <MenuItem name="account-info">
            <Icon type="md-chatbubbles"/>
            账号信息
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="操作">
          <MenuItem name="update-info">
            <Icon type="md-heart"/>
            修改信息
          </MenuItem>
          <MenuItem name="change-password">
            <Icon type="md-leaf"/>
            修改密码
          </MenuItem>
        </MenuGroup>
        <MenuGroup v-if="isAdminRole" title="题目相关">
          <MenuItem name="manage-problem">
            <Icon type="md-heart"/>
            题目管理
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Sider>
    <Layout :style="{padding: '24px',width: '100%'}">
      <Content :style="{padding: '24px', background: '#fff'}">

        <UserInfo v-if="content==='user-info'"/>
        <AccountInfo v-if="content==='account-info'"/>
        <ChangePassword v-if="content==='change-password'"/>
        <UpdateInfo v-if="content==='update-info'"/>


        <AddProblem @on-add-success="content='manage-problem'" v-if="content==='add-problem'"/>
        <ManageProblem @add-button-click="content='add-problem'" v-if="content==='manage-problem'"/>


      </Content>

    </Layout>

  </Layout>
</template>

<script>
import UserInfo from "@/components/user/self/UserInfo";
import AccountInfo from "@/components/user/self/AccountInfo";
import ChangePassword from "@/components/user/self/ChangePassword";
import UpdateInfo from "@/components/user/self/UpdateInfo";
import {mapGetters} from "vuex";
import AddProblem from "@/components/user/advanced/problem/AddProblem";
import ManageProblem from "@/components/user/advanced/problem/ManageProblem";

export default {
  name: "SelfIndex",
  components: {ManageProblem, AddProblem, UpdateInfo, ChangePassword, AccountInfo, UserInfo},
  data() {
    return {
      content: 'user-info'
    }
  }, methods: {
    handleMenuSelect(name) {
      this.content = name
    }
  }, computed: {
    ...mapGetters(['isAdminRole'])
  }
}
</script>

<style scoped>

</style>

<template>
  <Layout style="width: 100%">
    <Sider :style="{background: '#fff'}">
      <Menu width="auto" theme="light" :active-name="active_name" style="height: 100%">
        <MenuItem name="/system" to="/system">
          系统信息
        </MenuItem>
        <MenuItem name="/system/manage_problem" to="/system/manage_problem">
          题目管理
        </MenuItem>
        <MenuItem v-if="hiddenItem" name="/system/manage_permission" to="/system/manage_permission">
          权限管理
        </MenuItem>
        <MenuItem name="/system/manage_user" to="/system/manage_user">
          用户管理
        </MenuItem>
      </Menu>
    </Sider>
    <Layout :style="{padding: '24px',width: '100%'}">
      <Content :style="{padding: '24px', background: '#fff'}">
        <router-view/>
      </Content>

    </Layout>

  </Layout>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AdvancedIndex",
  data() {
    return {
      active_name: '/system',
      hiddenItem: false
    }
  },
  mounted() {
    this.active_name = this.$route.fullPath
  },
  computed: {
    ...mapGetters(['isAdminRole'])
  }
}
</script>

<style scoped>

</style>

<template>
  <Layout style="width: 100%">
    <Sider :style="{background: '#fff'}">
      <Menu width="auto" theme="light" active-name="/system" style="height: 100%">
        <MenuItem name="/system" to="/system">
          {{ $t('pages.system.system_info') }}
        </MenuItem>
        <MenuItem name="/system/manage_problem" to="/system/manage_problem">
          {{ $t('pages.system.manage_problem') }}
        </MenuItem>
        <MenuItem name="/system/manage_permission" to="/system/manage_permission">
          {{ $t('pages.system.manage_permission') }}
        </MenuItem>
        <MenuItem name="/system/manage_user" to="/system/manage_user">
          {{ $t('pages.system.manage_user') }}
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
  computed: {
    ...mapGetters(['isAdminRole'])
  }
}
</script>

<style scoped>

</style>

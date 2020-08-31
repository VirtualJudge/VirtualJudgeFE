<template>
  <Layout style="width: 100%">
    <Sider :style="{background: '#fff'}">
      <Menu width="auto" theme="light" active-name="1" style="height: 100%">
        <MenuGroup v-if="isAdminRole" title="题目相关">
          <MenuItem name="manage-problem" to="/system/manage_problem">
            <Icon type="md-heart"/>
            {{ $t('pages.system.manage_problem')}}
          </MenuItem>
        </MenuGroup>
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

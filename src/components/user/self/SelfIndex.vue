<template>
  <Layout style="width: 100%">
    <Sider :style="{background: '#fff'}">
      <Menu width="auto" theme="light" active-name="1" style="height: 100%">
        <MenuGroup title="操作">
          <MenuItem v-if="false" name="update-info" to="/self/update_info">
            修改信息
          </MenuItem>
          <MenuItem v-if="false" name="change-email" to="/self/change_email">
            修改邮箱
          </MenuItem>
          <MenuItem name="change-password" to="/self/change_password">
            修改密码
          </MenuItem>
        </MenuGroup>

      </Menu>
    </Sider>
    <Layout :style="{padding: '24px',width: '100%', minHeight:'600px'}">
      <Content :style="{padding: '24px', background: '#fff'}">
        <router-view/>
      </Content>

    </Layout>

  </Layout>
</template>

<script>

export default {
  name: "SelfIndex",
}
</script>

<style scoped>

</style>

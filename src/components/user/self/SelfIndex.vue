<template>
  <Layout style="width: 100%">
    <Sider :style="{background: '#fff'}">
      <Menu width="auto" theme="light" active-name="1" style="height: 100%">
        <MenuGroup title="操作">
          <MenuItem name="update-info" to="/self/update_info">
            <Icon type="md-heart"/>
            修改信息
          </MenuItem>
          <MenuItem name="change-email" to="/self/change_email">
            <Icon type="md-leaf"/>
            修改邮箱
          </MenuItem>
          <MenuItem name="change-password" to="/self/change_password">
            <Icon type="md-leaf"/>
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

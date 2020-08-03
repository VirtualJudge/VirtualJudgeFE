<template>
  <Layout style="width: 100%">
    <Sider :style="{background: '#fff'}">
      <Menu width="auto" theme="light" active-name="1" style="height: 100%">
        <MenuGroup title="信息">
          <MenuItem name="1">
            <Icon type="md-document"/>
            个人信息
          </MenuItem>
          <MenuItem name="2">
            <Icon type="md-chatbubbles"/>
            账号信息
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="操作">
          <MenuItem name="3">
            <Icon type="md-heart"/>
            修改信息
          </MenuItem>
          <MenuItem name="4">
            <Icon type="md-leaf"/>
            修改密码
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Sider>
    <Layout :style="{padding: '24px',width: '100%',minHeight:'800px'}">
      <Content :style="{padding: '24px', background: '#fff'}">
        <p >
          Remains to be done.
        </p>
      </Content>

    </Layout>

  </Layout>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style scoped>

</style>

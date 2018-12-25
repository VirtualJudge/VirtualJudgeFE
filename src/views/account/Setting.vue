<template>
  <Row>
    <Col span="6">
      <Menu @on-select="selectChange" width="auto" style="margin: 10px" :active-name="cell">
        <MenuGroup title="信息修改">
          <MenuItem name="password">
            <Icon type="md-heart"/>
            密码修改
          </MenuItem>
          <MenuItem name="hook">
            <Icon type="md-leaf"/>
            Hook修改
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Col>
    <Col span="18">
      <Card style="margin: 10px">
        <p v-if="cell==='password'" slot="title">邮箱和密码修改</p>
        <p v-else slot="title">Hook修改</p>
        <Password v-if="cell === 'password'"/>
        <WebHook v-if="cell === 'hook'"/>
      </Card>
    </Col>
  </Row>

</template>

<script>
  import Password from '@/components/user/Password'
  import WebHook from '@/components/user/WebHook'

  export default {
    name: "Setting",
    components: {
      WebHook,
      Password
    },
    data() {
      return {
        cell: 'password'
      }
    },
    mounted() {
      document.title = '个人设置'
    },
    methods: {
      selectChange(item) {
        this.cell = item;
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <Row>
    <Col span="6">
      <Menu @on-select="selectChange" width="auto" style="margin: 10px" :active-name="cell">
        <MenuGroup title="爬虫及账号">
          <MenuItem name="support">
            <Icon type="md-heart"/>
            支持平台
          </MenuItem>
          <MenuItem name="account">
            <Icon type="md-leaf"/>
            爬虫账号
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Col>
    <Col span="18">
      <Card style="margin: 10px">
        <Support v-if="cell === 'support'"></Support>
        <Account v-else-if="cell === 'account'"></Account>
      </Card>
    </Col>
  </Row>

</template>

<script>
  import Support from "@/components/admin/Support";
  import Account from "@/components/admin/Account";

  export default {
    name: "Admin",
    components: {
      Support,
      Account
    },
    data() {
      return {
        cell: 'support'
      }
    },
    mounted() {
      document.title = '系统设置'
    },
    methods: {
      selectChange(item) {
        this.cell = item;
      }
    }
  }
</script>

<style scoped>
  ul li {
    list-style: none;
    margin: 5px auto;
  }
</style>

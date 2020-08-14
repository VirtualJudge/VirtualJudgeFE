<template>
  <Layout style="width: 100%">
    <Sider :style="{background: '#fff'}">
      <Menu width="auto" theme="light" active-name="1" style="height: 100%" @on-select="handleMenuSelect">
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

        <AddProblem @on-add-success="content='manage-problem'" v-if="content==='add-problem'"/>
        <ManageProblem @add-button-click="content='add-problem'" v-if="content==='manage-problem'"/>

      </Content>

    </Layout>

  </Layout>
</template>

<script>
import {mapGetters} from "vuex";
import AddProblem from "@/components/user/advanced/problem/AddProblem";
import ManageProblem from "@/components/user/advanced/problem/ManageProblem";

export default {
  name: "SelfIndex",
  components: {ManageProblem, AddProblem},
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

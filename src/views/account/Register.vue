<template>
  <Form :model="formItem">
    <FormItem prop="username">
      <Input type="text" v-model="formItem.username" placeholder="账号" size="large">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formItem.password" placeholder="密码" size="large">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <div class="footer">
      <Button
        type="primary"
        class="btn" long
      >
        注册
      </Button>
    </div>
  </Form>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        formItem: {
          username: '',
          password: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>

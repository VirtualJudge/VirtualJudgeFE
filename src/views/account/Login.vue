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
      <Button type="primary" @click="loginRequest()" class="btn" long>
        登录
      </Button>
    </div>
  </Form>
</template>

<script>
  import api from '../../api'

  export default {
    name: "Login",
    data() {
      return {
        formItem: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      loginRequest() {
        api.requestLogin(this.formItem.username, this.formItem.password).then(res => {
          this.$Message.success("登录成功");
          window.location.reload();
        }, res => {
          this.$Message.error("账号或者密码不正确");
        })
      }
    }
  }
</script>

<style scoped>

</style>

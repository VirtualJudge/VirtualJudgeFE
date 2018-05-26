<template>
  <Form :model="formItem">
    <FormItem prop="username">
      <Input type="text" v-model="formItem.username" placeholder="账号" size="large">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="email">
      <Input type="email" v-model="formItem.email" placeholder="邮箱" size="large">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formItem.password" placeholder="密码" size="large">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <div class="footer">
      <Button @click="handleRegister()" type="primary" class="btn" long>
        注册
      </Button>
    </div>
  </Form>
</template>

<script>
  import api from '../../api'

  export default {
    name: "Register",
    data() {
      return {
        formItem: {
          username: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      handleRegister() {
        api.register(this.formItem.username, this.formItem.email, this.formItem.password).then(res => {
          this.$Message.success('注册成功');
          console.log(res);
        }, res => {
          this.$Message.error('注册失败');
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <Form :model="formItem" :rules="formItem.rules">
    <FormItem prop="username">
      <Input type="text" v-model="formItem.username" placeholder="账号" size="large">
      <Icon type="md-person" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="email">
      <Input type="email" v-model="formItem.email" placeholder="邮箱" size="large">
      <Icon type="md-mail" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formItem.password" placeholder="密码" size="large">
      <Icon type="md-lock" slot="prepend"></Icon>
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
          password: '',
          rules: {
            username: {
              required: true,
              type: 'string',
              pattern: /^[a-zA-Z0-9\-_]{4,20}$/,
              message: '用户名长度为4-20，且只能包含字母，数字，-，_。',
              trigger: 'change'
            },
            password: {
              required: true,
              type: 'string',
              pattern: /^[a-zA-Z0-9\-_.]{8,30}$/,
              message: '密码长度为8-30，且只能包含字母，数字，-，_，.。',
              trigger: 'change'
            },
            email: {
              required: true,
              type: 'email',
              max: 256,
              message: '邮箱不正确或者大于256个字符',
              trigger: 'change'
            }

          }
        }
      }
    },
    methods: {
      handleRegister() {
        api.register(this.formItem.username, this.formItem.email, this.formItem.password).then(res => {
          this.$Message.success('注册成功');
          setTimeout(() => {
            this.$router.go(0);
          }, 1000);
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

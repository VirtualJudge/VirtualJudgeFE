<template>
  <Form :model="formItem" :rules="formItem.rules">
    <FormItem prop="username">
      <Input type="text" v-model="formItem.username" placeholder="账号" size="large">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="email">
      <Input type="email" v-model="formItem.email" placeholder="邮箱" size="large">
      <Icon type="ios-email-outline" slot="prepend"></Icon>
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
          password: '',
          rules: {
            username: [
              {required: true, message: '用户名不为空'},
              {type: 'string', min: 4, message: '用户名不得少于4个字符', trigger: 'blur'},
              {type: 'string', max: 20, message: '用户名不得大于20个字符', trigger: 'blur'}
            ],
            password: [
              {required: true, message: '密码不为空'},
              {type: 'string', min: 8, message: '密码不得少于6个字符', trigger: 'blur'},
              {type: 'string', max: 30, message: '密码不得大于30个字符', trigger: 'blur'}
            ],
            email: [
              {required: true, message: '邮箱不为空'},
              {type: 'string', max: 256, message: '邮箱不得大于256个字符', trigger: 'blur'}
            ]
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

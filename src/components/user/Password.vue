<template>
  <div>
    <Form :label-width="120">
      <FormItem label="账号">
        <Input type="text" v-model="username" style="width: 400px" readonly/>
      </FormItem>
      <FormItem label="原密码">
        <Input type="password" v-model="old_password" style="width: 400px" clearable/>
      </FormItem>
      <FormItem label="新密码">
        <Input type="password" v-model="password" style="width: 400px" clearable/>
      </FormItem>
      <FormItem label="邮箱">
        <Input type="email" v-model="email" style="width: 400px" clearable/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submitForm">更新</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    name: "Password",
    data() {
      return {
        username: '',
        old_password: '',
        password: '',
        email: '',
      }
    },
    mounted() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        api.getInformation().then(res => {
          if (res.data.status === 0) {
            this.username = res.data.data.username;
            this.email = res.data.data.email;
          }
        })
      },
      submitForm() {
        api.updatePasswordAndEmail({
          username: this.username,
          old_password: this.old_password,
          new_password: this.password,
          email: this.email
        }).then(res => {
          this.$Message.success('更新成功')
          setTimeout(() => {
            window.location.href = '/'
          }, 200)
        }, res => {
          this.$Message.error('更新失败')
        })
      }
    }
  }
</script>

<style scoped>

</style>

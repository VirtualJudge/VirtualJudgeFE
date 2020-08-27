<template>
  <div style="height: 100%; display: flex; align-items: center; ">
    <div style="width: 80%; max-width: 420px; margin: 0 auto;">
      <Form :label-width="120">
        <FormItem label="旧密码">
          <Input id="oldpassword" type="password" placeholder="旧密码" v-model="oldpassword">
              <Icon type="md-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="新密码">
          <Input id="newpassword" type="password" placeholder="新密码" v-model="formdate.password">
              <Icon type="md-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="确认新密码">
          <Input id="newpassword_check" type="password" placeholder="再输入一遍新密码" v-model="check_newpassword"> 
              <Icon type="md-unlock" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      formdate: {
        password: ''
      },
      oldpassword: '',
      check_newpassword: ''
    }
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>

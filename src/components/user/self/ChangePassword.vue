<template>
  <div style="height: 100%; display: flex; align-items: center; ">
    <div style="width: 80%; max-width: 480px; margin: 0 auto;">
      <Form ref="formdata" :label-width="120" :rules="pwdrule" :model="formdata">
        <FormItem label="旧密码" prop="oldpassword">
          <Input id="oldpassword" type="password" placeholder="旧密码" v-model="formdata.oldpassword">
              <Icon type="md-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="新密码" prop="password">
          <Input id="newpassword" type="password" placeholder="新密码" v-model="formdata.password">
              <Icon type="md-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="确认新密码" prop="check_newpassword">
          <Input id="check_newpassword" type="password" placeholder="再输入一遍新密码" v-model="formdata.check_newpassword"> 
              <Icon type="md-unlock" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="changePassword('formdata')">确认修改</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChangePassword",
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.formdata.password) {
        callback(new Error('两次输入的密码不匹配'));
      } else {
        callback();
      }
    };
    return {
      formdata: {
        password: '',
        oldpassword: '',
        check_newpassword: ''
      },
      pwdrule: {
        password: [
          {
            required: true, 
            message: '新密码不能为空', 
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9\-_.]{8,20}$/,
            message: '新密码8-20位之内，可以使用字母数字,-,_,.',
            trigger: 'blur'
          }
        ],
        check_newpassword: [
          {
            required: true,
            message: '请再次键入新密码', 
            trigger: 'blur'
          },
          {
            validator: validatePassCheck, 
            trigger: 'blur'
          }
        ],
        oldpassword: [
          {
            required: true, 
            message: '旧密码不能为空', 
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9\-_.]{8,20}$/,
            message: '请键入符合条件的旧密码',
            trigger: 'blur'
          }
        ],
      }
    }
  },
  mounted() {
  },
  methods: {
    changePassword(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // TODO 检查旧密码, 然后提交数据
        } else {
          this.$Message.error('表单中部分字段不满足条件');
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

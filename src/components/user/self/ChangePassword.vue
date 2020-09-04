<template>
  <div style="height: 100%; display: flex; align-items: center; ">
    <div style="width: 80%; max-width: 480px; margin: 0 auto;">
      <Form ref="formData" :label-width="120" :rules="pwdRule" :model="formData">
        <FormItem label="旧密码" prop="oldPassword">
          <Input type="password" placeholder="旧密码" v-model="formData.oldPassword">
              <Icon type="md-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="新密码" prop="newPassword">
          <Input type="password" placeholder="新密码" v-model="formData.newPassword">
              <Icon type="md-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="确认新密码" prop="checkNewPassword">
          <Input type="password" placeholder="再输入一遍新密码" v-model="formData.checkNewPassword"> 
              <Icon type="md-unlock" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="changePassword('formData')">确认修改</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import api from "@/utils/api";
export default {
  name: "ChangePassword",
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.formData.newPassword) {
        callback(new Error('两次输入的密码不匹配'));
      } else {
        callback();
      }
    };
    return {
      formData: {
        newPassword: '',
        oldPassword: '',
        checkNewPassword: ''
      },
      pwdRule: {
        newPassword: [
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
        checkNewPassword: [
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
        oldPassword: [
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
          let oldPassword = this.formData.oldPassword;        // 表单数据中的旧密码和新密码
          let newPassword = this.formData.newPassword;

          let res = api.changeUserPassword(oldPassword, newPassword);


          console.log(res);
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

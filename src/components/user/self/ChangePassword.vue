<template>
  <div style="height: 100%; display: flex; align-items: center; ">
    <div style="width: 80%; max-width: 480px; margin: 0 auto;">
      <h2 style="text-align: center">修改密码</h2>
      <Form style="margin-top: 10px" ref="formData" :label-width="120" :rules="pwdRule" :model="formData">
        <FormItem label="原密码" prop="oldPassword">
          <label>
            <Input type="password" placeholder="旧密码" v-model="formData.oldPassword">
            </Input>
          </label>
        </FormItem>
        <FormItem label="新密码" prop="newPassword">
          <label>
            <Input type="password" placeholder="新密码" v-model="formData.newPassword">
            </Input>
          </label>
        </FormItem>
        <FormItem label="确认新密码" prop="checkNewPassword">
          <label>
            <Input type="password" placeholder="再输入一遍新密码" v-model="formData.checkNewPassword">
            </Input>
          </label>
        </FormItem>
        <FormItem label="验证码" prop="captcha">
          <Row>
            <Col span="12">
              <label>
                <Input type="text" placeholder="点击图片刷新验证码" v-model="formData.captcha">
                </Input>
              </label>
            </Col>
            <Col span="12" style="padding-left: 10px">
              <img alt="captcha" :src="this.captcha_url" @click="randomCaptcha" style="height: 32px; margin: auto">
            </Col>
          </Row>

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
import message from "@/utils/message";
import {mapGetters, mapActions} from 'vuex'

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
        checkNewPassword: '',
        captcha: ''
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
        captcha: [
          {
            required: true,
            message: '请输入图形验证码',
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
    this.randomCaptcha()
  },
  methods: {
    ...mapActions(['randomCaptcha', 'getProfile']),
    changePassword(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let oldPassword = this.formData.oldPassword;        // 表单数据中的旧密码和新密码
          let newPassword = this.formData.newPassword;

          api.changeUserPassword(
              oldPassword,
              newPassword).then(res => {
                if (res.data.err == null) {
                  this.$Message.success('修改成功, 请重新登录');
                  this.$router.push('/')
                  this.getProfile()
                } else {
                  this.$Message.error(message.err(res.data.err));
                }
              }
          );
        } else {
          this.$Message.error('表单中部分字段不满足条件');
        }
      })
    }
  },
  computed: {
    ...mapGetters(['captcha_url'])
  }
}
</script>

<style scoped>

</style>

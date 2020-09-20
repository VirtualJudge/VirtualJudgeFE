<template>
  <div style="height: 100%; display: flex; align-items: center; ">
    <div style="width: 80%; max-width: 480px; margin: 0 auto;">
      <h2 style="text-align: center">修改邮箱</h2>
      <Form style="margin-top: 10px" ref="formData" :label-width="120" :rules="pwdRule" :model="formData">
        <FormItem label="新邮箱地址" prop="email">
          <label>
            <Input type="email" v-model="formData.email">
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
      </Form>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "ChangeEmail",
  data() {
    return {
      pwdRule: {
        email: [{
          required: true,
          message: '新密码不能为空',
          trigger: 'blur'
        }]
      },
      formData: {
        email: '',
        captcha: ''
      }
    }
  },
  mounted() {
    this.randomCaptcha()
  },
  methods: {
    ...mapActions(['randomCaptcha'])
  },
  computed: {
    ...mapGetters(['captcha_url'])
  }
}
</script>

<style scoped>

</style>

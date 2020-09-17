<template>
  <div class="main-view">
    <div class="register-view">
      <h2 style="text-align: center;margin-bottom: 10px">注册账号</h2>
      <Alert show-icon closable>
        注册提示
        <template slot="desc">填好邮箱和图形验证码之后，系统会向您的邮箱地址发送一封带有邮箱验证码的邮件。<br/>
          获得邮箱验证码之后请继续完成其他的信息的补充
        </template>
      </Alert>
      <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" label-position="right" :label-width="100">
        <FormItem label="邮箱" prop="email">
          <label>
            <Input :disabled="verify_code_sent" type="email" v-model="formValidate.email"></Input>
          </label>
        </FormItem>
        <FormItem label="图形验证码" prop="captcha">
          <Row>
            <Col span="8">
              <label>
                <Input :disabled="verify_code_sent" type="text"
                       placeholder="点击图片刷新验证码"
                       v-model="formValidate.captcha">
                </Input>
              </label>
            </Col>
            <Col span="7" offset="1">
              <img alt="captcha" :src="this.captcha_url" @click="randomCaptcha" style="height: 32px; margin: auto">
            </Col>
            <Col span="7" offset="1">
              <Button :disabled="verify_code_sent" @click="handleSendEmailVerifyCode" type="info">发送邮箱验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <Divider/>
        <FormItem label="邮箱验证码" prop="verify_code">
          <label>
            <Input :disabled="!verify_code_sent" type="text" v-model="formValidate.verify_code"></Input>
          </label>
        </FormItem>
        <FormItem label="账号" prop="username">
          <label>
            <Input placeholder="请不要使用身份证号码或者学号作为用户名" :disabled="!verify_code_sent"
                   v-model="formValidate.username"></Input>
          </label>
        </FormItem>
        <FormItem label="密码" prop="password">
          <label>
            <Input :disabled="!verify_code_sent" type="password" v-model="formValidate.password"></Input>
          </label>
        </FormItem>
        <FormItem label="再输入密码" prop="password2">
          <label>
            <Input :disabled="!verify_code_sent" type="password" v-model="formValidate.password2"></Input>
          </label>
        </FormItem>

        <FormItem>
          <Button :disabled="!verify_code_sent" type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button :disabled="!verify_code_sent" @click="handleReset('formValidate')" style="margin-left: 8px">清空
          </Button>
        </FormItem>
      </Form>

    </div>
  </div>
</template>

<script>


import {mapGetters, mapActions} from 'vuex'
import api from "@/utils/api";
import message from "@/utils/message";

export default {
  name: "Register",
  mounted() {
    this.randomCaptcha()
  },
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.formValidate.password) {
        callback(new Error('两次输入的密码不匹配'));
      } else {
        callback();
      }
    };
    return {
      verify_code_sent: false,
      formValidate: {
        username: '',
        email: '',
        password: '',
        password2: '',
        captcha: '',
        verify_code: ''
      },
      ruleValidate: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {
            pattern: /^[a-zA-Z][a-zA-Z0-9\-_]{5,19}$/,
            message: '用户名以字母开头，6-20位之内，可以使用字母,数字,-,_',
            trigger: 'blur'
          }
        ],
        captcha: [
          {required: true, message: '图形验证码不能为空', trigger: 'blur'},
        ],
        verify_code: [
          {required: true, message: '邮箱验证码不能为空', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {
            pattern: /^[a-zA-Z0-9\-_.]{8,20}$/,
            message: '密码8-20位之内，可以使用字母,数字,-,_,.',
            trigger: 'blur'
          }
        ],
        password2: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {
            pattern: /^[a-zA-Z0-9\-_.]{8,20}$/,
            message: '密码8-20位之内，可以使用字母,数字,-,_,.',
            trigger: 'blur'
          }, {
            validator: validatePassCheck, trigger: 'blur'
          }
        ]
      }
    }

  },
  methods: {
    ...mapActions(['randomCaptcha']),
    handleSendEmailVerifyCode() {
      api.postEmailValidate(this.formValidate.email, this.formValidate.captcha).then(res => {
        if (res.data.err == null) {
          this.$Message.success(res.data.data);
          this.verify_code_sent = true
        } else {
          this.$Message.error(message.err(res.data.err));
        }
      }).finally(() => {
        this.randomCaptcha()
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          api.putUserRegister(this.formValidate.username, this.formValidate.password, this.formValidate.email, this.formValidate.verify_code).then(res => {
            if (res.data.err === null) {
              this.$Message.success('注册成功')
              this.$router.push('/')
            } else {
              this.$Message.error({
                content: '注册失败' + message.err(res.data.err),
                duration: 3
              });
            }
          }).finally(() => {
            this.randomCaptcha()
          })

        } else {
          this.$Message.error('表单中部分字段不满足条件');
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }, computed: {
    ...mapGetters(['captcha_url'])
  }
}
</script>

<style scoped>
.register-view {
  max-width: 600px;
  margin: auto;
}

.main-view {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
</style>

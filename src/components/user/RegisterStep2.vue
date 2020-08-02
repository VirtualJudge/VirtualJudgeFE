<template>
  <div>
    <h2 style="text-align: center;margin-bottom: 10px">填写邮箱验证码</h2>
    <Alert type="success" show-icon closable>
      邮箱验证提醒
      <span slot="desc">
          一封带有激活验证码的邮件已经发送至您的邮箱<br/>
          请登录该邮箱，将验证码填下在下方，以便激活您的账号。<br/>
          激活码有效期60分钟。
        </span>
    </Alert>
    <Form label-position="right" :label-width="150">
      <FormItem label="用户名" prop="username">
        <label>
          <Input type="text" v-model="username" disabled></Input>
        </label>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <label>
          <Input type="text" v-model="email" disabled></Input>
        </label>
      </FormItem>
      <FormItem label="验证码" prop="code">
        <label>
          <Input type="number" v-model="code"></Input>
        </label>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">下一步</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>

import api from "@/utils/api";

export default {
  name: "RegisterStep2",
  props: {
    id: {
      type: Number,
    },
    email: {
      type: String,
      default: 'unknown email'
    },
    username: {
      type: String,
      default: 'unknown username'
    }
  },
  data() {
    return {
      code: '',
    }
  },
  mounted() {
    this.$emit('step', 1)
  }, methods: {
    handleSubmit() {
      api.postAccountActivate(this.id, this.code).then(res => {
        if (res.data.err === null) {
          this.$Message.success('邮箱验证成功')
          this.$emit('nextStep', {})
        } else {
          let msg = '邮箱验证失败 '
          if (typeof (res.data.err) === 'string') {
            msg += res.data.err
          } else if (typeof (res.data.err) === 'object') {
            for (const key1 in res.data.err) {
              if (Object.prototype.hasOwnProperty.call(res.data.err, key1)) {
                msg += `${key1}:${res.data.err[key1]} `
              }
            }
          }
          this.$Message.error({
            content: msg,
            duration: 3
          });
        }
      })
    },
    handleReset() {
    }

  }
}
</script>

<style scoped>
</style>

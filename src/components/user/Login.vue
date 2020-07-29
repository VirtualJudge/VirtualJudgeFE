<template>
    <div>
        <Form ref="formItem" :model="formItem" :rules="formItem.rules">
            <FormItem prop="username" style="margin-bottom: 30px">
                <label for="username"></label>
                <Input id="username" type="text" v-model="formItem.username" placeholder="账号" size="large">
                    <Icon type="md-person" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password" style="margin-bottom: 30px">
                <label for="password"></label>
                <Input id="password" type="password" v-model="formItem.password" placeholder="密码" size="large">
                    <Icon type="md-lock" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <Button size="small" type="text" to="/cannot_login" @click="closeModal">忘记账号或者密码？</Button>
            <div class="footer">
                <Button type="primary" @click="loginRequest('formItem')" class="btn" long>
                    提交
                </Button>
            </div>
        </Form>
    </div>

</template>

<script>
    import {mapActions} from 'vuex'
    import api from "../../utils/api";

    export default {
        name: "Login",
        data() {
            return {
                formItem: {
                    username: '',
                    password: '',
                    rules: {
                        username: {
                            required: true,
                            type: 'string',
                            pattern: /^[a-zA-Z][a-zA-Z0-9\-_]{5,19}$/,
                            message: '用户名以字母开头，6-20位之内，可以使用字母,数字,-,_',
                            trigger: 'blur'
                        },
                        password: {
                            required: true,
                            type: 'string',
                            pattern: /^[a-zA-Z0-9\-_.]{8,20}$/,
                            message: '密码8-20位之内，可以使用字母,数字,-,_,.',
                            trigger: 'blur'
                        },
                    }
                }
            }
        },
        methods: {
            ...mapActions(['getProfile']),
            closeModal() {
                this.$emit('closeModal')
            },
            loginRequest(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        api.postUserLogin(this.formItem.username, this.formItem.password).then(res => {
                            if (res.data !== null && res.data.err === null) {
                                this.getProfile()
                                this.closeModal()
                                this.$Message.success({
                                    content: '登录成功',
                                    duration: 2
                                })
                                this.formItem.username = ''
                                this.formItem.password = ''
                            } else {
                                let msg = '登录失败\n'
                                for (const key1 in res.data.err) {
                                    msg += `${key1}:${res.data.err[key1]}\n`
                                }
                                this.$Message.error({
                                    content: msg,
                                    duration: 3
                                });
                            }
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .footer {
        margin-top: 10px;
    }
</style>

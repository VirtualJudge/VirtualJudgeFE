<template>
    <div>
        <h2 style="text-align: center;margin-bottom: 10px">填写基本信息</h2>
        <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" label-position="right" :label-width="150">
            <FormItem label="账号" prop="username">
                <Input v-model="formValidate.username"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input v-model="formValidate.email"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input type="password" v-model="formValidate.password"></Input>
            </FormItem>
            <FormItem label="再输入密码" prop="password2">
                <Input type="password" v-model="formValidate.password2"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">下一步</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>

    export default {
        name: "RegisterStep1",
        mounted() {
            this.$emit('step', 0)

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
                formValidate: {
                    username: '',
                    email: '',
                    password: '',
                    password2: ''
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
            init() {

            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        this.$emit('nextStep')
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>

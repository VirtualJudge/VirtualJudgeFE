<template>
    <div>
        <Steps :current="currentStep" class="step-list">
            <Step title="填写信息"></Step>
            <Step title="验证邮箱"></Step>
            <Step title="完成注册"></Step>
        </Steps>

        <router-view id="router-view" @step="updateStep" @nextStep="nextStep"/>
        <Button class="register-page-button" type="primary" @click="nextStep" v-if="currentStep<2">下一步</Button>
    </div>
</template>

<script>

    export default {
        name: "Register",
        data() {
            return {
                currentStep: 0
            }
        },
        mounted() {

        }, methods: {
            updateStep(step){
                this.currentStep = step
            },
            nextStep() {
                if (this.currentStep < 2) {
                    this.currentStep += 1
                }
                if (this.currentStep === 0) {
                    this.$router.push('/register/step1')
                }
                if (this.currentStep === 1) {
                    this.$router.push('/register/step2')
                }
                if (this.currentStep === 2) {
                    this.$router.push('/register/step3')
                }
            }
        }
    }
</script>

<style scoped>
    #router-view {
        margin-left: auto;
        margin-right: auto;
        width: 600px;
        margin-bottom: 10px;
        height: 400px;
    }

    .step-list {
        width: 90%;
        max-width: 1200px;
        margin: 20px auto 20px auto;
    }

    .register-page-button {
        margin: 20px auto 20px auto;
    }
</style>

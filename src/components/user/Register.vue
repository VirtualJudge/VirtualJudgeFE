<template>
  <div>
    <Steps :current="currentStep" class="step-list">
      <Step title="填写信息"></Step>
      <Step title="验证邮箱"></Step>
      <Step title="完成注册"></Step>
    </Steps>

    <RegisterStep1 class="step-view" @nextStep="nextStep" v-show="currentStep===0"/>
    <RegisterStep2 class="step-view" @nextStep="nextStep" v-bind="step2Prop" v-show="currentStep===1"/>
    <RegisterStep3 class="step-view" v-show="currentStep===2"/>
  </div>
</template>

<script>

import RegisterStep1 from "@/components/user/RegisterStep1";
import RegisterStep2 from "@/components/user/RegisterStep2";
import RegisterStep3 from "@/components/user/RegisterStep3";
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Register",
  components: {RegisterStep3, RegisterStep2, RegisterStep1},
  data() {
    return {
      currentStep: 0,
      step2Prop: {},
      step3Prop: {}
    }
  },
  mounted() {
    if (this.$route.params !== null) {
      this.currentStep = this.$route.params.step || 0
      this.step2Prop = this.$route.params.info || {}
    }

  }, methods: {
    ...mapActions(['getProfile']),
    nextStep(data) {
      if (this.currentStep === 0 || this.currentStep === 1) {
        this.currentStep += 1
      }

      this.step2Prop = data['step2'] || {}
      this.step3Prop = data['step3'] || {}
    }
  }, computed: {
    ...mapGetters(['isAuthenticated'])
  }
}
</script>

<style scoped>
.step-view {
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

</style>

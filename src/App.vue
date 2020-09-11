<template>
  <div id="app">
    <NavBar/>
    <router-view v-if="toggleFlag"/>
  </div>
</template>

<style>
#app {
  min-width: 800px;
}

</style>

<script>
import NavBar from "./components/NavBar";
import {mapActions} from 'vuex'

export default {
  components: {NavBar},
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      toggleFlag: true
    }
  },
  mounted() {
    this.getProfile()

  },
  methods: {
    ...mapActions(['getProfile']),
    reload() {
      this.toggleFlag = false
      this.$nextTick(() => {
        this.toggleFlag = true
      })
    }

  }
}
</script>

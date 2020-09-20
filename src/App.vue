<template>
  <div id="app">
    <NavBar/>
    <router-view/>
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
  mounted() {
    this.getProfile()
  },
  methods: {
    ...mapActions(['getProfile']),
  }
}
</script>

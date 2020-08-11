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


export default {
  components: {NavBar}
}
</script>

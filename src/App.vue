<template>
  <Layout style="min-width: 1300px">
    <NavBar></NavBar>
    <router-view></router-view>
    <Footer></Footer>
  </Layout>
</template>

<script>
  import NavBar from "./components/NavBar";
  import Footer from "./components/Footer";

  export default {
    name: 'App',
    components: {Footer, NavBar}
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

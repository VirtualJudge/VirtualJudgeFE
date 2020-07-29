<template>
    <div id="app">
        <NavBar/>
        <router-view id="main-view"/>
    </div>
</template>

<style>
    #app {
        min-width: 1280px;
    }
    #main-view{
        width: 95%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
    }
</style>

<script>
    import NavBar from "./components/NavBar";


    export default {
        components: { NavBar}
    }
</script>

<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <CanvasSign /> -->
    <Sign></Sign>
  </div>
</template>

<script>
// import CanvasSign from "./components/CanvasSign.vue";

export default {
  name: "App",
  components: {
    // CanvasSign,
    Sign: ()=> import('./components/Sign')
  },
  
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

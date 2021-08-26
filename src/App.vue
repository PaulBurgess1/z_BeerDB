<template>
<div class="container-fluid" id="app">
    <Header></Header>
    <router-view/>
    
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
:root {
    --clr-bg: hsl(210, 10%, 80%);
    --clr-bg-hf: 	hsl(210, 10%, 23%);
    --clr-bg-hf-secondary: hsl(210, 10%, 35%);
    --clr-bg-hf-btn: hsl(210, 10%, 45%);
    --clr-text: azure;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

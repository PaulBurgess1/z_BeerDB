<template>
<div class="container-fluid gx-0 p-0 m-0 w-100" id="app">
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
  },
  data() {
    return{
    }
  },
}
</script>

<style>
:root {
  --clr-primary:  #F6C101;
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
}
body{
  background-color: var(--bs-light);
}
/* Non Mobile Devices ( > 640px) */
@media(min-width: 40em){
  /* Scrollbar */
  /*Not supported on IE or Firefox */
  body::-webkit-scrollbar {
    width: auto;
  }

  body::-webkit-scrollbar-track {
    background-color: var(--clr-bg-hf);
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--clr-primary);
    border: 0.125em solid var(--clr-text);
    border-radius: 100vw;
  }

  body::-webkit-scrollbar-thumb:hover {
    background-color: var(--clr-text);
  }
  body::-webkit-scrollbar-corner {
    background-color: var(--clr-bg-hf-btn);
  }
  /* For Firefox */
  @supports( scrollbar-color: red red){
    *{
      scrollbar-color: var(--clr-primary) var(--clr-bg-hf);
      scrollbar-width: auto;
    }
  }
  
}
</style>

<template>
  <div id="app">
    <TopMenu/>
    <router-view/>
  </div>
</template>

<script>
import { Adaptation } from './util/utils.js'
import TopMenu from './components/TopMenu.vue'
export default {
  name: 'App',
  data () {
    return {

    }
  },
  components: {
    TopMenu
  },
  created () {
    Adaptation()
    window.onresize = () => {
      Adaptation()
    }
  }
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

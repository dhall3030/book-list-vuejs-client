<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
  <app-header></app-header>
  
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>


  <app-footer></app-footer>


  </div>

</template>

<script>

import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
        appHeader: Header,
        appFooter: Footer
  },
  created(){ 

    console.log('created');

    this.$store.dispatch('autoLogin') 

     if(this.$store.getters.isAuthenticated == true){

        this.$router.replace('/dashboard')

     }



  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.slide-enter-active {
  animation: slideInRight 0.5s both ease-in
}

.slide-leave-active {
  animation: slideOutLeft 0.5s both ease-in
}


@keyframes slideOutLeft {
  to {
    transform: translateX(-100%)
  }
}


@keyframes slideInRight {
  
  from {
     transform: translateX(100%) 
  }
  to {  
      transform: translateX(0)
  }

}


</style>

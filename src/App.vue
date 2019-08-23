<template>
  <div id="app">
    <template v-if="loading">
      <app-loading></app-loading>
    </template>
    <app-header></app-header>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>

import {mapActions} from 'vuex';

import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Footer from './components/Footer.vue';
import Loading from './components/Loading.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    appHeader: Header,
    appFooter: Footer,
    appLoading: Loading
  },
  methods:{
    ...mapActions({
      sLoading: 'initLoading'
    }),
  },
  computed:{
    loading(){
      console.log('hello'+this.$store.getters.isLoading)
      return this.$store.getters.isLoading;
    }
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
  animation: slideInRight 0.5s both ease-in;
}

.slide-leave-active {
  animation: slideOutLeft 0.5s both ease-in;
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

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'

import router from './router'
import store from './store/store'

axios.defaults.baseURL = 'http://localhost:3000';


Vue.use(Vuelidate)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

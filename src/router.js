import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store/store'

import Home from './components/Home.vue';
import Books from './components/books/Books.vue';
import AddBook from './components/books/AddBook.vue';
import BookProfile from './components/books/BookProfile.vue';
import SignUp from './components/auth/SignUp.vue';
import Login from './components/auth/Login.vue';
import Dashboard from './components/Dashboard.vue';

Vue.use(VueRouter)


const routes = [
	{path: '/signup', component: SignUp, name: 'signup'},
  {path: '/login', component: Login, name: 'login'},
	{path: '/home', component: Home, name: 'home'},
	{path: '/books', component: Books, name: 'books'},
	{path: '/add-book', component: AddBook, name: 'add-book'},
  {path: '/book-profile/:id', component: BookProfile, name: 'book-profile'},
	
	{path: '/', redirect: '/home' },
    {path: '*', redirect: '/' },
    { 
  	path: '/dashboard', 
  	component: Dashboard,
  	beforeEnter (to, from, next) { 
  		
      //console.log(store.state.token)
      		if(store.getters.isAuthenticated == true){

  			next()

	  		}else{

	  			next('/login')

	  		}


  		}
  	}

]

export default new VueRouter({mode: 'history', routes})
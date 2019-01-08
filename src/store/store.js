import Vue from 'vue';
import Vuex from 'vuex';

import auth  from './modules/auth';
import book  from './modules/book';

import router from '../router'

Vue.use(Vuex);

export default new Vuex.Store({


	modules:{
		auth,
		book
	}



});
import axios from 'axios'

import router from '../../router'


const state = { 

	isLoading: false
	
	
	
};


const mutations = {

	'SET_LOADING' (state, loading) {


	 	state.isLoading = loading;

	 
	 },



};


const actions = {


	initLoading: ({commit},loading) => {


		commit('SET_LOADING', loading)

		


	}


};

const getters = {

	isLoading (state) {

	  return state.isLoading;
	
	}



};


export default {
	 state,
	 mutations,
	 actions,
	 getters


}

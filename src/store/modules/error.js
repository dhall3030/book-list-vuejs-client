import axios from 'axios'

import router from '../../router'


const state = {
	error: null
};


const mutations = {

	'SET_ERROR' (state, error) {

	 	state.error = error;

	 },
};


const actions = {

	initError: ({commit},error) => {

		commit('SET_ERROR', error)

		//localStorage.setItem('error',error)

	}
};

const getters = {

	error (state) {

	  return state.error;

	}
};


export default {
	 state,
	 mutations,
	 actions,
	 getters
}

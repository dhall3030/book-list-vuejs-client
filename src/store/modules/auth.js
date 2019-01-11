import axios from 'axios'

import router from '../../router'

const state = { 

	token: null, 
	userId: null,
	
	
	

};


const mutations = {

	'AUTH_USER' (state, userData) {


	 	state.token = userData.token;
	 	state.userId = userData.userId;
	 	


	 	

	 
	 },
	 'CLEAR_AUTH' (state) {

	 	state.token = null 
  		state.userId = null

  		localStorage.removeItem('token')
  		localStorage.removeItem('userId')
  		localStorage.removeItem('expirationDate')

	 }



};


const actions ={


	setLogoutTimer ({commit}, expirationTime) {
      
      console.log('set timer')

      setTimeout(() => {
        commit('CLEAR_AUTH')

        console.log('timer done')
      
      }, expirationTime)
    },
	signup: ({commit , dispatch}, userData) => { 

		
			axios.post('/users/signup',{

				
				email: userData.email,
				password: userData.password



			})
            .then(response =>{
             
              	console.log(response.data)

              	const ONE_HOUR = 60 * 60 * 1000;

              	const now = new Date()
	            const expirationDate = new Date(now.getTime() + ONE_HOUR)
                
                commit('AUTH_USER',{

                	token: response.data.token,
              		userId: response.data.userId
              		

                })

             localStorage.setItem('token',response.data.token)
			 localStorage.setItem('userId',response.data.userId)
			 localStorage.setItem('expirationDate', expirationDate)
			 
			 dispatch('setLogoutTimer', ONE_HOUR)

			 router.replace('/dashboard')

            })
            .catch(error => console.log(error))




	},
	login: ({commit , dispatch}, userData) => {

			axios.post('/users/login',{

					
					email: userData.email,
					password: userData.password
					



				})
	            .then(response =>{
	             
	             	console.log(response.data)

	             	const ONE_HOUR = 60 * 60 * 1000;

	             	const now = new Date()
	              	const expirationDate = new Date(now.getTime() + ONE_HOUR)

	                commit('AUTH_USER',{

	                	token: response.data.token,
	              		userId: response.data.userId
	              		

	                })

	                localStorage.setItem('token',response.data.token)
			 		localStorage.setItem('userId',response.data.userId)
			 		localStorage.setItem('expirationDate', expirationDate)

			 		dispatch('setLogoutTimer', ONE_HOUR)

			 		router.replace('/dashboard')


	            })
	            .catch(error => console.log(error))

		
	},
	logout: ({commit}) =>{

		commit('CLEAR_AUTH')

		localStorage.removeItem('token')
  		localStorage.removeItem('userId')


		router.replace('/login')

		
	},
	autoLogin: ({commit, dispatch})=>{

		const token = localStorage.getItem('token')
		
		if (!token) {
         return
      	}
      	

      	const expirationDate = localStorage.getItem('expirationDate')
      	const now = new Date()
      	if (now >= expirationDate) {
        return
        }

		const userId = parseInt(localStorage.getItem('userId'))
		

		commit('AUTH_USER',{

	          token: token,
	          userId: userId,
	         


	    })

		const endDate = new Date(expirationDate)

		console.log(endDate.getTime())

		const time = (endDate.getTime() - now.getTime());

		console.log(time)

		dispatch('setLogoutTimer', time)


	}




}

const getters = {


	userId (state) {

  		return state.userId

  	},
  	token (state) {

  		return state.token

  	},
  	isAuthenticated(state){ 

  		return state.token !== null




  	}



}




export default {
	 state,
	 mutations,
	 actions,
	 getters


}
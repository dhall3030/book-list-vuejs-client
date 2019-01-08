import axios from 'axios'


const state = { 

	
	books: [],
	

};


const mutations = {

	'SET_BOOKS' (state, books) {


	 	state.books = books;

	 
	 },



};


const actions = {

	initBooks: ({commit},token) => {

 		
		axios.get('/books',{

			 headers: {Authorization: 'Bearer '+token }

		})
              .then(response =>{
             
              	const books = response.data.books;
              	
              	//console.log(response);

              	commit('SET_BOOKS', books)
              


              })

              
 	}

};


const getters = {

	books (state) {

	 	//console.log(state.media)
	 	return state.books;
	},
	getBookById: (state) => (id) => {

	 	
		return state.books.find(x => x._id == id);
		 	
		
	 
	}
	 
	 

};



export default {
	 state,
	 mutations,
	 actions,
	 getters


}
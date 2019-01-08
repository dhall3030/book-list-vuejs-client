<template>
	
	<section>
		
		<div>
			<h2>{{title}}</h2>
			<div>{{content}}</div>
		
			<ul>
				<li>{{bookItem.name}}</li>
				<li>{{bookItem.author}}</li>
				<li>{{bookItem.publisher}}</li>
				<li>{{bookItem.isbn}}</li>	
			</ul>

			<a href="#" @click="deleteBook(bookItem._id)">Delete</a>


		</div>

	</section>
	
</template>

<script>
	
	import axios from 'axios'
	import {mapActions} from 'vuex'
	
	export default {

		name: 'BookProfile', 
		data (){

			return{

				title: 'Book Profile', 
				content: 'This is the book info!'


			}

		},
		methods: {

		  ...mapActions({
             	loadBooks: 'initBooks',

          }),		
          deleteBook(bookId){

          
               

                if( confirm("Do you want to delete this book?") ){

                  

                  axios.delete('/books/'+bookId,{headers:{Authorization: 'Bearer '+this.token}})
                  .then(response =>{
                    console.log(response)

                   
                
                    
                    this.loadBooks(this.token);
                    
             
                  })
                  .catch(error =>{

                    console.log(error)

                  })

                  this.$router.push('/books')



                }else{


                  return false


                }
           


             



          }

		},
		computed: {

			bookItem(){

				return this.$store.getters.getBookById(this.$route.params.id); 

			},
			token(){

            return this.$store.getters.token;

        	}


		}


	}



</script>
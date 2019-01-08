<template>
	<section>
		
		<div>
			<h2>{{title}}</h2>
			<div>{{content}}</div>
		</div>


	</section>
	
</template>

<script>

	import {mapActions} from 'vuex'; 
	
	export default {

		name: 'Dashboard', 
		data (){

			return{

				title: 'Dashboard', 
				content: 'This is the dashboard!'


			}

		},
		methods:{

         ...mapActions({
                loadBooks: 'initBooks'
                
                
          }),

       },
       computed:{ 

       		
        	token(){

            	return this.$store.getters.token;

        	},
        	userId(){

            	return this.$store.getters.userId;

        	}


       },
       created(){


       		 this.loadBooks(this.token);

       }



	}



</script>
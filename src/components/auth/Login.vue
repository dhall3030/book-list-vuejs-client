<template>

	<section>

      <div class="container">
          
          <main>


					<div class="input-container">


            <div  v-html="getError"></div> 

				    <h2>Login</h2>	

            <div class="input" :class="{invalid: $v.email.$error}">
              <label for="email" >Email:</label>
              <input 
              type="email" 
              placeholder="Enter your email" 
              id="email" 
              @blur="$v.email.$touch()" 
              name="email" 
              v-model="email">
            </div>

						<div class="input" :class="{invalid: $v.password.$error}">
              <label for="password">Password:</label>
              <input 
              type="password" 
              placeholder="Enter a password"  
              id="password" 
              @blur="$v.password.$touch()" 
              name="password" 
              v-model="password">
            </div>

					   
				          
				      	


				     <button @click="onSubmit" :disabled="$v.$invalid">Submit</button>

		  		</div>

		  </main>

	  </div>


	</section>


</template>



<script>

import { required , email  } from 'vuelidate/lib/validators'
export default {

	 data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        console.log(formData)
       
        this.$store.dispatch('login',{email: formData.email, password: formData.password})
      }
    },
    validations:{

      email:{
        required,
        email: email
      },
      password:{
        required
      }



    },
    computed: {


      getError(){

        let errorMsg = ""

        
        if(this.$v.email.$error && !this.$v.email.required){

          errorMsg += "<p>The email field must not be empty.</p>";

        }
        if(this.$v.email.$error && !this.$v.email.email){

          errorMsg += "<p>Please provide a valid email address.</p>";

        }
        if(this.$v.password.$error && !this.$v.password.required){

          errorMsg += "<p>The password field must not be empty.</p>";

        }
        if(errorMsg !=""){
        return '<div class="alert alert-danger">'+errorMsg+'</div>';
        }
      
      }



    }
	

}


</script>

<style lang="sass" scoped>



.input.invalid label 
  color: red

.input.invalid input 
  border: 1px solid #ebccd1
  background-color: #f2dede

button[disabled],
button[disabled]:hover,
button[disabled]:active 
  border: 1px solid #ccc
  background-color: transparent
  color: #ccc;
  cursor: not-allowed
  


</style>
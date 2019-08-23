<template>
  <section>
    <div>
      {{bookItem.name}}
      <h2>{{title}}</h2>
      <div>{{content}}</div>
      <div class="input-container">
        <div v-html="getError"></div>
        <div class="input" :class="{invalid: $v.name.$error}">
          <label for="name">Name:</label>
          <input
          type="text"
          placeholder="Enter name of media"
          @blur="$v.name.$touch()"
          id="name"
          name="name"
          v-model="name">
        </div>

        <div class="input" :class="{invalid: $v.author.$error}">
          <label for="author">Author:</label>
          <input
          type="text"
          placeholder="Enter name of media"
          @blur="$v.author.$touch()"
          id="author"
          name="author"
          v-model="author">
        </div>

        <div class="input" :class="{invalid: $v.publisher.$error}">
          <label for="publisher">Publisher:</label>
          <input
          type="text"
          placeholder="Enter name of media"
          @blur="$v.publisher.$touch()"
          id="publisher"
          name="publisher"
          v-model="publisher">
        </div>

        <div class="input" :class="{invalid: $v.isbn.$error}">
          <label for="isbn">Isbn:</label>
          <input
          type="text"
          placeholder="Enter name of media"
          @blur="$v.isbn.$touch()"
          id="isbn"
          name="isbn"
          v-model="isbn">
        </div>

        <button @click="onSubmit" :disabled="$v.$invalid">Submit</button>

        </div>

        <div>
          <input type="file" @change="onFileSelected">
          <button @click="updateImg">Upload Cover Image</button>
          <br>
          <img :src="bookItem.coverImage" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  import axios from 'axios'
  import {mapActions} from 'vuex'
  import { required } from 'vuelidate/lib/validators'

	export default {
    name: 'EditBook',
    data (){
      return{
        selectedFile: null,
        title: 'Edit Book',
        content: 'Edit book in book list!',
        name: '',
        author: '',
        publisher: '',
        isbn: '',
        coverImage: '',
        _id: ''
      }
    },
    methods: {
      ...mapActions({
        loadBooks: 'initBooks',
      }),
      onFileSelected(event){
        this.selectedFile = event.target.files[0]
      },
      onSubmit(){

        // const fd = new FormData();

        // fd.append('name', this.name)
        // fd.append('author', this.author)
        // fd.append('publisher', this.publisher)
        // fd.append('isbn', this.isbn)
        //fd.append('coverImage', this.selectedFile, this.selectedFile.name)

        const payload =[

          {"book": "name", "value": this.name},
          {"book": "author", "value": this.author},
          {"book": "publisher", "value": this.publisher},
          {"book": "isbn", "value": this.isbn}


        ]

        console.log(payload)

        axios.patch('/books/'+this._id,payload,{headers:{Authorization: 'Bearer '+this.token}})
        .then(res => {
          console.log(res)
          this.loadBooks(this.token);
        })
        .catch(error => console.log(error))

        this.$router.push('/books')
      },
      updateImg(){

        const fd = new FormData();

        fd.append('coverImage', this.selectedFile, this.selectedFile.name);

        axios.patch('/books/img-update/'+this._id,fd,{headers:{
          //'Content-Type': 'application/json',
          Authorization: 'Bearer '+this.token},
          onUploadProgress:  uploadEvent =>{
          console.log('Upload Progress: '+ Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%');
          }
        })
        .then(res => {
          console.log(res)
          this.loadBooks(this.token);
        })
        .catch(error => console.log(error))
      }
    },
    validations:{
      name:{
        required
      },
      author:{
        required
      },
      publisher:{
        required
      },
      isbn:{
        required
      }
    },
    computed: {
      getError(){

        let errorMsg = ""

        if(this.$v.name.$error && !this.$v.name.required){
        		errorMsg += "<p>The name field must not be empty.</p>";
        }

        if(this.$v.author.$error && !this.$v.author.required){
        		errorMsg += "<p>The author field must not be empty.</p>";
        }

        if(this.$v.publisher.$error && !this.$v.publisher.required){
        		errorMsg += "<p>The publisher field must not be empty.</p>";
        }

        if(this.$v.isbn.$error && !this.$v.isbn.required){
        		errorMsg += "<p>The isbn field must not be empty.</p>";
        }

        if(errorMsg !=""){
        	return '<div class="alert alert-danger">'+errorMsg+'</div>';
        }
      },
      bookItem(){

        const bookData = this.$store.getters.getBookById(this.$route.params.id);

        this.name = bookData.name;
        this.author = bookData.author;
        this.publisher = bookData.publisher;
        this.isbn = bookData.isbn;
        this.coverImage = bookData.coverImage;
        this._id = bookData._id;

        return bookData;
      },
      token(){
        return this.$store.getters.token;
      }
    }
	}



</script>


<style lang="sass" scoped>

img
	max-width: 200px

</style>
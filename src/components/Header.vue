<template>
  <header>
    <div>
      <div>{{title}}</div>
      <div>{{content}}</div>
    </div>
    <nav>
      <ul>
        <li v-if="!auth"><router-link class="nav-link" active-class="active" to="/home">Home</router-link></li>
        <li v-if="auth"><router-link class="nav-link" active-class="active" to="/dashboard">Dashboard</router-link></li>
        <li v-if="auth"><router-link class="nav-link" active-class="active" to="/add-book">Add Book</router-link></li>
        <li v-if="auth"><router-link class="nav-link" active-class="active" to="/books">Books</router-link></li>
        <li v-if="!auth"><router-link class="nav-link" active-class="active" to="/signup">Sign Up</router-link></li>
        <li v-if="!auth"><router-link class="nav-link" active-class="active" to="/login">Login</router-link></li>
        <li v-if="auth">
        <button @click="onLogout" class="logout" >Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data (){
    return {
      title: 'Header',
      content: 'Main header area'
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    auth(){
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

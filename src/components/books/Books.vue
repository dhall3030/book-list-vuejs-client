<template>
  <section>
    <div>
      <h2>{{title}}</h2>
      <div>{{content}}</div>
      <ul v-for="book in books" :key="book._id">
        <li :id="book._id">
        <router-link
        class="nav-link"
        active-class="active"
        :to="'/book-profile/'+book._id">
        {{book.name}}
        </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Books',
  data () {
    return{
      title: 'Books',
      content: 'This is the book list!'
    }
  },
  computed: {
    books() {
      return this.$store.getters.books;
    },
  }
}
</script>
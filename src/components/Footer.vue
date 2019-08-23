<template>
  <footer>
    <div>
      <header>{{title}}</header>
      <div>{{content}}</div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    data (){
      return{
      	title: 'Footer',
      	content: 'Main footer component'
      }
    }
  }
</script>

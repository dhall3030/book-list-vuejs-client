<template>
  <section>
    <div>
      <h2>{{title}}</h2>
      <div>{{content}}</div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Home', 
  data (){
    return{
      title: 'Home', 
      content: 'This is the home page!'
    }
  }
}
</script>

<script setup>
  // import router from './routes/index.js'

  import Navbar from './views/Navbar.vue'
  import Footer from './views/Footer.vue'
</script>

<template>
    <div class="container py-3">
      <Navbar />

      <main>
        <RouterView />
      </main>

      <Footer></Footer>
    </div>
</template>

<style scoped>

</style>
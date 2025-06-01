<script setup>

</script>

<template>
<footer class="bg-info text-dark pt-5 pb-3 mt-5 rounded">
  <div class="container">
    <div class="row">
      <!-- Logo and About -->
      <div class="col-md-4 mb-4">
        <h5 class="text-uppercase">MyWebsite</h5>
        <p>Your go-to platform for amazing content and services.</p>
      </div>

      <!-- Quick Links -->
      <div class="col-md-4 mb-4">
        <h5 class="text-uppercase">Quick Links</h5>
        <ul class="list-unstyled">
          <router-link class="custom-link" to="/">Home</router-link>
        </ul>
      </div>

      <!-- Social Media -->
      <div class="col-md-4 mb-4">
        <h5 class="text-uppercase">Follow Us</h5>
        <a href="#" class="text-light me-3"><i class="bi bi-facebook"></i></a>
        <a href="#" class="text-light me-3"><i class="bi bi-twitter"></i></a>
        <a href="#" class="text-light me-3"><i class="bi bi-instagram"></i></a>
        <a href="#" class="text-light"><i class="bi bi-linkedin"></i></a>
      </div>
    </div>

    <hr class="border-light">

    <!-- Copyright -->
    <div class="text-center">
      <small>&copy; 2025 MyWebsite. All rights reserved.</small>
    </div>
  </div>
</footer>
</template>

<style scoped>
  .custom-link {
    text-decoration: none;
    color: inherit;
  }
</style>
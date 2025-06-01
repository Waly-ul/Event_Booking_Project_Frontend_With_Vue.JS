<script setup>
import {RouterLink, useRouter} from 'vue-router';
import {computed} from 'vue';

let router = useRouter();

const logout = () =>{
  localStorage.removeItem('apiToken');
  localStorage.removeItem('user');
  router.push('/login').then (() =>{
    return window.location.reload();
  })
}

const userLoggedIn = computed(() =>{
  return localStorage.getItem('apiToken') ? true  : false;  
});

const userOrAdmin = JSON.parse(localStorage.getItem('user'));
</script>

<template>
<nav class="navbar navbar-expand-lg bg-info rounded mb-3">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/"><strong>Events</strong></RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
        </li>

        <template v-if="userLoggedIn">
          <ul v-if="userOrAdmin.role == 'user'" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/member-dashboard">Member Dashboard</RouterLink>
            </li>
          </ul>
          <ul v-else="userOrAdmin.role == 'admin'" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/admin/dashboard">Admin Dashboard</RouterLink>
            </li>
          </ul>
        </template>
      </ul>

      <div class="d-flex" role="search">
        <template v-if="!userLoggedIn">
          <div class="row gx-2">
            <div class="col">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <button class="btn btn-primary">
                    <RouterLink class="nav-link active" aria-current="page" to="/login">Login</RouterLink>
                  </button>
                </li>
              </ul>
            </div>

            <div class="col">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <button class="btn btn-success">
                    <RouterLink class="nav-link active" aria-current="page" to="/registration">Registration</RouterLink>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
       </template>

        <template v-else="userLoggedIn">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <button class="btn btn-danger" aria-current="page" @click="logout">Logout</button>
            </li>
          </ul>
        </template>
    </div>
    </div>
  </div>
</nav>
</template>

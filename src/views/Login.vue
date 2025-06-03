<script setup>
  import {ref} from 'vue'
  import api from '../api/axios'
  import { useRouter } from 'vue-router';

  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';

  const email = ref('');
  const password = ref('');

  const toast = useToast();
  const router = useRouter();

  const memberLogin = async() =>{
    try{
      const response = await api.post('/login', {
        email: email.value,
        password: password.value
      });

      if(response.status){
        const userData = response.data.data
        localStorage.setItem('apiToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast.success('Login was successful', {
          position:'top-right',
          duration:2000
        })

        setTimeout(()=>{
          if(userData.role == 'user'){
            router.push('/member-dashboard').then(() => {
              return window.location.reload();
            })
          }else if(userData.role == 'admin'){
            router.push('/admin/dashboard').then(() => {
              return window.location.reload();
            })
          }
        }, 2000)
    }
    }catch(error){
      toast.error("Validation Error",{
        position: 'top-right'
      })
    }
  }
</script>

<template>
  <h1>Login</h1>
  <form class="bg-info-subtle p-3 rounded" @submit.prevent="memberLogin">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>
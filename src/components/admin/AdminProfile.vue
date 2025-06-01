<script setup>
    import { ref, onMounted } from 'vue';

    const loggedUser = ref(null)
    const apiUrl = 'http://127.0.0.1:8000/'
    onMounted(async () => {  
        const user = localStorage.getItem('user')
        loggedUser.value = JSON.parse(user)
    });

</script>
<template>
    <ul v-if="loggedUser">
        <div class="row">
            <div class="col d-flex flex-column justify-content-center align-content-center">
                <li><span class="fw-bold">Name:</span> {{ loggedUser.name }}</li>
                <li><span class="fw-bold">Email:</span> {{ loggedUser.email }}</li>
            </div>
            <div class="col">
                <li><span class="fw-bold">Profile Image:</span> 
                    <img 
                    class="rounded-circle" v-if="loggedUser && loggedUser.profile_image"
                    :src="`${apiUrl}${loggedUser.profile_image}`" 
                    alt=""/>
                </li>
            </div>
        </div>
    </ul>
</template>

<style scoped>
    li{
        list-style: none;
    }
</style>

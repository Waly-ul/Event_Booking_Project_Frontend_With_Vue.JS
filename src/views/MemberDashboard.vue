<script setup>
    import { ref, onMounted } from 'vue';
    import { useToast } from 'vue-toast-notification';

        const loggedUser = ref(null)
        const toast = useToast()

        const apiUrl = 'http://127.0.0.1:8000/'


        onMounted(async () => {  
            const user = localStorage.getItem('user')
            loggedUser.value = JSON.parse(user)
            
            // Notifications comes from api via pusher channels
            const channel = window.Echo.channel('booking-channel');
            channel.listen('.booking-updated', (data) => {
              toast.success(data.bookingData.user.name, {
                position: 'top-right',
                duration: 2000
              })
            })
        });
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="card bg-info-subtle">
              <div class="card-header"><span class="fw-bold">Member Dashboard</span></div>
              <div class="card-body">
                
                    <div class="row">
                        <div class="col-md-4">
                          <ul>
                            <li>
                              <router-link class="custom-link" to="/member-event-bookings">
                                Bookings
                             </router-link>
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-8">
                                <ul v-if="loggedUser" class="member_info">
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
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<style scoped>
  .custom-link {
  text-decoration: none;
  color: inherit;
}

  .member_info{
    list-style: none;
  }
</style>
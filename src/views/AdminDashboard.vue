<script setup>
    import { ref, onMounted } from 'vue';
        import { useToast } from 'vue-toast-notification';

        const loggedUser = ref(null)
        const toast = useToast()

        // const apiUrl = 'http://127.0.0.1:8000/'

        // onMounted(async () => {  
        //     const user = localStorage.getItem('user')
        //     loggedUser.value = JSON.parse(user)
            
        //     const channel = window.Echo.private(`booking-channel.${loggedUser.value.id}`);
        //     channel.listen('.booking-updated', (data) => {
        //       const message = data.bookingData.user.name + ' event '+  data.bookingData.event.title + ' booking '+  data.bookingData.status
        //       toast.success(message, {
        //         position:'top-right',
        //         duration:2000
        //       })
        //     })
        // });
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="card bg-info-subtle">
              <div class="card-header"><span class="fw-bold">Admin Dashboard</span></div>
              <div class="card-body">
                
                    <div class="row">
                        <div class="col-md-2">
                            <ul>
                              <li>
                                <router-link class="custom-link" to="/admin/dashboard" >
                                  Admin Profile
                                </router-link>
                              </li>
                              <li>
                                 <router-link class="custom-link" to="/admin/events" >
                                  Events
                                </router-link>
                              </li>
                              <li>
                                <router-link class="custom-link" to="/admin/bookings" >
                                  Bookings
                                </router-link>
                              </li>
                              <li>
                                <router-link class="custom-link" to="/admin/create/event" >
                                  Create event
                                </router-link>
                              </li>
                            </ul>
                        </div>
                        <div class="col-md-10">
                              <router-view></router-view>
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
<script setup>
    import api from '../../api/axios'
    import { onMounted, ref } from 'vue';
    import { useToast } from 'vue-toast-notification';
    import { useRouter,useRoute } from 'vue-router';

    // const loggedUser = ref(null);
    const booking = ref();
    const toast = useToast();

    const router = useRouter();
    const route = useRoute();
    // const apiUrl = 'http://127.0.0.1:8000/';

    onMounted(() => {
        // const user = localStorage.getItem('user');
        // loggedUser.value = JSON.parse(user)

        const bookingId = route.params.bookingId;

        if(bookingId){
            api.get(`/booking/${bookingId}`).then((response)=>{
                booking.value = response.data.data;
            })
        }
    })

    const updateBooking = () =>{
        const bookingId = route.params.bookingId;
        api.put(`/booking/update/${bookingId}`, booking.value).then((response)=>{
            toast.success(response.data.message,{
                position: 'top-right',
                duration: 2000
            });
        })

        setTimeout(() => {
            router.push('/admin/bookings')
        }, 2000);
    }
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Booking Status Update</div>
                    <div class="card-body">
                        <form v-if="booking" @submit.prevent="updateBooking">
                            <div class="mb-3">
                                <label for="title" class="form-label">Status</label>
                                <select class="form-control" v-model="booking.status" name="" id="">
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                          
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
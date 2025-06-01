<script setup>
    import api from '../../api/axios'
    import { onMounted, ref } from 'vue';
    import { useToast } from 'vue-toast-notification';
    import { useRouter } from 'vue-router';    

    const bookings = ref([]);
    const toast = useToast();

    const router = useRouter();

    const loggedUser = ref(null);

    onMounted( async() => {

        loggedUser.value = JSON.parse(localStorage.getItem('user'));

        try{
            const response = await api.get(`/bookings`)

            if(response.status){
                bookings.value = response.data.data;
            }
        }catch(error){
            console.log(error);
        }
    })

    const formatDateTime = (date) =>{
        const d = new Date(date);
        return d.toLocaleString();
    }

     const takeAction = (id) =>{
        router.push(`/admin/booking/update/${id}`);
    }
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card bg-info">
                    <div class="card-header"><span class="fw-bold">Member Bookings</span></div>
                    <div class="card-body">
                       <table v-if="bookings" class="table table-primary table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Event Title</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col">Member Name</th>
                                    <th scope="col">Ticket Price</th>
                                    <th scope="col">Ticket Qty</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(booking, index) in bookings" :key="booking.id">
                                    <th scope="row">{{ index+1 }}</th>
                                    <td>{{  booking.event.title }}</td>
                                    <td>{{  formatDateTime(booking.event.start_date) }}</td>
                                    <td>{{  formatDateTime(booking.event.end_date) }}</td>
                                    <td>{{  booking.ticket_price }}</td>
                                    <td>{{  booking.total_price }}</td>
                                    <td>{{  booking.ticket_qty }}</td>
                                    <td>{{  booking.total_price }}</td>
                                    <td>{{  booking.status }}</td>
                                    <td>
                                       <button class="btn btn-danger" @click="takeAction(booking.id)">Edit</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
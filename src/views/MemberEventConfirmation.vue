<script setup>
    import { useRouter, useRoute } from 'vue-router';
    import api from "../api/axios"
    import { useToast } from 'vue-toast-notification';
    import {onMounted,ref} from 'vue'
    import { computed } from 'vue';

    const loggedUser = ref(null);
    const event = ref(null);

    const ticket_qty = ref(1);

    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

    const apiUrl = 'http://127.0.0.1:8000/'

    onMounted(() =>{
        loggedUser.value = JSON.parse(localStorage.getItem('user'));

        const eventId = route.query.eventId;

        if(eventId){
            api.get(`/event/${eventId}`).then((response)=>{
                event.value = response.data.data;
            })
        }
    })

    const total_amount = computed(()=>{
        return event.value ? ticket_qty.value * event.value.ticket_price : 0
    })

    const confirmBooking = async() => {

        try{
            await api.post(`/member-event-booking`,{
                user_id: loggedUser.value.id,
                event_id: event.value.id,
                ticket_qty: ticket_qty.value,
                ticket_price: event.value.ticket_price,
                total_price: total_amount.value,
            }).then((response)=>{
                toast.success(response.data.message, {
                    position:'top-right'
                })

                setTimeout(()=>{
                    router.push('/member-event-bookings')
                }, 200)

            })
        }catch(error){
            console.log(error);
            toast.error("Failed",{
                position: 'bottom-right'
            })
        }
    }

    const formatDateTime = (date) =>{
        const d = new Date(date);
        return d.toLocaleString();
    }
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Event Booking</div>
                    <div class="row card-body">
                        <div class="col-md-4">
                            <ul v-if="loggedUser">
                                <li><strong>Name: </strong>{{ loggedUser.name }}</li>
                                <li><strong>Email:</strong> {{ loggedUser.email }}</li>
                                <li><strong>Profile Image:</strong>
                                    <img v-if="loggedUser && loggedUser.profile_image" v-bind:src="`${apiUrl}${loggedUser.profile_image}`" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-4">
                            <ul v-if="event">
                                <li><strong>Name:</strong> {{ event.title }}</li>
                                <li><strong>Description:</strong> {{ event.description }}</li>
                                <li><strong>Ticket price:</strong> {{ event.ticket_price }}</li>
                                <li><strong>Start:</strong> {{ formatDateTime(event.start_date) }} </li>
                                <li><strong>End:</strong> {{ formatDateTime(event.end_date) }}</li>
                            </ul>
                        </div>
                        <div class="col-md-4">
                            <form @submit.prevent="confirmBooking">
                                <div class="mb-3">
                                    <label for="ticket_qty" class="form-label fw-bold">Ticket Quantity</label>
                                    <input v-model="ticket_qty" type="number" class="form-control" min="1" required>
                                </div>
                                <div class="mb-3">
                                    <label for="total_amount" class="form-label fw-bold">Total Amount</label>
                                    <input :value="total_amount" type="text" class="form-control" disabled>
                                </div>

                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    li{
        list-style: none;
    }
</style>

<!-- <template>
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Registration Check test</div>
          <div class="card-body">
            
            <div class="row">
                <div class="col-md-4">
                    user information

                    <ul v-if="loggeduser">
                        <li>Name: {{ loggeduser.name }}</li>
                        <li>Email: {{ loggeduser.email }}</li>
                        <li>Profile Image: 
                            <img 
                            v-if="loggeduser && loggeduser.profile_image"
                            :src="`${apiUrl}${loggeduser.profile_image}`" 
                            alt=""
                            class="img-fluid"/>
                        </li>
                    </ul>

                </div>
                <div class="col-md-4">
                    <ul v-if="event">
                        <li>Name: {{ event.title }}</li>
                        <li>Price: {{ event.ticket_price }}</li>
                        <li>Start: {{ event.start_time }}</li>
                        <li>End: {{ event.end_time }}</li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <form v-if="event" @submit.prevent="confirmbooking">
                            <div class="mb-3">
                                <label for="ticket_qty" class="form-label">Ticket Quantity</label>
                                <input v-model="ticket_qty" type="number" class="form-control" min="1" required>
                            </div>
                            <div class="mb-3">
                                <label for="total_amount" class="form-label">Total Amount</label>
                                <input :value="total_amount" type="text" class="form-control" disabled>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useRouter, useRoute } from 'vue-router';
import api from '../api/axios';
import { useToast } from 'vue-toast-notification';
import { computed, onMounted, ref } from 'vue';


const loggeduser = ref(null)
const event = ref(null)
const ticket_qty = ref(1)

const router = useRouter()
const route = useRoute()
const apiUrl = 'http://127.0.0.1:8000/'

const toast = useToast()

onMounted(()=>{

    const user = localStorage.getItem('user')
    loggeduser.value = JSON.parse(user)

    const eventId = route.query.eventId

    if(eventId){

        api.get(`/event/${eventId}`).then((response)=>{
            event.value = response.data.data

            // console.log(event.value)

        })
    }
})

const total_amount = computed(()=>{
    return event.value ? ticket_qty.value * event.value.ticket_price : 0
})

const confirmbooking = ()=> {
    api.post(`/member-event-booking`, {
        user_id: loggeduser.value.id,
        event_id: event.value.id,
        ticket_qty: ticket_qty.value,
        ticket_price: event.value.ticket_price,
        total_price: total_amount.value,
    }).then((response)=>{
        toast.success(response.data.message, {
            position:'top-right'
        })

        setTimeout(()=>{
            router.push('/member-event-bookings')
        }, 200)

    })
} 
</script> -->
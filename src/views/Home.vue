<script setup>
    import api from '../api/axios';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import {useToast} from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';

    const toast = useToast();
    const router = useRouter();

    const events = ref([]);
    onMounted(async () =>{
        try{
            const response = await api.get('/events');
            if(response.status){
                events.value = response.data.data;
            }

            // console.log(events);
        }catch(error){
            console.log(error)
        }
    })

    const formatDateTime = (date) =>{
        const d = new Date(date);
        return d.toLocaleString();
    }

    const handleBooking = (event) => {
        const loggedInUser = localStorage.getItem('user');

        if(!loggedInUser){
            setTimeout(()=>{
                router.push('/login').then(() => {
                    toast.error('Login First');
                })
            }, 1000)
        }else{
            router.push({
                path: '/member-event-confirmation',
                query: {eventId: event.id}
            })
        }
    }
</script>

<template>
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div class="col" v-for="event in events" v-bind:key="event.id">
            <div class="card mb-4 rounded-3 shadow-sm bg-info-subtle">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal"> {{ event.title }} </h4>
                </div>
                <div class="card-body">
                    <ul class="list-unstyled mt-3 mb-4">
                        <span class="fw-bold d-inline">Start: </span><li>{{ formatDateTime(event.start_date) }}</li>
                        <span class="fw-bold d-inline">End: </span><li>{{ formatDateTime(event.end_date) }}</li>
                    </ul>
                    <p>{{ event.description }}</p>

                    <div class="row">
                        <div class="col">
                            <button type="button" class="w-100 btn btn-lg btn-outline-primary">Event Details</button>
                        </div>
                        <div class="col">
                            <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="handleBooking(event)">Booking</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import api from '../../api/axios'
    import { onMounted, ref } from 'vue';
    import { useToast } from 'vue-toast-notification';
    import { useRouter,useRoute } from 'vue-router';

    // const loggedUser = ref(null);
    const event = ref();
    const toast = useToast();

    const router = useRouter();
    const route = useRoute();
    // const apiUrl = 'http://127.0.0.1:8000/';

    onMounted(() => {
        // const user = localStorage.getItem('user');
        // loggedUser.value = JSON.parse(user)

        const eventId = route.params.eventId;

        if(eventId){
            api.get(`/event/${eventId}`).then((response)=>{
                event.value = response.data.data;
            })
        }
    })

    const updateEvent = () =>{
        const eventId = route.params.eventId;
        api.put(`/event/update/${eventId}`, event.value).then((response)=>{
            toast.success(response.data.message,{
                position: 'top-right',
                duration: 2000
            });
        })

        setTimeout(() => {
            router.push('/admin/events')
        }, 2000);
    }
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card bg-info">
                    <div class="card-header">Event Update</div>
                    <div class="card-body">
                        <form v-if="event" @submit.prevent="updateEvent">
                            <div class="mb-3">
                                <label for="title" class="form-label">Title</label>
                                <input v-model="event.title" type="text" class="form-control" id="title">
                            </div>
                            <div class="mb-3">
                                <label for="start_time" class="form-label">Start Time</label>
                                <input v-model="event.start_date" type="text" class="form-control" id="start_time">
                            </div>
                            <div class="mb-3">
                                <label for="end_time" class="form-label">End Time</label>
                                <input v-model="event.end_date" type="text" class="form-control" id="end_time">
                            </div>
                            <div class="mb-3">
                                <label for="ticket_price" class="form-label">Ticket Price</label>
                                <input v-model="event.ticket_price" type="text" class="form-control">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
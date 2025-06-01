<script setup>
    import api from '../../api/axios'
    import { onMounted, ref } from 'vue';
    import { useToast } from 'vue-toast-notification';
    import { useRouter } from 'vue-router';

    const events = ref([]);
    const toast = useToast();

    const router = useRouter();

    onMounted( async() => {
        try{
            const response = await api.get('/events')

            if(response.status){
                events.value = response.data.data;
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
        router.push(`/admin/event/edit/${id}`);
    }
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card bg-info">
                    <div class="card-header"><span class="fw-bold">Events</span></div>
                    <div class="card-body">
                       <table v-if="events" class="table table-primary table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Start date</th>
                                    <th scope="col">End date</th>
                                    <th scope="col">Ticket Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(event, index) in events" :key="event.id">
                                    <th scope="row">{{ index+1 }}</th>
                                    <td>{{ event.title }}</td>
                                    <td>{{ formatDateTime(event.start_date) }}</td>
                                    <td>{{ formatDateTime(event.end_date) }}</td>
                                    <td>{{ event.ticket_price }}</td>
                                    <td>
                                       <button class="btn btn-danger" @click="takeAction(event.id)">Edit</button>
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
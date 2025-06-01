<script setup>
    import { ref } from 'vue';
    import api from '../../api/axios';
    import  { useRouter } from 'vue-router';
    import { useToast } from 'vue-toast-notification';

    const form = ref({
        title: '',
        ticket_price: '',
        description: '',
        start_date: '',
        end_date: ''
    });
    
    const router = useRouter(); 
    const toast = useToast(); 

    const errors = ref({});

    const createEvent = async () => {

        const formData = new FormData();

        for (const key in form.value) {
        formData.append(key, form.value[key]);
        }

        try {
        const response = await api.post('/event', formData, {
            headers: {
            'Content-Type': 'application/json',
            },
        });

        toast.success('The creation event was successful.', {
            position:'top-right',
            duration:2000
        })


      setTimeout(()=>{
        router.push('/').then(() => {
          return window.location.reload();
        })
      }, 2000)

    } catch (error) {
      toast.error('validation error', {
        position: 'top-right'
      })
    //   errors.value = error.response.data.errors
    }
  };
</script>

<template>
<div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card bg-info">
          <div class="card-header"><strong>Create Event</strong></div>
          <div class="card-body">
            <form @submit.prevent="createEvent">
              <div class="mb-3">
                <label for="title" class="form-label">Event title</label>
                <input type="text" class="form-control" id="title" v-model="form.title"/>
                <!-- <div v-if="errors.name" class="text-danger">{{ errors.name[0] }}</div> -->
              </div>
              <div class="mb-3">
                <label for="ticket_price" class="form-label">Ticket price</label>
                <input type="number" class="form-control" id="ticket_price" v-model="form.ticket_price"/>
                <!-- <div v-if="errors.password" class="text-danger">{{ errors.password[0] }}</div> -->
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea type="text" class="form-control" id="description" v-model="form.description"/>
                <!-- <div v-if="errors.email" class="text-danger">{{ errors.email[0] }}</div> -->
              </div>
              <div class="mb-3">
                <label for="start_date" class="form-label">Start date</label>
                <input type="datetime-local" class="form-control" id="start_date"  v-model="form.start_date"/>
                <!-- <div v-if="errors.password_confirmation" class="text-danger">{{ errors.password_confirmation[0] }}</div> -->
              </div>
              <div class="mb-3">
                <label for="end_date" class="form-label">End date</label>
                <input type="datetime-local" class="form-control" id="end_date"  v-model="form.end_date"/>
                <!-- <div v-if="errors.password_confirmation" class="text-danger">{{ errors.password_confirmation[0] }}</div> -->
              </div>
              
              <button type="submit" class="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
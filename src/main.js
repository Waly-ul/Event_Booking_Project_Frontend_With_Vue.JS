import { createApp } from 'vue'

import App from './App.vue'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Axios and make it globally available
import axios from 'axios'

// Vue Toast Plugin
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';

import router from './routes/index.js'

// Laravel pusher notification setup
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: "179d94eee2dacabbad97",
    cluster: "ap2",
    forceTLS: true
});

const app = createApp(App);

app.use(router)
app.use(ToastPlugin)
app.mount('#app')

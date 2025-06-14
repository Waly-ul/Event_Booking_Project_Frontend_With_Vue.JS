import { createRouter, createWebHistory } from "vue-router";

import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import MemberRegistration from '../views/MemberRegistration.vue'
import MemberDashboard from "../views/MemberDashboard.vue"
import MemberEventConfirmation from "../views/MemberEventConfirmation.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import AdminProfile from "../components/admin/AdminProfile.vue";
import Events from "../components/admin/Events.vue";
import EventEdit from "../components/admin/EventEdit.vue";
import MemberBookings from "../views/MemberBookings.vue";
import Bookings from "../components/admin/Bookings.vue";
import BookingUpdate from "../components/admin/BookingUpdate.vue";
import CreateEvent from "../components/admin/CreateEvent.vue";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/registration',
        component: MemberRegistration
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/member-dashboard',
        component: MemberDashboard
    },
    {
        path: '/member-event-confirmation',
        component: MemberEventConfirmation
    },
    {
        path: '/member-event-bookings',
        component: MemberBookings
    },
    {
        path: '/admin', 
        component: AdminDashboard,
        children: [
            {path: 'dashboard', component: AdminProfile },
            {path: 'events', component: Events},
            {path: 'event/edit/:eventId', component: EventEdit},
            {path: 'bookings', component: Bookings},
            {path: 'booking/update/:bookingId', component: BookingUpdate},
            {path: 'create/event', component: CreateEvent},
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
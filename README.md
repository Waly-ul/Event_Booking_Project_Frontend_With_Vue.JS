# Events Booking Frontend With Vue.JS

## Project Overview

This frontend project is developed using **Vue.js** and serves as the client-side interface for an event booking platform. It is divided into two main parts:

### User Interface
- Enables users to **register**, **log in**, **browse events**, **book tickets**, and **receive notifications**.
- Fetches data from a Laravel backend API to keep content dynamic and up-to-date.
- Delivers a smooth and responsive user experience across devices.
- Supports real-time updates and notifications using **Pusher** and **Twilio**.

### Admin Dashboard
- Provides administrators with powerful tools to **manage events** and **user bookings**.
- Admins can **create**, **update**, and **delete events**.
- Enables viewing and managing all user bookings.
- Allows sending notifications directly to users.
- All admin actions are synchronized securely with the backend via API calls.

## Features
- User Authentication (Register/Login)
- Event Browsing and Detailed Views
- Ticket Booking System
- Real-Time Notifications (via Pusher and Twilio)
- Responsive Design for Desktop and Mobile
- Secure Admin Panel with Event and Booking Management

## Technologies Used
- Vue.js (Frontend Framework)
- Vue Router (Routing)
- Vuex (State Management, if applicable)
- Axios (API Communication)
- Pusher (Real-time Event Broadcasting)
- Twilio (Notification Service)
- CSS/SCSS for Styling

## This project also requires pusher notifications setup:
- Go to main.js and update your credentials:

    ```bash
    import Echo from 'laravel-echo';
    import Pusher from 'pusher-js';

    window.Pusher = Pusher;

    window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'your pusher app key',        
    cluster: 'your pusher app cluster',             
    forceTLS: true               
    });


## Getting Started

### Prerequisites
- Node.js (v14 or above recommended)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Navigate into the project directory
cd your-repo-name

# Install dependencies
npm install
# or
yarn install

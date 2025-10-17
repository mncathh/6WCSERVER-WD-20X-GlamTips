// frontend/src/router/index.js

import Vue from 'vue';
import Router from 'vue-router';

// Import Views
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ServicesView from '../views/ServicesView.vue';
import BookingView from '../views/BookingView.vue';
import ContactView from '../views/ContactView.vue';
import AdminLogin from '../views/AdminLogin.vue';
import AdminDashboard from '../views/AdminDashboard.vue'; // NEW LINE
import AdminAddService from '../views/AdminAddService.vue'; // NEW LINE

Vue.use(Router);

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/book', name: 'booking', component: BookingView }, // Primary booking path
  { path: '/review/:code?', name: 'review-booking', component: BookingView }, // Path for review/management
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/admin/login', name: 'admin-login', component: AdminLogin },
  { path: '/admin/dashboard', name: 'admin-dashboard', component: AdminDashboard }, // NEW ROUTE
  { path: '/admin/services/add', name: 'admin-add-service', component: AdminAddService } // NEW ROUTE
];

export default new Router({
  mode: 'history', // Clean URLs without '#'
  base: process.env.BASE_URL,
  routes
});
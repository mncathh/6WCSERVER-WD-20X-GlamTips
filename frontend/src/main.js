// frontend/src/main.js

import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Imports your router/index.js configuration
import moment from 'moment'; // Import moment for global use

// Global Helper: Make moment available in all components as $moment
Vue.prototype.$moment = moment; 

// Global Component (Optional): If you want a common component like a loading spinner
// import LoadingSpinner from './components/LoadingSpinner.vue';
// Vue.component('LoadingSpinner', LoadingSpinner); 

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
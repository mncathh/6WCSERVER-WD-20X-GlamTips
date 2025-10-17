<template>
  <div>
    <div class="page-header-image">
      <div class="header-content">
        <h1>{{ isReviewMode ? 'Manage My Appointment' : 'Book Your Appointment' }}</h1>
        <p class="header-subtitle">Go get your appointment already!</p>
      </div>
    </div>
    <div class="booking-container">
      <div v-if="loading" class="status-message">Loading booking resources...</div>
      <div v-else-if="error" class="status-message error-message">{{ error }}</div>

      <div v-else-if="isReviewMode" class="review-management-section">
        <h2>Manage My Booking</h2>

        <div v-if="!reviewedBooking && !initialCode" class="review-lookup">
          <p>Please enter your 6-digit Confirmation Code:</p>
          <form @submit.prevent="lookupBooking">
            <input type="text" v-model="lookupCode" maxlength="6" required class="code-input">
            <button type="submit" class="lookup-btn">Find Booking</button>
          </form>
        </div>

        <div v-else-if="reviewedBooking" class="booking-details-card">
          <h3>Booking Details (Code: {{ reviewedBooking.confirmationCode }})</h3>

          <div class="summary-item">
            <strong>Status:</strong>
            <span :class="['status', reviewedBooking.status.toLowerCase()]">{{ reviewedBooking.status }}</span>
          </div>

          <div class="summary-item"><strong>Service:</strong> {{ reviewedBooking.service.name }}</div>
          <div class="summary-item"><strong>Specialist:</strong> {{ reviewedBooking.staff.name }}</div>
          <div class="summary-item"><strong>Time:</strong> {{ formatDateTime(reviewedBooking.startTime) }}</div>

          <div class="edit-fields">
            <h4>Update Contact Info:</h4>
            <div class="form-group-inline">
              <label>Name:</label>
              <input type="text" v-model="editForm.clientName" :disabled="isStatusFinal">
            </div>
            <div class="form-group-inline">
              <label>Phone:</label>
              <input type="tel" v-model="editForm.clientPhone" :disabled="isStatusFinal">
            </div>
            <div class="form-group-inline">
              <label>Email:</label>
              <input type="email" v-model="editForm.clientEmail" :disabled="isStatusFinal">
            </div>
          </div>

          <div class="management-actions">
            <button @click="updateBooking" class="action-btn update-btn" :disabled="isStatusFinal">Update Info</button>
            <button @click="confirmBooking" class="action-btn confirm-btn" :disabled="reviewedBooking.status === 'Confirmed' || isStatusFinal">Confirm Booking</button>
            <button @click="cancelBooking" class="action-btn cancel-btn" :disabled="isStatusFinal">Cancel Appointment</button>
          </div>

          <p v-if="reviewMessage" :class="reviewMessageType">{{ reviewMessage }}</p>

        </div>

        <p v-else-if="!loading && initialCode" class="error-message">Booking not found with code: {{ initialCode }}. Please try again.</p>
      </div>

      <div v-else>
        <div class="booking-steps">
          <span :class="{ active: step === 1 }">1. Service & Staff</span> >
          <span :class="{ active: step === 2 }">2. Date & Time</span> >
          <span :class="{ active: step === 3 }">3. Client Info</span> >
          <span :class="{ active: step === 4 }">4. Confirmation</span>
        </div>

        <form @submit.prevent="nextStep" v-if="step < 4" class="booking-form">

          <div v-if="step === 1">
            <h2>Step 1: Choose Your Service and Specialist</h2>

            <div class="form-group">
              <label for="service">Select Service:</label>
              <select id="service" v-model="form.serviceId" required @change="selectService">
                <option value="" disabled>-- Select a Service --</option>
                <option v-for="s in allServices" :key="s._id" :value="s._id">
                  {{ s.name }} (${{ s.price }}) - {{ s.duration }} min
                </option>
              </select>
            </div>

            <div v-if="selectedService" class="service-details">
              <p><strong>{{ selectedService.category }} Service:</strong> {{ selectedService.description }}</p>
              <p>Duration: {{ selectedService.duration }} minutes</p>
            </div>

            <div class="form-group">
              <label for="staff">Select Specialist:</label>
              <select id="staff" v-model="form.staffId" required>
                <option value="" disabled>-- Select Specialist --</option>
                <option v-for="staff in filteredStaff" :key="staff._id" :value="staff._id">
                  {{ staff.name }} ({{ staff.specialty }})
                </option>
              </select>
            </div>
          </div>

          <div v-if="step === 2">
            <h2>Step 2: Choose Date and Time</h2>

            <div class="form-group">
              <label for="date">Date:</label>
              <input type="date" id="date" v-model="selectedDate" :min="today" required>
            </div>

            <div class="form-group">
              <label for="time">Time:</label>
              <select id="time" v-model="selectedTime" required>
                <option value="" disabled>-- Select Time Slot --</option>
                <option v-for="time in availableTimes" :key="time" :value="time">
                  {{ time }}
                </option>
              </select>
            </div>
            <p v-if="selectedService && selectedDate && selectedTime" class="summary-line">
              You are booking **{{ selectedService.name }}** on **{{ formattedDateTime }}**.
            </p>
          </div>

          <div v-if="step === 3">
            <h2>Step 3: Your Contact Information</h2>

            <div class="form-group">
              <label for="name">Full Name:</label>
              <input type="text" id="name" v-model="form.clientName" required>
            </div>

            <div class="form-group">
              <label for="phone">Phone Number:</label>
              <input type="tel" id="phone" v-model="form.clientPhone" required>
            </div>

            <div class="form-group">
              <label for="email">Email Address:</label>
              <input type="email" id="email" v-model="form.clientEmail" required>
            </div>

            <div v-if="bookingError" class="error-message">{{ bookingError }}</div>
          </div>

          <div class="navigation-buttons">
            <button type="button" @click="prevStep" :disabled="step === 1" class="prev-btn">
              &leftarrow; Previous
            </button>
            <button type="submit" class="next-btn">
              {{ step < 3 ? 'Next Step &rightarrow;' : 'Confirm Booking' }}
            </button>
          </div>
        </form>

        <div v-if="step === 4" class="confirmation-section">
          <h2>✅ Booking Successful!</h2>
          <div v-if="confirmedBooking">
            <p>Thank you, **{{ confirmedBooking.clientName }}**! Your appointment is **Pending** confirmation.</p>
            <p class="confirmation-code-display">Your Confirmation Code is:
              <strong>{{ confirmedBooking.confirmationCode }}</strong>
            </p>
            <div class="booking-summary">
              <h3>Appointment Details:</h3>
              <p><strong>Service:</strong> {{ confirmedBooking.service.name }}</p>
              <p><strong>Specialist:</strong> {{ confirmedBooking.staff.name }}</p>
              <p><strong>Time:</strong> {{ formatDateTime(confirmedBooking.startTime) }}</p>
              <p><strong>Status:</strong> {{ confirmedBooking.status }}</p>
            </div>

            <p class="review-prompt">
              Keep this code to **Manage or Cancel** your appointment later.
            </p>
            <router-link :to="{ name: 'review-booking', params: { code: confirmedBooking.confirmationCode } }" class="review-btn">
              Manage My Booking
            </router-link>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api';
import moment from 'moment'; 

export default {
  name: 'BookingView',
  data() {
    return {
      step: 1,
      allServices: [],
      allStaff: [],
      loading: true,
      error: null,
      bookingError: null,
      
      selectedDate: '',
      selectedTime: '',
      
      // New Booking Form Data
      form: {
        serviceId: this.$route.query.serviceId || '', 
        staffId: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        startTime: null, 
      },

      // Review Mode Data
      lookupCode: '',
      reviewedBooking: null,
      reviewMessage: null,
      reviewMessageType: 'success',
      editForm: {
          clientName: '',
          clientPhone: '',
          clientEmail: ''
      },
      confirmedBooking: null, // Stores successful response
      
      // Simple fixed available times (for demo purposes)
      availableTimes: ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00']
    };
  },
  computed: {
    today() {
      return moment().format('YYYY-MM-DD');
    },
    selectedService() {
      return this.allServices.find(s => s._id === this.form.serviceId);
    },
    filteredStaff() {
      if (!this.selectedService) return this.allStaff;
      return this.allStaff.filter(staff => staff.specialty === this.selectedService.category);
    },
    formattedDateTime() {
      if (this.selectedDate && this.selectedTime) {
        return moment(`${this.selectedDate} ${this.selectedTime}`).format('MMMM Do, YYYY [at] h:mm A');
      }
      return 'N/A';
    },
    isReviewMode() {
      // Check if the current route is the review route
      return this.$route.name === 'review-booking';
    },
    initialCode() {
        // Get code from URL parameter
        return this.$route.params.code;
    },
    isStatusFinal() {
        // Prevent updates if booking is already cancelled or completed
        return this.reviewedBooking && 
               (this.reviewedBooking.status === 'Cancelled' || this.reviewedBooking.status === 'Completed');
    }
  },
  created() {
    // Determine mode and fetch data
    this.fetchData();
    if (this.isReviewMode && this.initialCode) {
        this.lookupCode = this.initialCode;
        this.lookupBooking();
    }
  },
  watch: {
    // Watch for route changes to handle navigation between book and review modes
    '$route'(to, from) {
        if (to.name === 'review-booking' && to.params.code) {
             this.lookupCode = to.params.code;
             this.lookupBooking();
        } else if (to.name === 'booking') {
             // Reset to booking mode
             this.step = 1;
             this.reviewedBooking = null;
        }
    }
  },
  methods: {
    formatDateTime(date) {
        return moment(date).format('MMMM Do, YYYY [at] h:mm A');
    },
    fetchData() {
        // Fetch Services and Staff simultaneously
        Promise.all([
            api.get('/services'),
            api.get('/staff')
        ]).then(([serviceRes, staffRes]) => {
            this.allServices = serviceRes.data;
            this.allStaff = staffRes.data;
            this.loading = false;
        }).catch(err => {
            this.error = 'Failed to load services and staff for booking form.';
            this.loading = false;
            console.error(err);
        });
    },
    selectService() {
        // Reset staff selection if service category changes
        const currentStaff = this.allStaff.find(s => s._id === this.form.staffId);
        if (this.selectedService && currentStaff && currentStaff.specialty !== this.selectedService.category) {
            this.form.staffId = '';
        }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
        this.bookingError = null; // Clear error on step back
      }
    },
    nextStep() {
      if (this.step === 1) {
        if (!this.form.serviceId || !this.form.staffId) return;
      }
      
      if (this.step === 2) {
        // Set the final startTime for the API call
        if (!this.selectedDate || !this.selectedTime) return;
        this.form.startTime = moment(`${this.selectedDate} ${this.selectedTime}`).toISOString();
      }

      if (this.step < 3) {
        this.step++;
      } else if (this.step === 3) {
        this.submitBooking(); // Final step: submit the form
      }
    },
    async submitBooking() {
      this.loading = true;
      this.bookingError = null;

      try {
          const response = await api.post('/book', this.form);
          this.confirmedBooking = response.data.booking;
          this.step = 4;
          
      } catch (error) {
          this.bookingError = error.response?.data?.message || 'A network error occurred. Please try again.';
          console.error('Booking submission failed:', error);
      } finally {
          this.loading = false;
      }
    },
    
    // --- Review Mode Methods ---
    async lookupBooking() {
      if (!this.lookupCode) return;

      this.loading = true;
      this.error = null;
      this.reviewMessage = null;

      try {
          const response = await api.get(`/booking/review/${this.lookupCode}`);
          this.reviewedBooking = response.data;
          
          // Populate the edit form with current data
          this.editForm.clientName = this.reviewedBooking.clientName;
          this.editForm.clientPhone = this.reviewedBooking.clientPhone;
          this.editForm.clientEmail = this.reviewedBooking.clientEmail;

      } catch (error) {
          this.error = 'Booking not found with that code.';
          this.reviewedBooking = null;
      } finally {
          this.loading = false;
      }
    },
    
    async updateBooking() {
      this.loading = true;
      this.reviewMessage = null;
      try {
          // Only send the fields that can be edited by the client
          const updatePayload = {
              clientName: this.editForm.clientName,
              clientPhone: this.editForm.clientPhone,
              clientEmail: this.editForm.clientEmail
          };
          await api.put(`/booking/update/${this.lookupCode}`, updatePayload);
          this.reviewMessage = 'Contact information updated successfully!';
          this.reviewMessageType = 'success';
          // Update the local booking object
          Object.assign(this.reviewedBooking, updatePayload);

      } catch (error) {
          this.reviewMessage = 'Failed to update booking.';
          this.reviewMessageType = 'error';
      } finally {
          this.loading = false;
      }
    },

    async confirmBooking() {
      this.loading = true;
      this.reviewMessage = null;
      try {
          await api.put(`/booking/update/${this.lookupCode}`, { status: 'Confirmed' });
          this.reviewMessage = 'Appointment status changed to Confirmed!';
          this.reviewMessageType = 'success';
          this.reviewedBooking.status = 'Confirmed';

      } catch (error) {
          this.reviewMessage = 'Failed to confirm booking.';
          this.reviewMessageType = 'error';
      } finally {
          this.loading = false;
      }
    },

    async cancelBooking() {
      if (!confirm('Are you sure you want to cancel this appointment? This action cannot be undone.')) return;

      this.loading = true;
      this.reviewMessage = null;
      try {
          await api.delete(`/booking/cancel/${this.lookupCode}`); 
          this.reviewMessage = 'Appointment successfully cancelled.';
          this.reviewMessageType = 'error'; 
          this.reviewedBooking.status = 'Cancelled';

      } catch (error) {
          this.reviewMessage = 'Failed to cancel appointment.';
          this.reviewMessageType = 'error';
      } finally {
          this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* --- NEW FULL-WIDTH HEADER STYLES --- */
.page-header-image {
    background: url('~@/assets/bg.png') no-repeat center center/cover;
    position: relative;
    width: 100%;
    height: 550px; 
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;
}

.header-content {
    padding: 20px 40px;
    text-align: center; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.page-header-image h1 {
    font-size: 4em; 
    margin-bottom: 10px;
    color: white;
    font-family: var(--font-serif); 
    font-weight: 700;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.829);
}

.header-subtitle {
    font-size: 1.5em; 
    max-width: 800px;
    margin: 0 auto;
    color: #fffaf0;
    font-family: var(--font-sans); 
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.829);
}

.booking-container { 
    max-width: 800px; 
    margin: 0 auto 40px auto; 
    padding: 20px; 
    border: 1px solid #ddd; 
    border-radius: 8px; 
}
/* --- EXISTING STYLES (Book Form Container) --- */
.booking-container { 
    max-width: 800px; 
    margin: 0 auto 40px auto; 
    padding: 20px; 
    border: 1px solid #f7a9b8; 
    border-radius: 8px; 
    background-color: rgba(0, 0, 0, 0.021); 
}

.booking-steps { 
    margin-top: 20px;
    margin-bottom: 30px; 
    font-weight: bold; 
    color: #aaa; 
}
.booking-steps span.active { 
    color: #f7a9b8; 
}

.booking-form { 
    padding: 20px; 
    border: 1px solid #eee; 
    border-top: 3px solid #f7a9b8; 
    border-radius: 5px; 
    font-size: 1.2em;
}

.form-group { 
    margin-bottom: 20px; 
    text-align: left; 
}
.form-group label { 
    display: block; 
    font-weight: bold; 
    margin-bottom: 5px; 
    color: #333;
    font-size: 1.2em;
}
.form-group input, 
.form-group select { 
    width: 100%; 
    padding: 10px; 
    border: 1px solid #ccc; 
    border-radius: 4px; 
    box-sizing: border-box; 
}

.service-details { 
    padding: 10px; 
    background-color: #fce7eb; 
    border-left: 3px solid #f7a9b8; 
    margin-bottom: 20px; 
}
.summary-line { 
    padding: 10px; 
    background-color: #e6ffe6; 
    border-radius: 4px; 
    font-style: italic; 
}

.navigation-buttons { 
    display: flex; 
    justify-content: space-between; 
    margin-top: 30px; 
}
.prev-btn, 
.next-btn { 
    padding: 10px 20px; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
}
.prev-btn { 
    background-color: #ccc; 
    color: #333; 
}
.next-btn { 
    background-color: #f7a9b8; 
    color: white; 
}
.error-message { 
    color: red; 
    margin-top: 10px; 
    font-weight: bold; 
}

/* Confirmation Section */
.confirmation-section { 
    margin-top: 40px; 
    padding: 30px; 
    background-color: #e6ffe6; 
    border: 2px solid #42b983; 
    border-radius: 10px; 
}
.confirmation-code-display { 
    font-size: 1.25em; 
    margin: 20px 0; 
    padding: 10px; 
    background-color: white; 
    border-radius: 5px; 
}
.booking-summary { 
    text-align: left; 
    background-color: white; 
    padding: 15px; 
    border-radius: 5px; 
    margin-top: 15px; 
}
.review-btn { 
    display: inline-block; 
    margin-top: 20px; 
    padding: 10px 25px; 
    background-color: #5bc0de; 
    color: white; 
    text-decoration: none; 
    border-radius: 5px; 
    font-weight: bold; 
}

/* Review/Manage Section */
.review-management-section {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #f7a9b8;
    border-radius: 8px;
    background-color: #fff9f9;
}
.review-lookup { 
    margin: 20px 0; 
}
.code-input { 
    width: 150px; 
    text-align: center; 
    text-transform: uppercase; 
    margin-right: 10px; 
}
.lookup-btn { 
    padding: 10px 20px; 
    background-color: #f7a9b8; 
    color: white; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
}
.booking-details-card { 
    padding: 20px; 
    background-color: white; 
    border-radius: 8px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); 
    text-align: left; 
}
.summary-item { 
    margin-bottom: 10px; 
}
.status { 
    padding: 2px 8px; 
    border-radius: 3px; 
    font-weight: bold; 
}
.status.pending { 
    background-color: #fff3cd; 
    color: #856404; 
}
.status.confirmed { 
    background-color: #d4edda; 
    color: #155724; 
}
.status.cancelled { 
    background-color: #f8d7da; 
    color: #721c24; 
}
.edit-fields { 
    margin-top: 20px; 
    padding-top: 15px; 
    border-top: 1px solid #eee; 
}
.form-group-inline { 
    display: flex; 
    align-items: center; 
    margin-bottom: 10px; 
}
.form-group-inline label { 
    width: 80px; 
    font-weight: normal; 
    color: #555; 
}
.form-group-inline input { 
    flex-grow: 1; 
    padding: 8px; 
    margin-left: 10px; 
}
.management-actions { 
    margin-top: 20px; 
    display: flex; 
    justify-content: space-around; 
}
.action-btn { 
    padding: 10px 15px; 
    border: none; 
    border-radius: 5px; 
    color: white; 
    cursor: pointer; 
}
.update-btn { 
    background-color: #007bff; 
}
.confirm-btn { 
    background-color: #28a745; 
}
.cancel-btn { 
    background-color: #dc3545; 
}
.action-btn:disabled { 
    opacity: 0.6; 
    cursor: not-allowed; 
}
.error { 
    color: #dc3545; 
    font-weight: bold; 
}
.success { 
    color: #28a745; 
    font-weight: bold; 
}
</style>
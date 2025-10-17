<template>
  <div class="admin-dashboard-container">
    <h1>Appointment Management Dashboard</h1>
    <p class="summary-text">Total Pending Appointments: <strong>{{ pendingBookings.length }}</strong></p>

    <div class="controls">
        <select v-model="filterStatus">
            <option value="All">Show All</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
        </select>
        <button @click="fetchBookings" class="refresh-btn">Refresh List</button>
        
        <router-link to="/admin/services/add" class="add-service-btn">
            + Add New Service
        </router-link>

        <button @click="logout" class="logout-btn">Logout</button>
            </div>

    <div v-if="loading" class="status-message">Loading bookings...</div>
    <div v-else-if="error" class="status-message error-message">{{ error }}</div>

    <div v-else class="bookings-table-wrapper">
        <table class="bookings-table">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Status</th>
                    <th>Service</th>
                    <th>Specialist</th>
                    <th>Time</th>
                    <th>Client</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="booking in filteredBookings" :key="booking._id" :class="booking.status.toLowerCase()">
                    <td>{{ booking.confirmationCode }}</td>
                    <td><span :class="['status-badge', booking.status.toLowerCase()]">{{ booking.status }}</span></td>
                    <td>{{ booking.service.name }}</td>
                    <td>{{ booking.staff.name }}</td>
                    <td>
                        {{ formatDateTime(booking.startTime) }}
                        <div class="duration-hint">({{ booking.service.duration }} min)</div>
                    </td>
                    <td>
                        <strong>{{ booking.clientName }}</strong>
                        <div class="contact-info">{{ booking.clientPhone }} | {{ booking.clientEmail }}</div>
                    </td>
                    <td>
                        <button 
                             @click="updateStatus(booking._id, 'Confirmed')" 
                             :disabled="booking.status === 'Confirmed' || booking.status === 'Cancelled'"
                             class="action-confirm">
                            Confirm
                        </button>
                        <button 
                             @click="updateStatus(booking._id, 'Cancelled')" 
                            :disabled="booking.status === 'Cancelled'"
                             class="action-cancel">
                            Cancel
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-if="bookings.length === 0" class="no-data">No appointments found.</p>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api'; 
// moment is available globally via main.js as this.$moment

export default {
  name: 'AdminDashboard',
  data() {
    return {
      bookings: [],
      loading: true,
      error: null,
      filterStatus: 'All',
    };
  },
  computed: {
    filteredBookings() {
      if (this.filterStatus === 'All') {
        return this.bookings;
      }
      return this.bookings.filter(b => b.status === this.filterStatus);
    },
    pendingBookings() {
        return this.bookings.filter(b => b.status === 'Pending');
    }
  },
  created() {
    // NOTE: In a real app, we would check for a valid admin token here.
    this.fetchBookings();
  },
  methods: {
    formatDateTime(date) {
        // Use the globally attached moment instance
        return this.$moment(date).format('MMMM Do, h:mm A');
    },
    async fetchBookings() {
      this.loading = true;
      this.error = null;
      try {
        // NEW API ROUTE: Get all bookings (backend route must be implemented)
        const response = await api.get('/admin/bookings');
        this.bookings = response.data;
      } catch (err) {
        this.error = 'Failed to load bookings. Check backend API route /api/admin/bookings.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async updateStatus(id, newStatus) {
      if (!confirm(`Are you sure you want to change the status of this booking to ${newStatus}?`)) return;

      try {
        // API ROUTE: Update status by ID (backend route must be implemented)
        const response = await api.put(`/admin/bookings/${id}/status`, { status: newStatus });
        
        // Update the local list to reflect the change without a full reload
        const index = this.bookings.findIndex(b => b._id === id);
        if (index !== -1) {
          this.bookings.splice(index, 1, response.data); // Replace old object with updated one
        }

      } catch (err) {
        alert(`Failed to update booking status: ${err.response?.data?.message || 'Network error.'}`);
        console.error(err);
      }
    },

    // === NEW LOGOUT METHOD ===
    logout() {
        // This is the functional part: redirecting the user back to the login page.
        this.$router.push('/admin/login');
    }
    // =========================
  }
};
</script>

<style scoped>
.admin-dashboard-container {
     padding: 30px;
     background-color: #fcfcfc; 
}
.summary-text {
     font-size: 1.1em;
     margin-bottom: 20px;
}
.controls {
     display: flex;
     justify-content: flex-start;
     align-items: center;
     gap: 15px;
     margin-bottom: 20px;
}
.controls select, .refresh-btn {
     padding: 8px 15px;
     border-radius: 4px;
}
.refresh-btn {
    background-color: #5bc0de;
    color: white;
    border: none;
    cursor: pointer;
}
.bookings-table-wrapper {
     overflow-x: auto;
     border: 1px solid #5a6268;
     border-radius: 5px;
}
.bookings-table {
     width: 100%;
     border-collapse: collapse;
}
.bookings-table th, .bookings-table td {
    padding: 12px 15px;
     border-bottom: 1px solid #eee;
     text-align: left;
}
.bookings-table th {
     background-color: #f7a9b8;
    color: white;
     font-size: 0.9em;
}
.bookings-table tr:hover {
     background-color: #fcfcfc;
}
/* Status Styling */
.status-badge {
     padding: 4px 8px;
     border-radius: 12px;
     font-size: 0.8em;
    font-weight: bold;
    color: white;
}
.status-badge.pending { background-color: #ffc107; } /* Yellow */
.status-badge.confirmed { background-color: #28a745; } /* Green */
.status-badge.cancelled { background-color: #dc3545; } /* Red */

.duration-hint, .contact-info {
     font-size: 0.8em;
    color: #666;
    margin-top: 2px;
}
/* Action Buttons */
.action-confirm, .action-cancel {
     padding: 6px 10px;
     margin-right: 5px;
     border: none;
     border-radius: 4px;
     color: white;
     cursor: pointer;
     font-size: 0.9em;
}
.action-confirm { background-color: #28a745; }
.action-cancel { background-color: #dc3545; }
.action-confirm:disabled, .action-cancel:disabled {
     opacity: 0.5;
     cursor: not-allowed;
}
.status-message { margin-top: 30px; font-size: 1.2em; }
.error-message { color: red; }

/* === NEW STYLE FOR ADD SERVICE BUTTON === */
.add-service-btn {
     /* Style the router-link to look like a button */
     padding: 8px 15px;
     background-color: #f7a9b8; /* Glam Pink (Matches table header) */
     color: white;
     border: none;
     border-radius: 4px;
     text-decoration: none; /* Remove underline */
     font-weight: bold;
     display: flex;
     align-items: center;
     transition: background-color 0.3s;
}

.add-service-btn:hover {
     background-color: #d18794; 
}
/* ======================================= */

/* === NEW STYLE FOR LOGOUT BUTTON === */
.logout-btn {
    padding: 8px 15px;
    background-color: #6c757d; /* Grey/Neutral for Logout */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: auto; /* This pushes the logout button to the far right */
}

.logout-btn:hover {
    background-color: #5a6268;
}
/* =================================== */
</style>
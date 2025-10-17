<template>
  <div class="add-service-container">
    <h1>Add New Service</h1>
    <router-link to="/admin/dashboard" class="back-link">&leftarrow; Back to Dashboard</router-link>

    <form @submit.prevent="submitService" class="service-form">
      
      <div class="form-group">
        <label for="name">Service Name:</label>
        <input type="text" id="name" v-model="form.name" required>
      </div>
      
      <div class="form-group">
        <label for="category">Category:</label>
        <select id="category" v-model="form.category" required>
            <option value="" disabled>-- Select Category --</option>
            <option value="Nails">Nails</option>
            <option value="Eyelash">Eyelash</option>
        </select>
      </div>

      <div class="form-group-inline">
        <div class="form-group">
            <label for="price">Price ($):</label>
            <input type="number" id="price" v-model.number="form.price" min="0" step="0.01" required>
        </div>
        
        <div class="form-group">
            <label for="duration">Duration (Minutes):</label>
            <input type="number" id="duration" v-model.number="form.duration" min="15" step="15" required>
        </div>
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description" rows="3"></textarea>
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? 'Saving...' : 'Add Service' }}
      </button>
    </form>
    
    <p v-if="message" :class="messageType">{{ message }}</p>

  </div>
</template>

<script>
import api from '@/utils/api';

export default {
  name: 'AdminAddService',
  data() {
    return {
      form: {
        name: '',
        description: '',
        price: null,
        duration: null,
        category: '',
      },
      loading: false,
      message: null,
      messageType: 'success',
    };
  },
  methods: {
    async submitService() {
      this.loading = true;
      this.message = null;

      try {
        const response = await api.post('/admin/services', this.form);
        
        this.message = response.data.message;
        this.messageType = 'success';
        
        // Reset form for next entry
        this.form = { name: '', description: '', price: null, duration: null, category: '' };

      } catch (error) {
        this.messageType = 'error';
        this.message = error.response?.data?.message || 'Failed to add service. Check server logs.';
        console.error('Service addition error:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.add-service-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 30px;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    background-color: #fff;
}
.back-link {
    display: inline-block;
    margin-bottom: 20px;
    color: #f7a9b8;
    text-decoration: none;
    font-weight: bold;
}
.service-form {
    padding: 20px 0;
}
.form-group {
    margin-bottom: 15px;
    text-align: left;
}
.form-group-inline {
    display: flex;
    gap: 20px;
}
.form-group-inline .form-group {
    flex: 1;
}
label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}
input[type="text"], input[type="number"], select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}
textarea {
    resize: vertical;
}
.submit-btn {
    width: 100%;
    padding: 12px;
    background-color: #42b983; /* Green CTA */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 1.1em;
}
.submit-btn:hover:not(:disabled) {
    background-color: #3a9e72;
}
.submit-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
.success {
    color: #42b983;
    font-weight: bold;
    margin-top: 15px;
}
.error {
    color: #dc3545;
    font-weight: bold;
    margin-top: 15px;
}
</style>
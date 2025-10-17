<template>
  <div class="admin-login-view">
    <div class="login-container">
      <h1 class="font-serif">Admin Access</h1>
      <p class="font-sans description">Access the appointment management dashboard.</p>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username" class="font-sans">Username</label>
          <input type="text" id="username" v-model="username" required class="font-sans input-field">
        </div>
        <div class="form-group">
          <label for="password" class="font-sans">Password</label>
          <input type="password" id="password" v-model="password" required class="font-sans input-field">
        </div>
        <button type="submit" class="login-btn font-sans">Login Securely</button>
      </form>
      <p v-if="loginError" class="error-message font-sans">{{ loginError }}</p>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api';

export default {
  name: 'AdminLogin',
  data() {
    return {
      username: '',
      password: '',
      loginError: null,
    };
  },
  methods: {
    async login() {
      this.loginError = null;

      try {
        const response = await api.post('/admin/login', {
          username: this.username,
          password: this.password
        });
        
        alert('Login Successful! Redirecting to dashboard...');
        this.$router.push('/admin/dashboard'); 

      } catch (err) {
        this.loginError = err.response?.data?.message || 'Login failed. Check server connection.';
        console.error('Login error:', err);
      }
    }
  }
};
</script>

<style scoped>
:root {
  --primary-pink: #c78099; 
  --text-color-dark: #222222; 
  --soft-bg: #fcf6f8; 
  --light-bg: #ffffff;
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Poppins', sans-serif;
}

.font-serif { font-family: var(--font-serif); }
.font-sans { font-family: var(--font-sans); }

.admin-login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  padding: 20px;
  font-family: var(--font-sans);
  color: var(--text-color-dark);
  background-image: url('~@/assets/studio-view1.png'); 
  background-size: cover;
  background-position: center;
  background-attachment: fixed; 
  background-color: rgba(0, 0, 0, 0.4); 
  background-blend-mode: darken;
}

.login-container {
  max-width: 450px; 
  width: 100%;
  padding: 50px; 
  background-color: var(--light-bg); 
  border-radius: 12px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3); 
  text-align: center;
  border-top: 5px solid var(--primary-pink); 
  position: relative; 
  z-index: 10; 
}

h1 {
  font-family: var(--font-serif);
  font-size: 3em; 
  color: var(--text-color-dark);
  margin-bottom: 10px;
  font-weight: 700;
}

.description {
  font-size: 1.25em;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
}

.login-form {
  margin-top: 30px;
}

.form-group {
  text-align: left;
  margin-bottom: 25px; 
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text-color-dark);
  font-size: 1em;
}

.input-field {
  width: 100%;
  padding: 12px 15px; 
  border: 1px solid #e0e0e0; 
  border-radius: 6px; 
  box-sizing: border-box;
  font-size: 1.25em;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  border-color: var(--primary-pink);
  box-shadow: 0 0 0 3px rgba(199, 128, 153, 0.2); 
  outline: none;
}

.login-btn {
  width: 100%;
  padding: 15px; 
  background-color: var(--primary-pink);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 25px;
  font-size: 1.25em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.login-btn:hover {
  background-color: #c78099; 
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.error-message {
  color: #e74c3c; 
  margin-top: 20px;
  font-weight: 500;
  font-size: 0.95em;
}

/* Responsive Adjustments */
@media (max-width: 600px) {
  .login-container {
    padding: 30px;
    margin: 20px; 
  }
  h1 {
    font-size: 2.2em;
  }
  .description {
    font-size: 1em;
    margin-bottom: 30px;
  }
  .form-group label {
    font-size: 0.9em;
  }
  .login-btn {
    padding: 12px;
    font-size: 1em;
  }
}
</style>
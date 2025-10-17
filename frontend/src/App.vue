<template>
  <div id="app">
    <header class="main-header">
      <div class="header-content">
        <router-link to="/" class="logo">
          <span class="glam">Glam</span><span class="tips">Tips</span>
        </router-link>

        <nav class="main-nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About Us</router-link>
          <router-link to="/services">Services</router-link>
          <router-link to="/contact">Contact Us</router-link>
          <router-link to="/admin/login" class="admin-link">(Admin)</router-link>
          <router-link to="/book" class="book-now-btn">Book Now</router-link>
        </nav>
      </div>
    </header>
    
    <main class="content">
      <router-view/>
    </main>

    <footer class="main-footer">
      <div class="footer-grid">
        <div class="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>Email: booking@glamtips.com</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 Beauty Blvd, Manila City</p>
        </div>

        <div class="footer-section navigation">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/about">Our Story</router-link></li>
            <li><router-link to="/services">All Services</router-link></li>
            <li><router-link to="/book">Schedule Appointment</router-link></li>
            <li><router-link to="/admin/login">Admin Access</router-link></li>
          </ul>
        </div>

        <div class="footer-section hours">
          <h3>Hours of Operation</h3>
          <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 5:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; {{ new Date().getFullYear() }} Glam Tips. All Rights Reserved.
      </div>
    </footer>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  --primary-pink: #d99f9f; 
  --text-color: #333333; 
  --light-bg: #f5f5f5; 
  --footer-bg: #403e43; 
  --footer-text: #e0e0e0;
}

/* ---------------- GLOBAL STYLES ---------------- */
#app {
  font-family: 'Times New Roman', Times, serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex-grow: 1;
}

/* ---------------- PROFESSIONAL HEADER ---------------- */
.main-header {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 0 40px;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px; 
  margin: 0 auto;
  height: 90px; 
}

/* Logo Styling */
.logo {
  font-size: 2.2em; 
  font-weight: 700;
  letter-spacing: 0.5px;
  text-decoration: none;
}
.logo .glam {
  color: var(--primary-pink);
}
.logo .tips {
  color: var(--text-color);
}

/* Navigation Styling */
.main-nav {
  display: flex;
  align-items: center;
  gap: 20px; 
  font-size: 1.1em;
}

.main-nav a {
  font-weight: 400; 
  color: var(--text-color);
  text-decoration: none;
  padding: 10px 5px;
  transition: color 0.3s;
  font-size: 0.95em;
  text-transform: uppercase; 
}
.main-nav a:hover:not(.book-now-btn) {
  color: var(--primary-pink);
  border-bottom: 2px solid var(--primary-pink); 
}

.main-nav a.router-link-exact-active:not(.book-now-btn) {
  color: var(--primary-pink);
  font-weight: 600; 
  border-bottom: 2px solid var(--primary-pink);
}

/* CTA Button */
.book-now-btn {
  padding: 12px 25px; 
  background-color: var(--primary-pink);
  color: white !important;
  border-radius: 4px; 
  margin-left: 30px;
  text-transform: uppercase;
  font-weight: 700 !important;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); 
}
.book-now-btn:hover {
  background-color: #c18888; 
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

.admin-link {
    font-size: 0.8em;
    color: #6c757d !important;
    margin-right: -10px;
}


/* ---------------- PROFESSIONAL FOOTER ---------------- */
.main-footer {
  background-color: var(--footer-bg);
  color: var(--footer-text);
  padding: 60px 20px 30px;
  margin-top: 80px; 
  text-align: left;
}
.footer-grid {
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto 40px;
  flex-wrap: wrap;
}
.footer-section {
  width: 30%;
  min-width: 200px;
  margin-bottom: 20px;
}
.footer-section h3 {
  color: white;
  border-bottom: 1px solid var(--primary-pink); 
  padding-bottom: 15px;
  margin-bottom: 20px;
  font-size: 1.3em;
  font-weight: 500;
  text-transform: uppercase;
}
.footer-section p, .footer-section li {
  font-size: 0.95em;
  line-height: 1.8; 
}
.footer-section ul {
  list-style: none;
  padding: 0;
}
.footer-section a {
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.3s;
}
.footer-section a:hover {
  color: var(--primary-pink);
  text-decoration: underline;
}
.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1); 
  font-size: 0.85em;
  color: #a0a0a0;
}

/* ---------------- RESPONSIVENESS ---------------- */
@media (max-width: 900px) {
  .header-content {
    flex-direction: column;
    height: auto;
    padding: 15px 20px;
  }
  .main-nav {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 15px;
    gap: 10px 15px;
  }
  .book-now-btn {
    margin-left: 0;
  }
  .admin-link {
    margin-right: 0;
  }
  .footer-grid {
    justify-content: center;
    text-align: center;
  }
  .footer-section {
    width: 100%;
    margin-bottom: 30px;
  }
  .footer-section h3 {
    text-align: center;
  }
}
</style>
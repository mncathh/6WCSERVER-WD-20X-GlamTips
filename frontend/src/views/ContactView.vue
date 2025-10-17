<template>
  <div class="contact-view">
    
    <div class="contact-hero-image-container">
        <img src="@/assets/bgc.jpg" 
             alt="Glamorous Contact Header Background" 
             class="contact-hero-image">
        <div class="contact-hero-overlay-content">
            <h1 class="font-serif">Get in Touch with Glam Tips</h1>
            <p class="font-sans">We are here to help you schedule your perfect glam session!</p>
        </div>
    </div>

    <div class="card-grid">
        <div class="contact-details-card info-card">
            <h2 class="font-serif">Connect Directly</h2>
            <div class="info-item">
                <i class="icon fas fa-phone-alt"></i>
                <p class="font-sans"><strong>Phone:</strong> (555) 123-GLAM (4526)</p>
            </div>
            <div class="info-item">
                <i class="icon fas fa-envelope"></i>
                <p class="font-sans"><strong>Email:</strong> bookings@glamtips.com</p>
            </div>
        </div>

        <div class="address-card info-card">
            <h2 class="font-serif">Our Location</h2>
            <div class="info-item">
                <i class="icon fas fa-map-marker-alt"></i>
                <p class="font-sans">Glam Tips Studio<br>Unit 101, Luxury Plaza<br>123 Main Street, Makati City</p>
            </div>
        </div>

        <div class="hours-card info-card">
            <h2 class="font-serif">Business Hours</h2>
            <ul class="font-sans">
                <li><span class="day">Tuesday - Friday:</span> 10:00 AM - 7:00 PM</li>
                <li><span class="day">Saturday:</span> 9:00 AM - 6:00 PM</li>
                <li><span class="day">Sunday & Monday:</span> <span class="closed">Closed</span></li>
            </ul>
            <p class="note font-sans">Appointments are required for all services.</p>
        </div>
    </div>
    
    <div class="map-container">
        <h2 class="font-serif map-title">Find Our Studio</h2>
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.646892557762!2d121.0189957!3d14.5587754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90b639e44f3%3A0x6b4c102b37b0d77!2sMakati%20City!5e0!3m2!1sen!2sph!4v1660000000000!5m2!1sen!2sph" 
            width="100%" 
            height="450" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ContactView',
}
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

/* Helper Classes */
.font-serif { font-family: var(--font-serif); }
.font-sans { font-family: var(--font-sans); }
.contact-view {
    font-family: var(--font-sans);
    color: var(--text-color-dark);
    background-color: var(--light-bg);
}

/* 1. HEADER HERO SECTION STYLES */
.contact-hero-image-container {
    position: relative;
    width: 100%;
    height: 550px; 
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;
}

.contact-hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(60%);
    z-index: 1;
}

.contact-hero-overlay-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    padding: 20px;
}

.contact-hero-overlay-content h1 {
    font-size: 4em; 
    margin-bottom: 10px;
    color: white;
    font-family: var(--font-serif); 
    font-weight: 700;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}

.contact-hero-overlay-content p {
    font-size: 1.5em; 
    max-width: 800px;
    margin: 0 auto;
    color: #fffaf0;
    font-family: var(--font-sans); 
}


/* 2. CONTACT INFORMATION GRID DESIGN */
.card-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
    gap: 40px; 
    margin: 0 auto 80px auto;
    max-width: 1400px; 
    padding: 0 20px;
}

.info-card {
    flex: 1; 
    min-width: 300px;
    max-width: 350px; 
    padding: 30px;
    background-color: var(--light-bg); 
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); 
    text-align: left;
    transition: box-shadow 0.3s ease, border-top 0.3s ease;
    border-top: 5px solid var(--primary-pink); 
}

.info-card:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.info-card h2 {
    color: var(--text-color-dark);
    font-family: var(--font-serif);
    font-size: 2.2em;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--soft-bg); 
    font-weight: 600;
}

.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.info-card .info-item p {
    margin: 0;
    line-height: 1.6;
    color: #555;
    font-size: 1.25em;
}
.info-card .info-item strong {
    color: var(--text-color-dark);
    font-weight: 600;
}

.info-item .icon {
    font-size: 1.5em;
    color: var(--primary-pink);
    margin-right: 15px;
    width: 30px;
    text-align: center;
}

.hours-card ul {
    list-style: none;
    padding: 0;
}
.hours-card li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    color: var(--text-color-dark);
    font-size: 1.25em;
    border-bottom: 1px dotted #ccc; 
}
.hours-card li:last-child {
    border-bottom: none;
}

.hours-card .day {
    font-weight: 600;
    color: var(--text-color-dark);
}
.hours-card .closed {
    color: #c0392b;
    font-weight: 700;
}

.note {
    margin-top: 25px;
    font-style: italic;
    color: #c78099; 
    font-size: 1em;
    padding-top: 10px;
    border-top: 1px dashed #c78099;
    text-align: center;
}

/* 3. Map Section */
.map-container {
    max-width: 1200px;
    width: 100%;
    margin: 40px auto; 
    padding: 0 20px 80px; 
    text-align: center;
}
.map-container .map-title {
    color: var(--text-color-dark);
    font-family: var(--font-serif);
    font-size: 2.5em;
    margin-bottom: 30px;
}
.map-container iframe {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); 
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .contact-hero-overlay-content h1 {
        font-size: 2.5em;
    }
    .contact-hero-image-container {
        height: 250px;
        margin-bottom: 50px;
    }
    .card-grid {
        flex-direction: column;
        gap: 20px;
    }
    .info-card {
        max-width: 100%;
        width: 100%;
    }
}
</style>
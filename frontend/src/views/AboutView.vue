<template>
  <div class="about-view">
    
    <div class="about-hero-image-container">
      <img src="@/assets/view.jpg" alt="Luxurious Salon Interior" class="about-hero-image">
      <div class="about-hero-overlay-content">
        <h1>Discover GlamTips</h1>
        <p>Your ultimate destination for luxury nails and lashes. We craft beauty through passion, quality, and personalized care.</p>
      </div>
    </div>
    
    <div class="salon-intro">
      <h2>Our Essence of Elegance</h2>
     <p class="commitment-text"> 
      At Glam Tips, we believe that beauty is more than appearance — it’s an experience of confidence, comfort, and self-expression. Founded with a vision to redefine luxury beauty, our salon specializes in the artistry of gel nail design and the craft of voluminous lash extensions.</br>
      <br>
        Every service we offer is guided by two core promises: uncompromising quality using only premium, ethical products and expertly trained specialists, and personalized client care that ensures every visit feels indulgent and memorable.
      </br>
      <br>
        Step into our elegant sanctuary and let our team bring out your natural radiance, because at Glam Tips, your beauty deserves nothing less than perfection.
      </p>
      </br>
    </div>
    
    <div class="interior-showcase-section ambiance-section">
      <h2 class="section-title ambiance-title">Experience Our Luxurious Ambiance</h2>
      <p class="subtitle ambiance-subtitle">From plush chairs to soft, custom lighting, we've designed every detail to ensure your comfort and relaxation.</p>
      
      <div class="interior-gallery">
        <div class="gallery-card">
          <img src="@/assets/studio-view1.png" alt="Luxurious Nail Area" class="gallery-image">
          <p class="image-caption">The Nail Lounge: Where Art Meets Perfection</p>
        </div>
        
        <div class="gallery-card">
          <img src="@/assets/studio-view2.png" alt="The Lash Suites" class="gallery-image">
          <p class="image-caption">The Lash Suites: Your Comfort Zone for Volume</p>
        </div>
      </div>
    </div>

    <div class="staff-list-section">
      <h2 class="section-title">Meet Our Talented Team</h2>
      <p class="subtitle">Each member of our team is dedicated to providing exceptional service and artistry.</p>
      
      <div v-if="loading" class="status">Loading staff profiles...</div>
      <div v-else-if="error" class="status error">{{ error }}</div>
      
      <div v-else class="staff-list">
        <div v-for="staff in staffList" :key="staff._id" class="staff-card">
          <img :src="staff.photo" :alt="staff.name" class="staff-photo">
          <h3>{{ staff.name }}</h3>
          <p class="specialty">{{ staff.specialty }} Specialist</p>
          <p class="profile-text">{{ staff.profile || `Dedicated ${staff.specialty} expert committed to excellence and personalized client care.` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api';

export default {
  name: 'AboutView',
  data() {
    return {
      staffList: [],
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchStaff();
  },
  methods: {
    fetchStaff() {
      const STAFF_PHOTOS = [
        require('@/assets/staff-1.png'),
        require('@/assets/staff-2.png'),
        require('@/assets/staff-3.png'),
        require('@/assets/staff-4.png'),
      ];
    
      const GENERIC_PHOTO = require('@/assets/logo.png'); 

      api.get('/staff')
        .then(response => {
          const staffWithPhotos = response.data.map((staff, index) => {
            if (index < STAFF_PHOTOS.length) {
              staff.photo = STAFF_PHOTOS[index];
            } else {
              staff.photo = GENERIC_PHOTO; 
            }
            return staff;
          });

          this.staffList = staffWithPhotos;
          this.loading = false;
        })
        .catch(err => {
          this.error = 'Failed to load staff profiles. Please check the backend connection.';
          this.loading = false;
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
:root {
  --primary-pink: #c78099; 
  --text-color-dark: #222222; 
  --soft-bg: #fafafa; 
  --accent-pink: #f7a9b8; 
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Poppins', sans-serif;
}

.about-view {
  font-family: var(--font-sans); 
  color: var(--text-color-dark);
  text-align: center;
}

/* 1. MAIN ABOUT HERO SECTION Styles */
.about-hero-image-container {
  position: relative;
  width: 100%;
  height: 550px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
}

.about-hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(55%) blur(1px);
  z-index: 1;
}

.about-hero-overlay-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 20px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}

.about-hero-overlay-content h1 {
  font-size: 4em;
  margin-bottom: 15px;
  color: white;
  font-family: var(--font-serif);
}

.about-hero-overlay-content p {
  font-size: 1.5em;
  max-width: 800px;
  margin: 0 auto;
  color: #fffaf0;
}

/* 2. SALON INTRO Styles */
.salon-intro {
  background-color: #fcf6f8; 
  padding: 50px 30px;
  max-width: 100%;
  margin: 0; 
  text-align: center;
  padding-bottom: 50px; 
}

.salon-intro h2 {
  color: var(--text-color-dark);
  font-family: var(--font-serif);
  font-size: 2.8em;
  margin-bottom: 30px;
}

.salon-intro .commitment-text {
  color: #505050;
  font-size: 1.25em;
  line-height: 1.9;
  max-width: 900px;
  margin: 0 auto;
}

/* 3. INTERIOR SHOWCASE SECTION Styles */
.interior-showcase-section.ambiance-section {
    padding: 50px;
    background-color: white; 
    margin-bottom: 50px; 
}

.ambiance-section .ambiance-title {
    color: var(--primary-pink);
    font-family: var(--font-serif);
    font-size: 2.8em;
    margin-bottom: 15px;
}

.ambiance-section .ambiance-subtitle {
    color: #222222;
    margin-bottom: 60px;
    font-size: 1.25em;
}

.interior-gallery {
    display: flex;
    justify-content: center;
    gap: 40px;
    max-width: 1300px;
    margin: 0 auto;
}

.gallery-card {
    width: 45%;
    background-color: var(--soft-bg);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.gallery-card:hover {
    transform: translateY(-5px);
}

.gallery-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    display: block;
}

.image-caption {
    font-family: var(--font-serif);
    font-size: 1.25em;
    font-weight: 600;
    color: var(--text-color-dark);
    padding: 20px;
    margin: 0;
}

/* 4. STAFF LIST SECTION Styles */
.staff-list-section {
    padding: 50px 20px 80px; 
    background-color: #fcf6f8; 
}

.staff-list-section .section-title {
    color: #222222;
    font-family: var(--font-serif);
    font-size: 2.8em;
    margin-bottom: 15px;
}

.staff-list-section .subtitle {
    color: #222222;
    margin-bottom: 60px;
    font-size: 1.25em;
}

/* Staff Cards */
.staff-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1100px; 
  margin: 0 auto;
  gap: 60px;
}

.staff-card {
  width: 450px; 
  max-width: 48%; 
  padding: 35px 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-bottom: 4px solid transparent; 
}

.staff-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  border-bottom: 4px solid var(--primary-pink);
}

.staff-photo {
  width: 150px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 4px solid var(--primary-pink); 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.staff-card h3 {
  color: var(--text-color-dark);
  font-size: 1.75em;
  font-family: var(--font-serif);
  margin-bottom: 8px;
}

.specialty {
  font-weight: 600;
  color: var(--primary-pink);
  margin-bottom: 15px;
  font-size: 1.25em;
}

.profile-text {
  font-style: normal;
  font-size: 1.25em;
  color: #555;
  line-height: 1.7;
}


/* Status Text */
.status {
  margin-top: 30px;
  font-size: 1em;
}

.error {
  color: red;
}

/* Responsive adjustments */
@media (max-width: 992px) {
    .interior-gallery {
        gap: 20px;
    }
    .gallery-card {
        width: 48%;
    }
    .ambiance-section .ambiance-title, .staff-list-section .section-title {
        font-size: 2.2em; 
    }
    .staff-card {
        width: 45%;
    }
}

@media (max-width: 768px) {
    .interior-gallery {
        flex-direction: column;
    }
    .gallery-card {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }
    .about-hero-overlay-content h1 {
        font-size: 3em; 
    }
    .staff-card {
        width: 80%;
    }
}

@media (max-width: 480px) {
    .about-hero-image-container {
        height: 400px;
    }
}
</style>
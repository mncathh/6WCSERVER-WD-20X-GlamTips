<template>
  <div class="home-view">
    <div class="hero-section">
      <img src="@/assets/lala2.png" alt="Luxury Gel Nails and Eyelash Extensions" class="hero-image">
      <div class="hero-content">
        <h1>Glam Tips</h1>
        <h2>Your Next Level of Beauty is Just a Click Away</h2>
        <p>Specializing in Luxury Gel Nails and Stunning Eyelash Extensions.</p>
        <router-link to="/book" class="cta-button">Book Your Glam Session Now</router-link>
      </div>
    </div>

    <div class="services-showcase-section">
      <h2>Feel the best at NEW Lounge</h2>
      <div class="service-cards-container">
        <div class="service-card">
          <img src="@/assets/nails.png" alt="Nails Service" class="service-card-image left-image">
          <div class="service-card-text left-text">
            <h3>NAILS</h3>
            <p>Crafting nail designs to perfection for your satisfaction.</p>
          </div>
        </div>
        <div class="service-card">
          <img src="@/assets/lashes.png" alt="Lashes Service" class="service-card-image right-image">
          <div class="service-card-text right-text">
            <h3>LASHES</h3>
            <p>Achieving your dream lashes, from a natural to dramatic finish.</p>
          </div>
        </div>
      </div>
      <router-link to="/services" class="services-button">OUR SERVICES</router-link>
    </div>

    <div class="value-proposition-section three-col-grid">
        <div class="value-text-container-header">
            <h2>Why Choose Glam Tips?</h2>
            <p class="intro-paragraph">We are dedicated to providing a premium beauty experience where quality meets relaxation. Our commitment to excellence ensures every visit leaves you feeling confident and glamorous.</p>
        </div>
        
        <div class="key-points-grid">
            <div class="key-point-card">
              <img src="@/assets/nail.png" alt="Artist Icon" class="key-point-icon">
                <h4>Expert Nail Artists</h4>
                <p>Our technicians are certified in the latest gel and art techniques, guaranteeing stunning, long-lasting results and flawless execution.</p>
            </div>
            <div class="key-point-card">
              <img src="@/assets/premium.png" alt="Artist Icon" class="key-point-icon">
                <h4>Premium, Ethical Products</h4>
                <p>We use high-grade, cruelty-free, and professional-only products that prioritize the health and long-term well-being of your natural nails and lashes.</p>
            </div>
            <div class="key-point-card">
              <img src="@/assets/comfort.png" alt="Artist Icon" class="key-point-icon">
                <h4>Sanctuary of Comfort</h4>
                <p>Enjoy our clean, luxurious lounge designed to be a relaxing escape from the city bustle, complete with plush seating and soft lighting.</p>
            </div>
        </div>

        <router-link to="/about" class="about-us-button">Learn Our Story</router-link>
    </div>
    </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>
<style scoped>
:root {
  --primary-pink: #d99f9f; 
  --text-color-dark: #333333; 
  --soft-bg: #f8f8f8;
  --accent-pink: #f7a9b8; 
}

/* -------------------------------------------
    1. Hero Section Styles (ADJUSTED)
    ------------------------------------------- */
.hero-section {
  position: relative;
  width: 100%;
  height: 850px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  padding-right: 3%; 
  box-sizing: border-box; 
}

.hero-section::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        rgba(252, 231, 235, 0.2), 
        rgba(217, 159, 159, 0.4) 
    );
    z-index: 1.5;
}

.hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(80%) blur(1px);
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 2;
    text-align: center; 
    padding: 80px 20px;
    max-width: 600px; 
    color: white;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
}

.hero-content h1 { 
  color: white; 
  margin-bottom: 15px; 
  font-size: 5em; 
  line-height: 1.2; 
}
.hero-content h2 {
    color: white;
    margin-bottom: 15px;
    font-size: 1.5em;
    line-height: 1.2;
}

.hero-content p {
    font-size: 1.3em;
    color: white;
    margin-bottom: 40px;
    font-weight: 400;
}

.cta-button {
    display: inline-block;
    padding: 15px 40px;
    color: white;
    text-decoration: none;
    border-radius: 30px;
    font-size: 1.2em;
    font-weight: bold;
    transition: background-color 0.3s, box-shadow 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border: 2px solid white;
}
.cta-button:hover {
    background-color: #e58da8;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* -------------------------------------------
    2. Services Showcase Styles
    ------------------------------------------- */
.services-showcase-section {
    padding: 60px 20px;
    background-color: #fce7eb; 
    text-align: center;
    font-family: 'Playfair Display', serif; 
    color: #444;
}

.services-showcase-section h2 {
    font-size: 2.5em;
    margin-bottom: 60px;
    color: #333;
    font-weight: normal;
}

.service-cards-container {
    display: flex;
    justify-content: center;
    gap: 50px; 
    margin-bottom: 50px;
    flex-wrap: wrap; 
}

.service-card {
    position: relative;
    width: 500px; 
    height: 600px; 
    overflow: hidden;
    background-color: #ffffff; 
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); 
    border-radius: 20px; 
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.service-card:hover {
    transform: translateY(-8px); 
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25); 
}

.service-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    display: block; 
}

.service-card-text {
    position: absolute;
    bottom: 0; 
    width: 100%;
    padding: 20px;
    box-sizing: border-box; 
    color: #333; 
    text-align: center;
    background: #ffffff; 
    backdrop-filter: blur(5px); 
    -webkit-backdrop-filter: blur(5px); 
}

.service-card-text h3 {
    font-size: 1.8em;
    margin-bottom: 10px;
    color: var(--accent-pink); 
    font-weight: bold;
    letter-spacing: 2px;
}

.service-card-text p {
    font-size: 1.1em;
    line-height: 1.5;
    color: #555;
}

.services-button {
    display: inline-block;
    padding: 15px 40px;
    background-color: #555; 
    color: white;
    text-decoration: none;
    border-radius: 5px; 
    font-size: 1.1em;
    font-weight: bold;
    transition: background-color 0.3s, box-shadow 0.3s ease;
    margin-top: 30px; 
    letter-spacing: 1px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.services-button:hover {
    background-color: #777;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* -------------------------------------------
    3. 3-Square Value Proposition Section (FIXED)
    ------------------------------------------- */
.value-proposition-section {
    max-width: 1200px;
    margin: 80px auto;
    text-align: center;
    padding: 0 20px;
}

.value-text-container-header {
    text-align: center;
    margin-bottom: 50px;
}

.value-text-container-header h2 {
    font-size: 3em; 
    color: var(--text-color-dark);
    margin-bottom: 20px;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
}

.intro-paragraph {
    font-size: 1.15em;
    color: #666;
    line-height: 1.7;
    max-width: 800px; 
    margin: 0 auto;
}

.key-points-grid {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
    margin-bottom: 60px;
}

.key-point-card {
    flex: 1;
    text-align: center;
    padding: 40px 25px;
    background-color:#ffffff; 
    border-radius: 5px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: pointer;
    border-top: 5px solid transparent; 
}

.key-point-card:hover {
    transform: translateY(-8px); 
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2); 
    border-top: 5px solid var(--primary-pink); 
}

.key-point-card h4 {
    font-size: 1.4em;
    color: var(--text-color-dark);
    margin-bottom: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.key-point-card p {
    font-size: 1em;
    color: #777;
    margin: 0;
    line-height: 1.6;
}

.key-point-icon {
    width: 200px; 
    height: 200px;
    object-fit: contain;
    margin-bottom: 0px; 
}

.about-us-button {
    display: inline-block;
    padding: 14px 35px;
    background-color: #d99f9f;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 1em;
    font-weight: 700;
    transition: background-color 0.3s, box-shadow 0.3s;
    letter-spacing: 1px;
    text-transform: uppercase;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.about-us-button:hover {
    background-color: var(--primary-pink);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

/* -------------------------------------------
    Responsive adjustments
    ------------------------------------------- */
@media (max-width: 992px) {
    .service-cards-container {
        flex-direction: column; 
        align-items: center; 
    }
    .service-card {
        width: 90%; 
        height: 450px; 
    }
    .hero-content {
        max-width: 90%; 
        padding: 40px 15px; 
    }
    .hero-content h1 {
        font-size: 2.5em; 
    }
    .hero-content h2 {
        font-size: 1.8em; 
    }
    .hero-content p {
        font-size: 1em;
    }
    
    .value-proposition-section {
        margin: 50px 0;
    }
    .key-points-grid {
        flex-direction: column;
        gap: 20px;
        padding: 0 20px;
    }
    .key-point-card {
        padding: 30px 20px;
    }
}
@media (max-width: 768px) {
    .services-showcase-section h2 {
        font-size: 1.8em;
        margin-bottom: 40px;
    }
    .hero-section {
        height: 600px; 
        padding-right: 0; 
        justify-content: center; 
    }
    .hero-content {
        max-width: 90%;
        text-align: center; 
    }
}
@media (max-width: 480px) {
    .hero-content h1 {
        font-size: 2em;
    }
    .hero-content h2 {
        font-size: 1.5em;
    }
    .hero-content p {
        font-size: 0.9em;
    }
    .cta-button {
        padding: 12px 30px;
        font-size: 1em;
    }
}
</style>
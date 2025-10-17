<template>
<div class="services-view">
    
    <div class="services-hero-image-container">
        <img src="@/assets/services.jpg" alt="Glamorous Services" class="services-hero-image">
        <div class="services-hero-overlay-content">
            <h1 class="font-serif">Our Glam Services</h1>
            <p class="font-sans">Browse our selection of luxury nail and eyelash services and book your next appointment.</p>
        </div>
    </div>
    
    <div class="services-container">

        <div class="category-tabs">
            <button 
                @click="filterServices('All')" 
                :class="{ active: currentCategory === 'All' }"
                class="font-sans button-style">
                All Services
            </button>
            <button 
                @click="filterServices('Nails')" 
                :class="{ active: currentCategory === 'Nails' }"
                class="font-sans button-style">
                Nails
            </button>
            <button 
                @click="filterServices('Eyelash')" 
                :class="{ active: currentCategory === 'Eyelash' }"
                class="font-sans button-style">
                Eyelash
            </button>
        </div>

        <div v-if="loading" class="status-message font-sans">Loading services...</div>
        <div v-else-if="error" class="status-message error-message font-sans">{{ error }}</div>
        <div v-else class="service-list">
            <div v-for="service in filteredServices" :key="service._id" class="service-card">
                <span :class="['category-badge', service.category.toLowerCase()]" class="font-sans">{{ service.category }}</span>
                
                <h2 class="font-serif">{{ service.name }}</h2>
                <p class="description font-sans">{{ service.description }}</p>
                
                <div class="details font-sans">
                    <div class="price">
                        <span class="label">Price:</span> 
                        <strong>${{ service.price.toFixed(2) }}</strong>
                    </div>
                    <div class="duration">
                        <span class="label">Duration:</span> 
                        <strong>{{ service.duration }} min</strong>
                    </div>
                </div>
                
                <button @click="bookService(service)" class="book-btn font-sans">Book Now</button>
            </div>
            
            <p v-if="filteredServices.length === 0 && currentCategory !== 'All'" class="no-services font-sans">
                No {{ currentCategory }} services available at this time.
            </p>
        </div>
    </div>
</div>
</template>

<script>
import api from '@/utils/api'; 

export default {
    name: 'ServicesView',
    data() {
        return {
            allServices: [], 
            loading: true,
            error: null,
            currentCategory: 'All', 
        };
    },
    computed: {
        filteredServices() {
            if (this.currentCategory === 'All') {
                return this.allServices;
            }
            return this.allServices.filter(service => service.category === this.currentCategory);
        }
    },
    created() {
        this.fetchServices();
    },
    methods: {
        fetchServices() {
            api.get('/services')
                .then(response => {
                    this.allServices = response.data;
                    this.loading = false;
                })
                .catch(err => {
                    this.error = 'Failed to load services. Please check the backend connection.';
                    this.loading = false;
                    console.error(err);
                });
        },
        filterServices(category) {
            this.currentCategory = category;
        },
        bookService(service) {
            // Navigate to the booking page and pass the service ID as a query parameter
            this.$router.push({ name: 'booking', query: { serviceId: service._id } });
        }
    }
};
</script>

<style scoped>
:root {
    --primary-pink: #c78099; 
    --accent-pink: #f7a9b8; 
    --text-color-dark: #222222; 
    --soft-bg: #fcf6f8; 
    --light-bg: #ffffff;
    --font-serif: 'Playfair Display', serif;
    --font-sans: 'Poppins', sans-serif;
}

.font-serif { font-family: var(--font-serif); }
.font-sans { font-family: var(--font-sans); }


.services-view {
    font-family: var(--font-sans); 
    color: var(--text-color-dark);
    background-color: var(--light-bg);
}

/* 1. Services Hero Styles */
.services-hero-image-container {
    position: relative;
    width: 100%;
    height: 550px; 
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px; 
}

.services-hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(60%);
    z-index: 1;
}

.services-hero-overlay-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    padding: 20px;
}

.services-hero-overlay-content h1 {
    font-size: 4em; 
    margin-bottom: 10px;
    color: white;
    font-family: var(--font-serif); 
    font-weight: 700;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}

.services-hero-overlay-content p {
    font-size: 1.5em; 
    max-width: 800px;
    margin: 0 auto;
    color: #fffaf0;
    font-family: var(--font-sans); 
}

/* 2. Main Container & Tabs */
.services-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

.category-tabs {
    margin: 20px 0 60px;
    display: flex;
    justify-content: center;
    gap: 20px; 
}

.category-tabs button {
    padding: 12px 30px;
    border: 2px solid var(--primary-pink);
    background-color: var(--light-bg);
    color: var(--primary-pink);
    font-weight: 600;
    cursor: pointer;
    border-radius: 5px; 
    transition: all 0.3s;
    font-size: 1.2em;
    text-transform: uppercase;
    letter-spacing: 1px; 
    font-family: var(--font-sans);
}

.category-tabs button:hover:not(.active) {
    background-color: var(--soft-bg);
    color: var(--text-color-dark);
}

.category-tabs button.active {
    background-color: var(--primary-pink);
    color: white;
    border-color: var(--primary-pink);
    box-shadow: 0 4px 10px rgba(199, 128, 153, 0.3); 
}

/* 3. Service List & Cards */
.service-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px; 
    margin-top: 30px;
}

.service-card {
    position: relative;
    background-color: var(--soft-bg); 
    padding: 40px; 
    border-radius: 10px;
    width: 350px; 
    text-align: left;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-top: 3px solid var(--primary-pink); 
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.service-card h2 {
    color: var(--text-color-dark);
    font-size: 2em; 
    margin-top: 5px;
    margin-bottom: 15px;
    font-weight: 600;
    font-family: var(--font-serif); 
}

.description {
    color: #555;
    font-size: 1.2em; 
    line-height: 1.7;
    margin-bottom: 25px;
    font-family: var(--font-sans);
}

.category-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 6px 12px;
    border-radius: 20px; 
    font-size: 0.75em;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.category-badge.nails {
    background-color: var(--primary-pink);
}
.category-badge.eyelash {
    background-color: #a4c4b5; 
}

.details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;
}

.details .label {
    font-weight: 400;
    color: #777;
    margin-right: 5px;
    text-transform: uppercase;
    font-size: 1.1em;
}

.details strong {
    color: var(--text-color-dark);
    font-size: 1.2em; 
    font-weight: 700;
}


/* 4. Book Button Styling (Glam Pink) */
.book-btn {
    width: 100%;
    background-color: var(--primary-pink); 
    color: white;
    border: none;
    padding: 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 600;
    transition: background-color 0.3s, box-shadow 0.3s;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.book-btn:hover {
    background-color: #a55a72; 
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.status-message {
    margin-top: 50px;
    font-size: 1.2em;
    text-align: center;
    font-family: var(--font-sans);
}
.error-message {
    color: red;
}
.no-services {
    width: 100%;
    margin-top: 40px;
    color: #999;
}


/* Responsive adjustments */
@media (max-width: 768px) {
    .services-hero-overlay-content h1 {
        font-size: 3em;
    }
    .services-hero-image-container {
        height: 300px;
    }
    .category-tabs {
        flex-wrap: wrap;
        gap: 10px;
    }
    .category-tabs button {
        margin: 5px;
        padding: 10px 20px;
    }
    .service-list {
        gap: 20px;
    }
    .service-card {
        width: 100%;
        max-width: 400px;
    }
}
</style>
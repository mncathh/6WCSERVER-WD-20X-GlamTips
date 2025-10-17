const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// ===================================================================
// 1. MIDDLEWARE
// ===================================================================
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// ===================================================================
// 2. DATABASE CONNECTION
// ===================================================================
const MONGODB_URI = 'mongodb://localhost:27017/glamtipsdb'; 
mongoose.connect(MONGODB_URI)
     .then(() => console.log('✅ MongoDB connected successfully'))
     .catch(err => console.error('❌ MongoDB connection error:', err));


// ===================================================================
// 3. MONGOOSE MODELS (Defined here for simplicity)
// ===================================================================

// --- Staff Model (for reference) ---
const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, enum: ['Nails', 'Eyelash'], required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
const Staff = mongoose.model('Staff', staffSchema);


// --- Service Model (for reference) ---
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    category: { type: String, enum: ['Nails', 'Eyelash'], required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
const Service = mongoose.model('Service', serviceSchema);


// --- Booking Model (THE CORE) ---
const bookingSchema = new mongoose.Schema({
    clientName: { type: String, required: true, trim: true },
    clientPhone: { type: String, required: true, trim: true },
    clientEmail: { type: String, required: true, trim: true },

    // Appointment Details
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }, // Links to the Service
     staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },    // Links to the Staff member
  
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }, // Calculated based on service duration
    
    // Status and Unique ID for review
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], default: 'Pending' },
    // A simple unique ID for client review/management (e.g., a short string or number)
    confirmationCode: { type: String, required: true, unique: true }, 

}, { timestamps: true });
const Booking = mongoose.model('Booking', bookingSchema);


// --- User/Admin Model (NEW ENTITY) ---
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'staff'], default: 'admin' }, // Define user type
}, { timestamps: true });

const User = mongoose.model('User', userSchema);


// ===================================================================
// 4. API ROUTES (All combined here)
// ===================================================================

// --- Helper function for generating a simple Confirmation Code ---
const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// New route in backend/server.js (in the Admin Routes section)
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        
        // 1. Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // 2. Check password (without hashing, for simplicity based on our current setup)
        // In a real app: const isMatch = await bcrypt.compare(password, user.password);
        if (password !== user.password) { 
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // 3. Success: Send back a token or success message (for a full app, you send a JWT)
        res.status(200).json({ 
            message: 'Login successful!', 
            user: { id: user._id, username: user.username, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during login.' });
    }
});


// -------------------------------------------------------------------
// A. CLIENT-FACING READ ROUTES
// -------------------------------------------------------------------

// GET: All Services (for the Services Page)
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find({ isActive: true });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching services.' });
    }
});

// GET: All Staff (for the About Us/Booking staff selection)
app.get('/api/staff', async (req, res) => {
    try {
        const staff = await Staff.find({ isActive: true });
        res.json(staff);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching staff members.' });
    }
});

// -------------------------------------------------------------------
// B. BOOKING FLOW ROUTES
// -------------------------------------------------------------------

// POST: Book a New Appointment (Booking Confirmation)
app.post('/api/book', async (req, res) => {
    try {
        const { serviceId, staffId, startTime, clientName, clientPhone, clientEmail } = req.body;

        // 1. Get Service Duration (needed to calculate endTime)
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }
        
        // 2. Calculate End Time
        const durationMs = service.duration * 60 * 1000;
        const endTime = new Date(new Date(startTime).getTime() + durationMs);

        // 3. Simple Availability Check (Basic check for now: only checks if the staff is busy)
        const conflict = await Booking.findOne({
            staff: staffId,
            startTime: { $lt: endTime }, // Conflict if existing booking starts before new one ends
            endTime: { $gt: startTime },   // Conflict if existing booking ends after new one starts
            status: { $in: ['Pending', 'Confirmed'] } // Only check active bookings
        });

        if (conflict) {
            return res.status(409).json({ message: 'Selected time slot is no longer available. Please choose another.' });
        }

        // 4. Create the Booking
        const newBooking = new Booking({
            service: serviceId,
            staff: staffId,
            startTime,
            endTime,
            clientName,
            clientPhone,
            clientEmail,
            confirmationCode: generateCode() // Generate unique code
        });

        await newBooking.save();

        // 5. Success Response
        // FIX: Use the single .populate() call with an array of paths
        await newBooking.populate([
            { path: 'service', select: 'name duration' },
            { path: 'staff', select: 'name' }
        ]);
            
        res.status(201).json({ 
            message: 'Appointment booked successfully!',
            booking: newBooking
        });

    } catch (err) {
        console.error('Booking Error:', err); // This is where the error details are logged
        res.status(500).json({ message: 'Failed to create appointment due to a server error.' });
    }
});


// GET: Review Appointment Details (using confirmation code from the URL)
app.get('/api/booking/review/:code', async (req, res) => {
     try {
         const booking = await Booking.findOne({ confirmationCode: req.params.code })
            .populate('service') 
             .populate('staff'); 

         if (!booking) {
             return res.status(404).json({ message: 'Booking not found with that code.' });
         }
         res.json(booking);
     } catch (err) {
         res.status(500).json({ message: 'Error fetching booking details.' });
     }
});


// PUT/PATCH: Update Appointment (Edit/Confirm/Cancel)
app.put('/api/booking/update/:code', async (req, res) => {
    try {
        const { clientName, clientPhone, clientEmail, status, startTime, staffId } = req.body;

        const booking = await Booking.findOne({ confirmationCode: req.params.code });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        // Apply updates
        if (clientName) booking.clientName = clientName;
        if (clientPhone) booking.clientPhone = clientPhone;
        if (clientEmail) booking.clientEmail = clientEmail;
        if (status) booking.status = status; // Client can update status to 'Cancelled' or 'Confirmed'
        // Logic for re-scheduling (startTime, staffId) would be more complex and require re-checking availability,
        // but for a simple update, we allow basic modification.

        await booking.save();
        res.json({ message: 'Booking updated successfully.' });

    } catch (err) {
        res.status(500).json({ message: 'Failed to update appointment.' });
    }
});


// DELETE: Cancel Appointment (Client facing delete is usually just setting status to 'Cancelled')
app.delete('/api/booking/cancel/:code', async (req, res) => {
    try {
        const booking = await Booking.findOneAndUpdate(
            { confirmationCode: req.params.code },
            { status: 'Cancelled' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.json({ message: 'Appointment successfully cancelled.', booking });
    } catch (err) {
        res.status(500).json({ message: 'Failed to cancel appointment.' });
    }
});


// -------------------------------------------------------------------
// C. ADMIN DASHBOARD ROUTES (New Section)
// -------------------------------------------------------------------

// 1. GET ALL BOOKINGS (for Dashboard display)
app.get('/api/admin/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate('service', 'name duration price') // Populate service details
            .populate('staff', 'name')           // Populate staff name
            .sort({ startTime: 1 });            // Show chronologically

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Failed to retrieve all bookings:', error);
        res.status(500).json({ message: 'Failed to retrieve all bookings.' });
    }
});

// 2. UPDATE BOOKING STATUS (Confirm/Cancel/Complete)
app.put('/api/admin/bookings/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    // Basic validation for allowed statuses
    if (!['Confirmed', 'Cancelled', 'Completed', 'Pending'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided.' });
    }

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { $set: { status: status } },
            { new: true } // Return the updated document
        )
        .populate('service', 'name duration price')
        .populate('staff', 'name');

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Failed to update booking status:', error);
        res.status(500).json({ message: 'Failed to update booking status.' });
    }
});

// 3. POST: ADD NEW SERVICE
app.post('/api/admin/services', async (req, res) => {
    try {
        const { name, description, price, duration, category } = req.body;

        // Simple validation
        if (!name || !price || !duration || !category) {
            return res.status(400).json({ message: 'Missing required service fields.' });
        }
        
        // Ensure category is valid
        if (!['Nails', 'Eyelash'].includes(category)) {
             return res.status(400).json({ message: 'Invalid category. Must be Nails or Eyelash.' });
        }

        const newService = new Service({
            name,
            description,
            price,
            duration, // Should be in minutes (as required by model)
            category,
            isActive: true // New services are active by default
        });

        await newService.save();
        res.status(201).json({ 
            message: 'Service added successfully!', 
            service: newService 
        });

    } catch (error) {
        console.error('Failed to add new service:', error);
        // MongoDB validation errors (e.g., failed enum check) are caught here
        res.status(500).json({ message: 'Failed to add new service due to a server error.' });
    }
});

// ===================================================================
// 5. SERVER START
// ===================================================================
app.listen(port, () => {
     console.log(`🚀 Glam Tips API is running on port: ${port}`);
});


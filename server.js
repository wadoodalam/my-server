// server.js
const express = require('express');
const mongoose = require('mongoose');
const { User, Trip, UserTrips } = require('./model'); // Import the Mongoose models

const app = express();
app.use(express.json());

// Connect to MongoDB 
mongoose.connect('mongodb://localhost:27017/my-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));




// Define API endpoints

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Users and Trips Database.');
});

// GET /users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// GET /trips
app.get('/trips', async (req, res) => {
    const trips = await Trip.find();
    res.json(trips);
});

// GET /userTrips
app.get('/userTrips', async (req, res) => {
    const userTrips = await UserTrips.find();
    res.json(userTrips);
});

// GET /user/:id
app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json(user);
});

// GET /trip/:id
app.get('/trip/:id', async (req, res) => {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId);
    res.json(trip);
});





// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

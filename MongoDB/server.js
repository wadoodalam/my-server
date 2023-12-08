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



// GET /users
app.get('/users', async (req, res) => {
    const users = await User.find();
    const formattedUsers = users.map(user => ({
        user_id: user._id,
        name: user.name,
        email: user.email,
    }));
    res.json(formattedUsers);
});

// GET /trips
app.get('/trips', async (req, res) => {
    const trips = await Trip.find();
    const formattedTrips = trips.map(trip => ({
        trip_id: trip._id,
        name: trip.name,
        destination: trip.destination,
        start_date: trip.start_date,
        end_date: trip.end_date,
    }));
    res.json(formattedTrips);
});



// GET /user/:id
app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const formattedUser = {
        user_id: user._id,
        name: user.name,
        email: user.email,
    };
    res.json(formattedUser);
});

// GET /trip/:id
app.get('/trip/:id', async (req, res) => {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId);
    const formattedTrip = {
        trip_id: trip._id,
        name: trip.name,
        destination: trip.destination,
        start_date: trip.start_date,
        end_date: trip.end_date,
    };
    res.json(formattedTrip);
});



// GET /user/:id/travel-buddies
app.get('/user/:id/travel-buddies', async (req, res) => {
    const userId = req.params.id;

    // Find all trips (trip_ids) that the user with the given userId is traveling on
    const userTrips = await UserTrips.find({ user_id: userId });
    const tripIds = userTrips.map((userTrip) => userTrip.trip_id);

    if (tripIds.length === 0) {
        // If the user is not traveling on any trips, return an empty array
        res.json([]);
    } else {
        // Find all other user_ids traveling on the same trips as the given user_id
        const otherUserTrips = await UserTrips.find({ trip_id: { $in: tripIds }, user_id: { $ne: userId } });
        const travelBuddyIds = otherUserTrips.map((userTrip) => userTrip.user_id);

        if (travelBuddyIds.length === 0) {
            // If there are no travel buddies, return an empty array
            res.json([]);
        } else {
            // Find user details for the travel buddies
            res.json(travelBuddyIds);
        }
    }
   
});



// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const mongoose = require('mongoose');

// Define the User table
const userTable = new mongoose.Schema({
    name: String,
    email: String,
});

// Define the Trips table
const tripsTable = new mongoose.Schema({
    name: String,
    destination: String,
    start_date: Date,
    end_date: Date,
});

// Define the UserTrips table with "foreign key" ref
const userTripsTable = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trip_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
});

// Create models from the table
const User = mongoose.model('User', userTable);
const Trip = mongoose.model('Trip', tripsTable);
const UserTrips = mongoose.model('UserTrips', userTripsTable);

module.exports = { User, Trip, UserTrips };

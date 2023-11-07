// populateData.js
const mongoose = require('mongoose');
const { User, Trip, UserTrips } = require('./model'); // Import the Mongoose models

// MongoDB connection URL and options
const dbUrl = 'mongodb://localhost:27017/my-db';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

async function populateData() {
    // Connect to MongoDB
    await mongoose.connect(dbUrl, dbOptions);

    // Clear existing data in the collections
    await User.deleteMany({});
    await Trip.deleteMany({});
    await UserTrips.deleteMany({});

    // Sample data for Users
    const usersData = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
        { name: 'Alice Johnson', email: 'alice@example.com' },
        { name: 'Bob Brown', email: 'bob@example.com' },
        
    ];

    // Sample data for Trips
    const tripsData = [
        { name: 'Trip 1', destination: 'Paris', start_date: new Date('2023-01-01'), end_date: new Date('2023-01-10') },
        { name: 'Trip 2', destination: 'London', start_date: new Date('2023-02-15'), end_date: new Date('2023-02-25') },
        { name: 'Trip 3', destination: 'New York', start_date: new Date('2023-03-10'), end_date: new Date('2023-03-20') },
        { name: 'Trip 4', destination: 'Tokyo', start_date: new Date('2023-04-05'), end_date: new Date('2023-04-15') },
        
    ];

    // Insert Users and get the inserted data
    const users = await User.insertMany(usersData);

    // Insert Trips and get the inserted data
    const trips = await Trip.insertMany(tripsData);

    // Sample data for UserTrips
    const userTripsData = [
        // John Doe goes on Trip 1, 2, and 3
        { user_id: users[0]._id, trip_id: trips[0]._id },
        { user_id: users[0]._id, trip_id: trips[2]._id },
        { user_id: users[0]._id, trip_id: trips[1]._id },

        // Jane Smith goes on Trip 2 and 4
        { user_id: users[1]._id, trip_id: trips[1]._id },
        { user_id: users[1]._id, trip_id: trips[3]._id },

        // Alice Johnson goes on Trip 3 and 4
        { user_id: users[2]._id, trip_id: trips[2]._id },
        { user_id: users[2]._id, trip_id: trips[3]._id },
    ];

  
    await UserTrips.insertMany(userTripsData);

  
    await mongoose.disconnect();
}

// Call the function to insert sample data and clear existing data
populateData().then(() => {
    console.log('Sample data inserted and existing data cleared.');
});

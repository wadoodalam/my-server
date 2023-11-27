const AWS = require('aws-sdk');
require("dotenv").config();

AWS.config.update({
    region: 'us-east-2', 
    accessKeyId: process.env.accessKeyId, // hidden id
    secretAccessKey: process.env.secretAccessKey// hidden key,
});


const dynamodb = new AWS.DynamoDB.DocumentClient();

// Sample data with provided user details
const sampleUsers = [
    {
        user_id: '7f54869a-2d92-4b61-a4a2-888e41ec7c05',
        name: 'John Doe',
        email: 'john@example.com'
    },
    {
        user_id: 'b84c3d20-0071-49b0-b7ca-9e9408ecf676',
        name: 'Jane Smith',
        email: 'jane@example.com'
    },
    {
        user_id: '2f8c8f92-2ad4-463d-9c3a-0b42b693f67e',
        name: 'Alice Johnson',
        email: 'alice@example.com'
    },
    {
        user_id: '87e3eb9d-0e16-4b5c-9ca3-7a19915c9c61',
        name: 'Bob Brown',
        email: 'bob@example.com'
    }
];

// Sample data with provided trip details
const sampleTrips = [
    {
        trip_id: '1e46a591-2384-457c-8ad6-205f31d2d0c5',
        name: 'Summer Beach',
        destination: 'Hawaii',
        start_date: '7/15/23',
        end_date: '7/25/23'
    },
    {
        trip_id: '10dbb512-7e3e-4b75-900b-4c0629eefb7f',
        name: 'Ski Trip',
        destination: 'Colorado',
        start_date: '12/5/23',
        end_date: '12/15/23'
    },
    {
        trip_id: 'd37b0e62-0e41-42b2-b6e5-c537ca363a2c',
        name: 'Europe Tour',
        destination: 'Multiple Cities',
        start_date: '4/1/24',
        end_date: '4/15/24'
    },
    {
        trip_id: '3e164b3e-18b9-4e12-91c9-93505f9d7676',
        name: 'Road Trip',
        destination: 'Route 66 USA',
        start_date: '9/10/23',
        end_date: '9/20/23'
    }
];


const sampleUserTrips = [
    {
        
        user_id: '7f54869a-2d92-4b61-a4a2-888e41ec7c05',
        trip_id: '1e46a591-2384-457c-8ad6-205f31d2d0c5'
        
    },
    {
    
        user_id: '7f54869a-2d92-4b61-a4a2-888e41ec7c05',
        userTrips_id: 'd37b0e62-0e41-42b2-b6e5-c537ca363a2c'
        
    },
    {
     
        user_id: 'b84c3d20-0071-49b0-b7ca-9e9408ecf676',
        trip_id: '1e46a591-2384-457c-8ad6-205f31d2d0c5'
    },
    {
        user_id: 'b84c3d20-0071-49b0-b7ca-9e9408ecf676',
        trip_id: '3e164b3e-18b9-4e12-91c9-93505f9d7676'
    },
    {

        user_id: '2f8c8f92-2ad4-463d-9c3a-0b42b693f67e',
        trip_id: '10dbb512-7e3e-4b75-900b-4c0629eefb7f'
    },
    {
    
        user_id: '2f8c8f92-2ad4-463d-9c3a-0b42b693f67e',
        trip_id: 'd37b0e62-0e41-42b2-b6e5-c537ca363a2c'
    },
    {
        
        user_id: '87e3eb9d-0e16-4b5c-9ca3-7a19915c9c61',
        trip_id: '10dbb512-7e3e-4b75-900b-4c0629eefb7f'
    },
    {
        
        user_id: '87e3eb9d-0e16-4b5c-9ca3-7a19915c9c61',
        trip_id: '3e164b3e-18b9-4e12-91c9-93505f9d7676'
    },
    {
        user_id: '7f54869a-2d92-4b61-a4a2-888e41ec7c05',
        trip_id: '10dbb512-7e3e-4b75-900b-4c0629eefb7f'
        
    },
    {
        
        user_id: 'b84c3d20-0071-49b0-b7ca-9e9408ecf676',
        trip_id: '3e164b3e-18b9-4e12-91c9-93505f9d7676'
        
    }
];


// Insert sample users
sampleUsers.forEach((user) => {
    const params = {
        TableName: 'Users',
        Item: user,
    };

    dynamodb.put(params, (err) => {
        if (err) {
            console.error('Error adding user:', err);
        } else {
            console.log('User added successfully');
        }
    });
});

// Insert sample trips
sampleTrips.forEach((trip) => {
    const params = {
        TableName: 'Trips',
        Item: trip,
    };

    dynamodb.put(params, (err) => {
        if (err) {
            console.error('Error adding trip:', err);
        } else {
            console.log('Trip added successfully');
        }
    });
});

// Insert sample UserTrips
sampleUserTrips.forEach((userTrip) => {
    const params = {
        TableName: 'UserTrips',
        Item: userTrip,
    };

    dynamodb.put(params, (err) => {
        if (err) {
            console.error('Error adding trip:', err);
        } else {
            console.log('UserTrip added successfully');
        }
    });
});


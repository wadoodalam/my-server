const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2', 
    // AKIAXNVZZ3THVCT5B3K5
    accessKeyId: 'AKIAXNVZZ3THVCT5B3K5', // hidden id
    // EHXzi3DP4J8KMF7beNPdQUxZm8zsIMcLmw7oD2Zp
    secretAccessKey: 'EHXzi3DP4J8KMF7beNPdQUxZm8zsIMcLmw7oD2Zp'// hidden key,
});


const dynamodb = new AWS.DynamoDB.DocumentClient();

const sampleUsers = [
    { user_id: '1', name: 'Alice', email: 'alice@example.com' },
    { user_id: '2', name: 'Bob', email: 'bob@example.com' },
    // Add more sample users if needed
];

const sampleTrips = [
    { trip_id: '101', name: 'Trip 1', destination: 'Destination 1', start_date: '2023-01-01', end_date: '2023-01-07' },
    { trip_id: '102', name: 'Trip 2', destination: 'Destination 2', start_date: '2023-02-01', end_date: '2023-02-10' },
    // Add more sample trips if needed
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



const AWS = require('aws-sdk');
require("dotenv").config();

AWS.config.update({
    region: 'us-east-2', 
    accessKeyId: process.env.accessKeyId, // hidden id
    secretAccessKey: process.env.secretAccessKey// hidden key,
});


const dynamodb = new AWS.DynamoDB.DocumentClient();

const insertSampleData = () => {
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
        
    }
];


    const putRequests = [];

    // Add users to putRequests array
    sampleUsers.forEach(user => {
        putRequests.push({
            PutRequest: {
                Item: {
                    PK: 'USER',
                    SK: `USER#${user.user_id}`,
                    Data: user
                }
            }
        });
    });

    // Add trips to putRequests array
    sampleTrips.forEach(trip => {
        putRequests.push({
            PutRequest: {
                Item: {
                    PK: 'TRIP',
                    SK: `TRIP#${trip.trip_id}`,
                    Data: trip
                }
            }
        });
    });

    // Add user-trip associations to putRequests array
    sampleUserTrips.forEach(association => {
        putRequests.push({
            PutRequest: {
                Item: {
                    PK: `USER#${association.user_id}`,
                    SK: `TRIP#${association.trip_id}`,
                    Data: association
                }
            }
        });
    });

    // BatchWrite the items into the table
    const params = {
        RequestItems: {
            'UserTripsSingleTable': putRequests
        }
    };

    dynamodb.batchWrite(params, (err, data) => {
        if (err) {
            console.error('Error inserting sample data:', err);
        } else {
            console.log('Successfully inserted sample data:', data);
        }
    });
};

insertSampleData();



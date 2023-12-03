const AWS = require('aws-sdk');
require("dotenv").config();

AWS.config.update({
    region: 'us-east-2', 
    accessKeyId: process.env.accessKeyId, // hidden id
    secretAccessKey: process.env.secretAccessKey// hidden key,
});


const dynamodb = new AWS.DynamoDB.DocumentClient();

// Sample data with provided user details
const sampleUserTrips = [
    [
    {
        "PK": "USER#7f54869a-2d92-4b61-a4a2-888e41ec7c05",
        "SK": "7f54869a-2d92-4b61-a4a2-888e41ec7c05",
        "Name": "John Doe",
        "Email": "john@example.com"
    },
    {
        "PK": "USER#b84c3d20-0071-49b0-b7ca-9e9408ecf676",
        "SK": "b84c3d20-0071-49b0-b7ca-9e9408ecf676",
        "Name": "Jane Smith",
        "Email": "jane@example.com"
    },
    

    {
        "PK": "TRIP#1e46a591-2384-457c-8ad6-205f31d2d0c5",
        "SK": "1e46a591-2384-457c-8ad6-205f31d2d0c5",
        "TripName": "Summer Beach",
        "Destination": "Hawaii",
        "StartDate": "7/15/23",
        "EndDate": "7/25/23"
    },
    {
        "PK": "TRIP#10dbb512-7e3e-4b75-900b-4c0629eefb7f",
        "SK": "10dbb512-7e3e-4b75-900b-4c0629eefb7f",
        "TripName": "Ski Trip",
        "Destination": "Colorado",
        "StartDate": "12/5/23",
        "EndDate": "12/15/23"
    },
    

    {
        "PK": "USER#7f54869a-2d92-4b61-a4a2-888e41ec7c05",
        "SK": "TRIP#1e46a591-2384-457c-8ad6-205f31d2d0c5",
        "TripName": "Summer Beach",
        "Destination": "Hawaii",
        "StartDate": "7/15/23",
        "EndDate": "7/25/23",
        "UserName": "John Doe",
        "Email": "john@example.com"
    },
    {
        "PK": "USER#7f54869a-2d92-4b61-a4a2-888e41ec7c05",
        "SK": "TRIP#d37b0e62-0e41-42b2-b6e5-c537ca363a2c",
        "TripName": "Europe Tour",
        "Destination": "Multiple Cities",
        "StartDate": "4/1/24",
        "EndDate": "4/15/24",
        "UserName": "John Doe",
        "Email": "john@example.com"
    },
    
    ]
]



// Insert sample data
sampleUserTrips.forEach((user) => {
    const params = {
        TableName: 'UserTripsSingleTable',
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




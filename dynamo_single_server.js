
const express = require('express');
const AWS = require('aws-sdk');
require("dotenv").config();


AWS.config.update({
    region: 'us-east-2', 
    accessKeyId: process.env.accessKeyId, // hidden id
    secretAccessKey: process.env.secretAccessKey// hidden key,
});



const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UserTripsSingleTable';
const router = express();
router.use(express.json());

// GET /users
router.get('/users', fetchAllUsers)
// GET /trips
router.get('/trips', fetchAllTrips)
// GET /user/:id
router.get('/user/:id', fetchUserByID)
// GET /trip/:id
router.get('/TRIP/:id', fetchTripByID)

async function fetchAllUsers (req, res) {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
            ':pk': 'USER'
        }
    };

    try {
        const data = await dynamodb.query(params).promise();
        res.json(data.Items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function fetchAllTrips(req,res){
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
            ':pk': 'TRIP'
        }
    }
    try {
        const data = await dynamodb.query(params).promise();
        res.json(data.Items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function fetchUserByID(req,res){
    const userId = req.params.id;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            PK: 'USER',
            SK: `USER#${userId}`
        }
       
    };
    // using get here instead of query to avoid KeyConditionExpression error
    try {
        const data = await dynamodb.get(params).promise();
        res.json(data.Item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function fetchTripByID(req,res){
    const tripId = req.params.id;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            PK: 'TRIP',
            SK: `TRIP#${tripId}`
        }
       
    };
    // using get here instead of query to avoid KeyConditionExpression error
    try {
        const data = await dynamodb.get(params).promise();
        res.json(data.Item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

router.get('/user/:id/travel-buddies', async (req, res) => {
    const userId = req.params.id;

    try {
        // Get the user's trip IDs
        const userTripParams = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'PK = :pk',
            ExpressionAttributeValues: {
                ':pk': `USER#${userId}`
            }
        };

        const userTripData = await dynamodb.query(userTripParams).promise();
        const userTrips = userTripData.Items.filter(item => item.SK.startsWith('TRIP#'));

        // Get the trip IDs for the user
        const tripIds = userTrips.map(trip => trip.SK.split('#')[1]);
        console.log("Trips for the given user", tripIds);

        // Get users on the same trips as the given user
        try {
            const usersByTrips = await Promise.all(
                tripIds.map(async (tripId) => {
                    const params = {
                        TableName: TABLE_NAME,
                        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
                        ExpressionAttributeValues: {
                            ':pk': 'TRIP',
                            ':sk': `TRIP#${tripId}`
                        }
                    };
                    console.log("Params for batchGet:", params);

                    const result = await dynamodb.query(params).promise();
                    console.log("Users from trips:", result.Items);
                    return result.Items.map(item => item.PK.split('#')[1]); // Retrieve PK as user ID
                })
            );

            const userIDs = usersByTrips.flat();
            console.log("Combined Users from trips:", userIDs);
            res.json({ users: userIDs });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



















// Start the server
const port = 3000;
router.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

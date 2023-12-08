
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
router.get('/trip/:id', fetchTripByID)
// GET /user/:id/travel-buddies
router.get('/user/:id/travel-buddies',fetchTravelBuddies)



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
        const userData = data.Items.map(item => item.Data);
        res.json(userData);
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
        const tripData = data.Items.map(item=>item.Data);
        res.json(tripData);
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
        res.json(data.Item.Data);
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
        res.json(data.Item.Data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function fetchTravelBuddies(req, res){
    const userId = req.params.id;

    try {
        // Get all trip IDs associated with the user
        const params = {
            TableName: 'UserTripsSingleTable',
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': `USER#${userId}`,
                ':sk': 'TRIP#'
            },
            ProjectionExpression: 'SK' // Retrieve trip IDs
        };

        const userTripData = await dynamodb.query(params).promise();
        const tripIds = userTripData.Items.map(item => item.SK.split('#')[1]);

        // Get users associated with the same trips using the GSI
        // need promise.all() b/c multiple trips(multiple queries), promise.all iis used for async
        const travelBuddies = await Promise.all(
            tripIds.map(async tripId => {
                const buddiesParams = {
                    TableName: 'UserTripsSingleTable',
                    IndexName: 'TripIndex', // GSI name
                    // cannot use <> for SK, hence need to remove the given id at the end
                    KeyConditionExpression: 'SK = :sk AND begins_with(PK, :pk)',
                    ExpressionAttributeValues: {
                        ':sk': `TRIP#${tripId}`,
                        ':pk': 'USER#'
                    },
                    ProjectionExpression: 'PK' // Retrieve user IDs
                };

                const buddiesData = await dynamodb.query(buddiesParams).promise();
                // using map with Promise.all returns array of arrays
                // splits the array by # and returns the second part of the array
                return buddiesData.Items.map(item => item.PK.split('#')[1]);
                
            })
        );
        
        // Flatten the nested array and removes the current id
        const flat = travelBuddies.flat().filter(id => id != userId);
        // remove duplicates using Set (as set only takes unique values)
        const uniqueTravelBuddies = [...new Set(flat)]
    
        
        res.json(uniqueTravelBuddies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

















// Start the server
const port = 3000;
router.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

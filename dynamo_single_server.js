
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



// Start the server
const port = 3000;
router.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

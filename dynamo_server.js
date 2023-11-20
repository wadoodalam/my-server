const express = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');


AWS.config.update({
    region: 'us-east-2', 
    // 
    accessKeyId: '', // hidden id
    // 
    secretAccessKey: ''// hidden key,
});



const dynamodb = new AWS.DynamoDB.DocumentClient();
const app = express();
app.use(express.json());

// Example: GET /users
app.get('/users', (req, res) => {
    const params = {
        TableName: 'Users',
    };

    dynamodb.scan(params, (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching users.' });
        } else {
            res.json(data.Items);
        }
    });
});

app.get('/trips', (req, res) => {
    const params = {
        TableName: 'Trips',
    };

    dynamodb.scan(params, (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching users.' });
        } else {
            res.json(data.Items);
        }
    });
});


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

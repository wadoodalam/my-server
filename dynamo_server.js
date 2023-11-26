
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

// GET /users
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
// GET /trips
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

// GET /user/{id}
app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    const params = {
        TableName: 'Users',
        Key: { user_id:  userId  }, // Assuming user_id is of type String (S)
    };

    dynamodb.get(params, function(err, data) {
        if (err) {
          console.log("Error", err);
          res.status(500).json({ error: 'Error fetching specific user.' });
        } else {
          //console.log("Success", data.Item);
          res.json(data.Item);
        }
      });
});

// GET /trip/{id}
app.get('/trip/:id', async (req, res) => {
    const tripID = req.params.id;

    const params = {
        TableName: 'Trips',
        Key: { trip_id:  tripID  }, // Assuming user_id is of type String (S)
    };

    dynamodb.get(params, function(err, data) {
        if (err) {
          console.log("Error", err);
          res.status(500).json({ error: 'Error fetching specific user.' });
        } else {
          //console.log("Success", data.Item);
          res.json(data.Item);
        }
      });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

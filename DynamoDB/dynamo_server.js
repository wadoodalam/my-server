
const express = require('express');
const AWS = require('aws-sdk');
require("dotenv").config();


AWS.config.update({
    region: 'us-east-2', 
    accessKeyId: process.env.accessKeyId, // hidden id
    secretAccessKey: process.env.secretAccessKey// hidden key,
});



const dynamodb = new AWS.DynamoDB.DocumentClient();
const router = express();
router.use(express.json());

// GET /users
router.get('/users', (req, res) => {
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
router.get('/trips', (req, res) => {
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
router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    const params = {
        TableName: 'Users',
        Key: { user_id:  userId  }, 
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
router.get('/trip/:id', fetchTripByID)


async function fetchTripByID(req,res) {
    const tripID = req.params.id;

    const params = {
        TableName: 'Trips',
        Key: { trip_id:  tripID  }, 
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
};




router.get('/user/:id/travel-buddies', async (req, res) => {
    const userId = req.params.id;

    try {
        // Step 1: Get all trips for the given user
        const userTripsParams = {
            TableName: 'UserTrips',
            KeyConditionExpression: 'user_id = :u',
            ExpressionAttributeValues: {
                ':u': userId,
            },
        };

        dynamodb.query(userTripsParams, async (err, userTripsData) => {
            if (err) {
                console.error('Error fetching user trips:', err);
                res.status(500).json({ error: 'Error fetching user trips.' });
            } else {
                try {
                    const tripIds = userTripsData.Items.map((item) => item.trip_id);

                    // Fetch users associated with each trip individually
                    const usersOnTripsData = await Promise.all(
                        tripIds.map(async (tripId) => {
                            const params = {
                                TableName: 'UserTrips',
                                FilterExpression: 'trip_id = :t',
                                ExpressionAttributeValues: {
                                    ':t': tripId,
                                },
                            };
                            try {
                                const result = await dynamodb.scan(params).promise();
                                return result.Items;
                            } catch (error) {
                                console.error('Error querying UserTrips:', error);
                                throw error;
                            }
                        })
                    );

                    // Flatten the array of arrays into a single array of items
                    const usersOnTrips = usersOnTripsData.flat();
                    const travelBuddyIds = usersOnTrips
                        .map((item) => item.user_id)
                        .filter((id) => id !== userId);

                    // Fetch details of travel buddies from the Users table
                    if (travelBuddyIds.length > 0) {
 
                        console.log("user_ids", travelBuddyIds)
                        res.json(travelBuddyIds);
                    } else {
                        res.json([]); // If no travel buddies found
                    }
                } catch (error) {
                    console.error('Error fetching travel buddies data:', error);
                    res.status(500).json({ error: 'Error fetching travel buddies.' });
                }
            }
        });
    } catch (error) {
        console.error('Error fetching travel buddies:', error);
        res.status(500).json({ error: 'Error fetching travel buddies.' });
    }
});










// Start the server
const port = 3000;
router.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

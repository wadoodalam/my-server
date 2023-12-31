const AWS = require('aws-sdk');
require("dotenv").config();

AWS.config.update({
    region: 'us-east-2', 
    accessKeyId: process.env.accessKeyId, // hidden id
    secretAccessKey: process.env.secretAccessKey// hidden key,
});


const dynamodb = new AWS.DynamoDB();



// Used to create tables
const createTable = (tableName, keySchema, attributeDefinitions) => {
    const params = {
        TableName: tableName,
        KeySchema: keySchema,
        AttributeDefinitions: attributeDefinitions,
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    };

    dynamodb.createTable(params, (err, data) => {
        if (err) {
            if (err.code === 'ResourceInUseException') {
                console.log(`Table ${tableName} already exists.`);
            } else {
                console.error(`Error creating table ${tableName}:`, err);
            }
        } else {
            console.log('Created table:', data);
        }
    });
};

// Create Users table
createTable(
    'Users',
    [
        { AttributeName: 'user_id', KeyType: 'HASH' }, // Primary key: user_id
    ],
    [
        { AttributeName: 'user_id', AttributeType: 'S' }, // Attribute definition 

    ]
);

// Create Trips table
createTable(
    'Trips',
    [
        { AttributeName: 'trip_id', KeyType: 'HASH' }, // Primary key: trip_id
    ],
    [
        { AttributeName: 'trip_id', AttributeType: 'S' }, // Attribute definition 
  
    ]
);

// Create UserTrips table (association table)
createTable(
    'UserTrips',
    [
        { AttributeName: 'user_id', KeyType: 'HASH' }, // Partition key: user_id
        { AttributeName: 'trip_id', KeyType: 'RANGE' }, // Sort key: trip_id
    ],
    [
        { AttributeName: 'user_id', AttributeType: 'S' }, // Attribute definition for user_id
        { AttributeName: 'trip_id', AttributeType: 'S' }, // Attribute definition for trip_id
    ]
);


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
        // GSI Added to query using SK(needed for travel buddies)
        GlobalSecondaryIndexes: [
            {
                IndexName: 'TripIndex',
                KeySchema: [
                    { AttributeName: 'SK', KeyType: 'HASH' }, // GSI partition key: trip_id
                    { AttributeName: 'PK', KeyType: 'RANGE' }, // GSI sort key: user_id
                ],
                Projection: {
                    ProjectionType: 'KEYS_ONLY', // Change as needed (ALL, KEYS_ONLY, INCLUDE)
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5,
                },
            },
        ],        
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


createTable(
    'UserTripsSingleTable',
    [
        { AttributeName: 'PK', KeyType: 'HASH' }, // Partition key: user_id
        { AttributeName: 'SK', KeyType: 'RANGE' }, // Sort key: trip_id
    ],
    [
        { AttributeName: 'PK', AttributeType: 'S' }, 
        { AttributeName: 'SK', AttributeType: 'S' }
    ]
);

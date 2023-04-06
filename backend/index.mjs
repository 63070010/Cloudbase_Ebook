import {
    DynamoDBClient,
    ScanCommand,
    PutItemCommand
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from '@aws-sdk/util-dynamodb';

const dynamo = new DynamoDBClient({});

export const handler = async (event) => {
    try {
        switch (event.path) {
            case '/book': {
                return await Books(event);
            }
            case '/user': {
                return await Users(event);
            }
            case 'OPTIONS': { // เพิ่ม options เพื่อทำการ preflight สำหรับ CORS
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        'Content-Type': 'application/json'
                    },
                    body: ''
                }
            }
        }
    }
    catch (err) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ error: err.message })
        };
    }
};

async function Books(event) {
    try {
        const params = {
            TableName: 'book'
        };
        const data = await dynamo.send(new ScanCommand(params));
        const items = data.Items.map((item) => unmarshall(item));
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Unable to get books' })
        };
    }
};

async function Users(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'user'
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => unmarshall(item));
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Unable to get users' })
            };
        }
    }
    else if (event.httpMethod == "POST") {
        try {
            const { id, firstname, lastname } = JSON.parse(event.body);
            const params = {
                TableName: 'user',
                Item: {
                    id: { "S": id },
                    firstname: { "S": firstname },
                    lastname: { "S": lastname }
                }
            };
            await dynamo.send(new PutItemCommand(params));
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: 'Item added to DynamoDB' })
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };

        }
    }
};
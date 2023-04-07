import {
    DynamoDBClient,
    ScanCommand,
    PutItemCommand,
    UpdateItemCommand,
    QueryCommand
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
            case '/cart': {
                return await Carts(event);
            }
            case 'OPTIONS': { // เพิ่ม options เพื่อทำการ preflight สำหรับ CORS
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
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
        const items = data.Items.map((item) => {
            const { eventname, Date, image, penname, monthly, book_id, price, sales, title } = unmarshall(item);
            return {
                eventname,
                image, penname, monthly, book_id, price, sales, title, Date,
                type: item.type ? { SS: item.type.SS } : { SS: [] }
            };
        }); return {
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

async function Carts(event) {
    if (event.httpMethod == "GET") {
        try {
            const id = event.queryStringParameters.id;
            const params = {
                TableName: 'cart',
                KeyConditionExpression: 'id = :id',
                ExpressionAttributeValues: {
                    ':id': { 'N': id }
                }
            };
            const data = await dynamo.send(new QueryCommand(params));

            const items = data.Items.map((item) => {
                return {
                    id: parseInt(item.id.N),
                    price: parseInt(item.price.N),
                    user_id: item.user_id.S,
                    bookshelf: item.bookshelf ? { NS: item.bookshelf.NS } : { NS: [] },
                    cart_item: item.cart_item ? { NS: item.cart_item.NS } : { NS: [] }
                }
            });

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
                body: JSON.stringify({ error: err.message })

            };
        }

    }
    else if (event.httpMethod == "POST") {
        try {
            const { id, bookshelf, price, user_id, cart_item } = JSON.parse(event.body);
            const params = {
                TableName: 'cart',
                Item: {
                    id: { "N": id },
                    bookshelf: { "NS": bookshelf },
                    cart_item: { "NS": cart_item },
                    price: { "N": String(price) }, // แปลงค่า price เป็น string
                    user_id: { "S": user_id }
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

    else if (event.httpMethod == "PUT") {
        try {
            const { id, bookshelf, price, user_id, cart_item } = JSON.parse(event.body);
            const params = {
                TableName: 'cart',
                Key: {
                    id: { "N": id }
                },
                UpdateExpression: "set bookshelf = :bookshelf, cart_item = :cart_item, price = :price, user_id = :user_id",
                ExpressionAttributeValues: {
                    ":bookshelf": { "NS": bookshelf },
                    ":cart_item": { "NS": cart_item },
                    ":price": { "N": String(price) },
                    ":user_id": { "S": user_id }
                },
                ReturnValues: "UPDATED_NEW"
            };
            await dynamo.send(new UpdateItemCommand(params));
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: 'Item updated in DynamoDB' })
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
import {
    DynamoDBClient,
    ScanCommand,
    PutItemCommand,
    UpdateItemCommand,
    QueryCommand
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from '@aws-sdk/util-dynamodb';
import jwt from 'jsonwebtoken';

const dynamo = new DynamoDBClient({});

export const handler = async (event) => {
    try {
        switch (event.path) {
            case '/login': {
                return await Login(event);
            }
            case '/book': {
                return await Books(event);
            }
            case '/user': {
                return await Users(event);
            }
            case '/cart': {
                return await Carts(event);
            }
            case '/detailbook': {
                return await Detailbook(event);
            }
            case '/event': {
                return await events(event);
            }
            case '/item': {
                return await Item(event);
            }
            case '/search': {
                return await Search(event);
            };
            case '/getevent': {
                return await Getevent(event)
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


async function Login(event) {
    const { password, username } = JSON.parse(event.body);
    const TABLE_NAME = 'test'; // ชื่อตารางที่เก็บข้อมูลผู้ใช้งาน
    const JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MTEwNzcyMiwiaWF0IjoxNjgxMTA3NzIyfQ.4qRym_hhXciVkH8FV10fHupG3T3lyQi8oCFPX9UihcY';
    try {
        // ค้นหาผู้ใช้งานจาก DynamoDB
        const params = {
            TableName: TABLE_NAME,
            FilterExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': { S: username },
            },
        };
        const data = await dynamo.send(new ScanCommand(params));
        const users = data.Items.map((item) => unmarshall(item));

        // ตรวจสอบชื่อผู้ใช้และรหัสผ่าน
        const user = users.find((u) => u.password === password);
        if (user) {
            // สร้าง token ให้กับผู้ใช้งาน
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

            // ส่งข้อมูล token กลับไปยังผู้ใช้งาน
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(token),
            };
        } else {
            // ถ้าชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({ message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: {
                    message: error.message,
                    username: username.message,
                    password: password.message
                }
            })
        }
    }

}

async function Books(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'book',
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { Date, image, penname, monthly, book_id, price, sales, title, point } = unmarshall(item);
                return {

                    image, penname, monthly, book_id, price, sales, title, Date, point,
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
                body: JSON.stringify({ error: err.message })
            };
        }
    }
    else {
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



async function Detailbook(event) {
    if (event.httpMethod == "GET") {
        try {
            const book_id = event.queryStringParameters.book_id;
            const params = {
                TableName: 'book',
                KeyConditionExpression: 'book_id = :book_id',
                ExpressionAttributeValues: {
                    ':book_id': { 'N': book_id }
                }
            };
            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { Date, image, penname, monthly, book_id, price, title, desc, sales, point } = unmarshall(item);
                return {

                    image, penname, monthly, book_id, price, sales, title, Date, desc, point,
                    type: item.type ? { SS: item.type.SS } : { SS: [] },
                    review: item.review ? { SS: item.review.SS } : { SS: [] },
                    review_user: item.review_user ? { NS: review_user } : { NS: [] }
                };

            }

            );


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
    else if (event.httpMethod == "PUT") {
        try {
            const { book_id, review, review_user } = JSON.parse(event.body);
            const params = {
                TableName: 'book',
                Key: {
                    book_id: { "N": String(book_id) }
                },
                UpdateExpression: "set review = :review, review_user = :review_user",
                ExpressionAttributeValues: {
                    ":review": { "SS": review },
                    ":review_user": { "NS": review_user },
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
}


async function Users(event) {
    if (event.httpMethod == "GET") {
        try {
            const id = event.queryStringParameters.id;
            const params = {
                TableName: 'user',
                KeyConditionExpression: 'id = :id',
                ExpressionAttributeValues: {
                    ':id': { 'S': id }
                }
            };
            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { id, email,
                    gender,
                    password,
                    phone,
                    point,
                    username, receiving_money, profile } = unmarshall(item);
                return {
                    id,
                    email,
                    gender,
                    password,
                    phone,
                    point,
                    username,
                    receiving_money,
                    profile,
                    rev_book: item.rev_book ? { NS: item.rev_book.NS } : { NS: [] },
                    item_count: item.item_count ? { NS: item.item_count.NS } : { NS: [] },
                    fav_Book: item.fav_Book ? { NS: item.fav_Book.NS } : { NS: [] }
                };
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
            const { id, email,
                gender,
                password,
                phone,
                point,
                username, receiving_money, profile, rev_book, item_count, fav_Book } = JSON.parse(event.body);
            const params = {
                TableName: 'user',
                Item: {
                    id: { "S": id },
                    email: { "S": email },
                    gender: { "S": gender },
                    password: { "S": password },
                    phone: { "N": phone },
                    point: { "N": point },
                    username: { "S": username },
                    receiving_money: { "S": receiving_money },
                    profile: { "S": profile },
                    rev_book: { "NS": rev_book },
                    item_count: { "NS": item_count },
                    fav_Book: { "NS": fav_Book }
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
            const { id, email, gender, password, phone, username, receiving_money, profile, point } = JSON.parse(event.body);
            const params = {
                TableName: 'user',
                Key: {
                    id: { "S": id }
                },
                UpdateExpression: "set email = :email, gender = :gender, password = :password, phone = :phone, username = :username, receiving_money = :receiving_money, profile = :profile, point = :point",
                ExpressionAttributeValues: {
                    "email": { "S": email },
                    "gender": { "S": gender },
                    "password": { "S": password },
                    "phone": { "N": phone },
                    "username": { "S": username },
                    "receiving_money": { "S": receiving_money },
                    "profile": { "S": profile },
                    "point": { "N": point },
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


async function events(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'event'
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { event_id, desc, image, title } = unmarshall(item);
                return {
                    event_id,
                    image, desc, title,
                    book_id: item.book_id ? { NS: item.book_id.NS } : { NS: [] },

                };
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

    else {
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


async function Item(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'item'
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { item_id, desc, image, title, point, type, status } = unmarshall(item);
                return {
                    item_id,
                    image, desc, title, point, type, status,
                    book_id: item.book_id ? { NS: item.book_id.NS } : { NS: [] },

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
                body: JSON.stringify({ error: err.message })
            };
        }
    }
    else {
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


async function Search(event) {
    if (event.httpMethod == "GET") {
        if (event.queryStringParameters.title) {
            try {
                const title = event.queryStringParameters.title;

                const params = {
                    TableName: "book",
                    FilterExpression: "begins_with(title, :title)",
                    ExpressionAttributeValues: {
                        ":title": { S: title }
                    }
                };

                const data = await dynamo.send(new ScanCommand(params));
                const items = data.Items.map((item) => {
                    const { Date, image, penname, monthly, book_id, price, sales, title } = unmarshall(item);
                    return {

                        image, penname, monthly, book_id, price, sales, title, Date,
                        type: item.type ? { SS: item.type.SS } : { SS: [] }
                    };
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

        else if (event.queryStringParameters.penname) {
            try {
                const penname = event.queryStringParameters.penname;

                const params = {
                    TableName: "book",
                    FilterExpression: "begins_with(penname, :penname)",
                    ExpressionAttributeValues: {
                        ":penname": { S: penname }
                    }
                };

                const data = await dynamo.send(new ScanCommand(params));
                const items = data.Items.map((item) => {
                    const { Date, image, penname, monthly, book_id, price, sales, title } = unmarshall(item);
                    return {

                        image, penname, monthly, book_id, price, sales, title, Date,
                        type: item.type ? { SS: item.type.SS } : { SS: [] }
                    };
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
        else if (event.queryStringParameters.type) {
            try {
                const type = event.queryStringParameters.type;

                const params = {
                    TableName: "book",
                    FilterExpression: "contains(#t, :type)",
                    ExpressionAttributeNames: {
                        "#t": "type"
                    },
                    ExpressionAttributeValues: {
                        ":type": { "S": type }
                    }
                };

                const data = await dynamo.send(new ScanCommand(params));
                const items = data.Items.map((item) => {
                    const { Date, image, penname, monthly, book_id, price, sales, title } = unmarshall(item);
                    return {

                        image, penname, monthly, book_id, price, sales, title, Date,
                        type: item.type ? { SS: item.type.SS } : { SS: [] }
                    };
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
        else if (event.queryStringParameters.monthly) {
            try {
                const params = {
                    TableName: 'book',
                    FilterExpression: 'monthly = :monthly',
                    ExpressionAttributeValues: {
                        ':monthly': { BOOL: true }
                    }
                };
                const data = await dynamo.send(new ScanCommand(params));
                const items = data.Items.map((item) => {
                    const { Date, image, penname, monthly, book_id, price, sales, title, point } = unmarshall(item);
                    return {

                        image, penname, monthly, book_id, price, sales, title, Date, point,
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
                    body: JSON.stringify({ error: err.message })
                };
            }
        }
    }
    else {
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




async function Getevent(event) {
    if (event.httpMethod == "GET") {
        try {
            const event_id = event.queryStringParameters.event_id;
            const params = {
                TableName: "event",
                KeyConditionExpression: 'event_id = :event_id',
                ExpressionAttributeValues: {
                    ':event_id': { 'N': event_id }
                }
            };

            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { event_id, desc, image, title } = unmarshall(item);
                return {
                    event_id,
                    image, desc, title,
                    book_id: item.book_id ? { NS: item.book_id.NS } : { NS: [] },

                };
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
    else {
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
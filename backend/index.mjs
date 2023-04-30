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
            case '/alluser': {
                return await Alluser();
            };
            case '/fav': {
                return await Fav(event);
            };
            case '/monthly': {
                return await Monthly(event);
            };
            case '/ban': {
                return await Ban(event);
            };
            case '/checkout': {
                return await Checkout(event);
            };
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
    const TABLE_NAME = 'user'; // ชื่อตารางที่เก็บข้อมูลผู้ใช้งาน
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
            const payload = { username, id: user.id }; // ประกาศ object payload ที่จะเก็บข้อมูลใน token
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // เพิ่ม payload เข้าไปใน token

            // ส่งข้อมูล token กลับไปยังผู้ใช้งาน
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, id: user.id }),
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
                const { Date, image, penname, status, book_id, price, sales, title, point } = unmarshall(item);
                return {

                    image, penname, status, book_id, price, sales, title, Date, point,
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
    else if (event.httpMethod == "POST") {
        try {
            const {
                title,
                type,
                price, point, penname, Date, desc
                , image, story, id } = JSON.parse(event.body);

            const paramsgetid = {
                TableName: 'book'
            };
            const data = await dynamo.send(new ScanCommand(paramsgetid));
            const items = data.Items.map((item) => {
                const { book_id } = unmarshall(item);
                return {
                    book_id,

                };
            });
            const book_id = Math.max(...items.map(item => item.book_id)) + 1;

            const params = {
                TableName: 'book',
                Item: {
                    book_id: { "N": String(book_id) },
                    title: { "S": title },
                    type: { "SS": type },
                    price: { "N": String(price) },
                    point: { "N": String(point) },
                    penname: { "S": penname },
                    Date: { "S": Date },
                    desc: { "S": desc },
                    image: { "S": image },
                    status: { "BOOL": true },
                    review: { "SS": [''] },
                    review_user: { "SS": [''] },
                    sales: { "N": '0' },
                    story: { "S": story },

                }
            };
            const paramsgetuserid = {
                TableName: 'user'
            };
            const datauser = await dynamo.send(new ScanCommand(paramsgetuserid));
            const itemsuser = datauser.Items.map((item) => {
                return {
                    mybook: item.mybook ? { NS: item.mybook.NS } : { NS: [] },

                };
            });
            const mybook = itemsuser[0].mybook.NS;
            mybook.push(String(book_id));
            const paramsuser = {
                TableName: 'user',
                Key: {
                    id: { "S": id }
                },
                UpdateExpression: "set mybook = :mybook",
                ExpressionAttributeValues: {
                    ":mybook": { "NS": mybook },
                },
                ReturnValues: "UPDATED_NEW"
            };
            await dynamo.send(new UpdateItemCommand(paramsuser));
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
                const { Date, image, penname, status, book_id, price, title, desc, sales, point, story } = unmarshall(item);
                return {

                    image, penname, status, book_id, price, sales, title, Date, desc, point, story,
                    type: item.type ? { SS: item.type.SS } : { SS: [] },
                    review: item.review ? { SS: item.review.SS } : { SS: [] },
                    review_user: item.review_user ? { SS: item.review_user.SS } : { SS: [] }
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
            const { book_id, review, review_user, rev_book, id } = JSON.parse(event.body);
            const params = {
                TableName: 'book',
                Key: {
                    book_id: { "N": String(book_id) }
                },
                UpdateExpression: "set review = :review, review_user = :review_user",
                ExpressionAttributeValues: {
                    ":review": { "SS": review },
                    ":review_user": { "SS": review_user },
                },
                ReturnValues: "UPDATED_NEW"
            };
            const paramsuser = {
                TableName: 'user',
                Key: {
                    id: { "S": id }
                },
                UpdateExpression: "set rev_book = :rev_book",
                ExpressionAttributeValues: {
                    ":rev_book": { "NS": rev_book },
                },
                ReturnValues: "UPDATED_NEW"
            };
            await dynamo.send(new UpdateItemCommand(params));
            await dynamo.send(new UpdateItemCommand(paramsuser));

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
                    username, receiving_money, profile, } = unmarshall(item);
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
                    mybook: item.mybook ? { NS: item.mybook.NS } : { NS: [] },
                    rev_book: item.rev_book ? { NS: item.rev_book.NS } : { NS: [] },
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
            const {
                email,
                password,
                username, } = JSON.parse(event.body);

            const paramsgetid = {
                TableName: 'cart'
            };
            const data = await dynamo.send(new ScanCommand(paramsgetid));
            const items = data.Items.map((item) => {
                const { id } = unmarshall(item);
                return {
                    id,

                };
            });
            const id = Math.max(...items.map(item => item.id)) + 1;

            const params = {
                TableName: 'user',
                Item: {
                    id: { "S": String(id) },
                    email: { "S": email },
                    gender: { "S": 'ไม่ระบุ' },
                    password: { "S": password },
                    phone: { "S": "" },
                    point: { "N": "0" },
                    username: { "S": username },
                    receiving_money: { "S": '' },
                    profile: { "S": '' },
                    rev_book: { "NS": ["0"] },
                    fav_Book: { "NS": ["0"] },
                    mybook: { "NS": ["0"] }
                }
            };

            const paramscart = {
                TableName: 'cart',
                Item: {
                    id: { 'N': String(id) },
                    bookshelf: { 'NS': ["0"] },
                    price: { 'N': "0" },
                    user_id: { 'S': String(id) },
                    cart_item: { 'NS': ["0"] },
                    point: { 'N': "0" }
                }
            };


            await dynamo.send(new PutItemCommand(params));
            await dynamo.send(new PutItemCommand(paramscart));
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
                    "phone": { "S": phone },
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
                    point: parseInt(item.point.N),
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

    else if (event.httpMethod == "PUT") {
        try {
            const { id, bookshelf, price, user_id, cart_item, point } = JSON.parse(event.body);
            const params = {
                TableName: 'cart',
                Key: {
                    id: { "N": id }
                },
                UpdateExpression: "set bookshelf = :bookshelf, cart_item = :cart_item, price = :price, user_id = :user_id, point = :point",
                ExpressionAttributeValues: {
                    ":bookshelf": { "NS": bookshelf },
                    ":cart_item": { "NS": cart_item },
                    ":price": { "N": String(price) },
                    ":user_id": { "S": user_id },
                    ":point": { "N": String(point) }
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
                const { item_id, desc, image, title, point, status } = unmarshall(item);
                return {
                    item_id,
                    image, desc, title, point, status,
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
    else if (event.httpMethod == "POST") {
        try {
            const {
                title, desc, image, point, } = JSON.parse(event.body);

            const paramsgetid = {
                TableName: 'item'
            };
            const data = await dynamo.send(new ScanCommand(paramsgetid));
            const items = data.Items.map((item) => {
                const { item_id } = unmarshall(item);
                return {
                    item_id,

                };
            });
            const item_id = Math.max(...items.map(item => item.item_id)) + 1;

            const params = {
                TableName: 'item',
                Item: {
                    item_id: { "N": String(item_id) },
                    title: { "S": title },
                    desc: { "S": desc },
                    image: { "S": image },
                    point: { "S": String(point) },
                    status: { "BOOL": false }
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
                    const { Date, image, penname, status, book_id, price, sales, title } = unmarshall(item);
                    return {

                        image, penname, status, book_id, price, sales, title, Date,
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
                    const { Date, image, penname, status, book_id, price, sales, title } = unmarshall(item);
                    return {

                        image, penname, status, book_id, price, sales, title, Date,
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
                    const { Date, image, penname, status, book_id, price, sales, title } = unmarshall(item);
                    return {

                        image, penname, status, book_id, price, sales, title, Date,
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
    else if (event.httpMethod == "POST") {
        try {
            const {
                book_id, desc, image, title, } = JSON.parse(event.body);

            const paramsgetid = {
                TableName: 'event'
            };
            const data = await dynamo.send(new ScanCommand(paramsgetid));
            const items = data.Items.map((item) => {
                const { event_id } = unmarshall(item);
                return {
                    event_id,

                };
            });
            const event_id = Math.max(...items.map(item => item.event_id)) + 1;

            const params = {
                TableName: 'event',
                Item: {
                    event_id: { "N": String(event_id) },
                    book_id: { "NS": book_id },
                    desc: { "S": desc },
                    image: { "S": image },
                    title: { "S": title },
                    status: { "BOOL": false }
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

async function Alluser() {
    try {
        const params = {
            TableName: 'user',
        };
        const data = await dynamo.send(new ScanCommand(params));
        const items = data.Items.map((item) => {
            const { id,
                username, profile } = unmarshall(item);
            return {
                id,
                username,
                profile,
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

async function Fav(event) {
    try {
        const { id, fav_Book } = JSON.parse(event.body);
        const paramsuser = {
            TableName: 'user',
            Key: {
                id: { "S": id }
            },
            UpdateExpression: "set fav_Book = :fav_Book",
            ExpressionAttributeValues: {
                ":fav_Book": { "NS": fav_Book },
            },
            ReturnValues: "UPDATED_NEW"
        };
        await dynamo.send(new UpdateItemCommand(paramsuser));
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
async function Monthly(event) {
    if (event.httpMethod == "POST") {

        try {
            const { dateend, datestart, Monthlybook, } = JSON.parse(event.body);

            const paramsgetid = {
                TableName: 'Monthly'
            };
            const data = await dynamo.send(new ScanCommand(paramsgetid));
            const items = data.Items.map((item) => {
                const { id } = unmarshall(item);
                return { id, };
            });
            const id = Math.max(...items.map(item => item.id)) + 1;

            const params = {
                TableName: 'Monthly',
                Item: {
                    id: { "N": String(id) },
                    Monthlybook: { "NS": Monthlybook },
                    dateend: { "S": dateend },
                    datestart: { "S": datestart },
                    userlist: { "NS": ['0'] }
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
    else if (event.httpMethod == "GET") {
        try {

            const paramsgetid = {
                TableName: 'Monthly'
            };
            const check = await dynamo.send(new ScanCommand(paramsgetid));
            const itemscheck = check.Items.map((item) => {
                const { id } = unmarshall(item);
                return { id, };
            });
            const id = Math.max(...itemscheck.map(item => item.id));

            const params = {
                TableName: 'Monthly',
                KeyConditionExpression: 'id = :id',
                ExpressionAttributeValues: {
                    ':id': { 'N': String(id) }
                }
            }
            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { id, dateend, datestart } = unmarshall(item);
                return {
                    id, dateend, datestart,
                    Monthlybook: item.Monthlybook ? { NS: item.Monthlybook.NS } : { NS: [] },
                    userlist: item.userlist ? { NS: item.userlist.NS } : { NS: [] }
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
    else if (event.httpMethod == "PUT") {
        try {
            const { id, userlist } = JSON.parse(event.body);
            const params = {
                TableName: 'Monthly',
                Key: {
                    id: { "N": id }
                },
                UpdateExpression: "set userlist = :userlist",
                ExpressionAttributeValues: {
                    ":userlist": { "NS": userlist },
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
async function Ban(event) {
    try {
        const { book_id, status } = JSON.parse(event.body);
        const params = {
            TableName: 'user',
            Key: {
                book_id: { "N": book_id }
            },
            UpdateExpression: "set status = :status",
            ExpressionAttributeValues: {
                ":status": { "BOOL": status },
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

async function Checkout(event) {
    try {
        const { id, bookshelf, cart_item, point, price } = JSON.parse(event.body);
        const params = {
            TableName: 'cart',
            Key: {
                id: { "N": id }
            },
            UpdateExpression: "set bookshelf = :bookshelf, cart_item = :cart_item,  price = :price, point = :point",
            ExpressionAttributeValues: {
                ":bookshelf": { "NS": bookshelf },
                ":cart_item": { "NS": cart_item },
                ":point": { "N": "0" },
                ":price": { "N": String(price) },
            },
            ReturnValues: "UPDATED_NEW"
        };

        const paramsgetuser = {
            TableName: 'user',
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': { 'S': String(id) }
            }
        };

        const data = await dynamo.send(new QueryCommand(paramsgetuser));

        const items = data.Items.map((item) => {
            const { point } = unmarshall(item);
            return {
                point
            };
        })

        const pointtotal = items[0].point + point;

        const paramsuser = {
            TableName: 'user',
            Key: {
                id: {
                    "S": String(id)
                }
            },
            UpdateExpression: "set point = :point",
            ExpressionAttributeValues: {
                ":point": { "N": String(pointtotal) },
            },
            ReturnValues: "UPDATED_NEW"
        };



        await dynamo.send(new UpdateItemCommand(params));
        await dynamo.send(new UpdateItemCommand(paramsuser));
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
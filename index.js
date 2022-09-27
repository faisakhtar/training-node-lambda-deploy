const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function itemParams(queryId) {
    return {
        TableName: 'animals',
        Key: {
            id: queryId
        }
    }
}

async function getItem(queryId) {
    try {
        const data = await docClient.get(itemParams(queryId)).promise()
        return data
    } catch (err) {
        return err
    }
}

function allParams() {
    return {
        TableName: 'animals',
    }
}

async function getAll() {
    try {
        const data = await docClient.scan(allParams()).promise()
        return data
    } catch (err) {
        return err
    }
}



exports.handler = async (event, context) => {
    var queryId = event.pathParameters.id;
    var data = null;
    try {
        if (queryId == "all") {
            data = await getAll();
        } else {
            data = await getItem(queryId);
        }
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(data)
        }
    } catch (err) {
        return { error: err }
    }
}
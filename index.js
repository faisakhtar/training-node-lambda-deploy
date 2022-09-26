const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'animals',
}

async function getItem(){
  try {
    const data = await docClient.scan(params).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await getItem()
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
}
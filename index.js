const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function params (queryId)
{
    return {
      TableName : 'animals',
      Key: {
        id: queryId
      }
    }

}

async function getItem(queryId){
  try {
    const data = await docClient.get(params(queryId)).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  var queryId = event.pathParameters.id;
  try {
    const data = await getItem(queryId)
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
}
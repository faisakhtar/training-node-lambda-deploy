exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda Faisal, how are you today?'),
    };
    return response;
};

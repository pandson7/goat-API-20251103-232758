const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');
const qr = require('qr-image');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  try {
    const productId = event.pathParameters?.id;
    
    if (!productId) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Product ID is required' }),
      };
    }

    // Check if product exists
    const command = new GetCommand({
      TableName: process.env.PRODUCTS_TABLE_NAME,
      Key: { id: productId },
    });

    const result = await docClient.send(command);

    if (!result.Item) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Product not found' }),
      };
    }

    // Generate QR code for product URL
    const productUrl = `https://nsn6itxkf4.execute-api.us-east-1.amazonaws.com/prod/api/products/${productId}`;
    const qrCodeBuffer = qr.imageSync(productUrl, { type: 'png', size: 10 });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key',
      },
      body: qrCodeBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error generating QR code:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to generate QR code' }),
    };
  }
};

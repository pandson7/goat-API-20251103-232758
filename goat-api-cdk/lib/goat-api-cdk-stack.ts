import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as path from 'path';

export class GoatApiStack232758 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB table for products
    const productsTable = new dynamodb.Table(this, 'ProductsTable232758', {
      tableName: 'products-232758',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Enable auto scaling
    productsTable.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    });

    productsTable.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    });

    // Lambda function for getting all products
    const getAllProductsFunction = new lambda.Function(this, 'GetAllProductsFunction232758', {
      functionName: 'get-all-products-232758',
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'getAllProducts.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        PRODUCTS_TABLE_NAME: productsTable.tableName,
      },
    });

    // Lambda function for getting single product
    const getProductFunction = new lambda.Function(this, 'GetProductFunction232758', {
      functionName: 'get-product-232758',
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'getProduct.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        PRODUCTS_TABLE_NAME: productsTable.tableName,
      },
    });

    // Lambda function for QR code generation
    const getQRCodeFunction = new lambda.Function(this, 'GetQRCodeFunction232758', {
      functionName: 'get-qr-code-232758',
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'getQRCode.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        PRODUCTS_TABLE_NAME: productsTable.tableName,
        API_BASE_URL: 'https://api.example.com', // Will be updated after deployment
      },
      timeout: cdk.Duration.seconds(30),
    });

    // Grant DynamoDB permissions to Lambda functions
    productsTable.grantReadData(getAllProductsFunction);
    productsTable.grantReadData(getProductFunction);
    productsTable.grantReadData(getQRCodeFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, 'ProductsApi232758', {
      restApiName: 'products-api-232758',
      description: 'API for product specifications with QR code generation',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
      },
    });

    // API resources and methods
    const apiResource = api.root.addResource('api');
    const productsResource = apiResource.addResource('products');

    // GET /api/products
    productsResource.addMethod('GET', new apigateway.LambdaIntegration(getAllProductsFunction));

    // GET /api/products/{id}
    const productResource = productsResource.addResource('{id}');
    productResource.addMethod('GET', new apigateway.LambdaIntegration(getProductFunction));

    // GET /api/products/{id}/qrcode
    const qrcodeResource = productResource.addResource('qrcode');
    qrcodeResource.addMethod('GET', new apigateway.LambdaIntegration(getQRCodeFunction));

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
    });

    new cdk.CfnOutput(this, 'ProductsTableName', {
      value: productsTable.tableName,
      description: 'DynamoDB Products Table Name',
    });
  }
}

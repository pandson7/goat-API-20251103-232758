# Goat API - AWS Architecture Diagrams

This directory contains AWS architecture diagrams generated for the goat-API project based on the technical design specification.

## Generated Diagrams

### 1. Basic Architecture Overview
**File:** `goat-api-architecture.png`
- Shows the high-level serverless architecture
- Components: API Client → API Gateway → Lambda Functions → DynamoDB
- Demonstrates the three main Lambda functions for different endpoints

### 2. Detailed Data Flow
**File:** `goat-api-detailed-flow.png`
- Comprehensive view of the system with detailed data flow
- Shows multiple client types (Web, Mobile)
- Includes specific endpoint mappings
- Highlights the QR code generation process with external library dependency

### 3. CDK Deployment Architecture
**File:** `goat-api-cdk-deployment.png`
- Infrastructure-as-Code perspective using AWS CDK
- Shows deployment relationships and IAM roles
- Demonstrates how CDK manages all AWS resources
- Includes security aspects with Lambda execution roles

## Architecture Summary

The goat-API follows a serverless three-tier architecture:

1. **API Layer**: AWS API Gateway handles HTTP routing and request/response
2. **Compute Layer**: AWS Lambda functions provide serverless compute for business logic
3. **Data Layer**: DynamoDB provides NoSQL storage for product data

### Key Features
- **Serverless**: No server management required
- **Scalable**: Auto-scaling based on demand
- **Cost-effective**: Pay-per-use pricing model
- **QR Code Generation**: Built-in QR code generation for product URLs
- **Flexible Schema**: DynamoDB supports varied product attributes

### API Endpoints
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `GET /api/products/{id}/qrcode` - Generate QR code for product

### Technology Stack
- **Runtime**: Node.js
- **Infrastructure**: AWS CDK
- **Database**: DynamoDB (on-demand billing)
- **QR Generation**: qr-image Node.js library
- **Security**: IAM roles with minimal permissions

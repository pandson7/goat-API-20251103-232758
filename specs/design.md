# Technical Design Document

## Architecture Overview

The goat-API is a serverless REST API built on AWS using Node.js runtime. The system leverages AWS Lambda for compute, API Gateway for HTTP routing, and DynamoDB for data persistence. The architecture follows a simple three-tier pattern optimized for scalability and cost-effectiveness.

## System Components

### API Layer
- **AWS API Gateway**: HTTP endpoint routing and request/response handling
- **Lambda Functions**: Serverless compute for business logic
- **Node.js Runtime**: JavaScript execution environment

### Data Layer
- **DynamoDB**: NoSQL database for product data storage
- **Flexible Schema**: JSON documents supporting varied product attributes
- **Primary Key**: Product ID for efficient lookups

### QR Code Service
- **QR Code Library**: Node.js qr-image library for QR generation
- **PNG Output**: Image format for QR codes
- **URL Encoding**: Product detail API endpoints embedded in QR codes

## API Endpoints

### Product Management
```
GET /api/products
- Returns: Array of all products
- Response: 200 OK with JSON array

GET /api/products/{id}
- Returns: Single product details
- Response: 200 OK with JSON object or 404 Not Found
```

### QR Code Generation
```
GET /api/products/{id}/qrcode
- Returns: PNG image of QR code
- Content-Type: image/png
- QR Content: URL to product details endpoint
```

## Data Model

### Product Schema
```json
{
  "id": "string (primary key)",
  "name": "string",
  "category": "string", 
  "brand": "string",
  "description": "string",
  "price": "number",
  "specifications": {
    "flexible": "object for custom attributes"
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Sample Data Structure
- Electronics products with varied specifications
- Consumer goods with different attribute sets
- Demonstration of flexible schema capabilities

## Infrastructure Design

### AWS CDK Stack
- **Lambda Functions**: API handlers for each endpoint
- **API Gateway**: REST API configuration
- **DynamoDB Table**: Product data storage with on-demand billing
- **IAM Roles**: Minimal permissions for Lambda execution

### Deployment Strategy
- Single CDK stack deployment
- Environment-specific configurations
- Local development support

## Security Considerations

### Access Control
- API Gateway throttling for rate limiting
- Lambda execution roles with minimal DynamoDB permissions
- No authentication required for prototype

### Data Validation
- Input validation for product IDs
- Error handling for malformed requests
- Graceful degradation for service failures

## Performance Considerations

### DynamoDB Optimization
- Single table design for simple queries
- On-demand billing for cost optimization
- Efficient key-based lookups

### Lambda Configuration
- Appropriate memory allocation for QR generation
- Cold start optimization through minimal dependencies
- Error handling and retry logic

## QR Code Implementation

### Library Selection
- qr-image: Lightweight Node.js QR code generator
- PNG output format for broad compatibility
- Configurable size and error correction

### URL Structure
```
https://api-domain/api/products/{id}
```

### Error Handling
- Invalid product ID validation
- QR generation failure responses
- Proper HTTP status codes

## Development Workflow

### Local Testing
- Local DynamoDB setup for development
- Environment variable configuration
- Unit testing for core functions

### Deployment Process
- CDK synthesis and deployment
- Database initialization with sample data
- API endpoint verification

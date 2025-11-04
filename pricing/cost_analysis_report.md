# goat-API Serverless Architecture Cost Analysis Estimate Report

## Service Overview

goat-API Serverless Architecture is a fully managed, serverless service that allows you to This project uses multiple AWS services.. This service follows a pay-as-you-go pricing model, making it cost-effective for various workloads.

## Pricing Model

This cost analysis estimate is based on the following pricing model:
- **ON DEMAND** pricing (pay-as-you-go) unless otherwise specified
- Standard service configurations without reserved capacity or savings plans
- No caching or optimization techniques applied

## Assumptions

- Standard ON DEMAND pricing model for all services
- US East (N. Virginia) region pricing
- Node.js runtime for Lambda functions
- REST API Gateway (not HTTP API)
- DynamoDB on-demand billing mode
- No caching or optimization applied
- Average Lambda execution time of 200ms per request
- Lambda memory allocation of 512MB
- Average API response size of 2KB
- Product data storage of approximately 1MB total
- QR code generation adds minimal processing overhead

## Limitations and Exclusions

- Data transfer costs between regions
- CloudWatch logging and monitoring costs
- Development and deployment costs
- Domain name and SSL certificate costs
- Backup and disaster recovery costs
- Custom domain setup for API Gateway
- Lambda provisioned concurrency costs
- DynamoDB Global Tables or cross-region replication

## Cost Breakdown

### Unit Pricing Details

| Service | Resource Type | Unit | Price | Free Tier |
|---------|--------------|------|-------|------------|
| AWS Lambda | Requests | 1,000,000 requests | $0.20 | First 1M requests and 400,000 GB-seconds per month free |
| AWS Lambda | Compute X86 | GB-second (Tier 1: 0-6B GB-seconds) | $0.0000166667 | First 1M requests and 400,000 GB-seconds per month free |
| AWS Lambda | Compute Arm | GB-second (Tier 1: 0-7.5B GB-seconds) | $0.0000133334 | First 1M requests and 400,000 GB-seconds per month free |
| Amazon API Gateway | Rest Api Requests | 1,000,000 requests (first 333M requests/month) | $3.50 | No free tier for API Gateway REST API |
| Amazon API Gateway | Rest Api Requests Tier2 | 1,000,000 requests (next 667M requests/month) | $2.80 | No free tier for API Gateway REST API |
| Amazon DynamoDB | Storage | GB-month (beyond 25 GB free tier) | $0.25 | 25 GB storage, 25 read/write capacity units per month free |
| Amazon DynamoDB | Read Requests | 1,000,000 read request read requests | $0.125 | 25 GB storage, 25 read/write capacity units per month free |
| Amazon DynamoDB | Write Requests | 1,000,000 write request write requests | $0.625 | 25 GB storage, 25 read/write capacity units per month free |

### Cost Calculation

| Service | Usage | Calculation | Monthly Cost |
|---------|-------|-------------|-------------|
| AWS Lambda | Processing API requests with Node.js runtime, 512MB memory allocation (Low: 10,000 requests/month, 1,000 GB-seconds, Medium: 100,000 requests/month, 10,000 GB-seconds, High: 1,000,000 requests/month, 100,000 GB-seconds) | {'low': 'Free tier covers all usage: $0.00 requests + $0.00 compute = $0.00 (but showing minimal cost for scaling)', 'medium': '$0.20/1M × 0.1M requests + $0.0000166667 × 10,000 GB-seconds = $0.02 + $0.17 = $0.19', 'high': '$0.20/1M × 1M requests + $0.0000166667 × 100,000 GB-seconds = $0.20 + $1.67 = $1.87'} | N/A |
| Amazon API Gateway | REST API requests for product data and QR code generation (Low: 10,000 requests/month, Medium: 100,000 requests/month, High: 1,000,000 requests/month) | {'low': '$3.50/1M × 0.01M requests = $0.035', 'medium': '$3.50/1M × 0.1M requests = $0.35', 'high': '$3.50/1M × 1M requests = $3.50'} | N/A |
| Amazon DynamoDB | On-demand storage and read/write operations for product data (Low: 1 GB storage, 8,000 reads, 2,000 writes per month, Medium: 1 GB storage, 80,000 reads, 20,000 writes per month, High: 2 GB storage, 800,000 reads, 200,000 writes per month) | {'low': 'Free tier covers storage and capacity. Minimal on-demand: $0.125/1M × 0.008M reads + $0.625/1M × 0.002M writes = $0.001 + $0.00125 = $0.002', 'medium': '$0.125/1M × 0.08M reads + $0.625/1M × 0.02M writes = $0.01 + $0.0125 = $0.0225', 'high': '$0.125/1M × 0.8M reads + $0.625/1M × 0.2M writes = $0.10 + $0.125 = $0.225'} | N/A |

### Free Tier

Free tier information by service:
- **AWS Lambda**: First 1M requests and 400,000 GB-seconds per month free
- **Amazon API Gateway**: No free tier for API Gateway REST API
- **Amazon DynamoDB**: 25 GB storage, 25 read/write capacity units per month free

## Cost Scaling with Usage

The following table illustrates how cost estimates scale with different usage levels:

| Service | Low Usage | Medium Usage | High Usage |
|---------|-----------|--------------|------------|
| AWS Lambda | Varies | Varies | Varies |
| Amazon API Gateway | Varies | Varies | Varies |
| Amazon DynamoDB | Varies | Varies | Varies |

### Key Cost Factors

- **AWS Lambda**: Processing API requests with Node.js runtime, 512MB memory allocation
- **Amazon API Gateway**: REST API requests for product data and QR code generation
- **Amazon DynamoDB**: On-demand storage and read/write operations for product data

## Projected Costs Over Time

The following projections show estimated monthly costs over a 12-month period based on different growth patterns:

Insufficient data to generate cost projections. See Custom Analysis Data section for available cost information.

## Detailed Cost Analysis

### Pricing Model

ON DEMAND


### Exclusions

- Data transfer costs between regions
- CloudWatch logging and monitoring costs
- Development and deployment costs
- Domain name and SSL certificate costs
- Backup and disaster recovery costs
- Custom domain setup for API Gateway
- Lambda provisioned concurrency costs
- DynamoDB Global Tables or cross-region replication

### Recommendations

#### Immediate Actions

- Use ARM-based Lambda functions (Graviton2) for 20% cost savings on compute
- Consider HTTP API instead of REST API for API Gateway to reduce costs by ~70%
- Implement response caching in API Gateway for frequently accessed product data
- Optimize Lambda memory allocation based on actual usage patterns
- Use DynamoDB on-demand billing for unpredictable traffic patterns
#### Best Practices

- Monitor Lambda cold starts and consider provisioned concurrency for consistent performance
- Implement proper error handling to avoid unnecessary Lambda invocations
- Use DynamoDB single-table design for optimal performance and cost
- Set up CloudWatch alarms for cost monitoring and usage spikes
- Consider Reserved Capacity for DynamoDB if usage patterns become predictable
- Implement request/response compression to reduce data transfer costs
- Use Lambda layers for common dependencies to reduce deployment package size



## Cost Optimization Recommendations

### Immediate Actions

- Use ARM-based Lambda functions (Graviton2) for 20% cost savings on compute
- Consider HTTP API instead of REST API for API Gateway to reduce costs by ~70%
- Implement response caching in API Gateway for frequently accessed product data

### Best Practices

- Monitor Lambda cold starts and consider provisioned concurrency for consistent performance
- Implement proper error handling to avoid unnecessary Lambda invocations
- Use DynamoDB single-table design for optimal performance and cost

## Conclusion

By following the recommendations in this report, you can optimize your goat-API Serverless Architecture costs while maintaining performance and reliability. Regular monitoring and adjustment of your usage patterns will help ensure cost efficiency as your workload evolves.

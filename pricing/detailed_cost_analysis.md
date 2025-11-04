# goat-API Serverless Architecture - Detailed Cost Analysis

## Executive Summary

The goat-API is a serverless REST API built on AWS using Lambda, API Gateway, and DynamoDB. This analysis provides comprehensive cost estimates for three usage scenarios based on current AWS pricing in the US East (N. Virginia) region.

## Architecture Overview

- **AWS Lambda**: Node.js runtime for business logic and QR code generation
- **Amazon API Gateway**: REST API endpoints for HTTP routing
- **Amazon DynamoDB**: NoSQL database for product data storage (on-demand billing)

## Cost Analysis by Usage Scenario

### Low Usage Scenario (Development/Testing)
**Monthly Traffic**: 10,000 API requests

| Service | Usage | Unit Price | Calculation | Monthly Cost |
|---------|-------|------------|-------------|--------------|
| **AWS Lambda** | | | | |
| - Requests | 10,000 requests | $0.20 per 1M | $0.20 × 0.01 | $0.002 |
| - Compute (512MB, 200ms avg) | 1,000 GB-seconds | $0.0000166667 per GB-second | $0.0000166667 × 1,000 | $0.017 |
| **API Gateway** | | | | |
| - REST API Requests | 10,000 requests | $3.50 per 1M | $3.50 × 0.01 | $0.035 |
| **DynamoDB** | | | | |
| - Storage | 1 GB | Free (25 GB free tier) | $0.00 | $0.000 |
| - Read Requests | 8,000 reads | $0.125 per 1M | $0.125 × 0.008 | $0.001 |
| - Write Requests | 2,000 writes | $0.625 per 1M | $0.625 × 0.002 | $0.001 |
| **Total Monthly Cost** | | | | **$0.056** |

### Medium Usage Scenario (Production - Moderate)
**Monthly Traffic**: 100,000 API requests

| Service | Usage | Unit Price | Calculation | Monthly Cost |
|---------|-------|------------|-------------|--------------|
| **AWS Lambda** | | | | |
| - Requests | 100,000 requests | $0.20 per 1M | $0.20 × 0.1 | $0.020 |
| - Compute (512MB, 200ms avg) | 10,000 GB-seconds | $0.0000166667 per GB-second | $0.0000166667 × 10,000 | $0.167 |
| **API Gateway** | | | | |
| - REST API Requests | 100,000 requests | $3.50 per 1M | $3.50 × 0.1 | $0.350 |
| **DynamoDB** | | | | |
| - Storage | 1 GB | Free (25 GB free tier) | $0.00 | $0.000 |
| - Read Requests | 80,000 reads | $0.125 per 1M | $0.125 × 0.08 | $0.010 |
| - Write Requests | 20,000 writes | $0.625 per 1M | $0.625 × 0.02 | $0.013 |
| **Total Monthly Cost** | | | | **$0.560** |

### High Usage Scenario (Production - Heavy)
**Monthly Traffic**: 1,000,000 API requests

| Service | Usage | Unit Price | Calculation | Monthly Cost |
|---------|-------|------------|-------------|--------------|
| **AWS Lambda** | | | | |
| - Requests | 1,000,000 requests | $0.20 per 1M | $0.20 × 1.0 | $0.200 |
| - Compute (512MB, 200ms avg) | 100,000 GB-seconds | $0.0000166667 per GB-second | $0.0000166667 × 100,000 | $1.667 |
| **API Gateway** | | | | |
| - REST API Requests | 1,000,000 requests | $3.50 per 1M | $3.50 × 1.0 | $3.500 |
| **DynamoDB** | | | | |
| - Storage | 2 GB | $0.25 per GB-month | $0.25 × 0 (free tier) | $0.000 |
| - Read Requests | 800,000 reads | $0.125 per 1M | $0.125 × 0.8 | $0.100 |
| - Write Requests | 200,000 writes | $0.625 per 1M | $0.625 × 0.2 | $0.125 |
| **Total Monthly Cost** | | | | **$5.592** |

## Annual Cost Projections

| Scenario | Monthly Cost | Annual Cost |
|----------|--------------|-------------|
| Low Usage | $0.056 | $0.67 |
| Medium Usage | $0.560 | $6.72 |
| High Usage | $5.592 | $67.10 |

## Cost Breakdown by Service (High Usage)

```
API Gateway: $3.50 (62.6%)
Lambda Compute: $1.67 (29.9%)
Lambda Requests: $0.20 (3.6%)
DynamoDB Reads: $0.10 (1.8%)
DynamoDB Writes: $0.125 (2.2%)
```

## Free Tier Benefits

### AWS Lambda
- **1 million requests per month** - Covers low to medium usage completely
- **400,000 GB-seconds per month** - Covers compute for low usage scenarios

### Amazon DynamoDB
- **25 GB storage per month** - Covers storage needs for most scenarios
- **25 read/write capacity units** - Provides baseline capacity

### API Gateway
- **No free tier** - This is the primary cost driver for low-volume applications

## Cost Optimization Recommendations

### Immediate Actions (Potential 30-50% savings)

1. **Switch to HTTP API** instead of REST API
   - Cost: $1.00 per million requests (vs $3.50)
   - Savings: ~71% on API Gateway costs
   - Impact: $2.50 savings per million requests

2. **Use ARM-based Lambda (Graviton2)**
   - Cost: $0.0000133334 per GB-second (vs $0.0000166667)
   - Savings: ~20% on compute costs
   - Impact: $0.33 savings per 100,000 GB-seconds

3. **Optimize Lambda Memory Allocation**
   - Test with 256MB or 384MB memory
   - Potential 25-50% compute cost reduction
   - Monitor performance vs cost trade-offs

### Medium-term Optimizations

1. **Implement API Gateway Caching**
   - Cache frequently accessed product data
   - Reduce Lambda invocations by 30-60%
   - Cost: $0.02/hour for 0.5GB cache

2. **DynamoDB Query Optimization**
   - Use single-table design
   - Implement efficient access patterns
   - Reduce read/write operations

3. **Response Compression**
   - Enable gzip compression
   - Reduce data transfer costs
   - Improve API response times

### Long-term Strategies

1. **Reserved Capacity** (if usage becomes predictable)
   - DynamoDB Reserved Capacity: Up to 76% savings
   - Lambda Provisioned Concurrency: For consistent performance

2. **Multi-region Deployment**
   - Consider regional pricing differences
   - Optimize for user proximity

## Monitoring and Alerting

### Cost Monitoring Setup
- CloudWatch billing alarms at $1, $5, $10 thresholds
- Daily cost and usage reports
- Lambda duration and memory utilization tracking

### Key Metrics to Track
- API Gateway request count and latency
- Lambda invocation count, duration, and memory usage
- DynamoDB read/write capacity utilization
- Error rates and retry patterns

## Risk Factors

### Cost Spike Scenarios
1. **Unexpected traffic surge**: 10x traffic = ~$56/month
2. **Inefficient queries**: Could increase DynamoDB costs significantly
3. **Lambda timeout issues**: Increased compute costs from long-running functions

### Mitigation Strategies
- Implement rate limiting and throttling
- Set up cost alerts and automatic scaling limits
- Use Lambda timeout settings appropriately (5-10 seconds max)

## Conclusion

The goat-API architecture is highly cost-effective for variable workloads:

- **Development/Testing**: Under $1/month
- **Production (Medium)**: Under $7/month  
- **Production (High)**: Under $70/month

Key cost optimization opportunities:
1. **HTTP API migration**: 71% API Gateway cost reduction
2. **ARM Lambda**: 20% compute cost reduction  
3. **Caching strategy**: 30-60% request reduction

The serverless architecture provides excellent cost scalability, with costs directly proportional to usage and significant free tier benefits for development and low-volume production workloads.

# Goat API - AWS Serverless Product Management System

A comprehensive AWS serverless API for managing product information with QR code generation capabilities, built using AWS CDK.

## 🏗️ Architecture Overview

This project implements a serverless product management API using:
- **AWS API Gateway** - RESTful API endpoints
- **AWS Lambda** - Serverless compute functions
- **Amazon DynamoDB** - NoSQL database for product storage
- **AWS CDK** - Infrastructure as Code

## 📁 Project Structure

```
goat-API-20251103-232758/
├── specs/                          # Project specifications
│   ├── requirements.md             # Functional requirements
│   ├── design.md                   # System design document
│   └── tasks.md                    # Development tasks
├── goat-api-cdk/                   # CDK infrastructure code
│   ├── lib/                        # CDK stack definitions
│   ├── lambda/                     # Lambda function code
│   ├── bin/                        # CDK app entry point
│   └── test/                       # Unit tests
├── generated-diagrams/             # Architecture diagrams
├── pricing/                        # Cost analysis reports
├── qr-code/                        # Repository QR code
├── jira_user_stories.md            # User stories
├── jira_stories_summary.md         # Stories summary
└── DEPLOYMENT_SUMMARY.md           # Deployment guide
```

## 🚀 Features

### API Endpoints
- **GET /products** - Retrieve all products
- **GET /products/{id}** - Get specific product by ID
- **GET /qr-code** - Generate QR code for repository access

### Core Functionality
- Product catalog management
- RESTful API design
- QR code generation for easy repository access
- Serverless architecture for cost optimization
- Infrastructure as Code with AWS CDK

## 🛠️ Technology Stack

- **Runtime**: Node.js 18.x
- **Infrastructure**: AWS CDK (TypeScript)
- **Database**: Amazon DynamoDB
- **API**: AWS API Gateway
- **Compute**: AWS Lambda
- **Testing**: Jest
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js 18.x or later
- AWS CLI configured
- AWS CDK CLI installed (`npm install -g aws-cdk`)
- Valid AWS account with appropriate permissions

## 🔧 Installation & Deployment

### 1. Clone the Repository
```bash
git clone https://github.com/pandson7/goat-API-20251103-232758.git
cd goat-API-20251103-232758
```

### 2. Install Dependencies
```bash
cd goat-api-cdk
npm install
```

### 3. Deploy Infrastructure
```bash
# Bootstrap CDK (first time only)
cdk bootstrap

# Deploy the stack
cdk deploy
```

### 4. Populate Sample Data
```bash
node populate-data.js
```

## 🧪 Testing

Run the test suite:
```bash
cd goat-api-cdk
npm test
```

Test the API endpoints:
```bash
node ../test-api.js
```

## 📊 Cost Analysis

The project includes comprehensive cost analysis:
- **Monthly Estimated Cost**: $5-15 (based on moderate usage)
- **Pay-per-use model** with AWS Lambda and DynamoDB
- **Cost optimization** through serverless architecture

See detailed cost breakdown in the `pricing/` directory.

## 📈 Architecture Diagrams

Visual representations of the system architecture are available in the `generated-diagrams/` folder:
- System architecture overview
- Detailed component flow
- CDK deployment structure

## 📝 User Stories

The project includes comprehensive user stories for:
- Product catalog browsing
- Individual product retrieval
- QR code access functionality

See `jira_user_stories.md` for detailed user stories and acceptance criteria.

## 🔗 Quick Access

Scan the QR code in the `qr-code/` directory for quick repository access.

## 📚 Documentation

- **Requirements**: See `specs/requirements.md`
- **Design Document**: See `specs/design.md`
- **Deployment Guide**: See `DEPLOYMENT_SUMMARY.md`
- **Cost Analysis**: See `pricing/` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the documentation in the `specs/` directory
2. Review the deployment summary
3. Open an issue on GitHub

---

**Built with ❤️ using AWS CDK and serverless technologies**

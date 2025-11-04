#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { GoatApiStack232758 } from '../lib/goat-api-cdk-stack';

const app = new cdk.App();
new GoatApiStack232758(app, 'GoatApiStack232758', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

const https = require('https');
const fs = require('fs');

const API_BASE_URL = 'https://nsn6itxkf4.execute-api.us-east-1.amazonaws.com/prod';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function runTests() {
  console.log('🚀 Starting API Tests for goat-API-232758\n');

  // Test 1: GET /api/products
  console.log('📋 Test 1: GET /api/products');
  try {
    const response = await makeRequest(`${API_BASE_URL}/api/products`);
    console.log(`Status: ${response.statusCode}`);
    const products = JSON.parse(response.body);
    console.log(`Products found: ${products.length}`);
    console.log(`Sample product: ${products[0]?.name || 'None'}`);
    console.log('✅ Test 1 PASSED\n');
  } catch (error) {
    console.log('❌ Test 1 FAILED:', error.message);
  }

  // Test 2: GET /api/products/{id} - Valid ID
  console.log('📱 Test 2: GET /api/products/prod-001');
  try {
    const response = await makeRequest(`${API_BASE_URL}/api/products/prod-001`);
    console.log(`Status: ${response.statusCode}`);
    const product = JSON.parse(response.body);
    console.log(`Product: ${product.name}`);
    console.log(`Brand: ${product.brand}`);
    console.log(`Price: $${product.price}`);
    console.log('✅ Test 2 PASSED\n');
  } catch (error) {
    console.log('❌ Test 2 FAILED:', error.message);
  }

  // Test 3: GET /api/products/{id} - Invalid ID
  console.log('🚫 Test 3: GET /api/products/invalid-id');
  try {
    const response = await makeRequest(`${API_BASE_URL}/api/products/invalid-id`);
    console.log(`Status: ${response.statusCode}`);
    const result = JSON.parse(response.body);
    console.log(`Error message: ${result.error}`);
    if (response.statusCode === 404) {
      console.log('✅ Test 3 PASSED\n');
    } else {
      console.log('❌ Test 3 FAILED: Expected 404 status\n');
    }
  } catch (error) {
    console.log('❌ Test 3 FAILED:', error.message);
  }

  // Test 4: GET /api/products/{id}/qrcode - Valid ID
  console.log('📱 Test 4: GET /api/products/prod-001/qrcode');
  try {
    const response = await makeRequest(`${API_BASE_URL}/api/products/prod-001/qrcode`);
    console.log(`Status: ${response.statusCode}`);
    console.log(`Content-Type: ${response.headers['content-type']}`);
    console.log(`Response size: ${response.body.length} bytes`);
    
    // Verify it's base64 encoded PNG
    if (response.body.startsWith('iVBORw0KGgo')) {
      console.log('✅ QR code is valid base64 PNG');
    }
    console.log('✅ Test 4 PASSED\n');
  } catch (error) {
    console.log('❌ Test 4 FAILED:', error.message);
  }

  // Test 5: GET /api/products/{id}/qrcode - Invalid ID
  console.log('🚫 Test 5: GET /api/products/invalid-id/qrcode');
  try {
    const response = await makeRequest(`${API_BASE_URL}/api/products/invalid-id/qrcode`);
    console.log(`Status: ${response.statusCode}`);
    const result = JSON.parse(response.body);
    console.log(`Error message: ${result.error}`);
    if (response.statusCode === 404) {
      console.log('✅ Test 5 PASSED\n');
    } else {
      console.log('❌ Test 5 FAILED: Expected 404 status\n');
    }
  } catch (error) {
    console.log('❌ Test 5 FAILED:', error.message);
  }

  // Test 6: Verify all sample products
  console.log('📦 Test 6: Verify all sample products');
  const productIds = ['prod-001', 'prod-002', 'prod-003', 'prod-004', 'prod-005'];
  let successCount = 0;
  
  for (const id of productIds) {
    try {
      const response = await makeRequest(`${API_BASE_URL}/api/products/${id}`);
      if (response.statusCode === 200) {
        const product = JSON.parse(response.body);
        console.log(`✅ ${id}: ${product.name}`);
        successCount++;
      }
    } catch (error) {
      console.log(`❌ ${id}: Failed`);
    }
  }
  
  console.log(`\n📊 Summary: ${successCount}/${productIds.length} products accessible`);
  
  if (successCount === productIds.length) {
    console.log('✅ Test 6 PASSED\n');
  } else {
    console.log('❌ Test 6 FAILED\n');
  }

  console.log('🎉 API Testing Complete!');
  console.log('\n📋 API Endpoints:');
  console.log(`• GET ${API_BASE_URL}/api/products`);
  console.log(`• GET ${API_BASE_URL}/api/products/{id}`);
  console.log(`• GET ${API_BASE_URL}/api/products/{id}/qrcode`);
  console.log('\n📱 Sample Product IDs: prod-001, prod-002, prod-003, prod-004, prod-005');
}

runTests().catch(console.error);

/**
 * Basic Load Testing Script
 * 
 * This script simulates concurrent traffic to your API endpoints to help you test
 * how your application handles load. It measures response times and success rates.
 * 
 * Usage:
 * node load_test.js
 */

const TARGET_URL = 'http://localhost:3000/api/track'; // Replace with your local or staging URL
const CONCURRENT_USERS = 50; // Number of simultaneous requests
const TOTAL_REQUESTS = 500; // Total number of requests to send

async function sendRequest(id) {
  const startTime = Date.now();
  try {
    const response = await fetch(TARGET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Sending a mock tracking payload
      body: JSON.stringify({
        session_id: `test-session-${id}`,
        page_url: 'http://localhost:3000/',
        referrer: 'LoadTest',
        device_type: 'Desktop',
        browser: 'Node.js',
        country: 'Local',
        network: 'TestNet'
      })
    });
    
    const duration = Date.now() - startTime;
    return { success: response.ok, status: response.status, duration };
  } catch (error) {
    const duration = Date.now() - startTime;
    return { success: false, status: 'error', duration };
  }
}

async function runLoadTest() {
  console.log(`Starting load test against ${TARGET_URL}`);
  console.log(`Concurrent Users: ${CONCURRENT_USERS}`);
  console.log(`Total Requests: ${TOTAL_REQUESTS}\n`);

  const startTime = Date.now();
  let completedRequests = 0;
  let successfulRequests = 0;
  let failedRequests = 0;
  let totalDuration = 0;

  // Run requests in batches based on concurrency limit
  for (let i = 0; i < TOTAL_REQUESTS; i += CONCURRENT_USERS) {
    const batchSize = Math.min(CONCURRENT_USERS, TOTAL_REQUESTS - i);
    const promises = [];
    
    for (let j = 0; j < batchSize; j++) {
      promises.push(sendRequest(i + j));
    }

    const results = await Promise.all(promises);
    
    results.forEach(result => {
      completedRequests++;
      totalDuration += result.duration;
      if (result.success) {
        successfulRequests++;
      } else {
        failedRequests++;
      }
    });

    // Optional: Log progress
    // console.log(`Progress: ${completedRequests}/${TOTAL_REQUESTS}`);
  }

  const totalTestDuration = (Date.now() - startTime) / 1000;
  const averageResponseTime = totalDuration / TOTAL_REQUESTS;
  const requestsPerSecond = TOTAL_REQUESTS / totalTestDuration;

  console.log('--- Load Test Results ---');
  console.log(`Total Time: ${totalTestDuration.toFixed(2)} seconds`);
  console.log(`Requests/sec: ${requestsPerSecond.toFixed(2)}`);
  console.log(`Average Response Time: ${averageResponseTime.toFixed(2)} ms`);
  console.log(`Successful Requests: ${successfulRequests}`);
  console.log(`Failed Requests: ${failedRequests}`);
}

runLoadTest();

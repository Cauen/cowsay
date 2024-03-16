const axios = require('axios');

const batchRequests = async (numRequests) => {
  const requests = Array.from({ length: numRequests }, (_, index) =>
    axios.get('http://5.161.105.58:3000/', { timeout: 5000 }).catch((error) => {
      if (axios.isCancel(error)) {
        console.error('Request canceled:', error.message);
      } else {
        // console.error('Error making request:', error.message);
      }
      return error.response; // Return the error response
    })
  );

  try {
    const timeStart = Date.now();
    const responses = await Promise.all(requests);
    console.log(`Batch of ${numRequests} requests completed successfully.`);
    const status = responses.map((response) => (response ? response.status : 'timeout'));
    const groups = status.reduce((groups, status) => {
      groups[status] = (groups[status] || 0) + 1;
      return groups;
    }, {});

    const timeEnd = Date.now();
    const timeElapsed = timeEnd - timeStart;
    console.log(`Batch of ${numRequests} requests took ${timeElapsed}ms.`);
    console.log(groups);
  } catch (error) {
    console.error('Error processing requests:', error.message);
  }
};

// Change the number to the desired batch size
batchRequests(1000); // Example: batch of 1000 requests

const https = require('https');

const query = JSON.stringify({
  query: `{ blogs(first:10) { edges { node { id handle title } } } }`
});

const options = {
  hostname: '7uvwdy-up.myshopify.com',
  path: '/admin/api/2025-04/graphql.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': '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',
    'Content-Length': Buffer.byteLength(query)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
req.on('error', e => console.error(e));
req.write(query);
req.end();

const https = require('https');

function prepareQuery(query) {
  // TODO Validate

  // Encoded query
  let encodedQuery = `keywords=${query.keywords}&location=${query.location}&distancefromlocation=${
    query.distancefromlocation}`;

  encodedQuery = encodeURI(encodedQuery);

  return encodedQuery;
}

/**
 * Search reed using the jobseeker API (https://www.reed.co.uk/developers/jobseeker)
 * @param {Object} query Only keywords, location and distancefromLocation are used.
 * @return {Object} First page of query results from reed API
 */
const searchReed = (query) => {
  // Define options for the upcoming https request, per reed's API documentation Basic Auth is used
  // and the issued key is provided as the username, password is left blank.
  const options = {
    hostname: 'www.reed.co.uk',
    path: `/api/1.0/search?${prepareQuery(query)}`,
    port: 443,
    method: 'GET',
    headers: {
      Authorization: `Basic ${process.env.REED_B64}`,
    },
  };

  // Returning a promise, this means await can be used to await all data to be returned prior to
  // providing an api response
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let results = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        results += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(results));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
};

module.exports = searchReed;

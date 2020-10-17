const https = require('https');
const permittedKeywords = ['node', 'react']; // TODO: Once DB is in place, these will live in the DB

/**
 * Build query string, sanitise as needed and encode
 * @param {Object} query Only keywords, location and distanceFromLocation are used.
 * @return {String} Encoded and sanitised query string
 */
function prepareQuery(query) {
  const q = query;

  // Validate that the distance provided is a valid integer, otherwise default to 10
  const distanceFromLocationAsInt = parseInt(q.distanceFromLocation, 10);
  if (!Number.isInteger(distanceFromLocationAsInt)) q.distanceFromLocation = 10;

  // Validate keywords exist in pre-defined list, drop those that do not.
  const keywordsArray = q.keywords.split(' ');
  q.keywords = '';

  keywordsArray.forEach((keyword) => {
    if (permittedKeywords.includes(keyword)) {
      q.keywords += `${keyword} `;
    }
  });

  // Validate location exists in pre-defined list

  // Encoded query
  let encodedQuery = `keywords=${q.keywords}&location=${q.location}&distancefromlocation=${
    q.distanceFromLocation}`;

  return encodeURI(encodedQuery);
}

/**
 * Search reed using the jobseeker API (https://www.reed.co.uk/developers/jobseeker)
 * @param {Object} query Only keywords, location and distanceFromLocation are used.
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

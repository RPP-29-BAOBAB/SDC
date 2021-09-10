const axios = require('axios');
const config = require('../config.js');
const generateURL = require('./utils.js')

// axios.defaults.baseURL = config.API;
axios.defaults.headers.common['Authorization'] = config.GITHUB_TOKEN;

module.exports = {
  fetchMultiple: (endpoint, ids) => {
    console.log(ids);
    return Promise.all(ids.map(id => (
      axios.get(`/products?product_id=${id}`)
        .then(res => {
          // console.log(res.data);
          return res.data;
        })
    )));
  },

  fwd: (req, callback) => {

    const url = generateURL(req.url)
    console.log('url:', url)

    if (req.method === 'GET') {
      console.log('API query:\n', req.url, req.query);



      return axios.get(url)
        .then(response => {
          callback(null, response.data);
        })
        .catch(err => {
          callback(err, null);
        });
    }

    // More varied data attached to POST/PUT requests:
    console.log('API query:\n', req.url, req.params[0], req.query, req.body);

    if (req.method === 'POST') {

      return axios.post(url, req.body)
        .then(response => {
          callback(null, response.data);
        })
        .catch(err => {
          callback(err, null);
        });
    }

    return axios.put(url, req.body)
      .then(response => {
        callback(null, response.data);
      })
      .catch(err => {
        callback(err, null);
      });
  }
};

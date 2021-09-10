const generateURL = (url) => {
  if (url.includes('products')) {
    return `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${url}`
  }

  if (url.includes('questions') || url.includes('answers')) {
    return `http://localhost:8080${url}`
  }

  if (url.includes('reviews')) {
    return `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${url}`
  }
}

module.exports = generateURL;

const BASE_URL = 'https://fakestoreapi.com';

function getEndpoint(path) {
  return `${BASE_URL}${path}`;
}

module.exports = { getEndpoint };
const axios = require('axios');

module.exports = class BaseStoragePlatform {
  constructor() {
    this.type = null;
    this.baseURL = null; // API root url of storage platform
    this.baseURI = ''; // Constant pattern for using API, put it here
    this.headers = null;
  }

  // Methods
  // Meant to be private, generic call
  async request(args) {
    return axios.request({
      method: 'GET',
      baseURL: this.baseURL + this.baseURI,
      headers: this.headers,
      timeout: 30000,
      ...args,
    }).then((response) => response.data).catch((e) => {
      console.error(e, '<=== PLATFORM_REQUEST_ERROR');
      return null;
      // Nique ça marche pas
      // return {
      //   status: e.response.status ?? e.request.code ?? undefined,
      //   message: e.response.statusText ?? undefined
      // }
    });
  }
};

import axios from 'axios';

const Log_LEVEL = 2;
axios.defaults.baseURL = 'http://localhost:9090/api/';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (route) => {
  return replaceAll(route.title, ' ', '-');
};

class ApiClass {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:9090/api/',
      timeout: 1000
    });
  }
}

ApiClass.prototype.get = function (url, params) {
  return new Promise((resolve, reject) => {
    if (Log_LEVEL >= 2)
      console.log(`Server GET Request: ${url}`, params);
    this.axiosInstance
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(Object.assign([], response.data));
      })
      .catch(error => {
        reject(`Locations not found!`, error);
      });
  });
};

ApiClass.prototype.post = function (url, data, params) {
  return new Promise((resolve, reject) => {
    if (Log_LEVEL >= 2)
      console.log(`Server POST Request: ${url}`);
    this.axiosInstance
      .post(url, data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        debugger;
        reject(`Location not saved!`, error);
      });
  })
};

ApiClass.prototype.put = function (url, data, params) {
  return new Promise((resolve, reject) => {
    this.axiosInstance
      .put(url, data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        debugger;
        reject(`Location not saved!`, error);
      });
  })

};

ApiClass.prototype.patch = function (url, params) {

};

ApiClass.prototype.delete = function (url, params) {

};

ApiClass.prototype.moveTempFiles = function () {
  const url = "/move";
   this.axiosInstance
    .get(url, {
      params: {}
    })
    .then(response => {

    })
    .catch(() => {

    })
};

export default new ApiClass();

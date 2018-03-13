import axios from 'axios';
import uuidv4 from 'uuid';

    // axios.defaults.baseURL = 'https://' + window.location.hostname;

function getUserId() {
    let u_id_div = document.getElementById('u_to_remove');
    if (u_id_div) {
        const u_id = u_id_div.innerHTML;
        u_id_div.remove();
        return u_id;
    }
}

function getOrgId() {
    let o_id_div = document.getElementById('o_to_remove');
    if (o_id_div) {
        const o_id = o_id_div.innerHTML;
        o_id_div.remove();
        return o_id;
    }
}


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

class LocationsApiClass {
    constructor() {
        // this.oId = getOrgId();
        // this.uId = getUserId();
    }

}

LocationsApiClass.prototype = {
    // getOrg() {
    //   const url = process.env.NODE_ENV === "production" ? "/p2sRead.php" : "/accounts-result";
    //   return new Promise((resolve, reject) => {
    //     axios.get(url, {
    //       params: {
    //         rty: 4,
    //         tab: 1,
    //         oid: this.oId
    //       }
    //     })
    //       .then(function (response) {
    //         if (!response.data.accounts[0])
    //           throw("Not logged in");
    //         resolve(Object.assign({}, response.data.accounts[0]));
    //       })
    //       .catch(function (error) {
    //         reject(`Not logged in!`);
    //         window.location.href = "https://" + window.location.hostname;
    //       });
    //   });
    // },
    // getAllUsers() {
    //   const url = process.env.NODE_ENV === "production" ? "/p2sRead.php" : "/users-result";
    //
    //   return new Promise((resolve, reject) => {
    //     // console.log("uid", this.uId);
    //     axios.get(url, {
    //       params: {
    //         rty: 5,
    //         tab: 9
    //       }
    //     })
    //       .then(function (response) {
    //         resolve(Object.assign([], response.data.users));
    //       })
    //       .catch(function (error) {
    //         reject(`user not found!`);
    //       });
    //   });
    // },

    getAllLocations() {
        const url = process.env.NODE_ENV === "production" ? "/p2sRead.php" : "/locations-result";
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {}
            })
                .then(function (response) {
                    resolve(Object.assign([], response.data.locations));
                })
                .catch(function (error) {
                    reject(`Locations not found!`);
                });
        });
    },

    addLocation(location) {
        location.uuid = uuidv4();
        const url = process.env.NODE_ENV === "production" ? "/p2sRead.php" : "/locations-result";


        if (process.env.NODE_ENV !== "production") {
            return new Promise((resolve, reject) => {
                axios.get(url, {
                    params: {}
                }).then(response => {
                    let locations = response.data.locations;
                    locations.push(location);

                    axios.put(url, {locations: locations}, {
                        params: {}
                    })
                        .then(function (response) {
                            resolve(Object.assign([], response.data));
                        })
                        .catch(function (error) {
                            reject(`Location not saved!`);
                        });
                });
            })

        }
        else {
            return new Promise((resolve, reject) => {
                axios.put(url, location, {
                    params: {}
                })
                    .then(function (response) {
                        resolve(Object.assign([], response.data));
                    })
                    .catch(function (error) {
                        reject(`Location not saved!`);
                    });
            });
        }
    },

    editLocation(location) {

    }


};


const LocationsApi = new LocationsApiClass();

export default LocationsApi;

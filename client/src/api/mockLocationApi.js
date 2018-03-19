import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost';

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
    getAllLocations(userId) {
        // axios.defaults.port = 3006;

        const url = "http://localhost:3006/locations-result";
        console.log(axios.defaults);
        let params = {};
        if (userId)
            params.uId = userId;
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            })
                .then(function (response) {
                    resolve(Object.assign([], response.data.locations));
                })
                .catch(function (error) {
                    reject(`Locations not found!`);
                });
        });
    },

    addLocation(loc) {
        const url = "http://localhost:3006/locations-result";

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {}
            }).then(response => {
                let locations = response.data.locations;
                locations.push(loc);

                axios.put(url, {locations: locations}, {
                    params: {}
                })
                    .then(function (response) {
                        resolve(loc);
                        moveTempFiles();
                    })
                    .catch(function (error) {
                        reject(`Location not saved!`);
                    });
            });
        })
    },

    editLocation(loc) {
        const url = "http://localhost:3006/locations-result";

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {}
            }).then(response => {
                let locations = response.data.locations.filter(l => l.uuid !== loc.uuid);

                locations.push(loc);

                axios.put(url, {locations: locations}, {
                    params: {}
                })
                    .then(function (response) {
                        resolve(loc);
                        moveTempFiles();
                    })
                    .catch(function (error) {
                        reject(`Location not saved!`);
                    });
            });
        })
    },

    getUserImage(uId) {
        const url = "http://localhost:3006/users-result";

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {id: uId}
            }).then(response => {
                const user = response.data.users.filter(u => u.id === uId)[0];
                if (user && user.photos[0])
                    resolve(user.photos[0].value);
                else reject('User image not found');
            });
        })
    },

    getUserByUId(uId) {
        const url = "http://localhost:3006/users-result";

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {id: uId}
            }).then(response => {
                const user = response.data.users.filter(u => u.id === uId)[0];
                if (user)
                    resolve(user);
                else reject('User not found');
            });
        })
    },
    getCommentsByLocationId(locId) {
        let url = "http://localhost:3006/location-comments-results";

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {"locationId": locId}
            }).then(response => {
                let comments = response.data;//.filter(comment => comment.locationId === locId);
                if (comments) {
                    url = "http://localhost:3006/users-result";
                    axios.get(url, {
                        params: {}
                    }).then(response => {
                        const users = response.data.users;
                        if (users)
                            comments.map(comment => comment.user = users.filter(u => u.id === comment.userId)[0]);
                        resolve(comments);
                    })
                } else
                    reject('No comments found');
            })


        })
    },
    saveComment(comment){
        let url = "http://localhost:3006/location-comments-results";

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {}
            }).then(response => {
                let comments = response.data;
                comments.push(comment);

                axios.put(url, {comments: comments}, {
                    params: {}
                })
                    .then(function (response) {

                        if (comments) {
                            url = "http://localhost:3006/users-result";
                            axios.get(url, {
                                params: {}
                            }).then(response => {
                                const users = response.data.users;
                                if (users)
                                    comments.map(comment => comment.user = users.filter(u => u.id === comment.userId)[0]);
                                resolve(comments);
                            })
                        }
                    })
                    .catch(function (error) {
                        reject(`Comment not saved!`);
                    });
            });
        })
    }
};


export function moveTempFiles() {
    const url = "http://localhost:9090/move";
    axios.get(url, {
        params: {}
    }).then(response => {

    }).catch(() => {

    })
}

export default new LocationsApiClass();

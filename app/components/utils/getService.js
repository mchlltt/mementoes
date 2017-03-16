let axios = require('axios');

export default class GetService {

    constructor(url) {
        this.url = url;
    }

    get(params) {
        let queryString = this.url + params.join('/');
        return axios(queryString).then(
            function(response) {
                return response.data;
            }
        );
    }
}
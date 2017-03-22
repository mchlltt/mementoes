let axios = require('axios');

export default class DeleteService {

    constructor(url) {
        this.url = url;
    }

    delete(params) {
        let queryString;
        if (params) {
            queryString = this.url + params.join('/');
        } else {
            queryString = this.url;
        }
        return axios.delete(queryString).then(
            function(response) {
                return response.data;
            }
        );
    }
}
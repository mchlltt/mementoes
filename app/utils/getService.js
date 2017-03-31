import axios from 'axios';

export default class GetService {

    constructor(url) {
        this.url = url;
    }

    getRoute(params) {
        let queryString;
        if (params) {
            queryString = this.url + params.join('/');
        } else {
            queryString = this.url;
        }
        return axios(queryString).then(
            function(response) {
                return response.data;
            }
        );
    }
}
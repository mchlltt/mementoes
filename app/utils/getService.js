// Import dependency.
import axios from 'axios';

// Define service class that can be imported and used to hit different GET endpoints.
export default class GetService {
    constructor(url) {
        this.url = url;
    }
    getRoute(params, id) {
        let config;

        if (params) {
            config = {
                method: 'get',
                url: this.url + params.join('/'),
                headers: {'X-Mementoes-ID': id}
            };
        } else {
            config = {
                url: this.url
            };
        }

        console.log(config);

        return axios(config).then(
            function(response) {
                return response.data;
            }
        );
    }
}
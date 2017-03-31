// Import dependency.
import axios from 'axios';

// Define service class that can be imported and used to hit different DELETE endpoints.
export default class DeleteService {
    constructor(url) {
        this.url = url;
    }
    deleteItem(params, id) {
        let config;

        if (params) {
            config = {
                method: 'delete',
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
// Import dependency.
import axios from 'axios';

// Define service class that can be imported and used to hit different DELETE endpoints.
export default class DeleteService {
    constructor(url) {
        this.url = url;
    }
    deleteItem(params) {
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
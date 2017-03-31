// Import dependency.
import axios from 'axios';

// Define service class that can be imported and used to hit different PUT endpoints.
export default class PutService {
    constructor(url) {
        this.url = url;
    }

    putItem(body) {
        axios.put(this.url, body)
            .catch((error) => {console.log(error);});
    }
}
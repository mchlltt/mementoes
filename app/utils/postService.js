// Import dependency.
import axios from 'axios';

// Define service class that can be imported and used to hit different PUT endpoints.
export default class PostService {
    constructor(url) {
        this.url = url;
    }

    postItem(body) {
        axios.post(this.url, body)
            .catch((error) => {console.log(error);});
    }
}
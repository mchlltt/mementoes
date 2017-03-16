let axios = require('axios');

export default class PostService {

    constructor(url) {
        this.url = url;
    }

    post(body) {
        axios.post(this.url, body)
            .then((response) => {console.log(response);})
            .catch((error) => {console.log(error)});
    }
}
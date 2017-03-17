let axios = require('axios');

export default class PostService {

    constructor(url) {
        this.url = url;
    }

    post(body) {
        axios.post(this.url, body)
            .then((response) => {res.json(response);})
            .catch((error) => {console.log(error)});
    }
}
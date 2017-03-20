let axios = require('axios');

export default class DeleteService {

    constructor(url) {
        this.url = url;
    }

    post(body) {
        axios.delete(this.url, body)
            .then((response) => {})
            .catch((error) => {console.log(error)});
    }
}
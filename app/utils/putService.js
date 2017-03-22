let axios = require('axios');

export default class PutService {

    constructor(url) {
        this.url = url;
    }

    put(body) {
        axios.put(this.url, body)
            .then((response) => {})
            .catch((error) => {console.log(error)});
    }
}
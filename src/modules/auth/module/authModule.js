const auth = require('../models/authModel');

module.exports = {
    async init(){
        return new auth();
    }
}
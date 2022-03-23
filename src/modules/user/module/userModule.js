const user = require('../models/userModel');

module.exports = {
    async init(){
        return new user();
    }
}
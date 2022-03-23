require("dotenv").config();
const jwt = require('jsonwebtoken');
const knex = require('../../config/database');
const { v5: uuidv5 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
    async createId(data){
        const id = uuidv5(data, process.env.SECRET_TOKEN_FOR_ID);
        return id;
    },

    async comparePassword (plainTextPassword, dbPassword){
        const match = await bcrypt.compare(`%$${plainTextPassword}&@`, dbPassword);
        return match;
    },

    async encriptPassword (password){
        const hash = await bcrypt.hashSync(`%$${password}&@`, 10);
        return hash;
    },

    async generateToken(data, secret, expiresIn){
        return jwt.sign(data, secret, expiresIn ? {expiresIn} : null);
    },

    async verifyToken(token, secret){
        return jwt.verify(token, secret, function(err, data){
            if (err) return false;
            return data;
        })
    },

    async updateLastLogin(id){
        try{
            const date = new Date();
            return knex('users').where('id', id).update('lastAcess_at', date);
        }catch(error){
            return error(error.message);
        }
    },

    dateFormat(day, month, year){
        if(day < 10){
            day = `0${day}`;
        }
        if(month < 10){
            month = `0${month}`;
        }
        return `${day}-${month}-${year}`;
    }
    
}
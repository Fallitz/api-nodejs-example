const knex = require('../../../config/database');
const Model = require('../../../repositories/models/model');
const util = require('../../../repositories/util/util');
const { v4: uuidv4 } = require('uuid');

class Auth extends Model{

    async authenticate({email, password}){
        try{
            const dbemail = await knex('users').where("email", email.toLowerCase()).select('id', 'fullname', 'type', 'password', 'active', 'role');
            if (dbemail.length > 0 && dbemail[0].active == 1) {
                const dbpassword = dbemail[0].password;
                const comparePassword = await util.comparePassword(password, dbpassword);
                if(comparePassword === true){   
                    const idToken = uuidv4();
                    const userId = {id: dbemail[0].id, code: idToken, role: dbemail[0].role};
                    const accessToken = await util.generateToken(userId, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15m');
                    const refreshToken = await util.generateToken(userId, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d');         
                    return ({status: true, message: {id: dbemail[0].id, name: dbemail[0].fullname, type: dbemail[0].type, accessToken: accessToken, refreshToken: refreshToken}});
                }
                else{
                    return {status: false};
                }
            } else{
                return {status: false};
            }  
        }catch(error){
            return {status: false, message: error.sqlMessage ?? error.message};
        }
    }
    
    async logout(token){
        try{
            const tokenInsert = await knex('tokens').insert({token, created_at: knex.fn.now()});  
            if(tokenInsert.length > 0 || tokenInsert > 0){         
                return {status: true};
            }else{
                return {status: false, message: 'Erro ao deslogar'};
            }
        }catch(error){
            return {status: false, message: error.sqlMessage ?? error.message};
        }
    }

    async refreshToken(id, token){
        try{
            const tokenInsert = await knex('tokens').insert({token, created_at: knex.fn.now()});  
            if(tokenInsert.length > 0 || tokenInsert > 0){
                const idToken = uuidv4();
                const userId = {id:id, code:idToken}
                const accessToken = await util.generateToken(userId, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15m');
                const refreshToken = await util.generateToken(userId, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d');      
                return {status: true, data: {accessToken: accessToken, refreshToken: refreshToken}};
            }else{
                return {status: false, message: 'Erro ao deslogar'};
            }

        }catch(error){
            return {status: false, message: error.sqlMessage ?? error.message};
        }
    } 

}

module.exports = Auth

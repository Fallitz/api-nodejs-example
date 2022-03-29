const knex = require('../../../config/database');
const Model = require('../../../repositories/models/model');
const util = require('../../../repositories/util/util');
const { v4: uuidv4 } = require('uuid');
const Mail = require('../../../repositories/services/mail');

class User extends Model{
    
    async create(data){
        try {
            const email = data.email.toLowerCase();
            const emailWasRegistered = await knex('users').where('email', email).select(['email']);
            if(emailWasRegistered.length > 0){
                return {status: false, message: 'Email já registrado', field: 'email'};
            }else{
                const id = await util.createId("idUser "+ email);
                const password = await util.encriptPassword(data.password);
                const user = await knex('users').insert({...data, id, email, password, "role":"user"}).then(() => {return knex ('users').where('email', email).select('id', 'email', 'fullname', 'type', 'role')});
                if(user.length > 0){

                    /*const mail = new Mail("fallitzdev@gmail.com", user[0].email,  "Welcome to Veloz API", `Olá ${user[0].fullname}, Seja Bem Vindo ao <b>Veloz API</b>!`);
                    await mail.send();*/
                    
                    const code = uuidv4();
                    const userId = {id: user[0].id, code: code, role: user[0].role};
                    const acessToken = await util.generateToken(userId, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15m');
                    const refreshToken = await util.generateToken(userId, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d');
                    
                    return {status: true, email: user[0].email, name: user[0].fullname, type: user[0].type, acessToken, refreshToken};
                }else{
                    return {status: false, message: 'Usuário não foi cadastrado'};
                }
            }
        } catch (error) {
            return {status: false, message: error.sqlMessage ?? error.message};
        }
    }

    async getUser(id){
        try {
            const user = await knex('users').where('active', 1).where('id', id).select(['id', 'email', 'fullname', 'birth', 'nickname', 'lastAcess_at']);
            if(user.length > 0){
                await util.updateLastLogin(user[0].id);
                return {status: true, message: user[0]};
            }else{
                return {status: false, message: 'Usuário não encontrado'};
            }
        } catch (error) {
            return {status: false, message: error.sqlMessage ?? error.message};
        }
    }
    
    async updateUser(id, data){
        try {
            const user = await knex('users').where('active', 1).where('id', id).update(data);
            if(user){
                return {status: true, message: 'Usuário atualizado com sucesso'};
            }else{
                return {status: false, message: 'Usuário não encontrado'};
            }
        } catch (error) {
            return {status: false, message: error.sqlMessage ?? error.message};
        }
    }

    async deleteUser(id){
        try {
            const user = await knex('users').where('active', 1).where('id', id).update({active: 0});
            if(user){
                return {status: true, message: 'Usuário deletado com sucesso'};
            }else{
                return {status: false, message: 'Usuário não encontrado'};
            }
        } catch (error) {
            return {status: false, message: error.sqlMessage ?? error.message};
        }
    }
}

module.exports = User
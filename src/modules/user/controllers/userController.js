const UserValidator = require('./validators/userValidator');
var model = require('../../../config/modules');
const { validate: uuidValidate } = require('uuid');
const authenticateRoles = require('../../../middleware/authenticateRoles');

module.exports = {

    async create(req, res){
        const data = req.body;
        UserValidator.create.validate({...data}).then(async function () {
            try {
                const userModel = await model.User;
                const userRegistered = await userModel.create(data);
                if(userRegistered.status){
                    return res.status(201).json({status: true, message: 'Usuário criado com sucesso', data: {email: userRegistered.email, name: userRegistered.name, type: userRegistered.type, acessToken: userRegistered.acessToken, refreshToken: userRegistered.refreshToken}});
                }else{
                    return res.status(403).json({status: false, message: userRegistered.message, field: userRegistered.field});
                }
            } catch (error) {
                res.status(500).json({status: false, message: error.message});
            }
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    },

    async getUser(req, res){
        const roles = await authenticateRoles( req.tokenData.role, ['user', 'admin']);
        if(roles){
            const id = req.tokenData.id;
            if (!uuidValidate(id)){
                return res.status(403).json({status: false, message: 'ID inválido'});
            }
            UserValidator.id.validate({id}).then(async function () {
                try {
                    const userModel = await model.User;
                    const user = await userModel.getUser(id);
                    if(user.status){
                        return res.status('200').json({status: true, data: user.message});
                    }else{
                        return res.status('403').json({status: false, message: user.message});
                    }
                } catch (error) {
                    throw error;
                }   
            }).catch(function (err) {
                res.status(500).json({status: false, message: err.errors[0], field: err.path});
            });
        }else{
            return res.status(403).json({status: false, message: 'Acesso negado'});
        }
    },
    
    /*
    async update(req, res){
        try {
             const userModel = await model.User;
            const user_id = req.params.id;
            const {email, fullname, birth, nickname} = req.body;

            if(email) {
                updateUserEmail(user_id, email, res);
            }

            if(nickname) {
                updateUserNickname(user_id, nickname, res);
            }

            // Get user logged id e select your type (user, admin ...)
            const userAuthenticated = req.tokenData.id;
            const getType = await userModel.where({id: userAuthenticated}, ['type']);
            if(getType == 'admin' || userAuthenticated == user_id){
                try {
                    const userModel =  mongodb.User;
                    await userModel.update({id: user_id}, {fullname, birth});
                    return res.status(200).json({message: "User Updated", data: {user: user_id}});
                } catch (error) {
                    return res.status(404).json({message: error.message});
                }
            }else{
                return res.status(500).json({message: 'Permission denied'});
            }  

        } catch (error) {
            return res.status(500).json({message: error.message});
        } 
    },

  
    async delete(req, res){
        try {
            const userModel = await model.User;
            const {user_id} = req.body;

            //Get user logged id e select your type (user, admin ...)
            const userAuthenticated = req.tokenData.id;
            const getType = await userModel.where({id: userAuthenticated}, ['type']);

            // Cheks if the user logged is admin or if the user id that will be deleted is equal to logged
            if(getType == 'admin' || userAuthenticated == user_id){
                try {
                    const userModel =  mongodb.User;
                    await userModel.delete(user_id);
                    return res.status(200).json({message: "User deleted", data: {user_id}});
                } catch (error) {
                    return res.status(404).json({message: error.message});
                }
            }else{
                return res.status(500).json({message: 'Permission denied'});
            }  

        } catch (error) {
            return res.status(500).json({message: error.message});
        } 
    },*/

}

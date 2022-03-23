const AuthValidator = require('./validators/authValidator');
var model = require('./../../../config/modules');
const util = require('./../../../repositories/util/util');
//const Mail = require('./../../../services/mail');

module.exports = {
    
    async auth(req, res){
        const data = req.body;
        AuthValidator.auth.validate({...data}).then(async function (){
                try 
                {
                    const authModel = await model.Auth;
                    const user = await authModel.authenticate(data);
                    if(user.status){
                        res.json({status: true, message: 'Bem-vindo de volta!', data:{ nome:user.message.name, type:user.message.type, accessToken: user.message.accessToken, refreshToken: user.message.refreshToken}});
                    }else{
                        res.status(403).json({status: false, message: 'E-mail e/ou senha estão incorretos.'}) ;
                    }
                }   
                catch (error) {
                    res.status(500).json({status: false, message: error.message });
                }
        }).catch(function (err) 
        {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    },

    async logout(req, res){
        try{
            const authModel = await model.Auth;
            const token = req.headers['access-token'];
            const result = await authModel.logout(token);
            if (result.status){
                res.status(200).json({ auth: false, accessToken: null });
            }else{
                res.sendStatus(403);
            }
        }catch (error) {
           res.sendStatus(500);
        }
    },
    
    async refreshToken(req, res){
        try{
            const tokenRefreshVerified = await util.verifyToken(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if(tokenRefreshVerified){
                if (tokenRefreshVerified.code == req.tokenData.code){
                    const authModel = await model.Auth;
                    const tokenForLogout = req.headers['access-token'];
                    const result = await authModel.refreshToken(req.tokenData.id, tokenForLogout);
                    if (result.status){
                        res.status(200).json({ accessToken: result.data.accessToken, refreshToken: result.data.refreshToken });
                    }
                }else{
                    res.sendStatus(403);
                }
            }else{
                res.sendStatus(403);
            }
        }catch (error) {
           res.sendStatus(500);
        }
    },

   /* async forgot(req, res){
        const {email} = req.body;
        try {
            const userModel = new User();
            const verifyEmail = await userModel.where({email}, ['email']);
            if(verifyEmail.length >= 1){
                generateAndSentPasswordRecovery(email);
                return res.status(200).json({message: 'Verifique seu e-mail'});
            }else{
                return res.status(500).json({message: 'E-mail não encontrado', field: 'email'});
            }
        } catch (error) {
            return res.status(500).json({message: error.message});
            
        }
    },

    async alterPassword(req, res){
        const {email, recovery_code, newPassword} = req.query;
        try {
            const userModel = new User();
            const checkCode = await userModel.where({email, recovery_code}, ['id']);
            if(checkCode.length >= 1){
                const encriptNewPassword = await userModel.encriptPassword(newPassword);
                await userModel.update({email}, {password: encriptNewPassword});
                return res.status(200).json({message: 'Senha alterada com sucesso'});
            }else{
                return res.status(500).json({message: 'Código Inváido'});
            }
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },*/
}

/*
async function generateAndSentPasswordRecovery(email){
    try {
        const code = uuidv4();
        const userModel = new User();
        await userModel.update({email}, {'recovery_code': code});
        const user = await userModel.where({email}, ['fullname']);
        const mail = new Mail("DevTube <transational@devtube.io>", email,"Recuperação de Senha ", `Olá ${user[0].fullname}, clique <a href="http://localhost:3333/api/v1/auth/forgot?recovery_code=${code}&email=${email}" target="_blank">aqui</a> para refazer uma nova senha !`);
        await mail.send();
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
}*/
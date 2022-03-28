const authenticateRoles = require('../../../middleware/authenticateRoles');
const AuthValidator = require('./validators/authValidator');
var model = require('./../../../modules');
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
        }).catch(function (err){
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    },

    async logout(req, res){
        const roles = await authenticateRoles( req.tokenData.role, ['user']);
        if(roles){
            try{
                const authModel = await model.Auth;
                const token = req.headers['access-token'];
                const result = await authModel.logout(token);
                if (result.status){
                    res.status(200).json({ auth: false, accessToken: null });
                }else{
                    res.status(403).json({status: false, message: result.message});
                }
            }catch (error) {
                return res.status(500).json({status: false, message: error.message});
            }
        }else{
            return res.status(403).json({status: false, message: 'Acesso negado'});
        }
    },
    
    async refreshToken(req, res){
        const roles = await authenticateRoles( req.tokenData.role, ['user']);
        if(roles){
            try{
                const tokenRefreshVerified = await util.verifyToken(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET);
                if(tokenRefreshVerified){
                    if (tokenRefreshVerified.code == req.tokenData.code){
                        const authModel = await model.Auth;
                        const tokenForLogout = req.headers['access-token'];
                        const result = await authModel.refreshToken(req.tokenData.id, tokenForLogout, req.tokenData.role);
                        if (result.status){
                            res.status(200).json({ accessToken: result.data.accessToken, refreshToken: result.data.refreshToken });
                        }
                    }else{
                        res.status(403).json({status: false, message: 'Token de atualização inválido.'});
                    }
                }else{
                    res.status(403).json({status: false, message: 'Token de atualização inválido.'});
                }
            }catch (error) {
                return res.status(500).json({status: false, message: error.message});
            }
        }else{
            return res.status(403).json({status: false, message: 'Acesso negado'});
        }
    },

}

const signale = require('signale');
const auth = require('./modules/auth/module/authModule')
const user = require('./modules/user/module/userModule');

class Modules {

    async initModules(){
        try{
            await this.initAuth();
            await this.initUser();
            signale.success('Modules Started');
            
        }catch{
            signale.error('Modules Not Started');
        }
    }
    
    async initAuth(){
        this.Auth = auth.init();
    }
    async initUser(){
        this.User = user.init();
    }
}

module.exports = new Modules();
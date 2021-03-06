const express = require('express');

const AuthenticateToken = require('../../../middleware/authenticateToken');
const UsersController = require('../controllers/userController');

class userRouter {
    static getRouter() {

        const Router = express.Router();
    
        Router.post('/register', UsersController.create);                                                               //REGISTER USER
        Router.get('/getUser', AuthenticateToken, UsersController.getUser);                                             //GET USER
        Router.post('/updateUser', AuthenticateToken, UsersController.updateUser);                                      //UPDATE USER
        Router.post('/deleteUser', AuthenticateToken, UsersController.deleteUser);                                      //DELETE USER
                    
        return Router;
    }
}

module.exports = userRouter.getRouter();

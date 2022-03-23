const jwt = require('jsonwebtoken');
const knex = require('../config/database');

module.exports = async (req, res, next) => {  
  const authHeader = req.headers['access-token']; 
  if (!authHeader){ 
    return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });  
  }
  const tokenValid = await knex('tokens').where('token', authHeader);
  if (tokenValid.length > 0){
    return res.status(401).json({ auth: false, message: 'Falha ao autenticar token.' });
  }
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, function(err, token){
    if (err) {return res.status(401).json({ auth: false, message: 'Falha ao autenticar token.' });}
    req.tokenData = token;
    next()
  });
}
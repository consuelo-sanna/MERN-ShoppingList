/** Avere un middleware mi serve perchè posso usarlo per rendere private delle route
 *  se inserito come parametro nel post get ecc permette di farle eseguire solo
 *  se il token e corretto.. altrimenti lancia un eccezione e non viene effettuata l operazione
 */

const config = require('config');
const jwt = require('jsonwebtoken');

// prende il token (che è nell header)
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Check for token
    if(!token) return res.status(401).json({msg: "No token, authorization denied"});
    

    try{    //Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        //Add user from payload
        req.user = decoded;
        next();
    }catch(e){
        res.status(400).json({msg: "Token is not Valid"});
    }
    
}

module.exports = auth;
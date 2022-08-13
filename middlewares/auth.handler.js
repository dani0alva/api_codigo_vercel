const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    //const bearerToken =
    //req.body.token || req.query.token || req.headers["x-access-token"];
    const bearerToken = req.headers['authorization'];

    console.log('bearer Token: ' + bearerToken);
    if(typeof bearerToken !== 'undefined'){
        //validamos el token
        const bearer = bearerToken.split(' ');
        const token = bearer[1];
        console.log('token : ' + token);
        try{
            const decoded = jwt.verify(token,'qwerty2022');

            console.log("el token decoifiado es: "+ decoded);
            console.log(decoded);
        }catch(err){
            return res.status(401).json({
                status:false,
                content:'token invalido'
            })
        }
        return next();
    }else{
        res.status(403).json({
            status:false,
            content:'no se encontro el token'
        })
    }
    
}

module.exports = {verifyToken}
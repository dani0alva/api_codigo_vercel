const express = require('express');
const jwt = require('jsonwebtoken');
const UsuarioService = require('../services/usuario.service');


function authApi(app){
    const router = express.Router();
    app.use('/auth',router);

    objUsuarioService = new UsuarioService();

    router.post('/',async function(req,res){
        const {body: usuario} = req;

        const authUsuario = await objUsuarioService.authenticate({usuario});
        if(authUsuario.id > 0){
            //creamos el token
            const token = jwt.sign(
                authUsuario,
                'qwerty2022',
                {
                    expiresIn:'1h'
                }
            )
            res.status(200).json({
                status:true,
                content:token
            })
        }else{
            res.status(401).json({
                status:false,
                content:'usuario o clave invalidos'
            })
        }
    })

}

module.exports = authApi;
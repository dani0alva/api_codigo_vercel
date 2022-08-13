const express = require('express');
const UsuarioService = require('../services/usuario.service');

function usuarioApi(app){
    const router = express.Router();
    app.use('/usuario',router);

    const objUsuarioService = new UsuarioService();

    router.post('/',async function(req,res){
        const {body : usuario} = req;
        try{
            const crearUsuario = await objUsuarioService.create({usuario});
            res.status(201).json({
                status:true,
                content:crearUsuario
            })
        }catch(err){
            res.status(500).json({
                status:false,
                content:'error al crear usuario'
            })
        }
    })
}

module.exports = usuarioApi;
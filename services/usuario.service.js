const MysqlLib  = require('../lib/mysql');
const bcrypt = require('bcryptjs')

class UsuarioService{

    constructor(){
        this.sql = new MysqlLib();
    }

    async create({usuario}){
        const passwordEncriptado = await bcrypt.hash(usuario.password,10);
        console.log("password encriptado : " + passwordEncriptado);
        
        const sqlCreate = `insert into tbl_usuario(usuario_nombre,usuario_password)
                           values('${usuario.usuario}','${passwordEncriptado}')`;
        
        await this.sql.querySql(sqlCreate);
        
        const sqlUsuarioCreado = `select usuario_id as id,usuario_nombre as usuario
                                 from tbl_usuario order by usuario_id desc limit 1`;

        const result = await this.sql.querySql(sqlUsuarioCreado);

        return result;
    }

    async authenticate({usuario}){

        try{
        const sqlAuth = `select usuario_id as id,usuario_password as pwd from tbl_usuario
                        where usuario_nombre = '${usuario.usuario}'`;


        console.log("la consulta es :"+sqlAuth);
        
        const result = await this.sql.querySql(sqlAuth);
        console.log('usuario id : ' + result[0].id);
        console.log('usuario pwd: ' + result[0].pwd);
        if(await bcrypt.compare(usuario.password,result[0].pwd)){
            const usuarioFound = {
                id:result[0].id,
                nombre:usuario.nombre
            }
            return usuarioFound;
        }
        else{
            const usuarioNotFound = {
                id:0,
                nombre:'none'
            }
            return usuarioNotFound
        }

    }catch(err){
        const usuarioNotFound = {
            id:0,
            nombre:'none'
        }
        return usuarioNotFound
        
        }
    }
}

module.exports = UsuarioService;
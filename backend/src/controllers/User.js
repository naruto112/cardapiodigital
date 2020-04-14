const dateFormat = require('dateformat');
const now = new Date();
const crypto = require('crypto');
const bcrypt = require ('bcrypt');
const connection = require('../database/connection');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');


module.exports = {

    // LOGIN USUARIO
    async authentication (request, response) {

        const { user, passwd } = request.body;

        await connection('usuario')
        .where({ user })
        .then(res => {

            bcrypt.compare(passwd, res[0].password, function(err, result) {

                if(result){
                    
                    const token = jwt.sign({ id: user[0].id }, authConfig.secret, {
                        expiresIn: 86400,
                    }) 

                    return response.json({ res, token })   

                } else {
                    
                    return response.status(400).send({ error: 'Invalid password'})

                }
                 
            }); 
            
        })
    },

    // ATUALIZA UM USUARIO
    async update(request, response) {

        const token = request.headers.authorization;
        const valid = jwt.verify(token, authConfig.secret)


        if(valid.id) {

            const { id, name, user, passwd, mail, phone } = request.body;
            const salt = bcrypt.genSaltSync(10);
            const password = bcrypt.hashSync(passwd, salt);
            const update_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

            await connection('usuario')
                .where({
                    id
                })
                .update({
                    name,
                    user,
                    password,
                    mail,
                    phone,
                    update_datetime,
                }).then(res => {
                    return response.json({ res, valid });
                })
        }
        

    },

    // CRIA UM USUARIO
    async create( request, response) {


            const { name, user, passwd, mail, phone } = request.body;
            const token = crypto.randomBytes(25).toString('HEX');
            const salt = bcrypt.genSaltSync(10);
            const password = bcrypt.hashSync(passwd, salt);
            const created_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
            const update_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

            await connection('usuario')
                .insert({
                    user,
                    name,
                    password,
                    mail,
                    phone,
                    token,
                    created_datetime,
                    update_datetime,
                });

            return response.json({ status: true });


    },

    // DELETE UM USUARIO
    async delete(request, response) {
    },

    // EXIBE TODOS OS USUARIOS
    async all (request, response) {
    },
}
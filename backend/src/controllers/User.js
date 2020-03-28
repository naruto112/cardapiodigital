const dateFormat = require('dateformat');
const now = new Date();
const crypto = require('crypto');
const md5 = require('md5');
const connection = require('../database/connection');


module.exports = {


    // EXIBE TODOS OS USUARIOS
    async all (request, response) {
        const token = request.headers.authorization;


        const user = await  connection('usuario')
            .where('token', token)
            .select('*');

        return response.json({ user })
    },

    // EXIBE UM USUARIO
    async index (request, response) {

        const { user, passwd } = request.body;
        const password = md5(passwd);

        await connection('usuario')
                .where({user, password})
                .then(result => {
                    return response.json({ result })
                })
    },

    // ATUALIZA UM USUARIO
    async update(request, response) {

        const token = request.headers.authorization;
        const user = await  connection('usuario')
            .where('token', token)
            .select('*');


        if(user.id) {
            const { id, name, user, passwd, mail, phone } = request.body;
            const password = md5(passwd);
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
                });
        }

        return response.json({ user });

    },

    // DELETE UM USUARIO
    async delete(request, response) {

        const token = request.headers.authorization;
        const user = await  connection('usuario')
            .where('token', token)
            .select('*');

        if(user.id) {

            const { id } = request.body;
            await connection('usuario')
                .where({ id })
                .del();

            return response.json({ status: true });
        }
    },

    // CRIA UM USUARIO
    async create( request, response) {

        const token = request.headers.authorization;
        const user = await  connection('usuario')
            .where('token', token)
            .select('*');

        if(user.id) {

            const { name, user, passwd, mail, phone } = request.body;
            const token = crypto.randomBytes(25).toString('HEX');
            const password = md5(passwd);
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

        }

    }

    
}
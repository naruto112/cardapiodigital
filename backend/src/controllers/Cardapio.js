const connection = require('../database/connection');
const dateFormat = require('dateformat');
const now = new Date();


module.exports ={

    // EXIBE TODOS OS CARDAPIOS REFERENTE A PESSOA
    async all (request, response) {
        const token = request.headers.authorization;

        const user = await connection('usuario')
            .where('token', token)
            .select('*');

        const cardapio = await connection('cardapio')
            .where('usuario_id', user[0].id)
            .select('*');

        return response.json({ cardapio })
    },

    // CRIA UM CARDAPIO
    async create( request, response) {

        const { nome, descricao } = request.body;
        const token = request.headers.authorization;
        const created_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
        const update_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

        if(token){
            const user = await  connection('usuario')
                .where('token', token)
                .select('*');

            const usuario_id = user[0].id;

            await connection('cardapio')
                .insert({
                    nome,
                    descricao,
                    created_datetime,
                    update_datetime,
                    usuario_id
                });

            return response.json({ status: true });
        } else {
            return response.json({ status: 'notfound token' });
        }

    }

}
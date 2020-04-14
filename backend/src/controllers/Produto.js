const connection = require('../database/connection');
const dateFormat = require('dateformat');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
const now = new Date();


module.exports ={

    // CRIA UM PRODUTO RELACIONADO AO CARDAPIO
    async create (request, response) {
        const { nome, descricao, valor, base64, id } = request.body;
        const token = request.headers.authorization;

        const created_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
        const update_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

        jwt.verify(token, authConfig.secret, function (err, decoded) {
            
            if(err) {
                const { message } = err;
                return response.json({ message })    
            }

            certisign = decoded;

        });

        if(certisign){

            const cardapio = await connection('menu')
                .where('id', id)
                .select('*');

            const cardapio_id = cardapio[0].id;

            const produto = await connection('produto')
                .insert({
                    nome,
                    descricao,
                    valor,
                    base64,
                    created_datetime,
                    update_datetime,
                    menu_id: cardapio_id,
                });

            return response.json({ id: produto[0], nome, descricao, valor });
        } else {
            return response.json({ status: 'notfound token' });
        }
    },

    //EXIBE O PRODUTO RELACIONADO AO SEU CARDAPIO
    async allByid (request, response) {
        
        const { id } = request.query;
        const token = request.headers.authorization;

        jwt.verify(token, authConfig.secret, function (err, decoded) {
            
            if(err) {
                const { message } = err;
                return response.json({ message })    
            }

            certisign = decoded;

        });

        if(certisign) {

            const produto = await  connection('produto')
                .where('menu_id', id)
                .select('*');


            return response.json({ produto });
        } else {
            return response.json({ status: 'notfound token' });
        }


    },

    //DELETA O PRODUTO 
    async delete (request, response) {

        const { id } = request.query;
        const token = request.headers.authorization;

        const user = await connection('usuario')
                .where('token', token)
                .select('*');

        if(user[0]) {

            const produto = await connection('produto')
                    .where({ id })
                    .del()
            
            return response.json({ produto });
        } else {
            return response.json({ status: 'notfound token' });
        }


    },

    //ATUALIZA O PRODUTO
    async update (request, response) {

        const { id } = request.query;
        const { nome, descricao, valor } = request.body;
        const token = request.headers.authorization;
        const update_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

        const user = await connection('usuario')
                .where('token', token)
                .select('*');

        if(user[0]) {

            const produto = await connection('produto')
                    .where({ id })
                    .update({ 
                        nome,
                        descricao,
                        valor,
                        update_datetime, 
                    });

            return response.json({ produto });

        } else {
            return response.json({ status: 'notfound token' });
        }
        
    }

}
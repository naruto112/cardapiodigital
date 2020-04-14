const connection = require('../database/connection');
const dateFormat = require('dateformat');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
const now = new Date();


module.exports ={

    // EXIBE TODOS OS CARDAPIOS REFERENTE A PESSOA
    async all (request, response) {

        const token = request.headers.authorization;
        let certisign = '';

        jwt.verify(token, authConfig.secret, function (err, decoded) {
            
            if(err) {
                const { message } = err;
                return response.json({ message })    
            }

            certisign = decoded;

        });

        if(certisign) {

            const { id }  = request.body

            const cardapio = await connection('menu')
                .groupBy('menu.id')
                .where('usuario_id', id)
                .leftJoin('produto', {'menu.id': 'produto.menu_id'})
                .select('menu.id','menu.nome', 'menu.descricao', 'menu.usuario_id', 'produto.nome as Produto');

            return response.json({ cardapio })
            
        }
        
    },


    // EXIBE O CARDAPIO PELO ID

    async getCardapio(request, response) {

        const token = request.headers.authorization;
        const valid = jwt.verify(token, authConfig.secret)

        if(valid.id) {

            const { id } = request.body;

            const user = await connection('usuario')
            .where('id', id)
            .select('*');


            if(user[0]) {

                const { id } = request.query;

                const cardapio = await connection('menu')
                    .where('id', id)
                    .select('*');

                return response.json({ cardapio });


            } else {
                return response.json({ status: false });
            }
        }
        

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

            await connection('menu')
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
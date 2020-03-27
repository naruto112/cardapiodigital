// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    version: '5.6',
    connection: {
      host : 'ec2-18-221-220-204.us-east-2.compute.amazonaws.com',
      user : 'renato_souza',
      password : 'Moschetta@18',
      database : 'cardapiodigital'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault  : true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

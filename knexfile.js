module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'sail',
        password: 'password',
        database: 'api_venom'
      },
      migrations: {
        directory: './db/migrations',
      },
    },
  };
  
module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'dev',
        password: 'password_dev',
        database: 'api-venom',
      },
      migrations: {
        directory: './db/migrations',
      },
    },
  };
  
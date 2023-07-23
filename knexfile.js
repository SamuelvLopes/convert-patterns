module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'dev',
        password: 'password_dev',
        database: 'postgres'
      },
      migrations: {
        directory: './db/migrations',
      },
    },
  };
  
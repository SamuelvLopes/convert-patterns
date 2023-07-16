const { Client } = require('pg');

const client = new Client({
  user: 'dev',
  host: 'localhost',
  database: 'api-venom',
  password: 'password_dev',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Conexão bem-sucedida com o banco de dados PostgreSQL');
    
    /* Executando uma consulta
    client.query('SELECT 1+1')
      .then((result) => {
        const rows = result.rows;
        console.log(rows);
      })
      .catch((error) => {
        console.error('Erro ao executar a consulta', error);
      })
      .finally(() => {
        //client.end(); // Fechando a conexão com o banco de dados
      });
      */
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados PostgreSQL', error);
  });

  module.exports=client;
const express = require('express');

global.knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'dev',
    password: 'password_dev',
    database: 'api-venom'
  }
  });
const id_company=1;
const app = express();
const session = require('./entity/Session');
const porta = 1603;
global.venom = require('venom-bot');

app.get('/',(req,res,next)=>{
    res.send({nome:'notebool',preco: 123.45});
});

app.post('/session/:name',(req,res,next)=>{
  knex('session')
  .select('*')
  .where('name', '=', req.params.name)
  .where('id_company', '=', id_company)
  .then(async (rows) => {
    if(isEmpty(rows)){
      const currentSession = session();
      currentSession.name=req.params.name;
      currentSession.id_company=id_company;
      currentSession.create();
      currentSession.qr =  await currentSession.start();
      res.send(currentSession);
      
    }else{
    res.send("já existe");
    }
  })
   
});

app.listen(porta,()=>{
    console.log('servidor rodando na porta '+porta);
});


function isEmpty(variable) {
  // Verifica se a variável é nula ou indefinida
  if (variable === null || variable === undefined) {
    return true;
  }

  // Verifica se a variável é uma string vazia
  if (typeof variable === 'string' && variable.trim() === '') {
    return true;
  }

  // Verifica se a variável é um array vazio
  if (Array.isArray(variable) && variable.length === 0) {
    return true;
  }

  // Verifica se a variável é um objeto vazio
  if (typeof variable === 'object' && Object.keys(variable).length === 0) {
    return true;
  }

  // Caso contrário, a variável não está vazia
  return false;
}

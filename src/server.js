// app.js


// Criando o objeto Receiver
//const filesToConvert = ['arquivo1.jpg', 'arquivo2.txt', 'arquivo3.csv'];

//const fileConverter = new FileConverter(filesToConvert);

// Criando as estratégias de conversão
//const txtToMdStrategy = new TxtToMdConverterStrategy();
//const csvToXlsStrategy = new CsvToXlsConverterStrategy();

// Criando os comandos com suas respectivas estratégias
//const txtToMdCommand = new FileDefineCommand(fileConverter, txtToMdStrategy);
//const csvToXlsCommand = new FileDefineCommand(fileConverter, csvToXlsStrategy);

// Definindo a estratégia atual no FileConverter
//fileConverter.setStrategy(txtToMdStrategy);

// Executando os comandos
//txtToMdCommand.execute();
//csvToXlsCommand.execute();

// Alterando a estratégia atual no FileConverter
//fileConverter.setStrategy(csvToXlsStrategy);
//fileConverter.setStrategy(txtToMdCommand);

// Executando o comando novamente
//fileConverter.convert();

const express = require('express');

global.knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'dev',
    password: 'password_dev',
    database: 'postgres'
  }
  });
const id_company=1;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const session = require('./entity/Session');
const porta = 1603;

global.venom = require('venom-bot');
global.clients ={};
global.start = require('./core'); 
app.get('/',(req,res,next)=>{
  console.log(req.body.sssd);
    res.send({nome:'ss',preco: 123.45});
});
app.post('/message/:name',(req,res,next)=>{
   
      console.log(global.clients);
      console.log(global.clients[req.params.name]);
      
     global.clients[req.params.name]
  .sendText(req.body.chatId, req.body.message)
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
    res.send(global.clients);
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
      currentSession.webhook=req.body.webhook;
      currentSession.create();
      currentSession.qr =  await currentSession.start();
      res.send(currentSession);
      
    }else{
    res.send("já existe");
    }
  })
   
});

app.use('/files', express.static('files'));

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

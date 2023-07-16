const express = require('express');
const db = require('./db');
const app = express();

const porta = 1603;
db.query('SELECT 1+1')
      .then((result) => {
        const rows = result.rows;
        console.log(rows);
      })

app.get('/',(req,res,next)=>{
    res.send({nome:'notebool',preco: 123.45});
});

app.post('/session/:name',(req,res,next)=>{
    
    res.send(req.params.name);
});

app.listen(porta,()=>{
    console.log('servidor rodando na porta '+porta);
});
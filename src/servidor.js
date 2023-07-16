const porta = 1603;

const express = require('express');

const app = express();

app.get('/',(req,res,next)=>{
    res.send({nome:'notebool',preco: 123.45});
});

app.listen(porta,()=>{
    console.log('servidor rodando na porta '+porta);
});
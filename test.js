const fs = require('fs');
const dataAtual = new Date();
const dia = dataAtual.getDate();
            const mes = dataAtual.getMonth() + 1; // Os meses são baseados em zero (janeiro é 0)
            const ano = dataAtual.getFullYear();
            const horas = dataAtual.getHours();
            const minutos = dataAtual.getMinutes();
            const segundos = dataAtual.getSeconds();

            let caminhoDaPasta = `${dia}/${mes}/${ano}/${horas}/${minutos}${segundos}/`;
if (!fs.existsSync(caminhoDaPasta)) {
  fs.mkdirSync(caminhoDaPasta, { recursive: true });
  console.log('Pasta criada com sucesso!');
} else {
  console.log('A pasta já existe.');
}
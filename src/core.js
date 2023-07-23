const axios = require('axios');
const { default: cluster } = require('cluster');
const fs = require('fs');
const mime = require('mime-types');

function gerarStringAleatoria(tamanho) {
    let resultado = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }
  
    return resultado;
  }
  



module.exports= (client,session) =>{

    global.clients[session.name]=client;
    client.onMessage( async (message) => {
        console.log('recebeu mensagem');
        console.log(session.name+':'+message.type);
        let fileName =message.type;

        let types = ['chat', 'location', 'call_log','poll_creation','vcard'];
        if (!types.includes(message.type)) {
            try{
            console.log('é arquivo')
            const buffer = await client.decryptFile(message);
            // At this point you can do whatever you want with the buffer
                        // Most likely you want to write it into a fileconst dataAtual = new Date();

            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const mes = dataAtual.getMonth() + 1; // Os meses são baseados em zero (janeiro é 0)
            const ano = dataAtual.getFullYear();
            const horas = dataAtual.getHours();
            const minutos = dataAtual.getMinutes();
            const segundos = dataAtual.getSeconds();

            caminhoDaPasta = `files/${dia}/${mes}/${ano}/${horas}/${minutos}${segundos}/`;
             fileName = 'file-'+gerarStringAleatoria(30)+`.${mime.extension(message.mimetype)}`;
            if (!fs.existsSync(caminhoDaPasta)) {
                fs.mkdirSync(caminhoDaPasta, { recursive: true });
                console.log('Pasta criada com sucesso!');
              } else {
                console.log('A pasta já existe.');
              }

             fileName = caminhoDaPasta+fileName;
            await fs.writeFile(fileName, buffer, (err) => {
                //fs.writeFileSync(caminhoDaPasta+fileName, buffer);
            });
            } catch (erro) {
              console.error('Ocorreu um erro:', erro);
            }
          }
          let event = JSON.stringify({message:message,client:client,session:session,fileName:fileName});
       try {
        const resposta = await axios.post(session.webhook, event);
    
        console.log('Resposta:', resposta.data);
      } catch (erro) {
        console.error('Ocorreu um erro:', erro);
      }
    });
}
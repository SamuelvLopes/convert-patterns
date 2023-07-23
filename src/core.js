const axios = require('axios');
const { default: cluster } = require('cluster');
const { FileDefineCommand, FileConverter, jpgConvertCommand, CsvToXlsConverterStrategy } = require('./entity/command');
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
      let resposta='Recebi sua mensagem';
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
            
            fileName = 'file-'+gerarStringAleatoria(30)+`.${message.mimetype.replace("/", ".")}`;
            if (!fs.existsSync(caminhoDaPasta)) {
                fs.mkdirSync(caminhoDaPasta, { recursive: true });
                console.log('Pasta criada com sucesso!');
              } else {
                console.log('A pasta já existe.');
              }

             fileName = caminhoDaPasta+fileName;
            
            await fs.writeFile(fileName, buffer, (err) => {
               const fileConverter = new FileConverter([fileName]);
               fileConverter.client=client;
               fileConverter.message=message;

             resposta = fileConverter.convert();
             console.log(resposta)
              
            });
            //console.log(message.chatId);
          

           // console.log([resposta,message.chttps://wfv2-dev03.workfacilit.com/hatId]);

            
         


            } catch (erro) {
              console.error('Ocorreu um erro:', erro);
            }
          }

          await client
            .sendText(message.chatId, resposta)
            .then((result) => {
             // console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
             // console.error('Error when sending: ', erro); //return object error
            });
          //let event = JSON.stringify({message:message,client:client,session:session,fileName:fileName});
       try {
        //const resposta = await axios.post(session.webhook, event);
    
       // console.log('Resposta:', resposta.data);
      } catch (erro) {
       // console.error('Ocorreu um erro:', erro);
      }
    });
}
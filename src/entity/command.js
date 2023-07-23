const sharp = require('sharp');
const fs = require('fs');

class Command {
    constructor(receiver) {
      this.receiver = receiver;
    }
  
    execute() {
      throw new Error('O método execute deve ser implementado na subclasse Command.');
    }
    
    
  }
  class FileIterator {
    constructor(files) {
      this.files = files;
      this.currentIndex = 0;
    }
  
    next() {
      if (this.hasNext()) {
        const currentFile = this.files[this.currentIndex];
        this.currentIndex++;
        console.log(currentFile);
        return currentFile;
      }
      return null;
    }
  
    hasNext() {
      return this.currentIndex < this.files.length;
    }
  }
  
  class FileDefineCommand extends Command {
    constructor(receiver, strategy) {
      super(receiver);
      this.strategy = strategy;
    }
  
    execute() {
      console.log(this);
      this.strategy.execute(this.receiver);
    }

  }
  
  class FileConverterStrategy {
    execute(receiver) {
      throw new Error('O método execute deve ser implementado na subclasse FileConverterStrategy.');
    }
  }
  
  class jpgConvertCommand extends FileConverterStrategy {
    save(){
      console.log('save');
    }
    process(receiver){

    }
    execute(receiver) {
      sharp(receiver.file)
      .toFile(receiver.file+'.png')
      .then(() => {
               receiver.client
              .sendFile(
                receiver.message.chatId,
                receiver.file+'.png',
                'file_name',
                'Segue arquivo convertido: http://localhost:1603/'+receiver.file+'.png'
              )   .then((result) => {
                //console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                //console.error('Error when sending: ', erro); //return object error
              });
      })
      .catch((err) => {
        console.error('Erro ao converter a imagem:', err);
      });
      return { file:receiver.file,mensage:receiver.file+'.png'};

     }
    
  }
  class docxConvertCommand extends FileConverterStrategy {
    save(){
      console.log('save');
    }
    process(receiver){

    }
    transformarNomeDoArquivo(caminhoOriginal, novaExtensao) {
      // Verifica se o caminhoOriginal possui a extensão ".document"
      if (caminhoOriginal.endsWith(".document")) {
        // Obtém o nome do arquivo sem o caminho e a extensão ".document"
        const nomeDoArquivoSemExtensao = caminhoOriginal.split("/").pop().slice(0, -9);
        // Adiciona a nova extensão ao nome do arquivo
        const novoNomeDoArquivo = nomeDoArquivoSemExtensao + novaExtensao;
        return novoNomeDoArquivo;
      } else {
        // Caso o caminhoOriginal não possua a extensão ".document", retorna o nome do arquivo original inalterado
        return caminhoOriginal.split("/").pop();
      }
    }
    execute(receiver) {
      console.log(receiver.file);
      const { exec } = require('child_process');
      const pandocCmd = `libreoffice --convert-to pdf ./${receiver.file}`;

      
    console.log({});
    exec(pandocCmd, (error, stdout, stderr) => {
      if (error) {
        console.error('Erro ao converter o arquivo:', stderr);
      } else {
        console.log('Arquivo convertido para PDF com sucesso!');
        console.log(error,stderr,stdout);
        console.log(this.transformarNomeDoArquivo(receiver.file,'.pdf'));
        receiver.client
        .sendFile(
          receiver.message.chatId,
          './'+this.transformarNomeDoArquivo(receiver.file,'.pdf'),
          'file_name',
          'Segue arquivo convertido: http://localhost:1603/'+this.transformarNomeDoArquivo(receiver.file,'.pdf')
        )   .then((result) => {
          //console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          //console.error('Error when sending: ', erro); //return object error
        });
      }
    });
     
    
      
      

      /*sharp(receiver.file)
      .toFile(receiver.file+'.png')
      .then(() => {
               receiver.client
              .sendFile(
                receiver.message.chatId,
                receiver.file+'.png',
                'file_name',
                'Segue arquivo convertido: http://localhost:1603/'+receiver.file+'.png'
              )   .then((result) => {
                //console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                //console.error('Error when sending: ', erro); //return object error
              });
      })
      .catch((err) => {
        console.error('Erro ao converter a imagem:', err);
      });*/
      return { file:receiver.file,mensage:receiver.file+'.pdf'};

     }
    
  }
  class pngConvertCommand extends FileConverterStrategy {
    save(){
      console.log('save');
    }
    process(receiver){

    }
    execute(receiver) {
      
      console.log('Convertendo arquivos de .png para .jpeg no comand');
      return receiver.file;
      // Implemente a lógica real para converter as extensões dos arquivos de .txt para .md aqui
    }
    
  }
  
  class CsvToXlsConverterStrategy extends FileConverterStrategy {
    execute(receiver) {
      console.log('Convertendo arquivos de .csv para .xls');
      console.log('_______________________________________');
      // Implemente a lógica real para converter as extensões dos arquivos de .csv para .xls aqui
    }
  }
  
 
  class FileConverter {
    constructor(files) {
        this.files = files;
      }
      convert() {
        const fileIterator = new FileIterator(this.files);
        while (fileIterator.hasNext()) {

          this.file = fileIterator.next();
          this.DefineCommand(this.file);
          this.extractContent(this.file);
          this.result = this.convertContent(this.file);
          this.saveFile(this.file);
          this.strategy=false;
        }
        return this.result;
      }
  
      DefineCommand(file) {
      //console.log('Abrindo arquivo...'+file);
      const extension = this.getFileExtension(file);
      
      console.log(extension);
      switch(extension){

        case 'jpg':
        case 'jpeg':
        this.strategy = new jpgConvertCommand(this);
          break;
        case 'png':
        this.strategy = new pngConvertCommand(this);
          break;
        case 'html':   
        this.strategy = new htmlConvertCommand(this);
          break;
        case 'document':
        this.strategy = new docxConvertCommand(this);
          break;  
        
      }
      // abrir arquivo
      // definir strategy
    }
  
    extractContent(file) {
      if (this.strategy) {

        console.log('extract conteúdo...'+file);
        this.strategy.process(this);
      } else {
        console.log('Estratégia de conversão não definida.');
      }
    }
  
    convertContent(file) {
        if (this.strategy) {

            console.log('Convertendo conteúdo...'+file);
            return  this.strategy.execute(this);
          } else {
            console.log('Estratégia de conversão não definida.');
          }
    }
  
    saveFile(file) {
      
      if (this.strategy) {

        console.log('Convertendo conteúdo...'+file);
        this.strategy.save(this);
      } else {
        console.log('Estratégia de conversão não definida.');
      }
    }
  
    setStrategy(strategy) {
      this.strategy = strategy;
    }
    getFileExtension(fileName) {
      const lastDotIndex = fileName.lastIndexOf('.');
      if (lastDotIndex === -1 || lastDotIndex === 0 || lastDotIndex === fileName.length - 1) {
        return ''; // Não há extensão ou o ponto está no início ou final do nome do arquivo
      } else {
        this.ext =  fileName.slice(lastDotIndex + 1);
        return this.ext;
      }
    }
  }
  
  
  module.exports = { FileDefineCommand, FileConverter, jpgConvertCommand, CsvToXlsConverterStrategy };
  
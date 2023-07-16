function operacaoAssincrona() {
  return new Promise((resolve, reject) => {
    // Simulação de operação assíncrona
    setInterval(() => {
      resolve({ resultado: 'Resultado da operação assíncrona', outroValor: 'Outro valor' });
      console.log('continua');
      console.log('continua');
      console.log('continua');
      console.log('continua');
      console.log('continua');
      console.log('continua');
      console.log('continua');
      console.log('continua');
    }, 2000);
  });
}

async function executarOperacaoAssincrona() {
  try {
    const { resultado, outroValor } = await operacaoAssincrona();
    console.log('Resultado:', resultado); // Valor intermediário desejado
    console.log('Outro valor:', outroValor); // Outro valor da operação assíncrona

    // Continue com o restante da lógica assíncrona aqui
    // ...
  } catch (erro) {
    console.error('Ocorreu um erro:', erro);
  }
}

executarOperacaoAssincrona();

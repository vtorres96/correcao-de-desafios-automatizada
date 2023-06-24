const path = require('path');
const { exec } = require('child_process');
const killPort = require('kill-port');
const { iniciarProcessamentoColecao } = require('./executar-collection');

const projetos = require('../subdiretorios.json')["subdiretorios"];
const portaServidor = 3000;

async function processar(diretorio) {
  let diretorioDesafio = `${diretorio}/desafio-backend-modulo-02-sistema-bancario-dbe-t02`
  const caminhoAbsoluto = path.resolve(__dirname, '..', 'Desafios-M02', diretorioDesafio);

  process.chdir(caminhoAbsoluto);

  return new Promise((resolve, reject) => {
    console.log('Iniciando servidor...')
    let processo = exec('npm run dev', { shell: true });
    let executaProcesso = true

    processo.stdout.on('data', async (data) => {
      console.log(data);
      // Aguarda 5 segundos apos iniciar servidor para executar colecao 
      setTimeout(async () => {
        if (executaProcesso) {
          executaProcesso = false
          await iniciarProcessamentoColecao(diretorio);
          console.log('derrubando porta...')
          await killPort(portaServidor); 
          console.log('encerrando...')
          resolve()
        }
      }, 5000);
    });

    processo.stderr.on('data', (data) => {
      console.log(data);
    });

    processo.on('close', (code) => {
      console.log(`O servidor foi encerrado com o código de saída ${code}`);
      resolve();
    });

    processo.on('error', (error) => {
      console.error('Erro ao iniciar o servidor:', error);
      reject(error);
    });
  });
}

async function iniciarAnalise(projeto) {
    console.log(`Analisando o projeto do aluno: ${projeto}`);
    try {
      await processar(projeto);
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    }
}

async function loopAnaliseProjetos(projetos) {
  for (let projeto of projetos) {
    await iniciarAnalise(projeto);
  }
}

loopAnaliseProjetos(projetos);

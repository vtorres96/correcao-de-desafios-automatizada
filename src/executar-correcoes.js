const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const killPort = require('kill-port');
const { gerarNomenclaturaDiretorio } = require('./gerar-nomenclatura-diretorio');
const { iniciarProcessamentoColecao } = require('./executar-collection');
const projetos = require('../subdiretorios.json')["subdiretorios"];

const args = process.argv;
const repositorio = args[2];
const arquivoCollection = args[3];
const collection = require(`./collections/desafio${arquivoCollection}-collection.json`);

async function processar(diretorio, repositorio) {
  const portaServidor = 3000;
  const diretorioDesafios = gerarNomenclaturaDiretorio(repositorio);

  if (!diretorioDesafios) {
    console.log('URL do desafio informada está em um formato inválido');
    return;
  }

  let diretorioDesafioAluno = `${diretorio}/${repositorio}`
  const caminhoAbsoluto = path.resolve(__dirname, '..', 'Desafios', `${diretorioDesafios}`, diretorioDesafioAluno);

  process.chdir(caminhoAbsoluto);

  return new Promise((resolve, reject) => {
    console.log('Iniciando servidor...')
    let processo = exec('npm run dev', { shell: true });
    let executaProcesso = true

    processo.stdout.on('data', async (data) => {
      console.log(data);
      // Aguarda 5 segundos após iniciar servidor para executar coleção
      setTimeout(async () => {
        if (executaProcesso) {
          executaProcesso = false;
          try {
            await iniciarProcessamentoColecao(`Desafios/${diretorioDesafios}/${diretorio}`, collection);
            console.log('derrubando porta...')
            await killPort(portaServidor);
            console.log('encerrando...')
            resolve();
          } catch (error) {
            console.error('Erro ao executar a coleção de testes:', error);
            gravarLog(`Erro capturado do servidor: ${error}`);
            resolve();
          }
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
      gravarLog(`Erro capturado ao iniciar o servidor: ${error}`);
      resolve();
    });
  });
}

async function iniciarAnalise(projeto, repositorio) {
  console.log(`Analisando o projeto do aluno: ${projeto}`);
  try {
    await processar(projeto, repositorio);
  } catch (error) {
    console.log('Ocorreu um erro: ', error);
    gravarLog(`Erro capturado durante a análise do projeto ${projeto}. Erro: ${error}`);
  }
}

async function loopAnaliseProjetos(projetos, repositorio) {
  for (let projeto of projetos) {
    await iniciarAnalise(projeto, repositorio);
  }
}

function gravarLog(mensagem) {
  const logFilePath = path.resolve(__dirname, 'log.txt');
  const formattedMessage = `[${new Date().toISOString()}] - ${mensagem}\n`;

  fs.appendFile(logFilePath, formattedMessage, (error) => {
    if (error) {
      console.error('Erro ao gravar no arquivo de log: ', error);
    }
  });
}



loopAnaliseProjetos(projetos, repositorio);

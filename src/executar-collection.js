const path = require('path');
const fs = require('fs');
const newman = require('newman');
const args = process.argv;

require('dotenv').config();

function executarCollection(collection) {
  console.log('Iniciando execução da coleção...');
  let environment = null;
  const arquivoCollection = args[3];

  if (arquivoCollection == 'm03' || arquivoCollection == 'm05') {
    environment = require(`./collections/desafio-${arquivoCollection}-environment.json`);
  }

  const options = {
    collection: collection,
    environment: environment
  };

  return new Promise((resolve, reject) => {
    newman.run(options, function (error, summary) {
      if (error) {
        console.error('Erro na execução da coleção:', error);
        reject(error);
      } else {
        resolve(summary);
      }
    });
  });
}

function escreverLog(diretorio, log) {
  const caminhoAbsoluto = path.resolve(__dirname, '..', diretorio);
  const logFilePath = `${caminhoAbsoluto}/log.txt`;

  fs.writeFileSync(logFilePath, log);
}

async function iniciarProcessamentoColecao(projeto, collection) {
    try {
      const summary = await executarCollection(collection);
      await gerarArquivoDeLog(projeto, summary);
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    }
}

function gerarArquivoDeLog(projeto, summary) {
  if (summary.run.failures.length > 0) {
    console.log('Erros encontrados:');
    let log = 'Erros encontrados:\n';

    summary.run.failures.forEach((failure) => {
      console.log(failure.source.name);
      log += `${failure.source.name}\n`;
    });

    escreverLog(projeto, log);
  } else {
    let mensagem = 'Nenhum erro encontrado. Portanto, resta analisar pontos de melhoria para sugerir e parabenizar o aluno'
    escreverLog(projeto, mensagem);
    console.log(mensagem);
  }
}

module.exports = {
  iniciarProcessamentoColecao
}
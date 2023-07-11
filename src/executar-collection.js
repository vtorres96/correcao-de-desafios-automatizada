const path = require('path');
const fs = require('fs');
const newman = require('newman');
require('dotenv').config();

const collection = require('./collections/desafio-m02-collection.json');

function executarCollection(collection) {
  console.log('Iniciando execução da coleção...');
  const options = {
    collection: collection,
    environment: {
      baseUrl: 'localhost:3000',
      senha_banco: 'Cubos123Bank',
    },
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

  fs.appendFileSync(logFilePath, log);
}

async function iniciarProcessamentoColecao(projeto) {
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
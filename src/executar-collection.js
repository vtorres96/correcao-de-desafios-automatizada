const path = require('path');
const fs = require('fs');
const newman = require('newman');

// Carrega o arquivo JSON da coleção
const collection = require('./desafio-m02-collection.json');

// Função para executar a coleção no Postman
function executarColecao(collection) {
  console.log('Iniciando execução da coleção...');
  const options = {
    collection: collection,
    environment: {
      // Defina aqui as variáveis de ambiente, se necessário
      baseUrl: 'localhost:3000',
      senha_banco: 'Cubos123Bank',
    },
    // Outras configurações da execução da coleção
  };

  // Retorna uma Promise que resolve quando a coleção é executada
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

// Função para escrever o log dos endpoints não aprovados
function escreverLog(diretorio, log) {
  // Constrói o caminho absoluto do diretório aluno-01
  const caminhoAbsoluto = path.resolve(__dirname, '..', 'Desafios-M02', diretorio);
  const logFilePath = `${caminhoAbsoluto}/log.txt`;

  fs.appendFileSync(logFilePath, log);
}

// Função principal para automatizar o processo
async function iniciarProcessamentoColecao(projeto) {
    try {
      // Executar coleção no Postman
      const summary = await executarColecao(collection);
      // Verificar os erros retornados da execução
      await gerarArquivoDeLog(projeto, summary)
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

    // Escrever os erros no arquivo de log
    escreverLog(
      projeto,
      log
    );
  } else {
    console.log('Nenhum erro encontrado.');
  }
}

module.exports = {
  iniciarProcessamentoColecao
}
const path = require('path');
const { exec } = require('child_process');
const { iniciarProcessamentoColecao } = require('./executar-collection');

const projeto = require('../subdiretorios.json')["subdiretorios"][32];

let processo;

async function processar(diretorio) {
  console.log('Iniciando servidor...');
  let diretorioDesafio = `${diretorio}/desafio-backend-modulo-02-sistema-bancario-dbe-t02`
  const caminhoAbsoluto = path.resolve(__dirname, '..', 'Desafios-M02', diretorioDesafio);

  // Ingressa no diretório do projeto
  process.chdir(caminhoAbsoluto);

  // Retorna uma Promise que resolve quando o servidor é iniciado
  return new Promise((resolve, reject) => {
    processo = exec('npm run dev', { shell: true });
    let executaProcesso = true
    // Manipula a saída do processo, se necessário
    processo.stdout.on('data', async (data) => {
      console.log(data);
      // Após o servidor ser iniciado, chamar a função iniciarProcessamentoColecao()
      setTimeout(async () => {
        if (executaProcesso) {
          executaProcesso = false
          await iniciarProcessamentoColecao(diretorio);
          processo.kill();
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

// Função principal para automatizar o processo
async function iniciarAnalise(projeto) {
    console.log(`Analisando o projeto do aluno: ${projeto}`);
    try {
      await processar(projeto);
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    }
}

// Função para encerrar o servidor
function encerrarServidor() {
  if (processo) {
    console.log('Encerrando servidor...');
    processo.kill();
  }
}

iniciarAnalise(projeto);

const path = require('path');
const { exec } = require('child_process');
const killPort = require('kill-port');
const { iniciarProcessamentoColecao } = require('./executar-collection');

const projetos = require('../subdiretorios.json')["subdiretorios"];
const args = process.argv;
const repositorio = args[2];

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
      // Aguarda 5 segundos apos iniciar servidor para executar colecao 
      setTimeout(async () => {
        if (executaProcesso) {
          executaProcesso = false
          await iniciarProcessamentoColecao(`Desafios/${diretorioDesafios}/${diretorio}`);
          console.log('derrubando porta...')
          await killPort(portaServidor); 
          console.log('encerrando...')
          resolve()
        }
      }, 4000);
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

async function iniciarAnalise(projeto, repositorio) {
    console.log(`Analisando o projeto do aluno: ${projeto}`);
    try {
      await processar(projeto, repositorio);
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    }
}

async function loopAnaliseProjetos(projetos, repositorio) {
  for (let projeto of projetos) {
    await iniciarAnalise(projeto, repositorio);
  }
}

function gerarNomenclaturaDiretorio(urlDesafio) {
  const regex = /desafio-backend-modulo-(\d+)-sistema-(\w+)(?:-(\w+))?(?:-(\w+))?(?:-(t\d+))?/;
  const matches = urlDesafio.match(regex);

  if (matches && matches.length >= 5) {
    const modulo = matches[1];
    const turma = `${matches[3]}-${matches[4]}`.toUpperCase();

    const stringFinal = `Desafios-M${modulo}-${turma}`;
    return stringFinal;
  }

  return null;
}

loopAnaliseProjetos(projetos, repositorio);

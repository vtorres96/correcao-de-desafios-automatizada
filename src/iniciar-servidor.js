const { exec } = require('child_process');

// Array com os diretórios dos projetos
const projeto = require('./subdiretorios.json')["subdiretorios"][65];

async function iniciarServidor(diretorio) {
  console.log('Iniciando servidor...');

  // Ingressa no diretório do projeto
  process.chdir(diretorio);

  // Retorna uma Promise que resolve quando o servidor é iniciado
  return new Promise((resolve, reject) => {
    const processo = exec('npm run dev', { shell: true });

    // Manipula a saída do processo, se necessário
    processo.stdout.on('data', (data) => {
      console.log(data);
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
async function automatizarAnalise(projeto) {
    console.log(`Analisando o projeto do aluno: ${projeto}`);
    let diretorioDesafio = `${projeto}/desafio-backend-modulo-02-sistema-bancario-dbe-t02`
    try {
      // Iniciar o servidor
      await iniciarServidor(diretorioDesafio);
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    }
}

automatizarAnalise(projeto);

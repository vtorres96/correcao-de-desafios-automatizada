const { execSync } = require('child_process');
const axios = require('axios');
require('dotenv').config();
const { gerarArquivoDiretorios } = require('./obter-diretorios')

const args = process.argv;
const owner = 'cubos-academy';
const accessToken = process.env.ACCESS_TOKEN_GITHUB;
const repositorio = args[2];

function executarComandos(comandos) {
  try {
    const comando = comandos.join(' && ');
    console.log(`Executando comando: ${comando}`);
    execSync(comando, { stdio: 'inherit' });
  } catch (error) {
    console.error('Ocorreu um erro ao executar os comandos:', error);
  }
}

async function obterPullRequests() {
  let prData = [];
  let pagina = 1;
  let urlProximaPagina = `https://api.github.com/repos/${owner}/${repositorio}/pulls`;

  while (urlProximaPagina) {
    const response = await axios.get(urlProximaPagina, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const pullRequests = response.data;
    prData = prData.concat(pullRequests.map((pr) => ({ title: pr.title, creator: pr.user.login })));

    const linkCabecalho = response.headers.link;
    const linkProximaPagina = analisarLinkProximaPagina(linkCabecalho);
    urlProximaPagina = linkProximaPagina ? linkProximaPagina.url : null;

    pagina++;
  }
  
  return prData;
}

async function processar(repositorio) {
  try {
    const diretorio = gerarNomenclaturaDiretorio(repositorio);

    if (!diretorio) {
      console.log('URL do desafio informada está em um formato inválido');
    }

    let prData = await obterPullRequests();
    execSync(`mkdir ${diretorio}`, { stdio: 'inherit' });

    for (let item of prData) {
      const comandos = [
        `cd ${diretorio}`,
        `mkdir ${item.title.replace(/ /g, '-')}`,
        `cd ${item.title.replace(/ /g, '-')}`,
        `git clone git@github.com:${item.creator}/${repositorio}.git`,
        `cd ${repositorio}`,
        'npm install',
        'cd ../../'
      ];

      executarComandos(comandos);
    }

    gerarArquivoDiretorios(`./${diretorio}`)
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

function analisarLinkProximaPagina(linkCabecalho) {
  if (!linkCabecalho) {
    return null;
  }

  const links = linkCabecalho.split(', ');
  for (const link of links) {
    const [url, rel] = link.split('; ');

    if (rel === 'rel="next"') {
      const urlProximaPagina = url.slice(1, -1);
      const urlParametros = new URLSearchParams(urlProximaPagina);
      const caminhoUrl = urlParametros.get('page');
      return { url: urlProximaPagina, page: parseInt(caminhoUrl, 10) };
    }
  }

  return null;
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

processar(repositorio);
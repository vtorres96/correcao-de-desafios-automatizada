const { execSync } = require('child_process');
const axios = require('axios');
require('dotenv').config();

const owner = 'cubos-academy';
const repositorio = process.env.REPOSITORIO_DESAFIO;
const accessToken = process.env.ACCESS_TOKEN_GITHUB;

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

async function processar() {
  try {
    let prData = await obterPullRequests();
 
    execSync('mkdir Desafios-M02', { stdio: 'inherit' });

    prData.forEach((item) => {
      const comandos = [
        'cd Desafios-M02',
        `mkdir ${item.title.replace(/ /g, '-')}`,
        `cd ${item.title.replace(/ /g, '-')}`,
        `git clone git@github.com:${item.creator}/${repositorio}.git`,
        `cd ${repositorio}`,
        'npm install',
        'cd ../../'
      ];

      executarComandos(comandos);
    });
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

processar();
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const { gerarNomenclaturaDiretorio } = require('./gerar-nomenclatura-diretorio');
const { gerarArquivoDiretorios } = require('./obter-diretorios');

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
    let comandoDiretorioDesafio = "";

    if (!diretorio) {
      console.log('URL do desafio informada está em um formato inválido');
      return;
    }

    let prData = await obterPullRequests();
    let caminhoDiretorioDesafios = path.resolve(__dirname, '..', 'Desafios');
    if (fs.existsSync(caminhoDiretorioDesafios)) {
      if (fs.existsSync(caminhoDiretorioDesafios.concat(`/${diretorio}`))) {
        console.log(`Opss... Parece que já iniciou processo de correção para o desafio em questão relacionado a essa turma, verifique se a quantidade de pull requests confere com a quantidade de projetos contidos nesse diretório: ${diretorio} caso contrário apague-o e efetue o processo novamente`);
        return;
      }
      comandoDiretorioDesafio = 'cd Desafios'
    } else {
      comandoDiretorioDesafio = 'mkdir Desafios && cd Desafios';
    }

    execSync(`${comandoDiretorioDesafio} && mkdir ${diretorio}`, { stdio: 'inherit' });

    for (let item of prData) {
      const comandos = [
        `cd Desafios/${diretorio}`,
        `mkdir ${item.title.replace(/ /g, '-')}`,
        `cd ${item.title.replace(/ /g, '-')}`,
        `git clone git@github.com:${item.creator}/${repositorio}.git`,
        `cd ${repositorio}`,
        'npm install',
        'cd ../../../'
      ];

      executarComandos(comandos);
    }

    gerarArquivoDiretorios(`./Desafios/${diretorio}`)
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

processar(repositorio);
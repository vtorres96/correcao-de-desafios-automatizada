require('dotenv').config();
const { execSync } = require('child_process');
const axios = require('axios');

// Função para executar comandos em sequência
function runCommands(commands) {
  try {
    const command = commands.join(' && ');
    console.log(`Executando comando: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('Ocorreu um erro ao executar os comandos:', error);
  }
}

// Configurações básicas
const owner = 'cubos-academy';
const repo = process.env.REPOSITORIO_DESAFIO;
const accessToken = process.env.ACCESS_TOKEN_GITHUB;

// Função para obter a lista de nomes dos usuários
async function getPullRequestCreators() {
  try {
    let prData = [];

    let page = 1;
    let nextPageUrl = `https://api.github.com/repos/${owner}/${repo}/pulls`;

    while (nextPageUrl) {
      const response = await axios.get(nextPageUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const pullRequests = response.data;
      prData = prData.concat(pullRequests.map((pr) => ({ title: pr.title, creator: pr.user.login })));

      const linkHeader = response.headers.link;
      const nextPageLink = parseNextPageLink(linkHeader);
      nextPageUrl = nextPageLink ? nextPageLink.url : null;

      page++;
    }
 
    // Criando diretório Desafios-M02-Turma
    execSync('mkdir Desafios-M02', { stdio: 'inherit' });

    // Loop para executar os comandos para cada item em prData
    prData.forEach((item) => {
      const commands = [
        'cd Desafios-M02',
        `mkdir ${item.title.replace(/ /g, '-')}`,
        `cd ${item.title.replace(/ /g, '-')}`,
        `git clone git@github.com:${item.creator}/${repo}.git`,
        `cd ${repo}`,
        'npm install',
        'cd ../../'
      ];
      
      // Executa os comandos em sequência para o item atual
      runCommands(commands);
    });
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

// Função para analisar o cabeçalho Link e extrair a URL da próxima página
function parseNextPageLink(linkHeader) {
  if (!linkHeader) {
    return null;
  }

  const links = linkHeader.split(', ');
  for (const link of links) {
    const [url, rel] = link.split('; ');

    if (rel === 'rel="next"') {
      const nextPageUrl = url.slice(1, -1);
      const urlParams = new URLSearchParams(nextPageUrl);
      const urlPath = urlParams.get('page');
      return { url: nextPageUrl, page: parseInt(urlPath, 10) };
    }
  }

  return null;
}

// Chama a função para obter a lista de nomes dos usuários
getPullRequestCreators();

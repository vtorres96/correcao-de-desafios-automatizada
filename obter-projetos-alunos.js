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
const repo = 'desafio-backend-modulo-02-sistema-bancario-dbe-t02';
const accessToken = process.env.ACCESS_TOKEN_GITHUB;

// Função para obter a lista de nomes dos usuários
async function getPullRequestCreators() {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const pullRequests = response.data;
    const prData = pullRequests.map((pr) => ({ title: pr.title, creator: pr.user.login }));
    
    // Sequência de comandos a serem executados
    const commands = [
      `mkdir ${prData[0].title.replace(/ /g, '-')}`,
      `cd ${prData[0].title.replace(/ /g, '-')}`,
      `git clone git@github.com:${prData[0].creator}/${repo}.git`,
      `cd ${repo}`,
      'npm install',
      'cd ../../'
    ];

    // Executa os comandos em sequência
    runCommands(commands);
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

// Chama a função para obter a lista de nomes dos usuários
getPullRequestCreators();

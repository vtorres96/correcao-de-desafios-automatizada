const fs = require('fs');
const path = require('path');

// Diretório raiz
const rootDirectory = './Desafios-M02';

// Função para percorrer subdiretórios recursivamente
function percorrerSubdiretorios(diretorioAtual) {
  // Obtém a lista de itens no diretório atual
  const items = fs.readdirSync(diretorioAtual);

  // Array para armazenar os nomes dos subdiretórios
  const subdiretorios = [];

  items.forEach((item) => {
    const itemPath = path.join(diretorioAtual, item);

    // Verifica se é um diretório
    if (fs.statSync(itemPath).isDirectory()) {
      subdiretorios.push(item);
      // Chama recursivamente a função para percorrer subdiretórios
      percorrerSubdiretorios(itemPath);
    }
  });

  return subdiretorios;
}

// Chama a função para percorrer os subdiretórios
const subdiretorios = percorrerSubdiretorios(rootDirectory);

// Cria um objeto com o array de subdiretórios
const data = {
  subdiretorios: subdiretorios
};

// Caminho do arquivo JSON
const arquivoSubdiretorios = './subdiretorios.json';

// Escreve o objeto como JSON no arquivo
fs.writeFileSync(arquivoSubdiretorios, JSON.stringify(data, null, 2));

console.log('Nomes dos subdiretórios foram salvos em', arquivoSubdiretorios);

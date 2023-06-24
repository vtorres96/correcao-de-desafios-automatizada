const fs = require('fs');
const path = require('path');

const diretorio = './Desafios-M02';

function percorrerSubdiretorios(diretorioAtual) {
  const itens = fs.readdirSync(diretorioAtual);
  const subdiretorios = [];
  itens.forEach((item) => {
    const itemCaminho = path.join(diretorioAtual, item);
    if (fs.statSync(itemCaminho).isDirectory()) {
      subdiretorios.push(item);
      percorrerSubdiretorios(itemCaminho);
    }
  });

  return subdiretorios;
}

function gerarArquivoDiretorios() {
  const subdiretorios = percorrerSubdiretorios(diretorio);
  const data = {
    subdiretorios: subdiretorios
  };
  
  const arquivoSubdiretorios = './subdiretorios.json';
  fs.writeFileSync(arquivoSubdiretorios, JSON.stringify(data, null, 2));
  console.log('Nomes dos subdiretórios foram salvos em', arquivoSubdiretorios);
}

module.exports = {
  gerarArquivoDiretorios
}
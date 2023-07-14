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

module.exports = {
    gerarNomenclaturaDiretorio
}
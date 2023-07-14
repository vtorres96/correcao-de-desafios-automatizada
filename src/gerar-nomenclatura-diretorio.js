function gerarNomenclaturaDiretorio(urlDesafio) {
    const regex = retornarRegEx(urlDesafio);
    const matches = urlDesafio.match(regex);
  
    if (matches && matches.length >= 5) {
      const modulo = matches[1];
      let turma = ''
      
      if (urlDesafio.includes("alternativo")) { 
        turma = `${matches[2]}-${matches[3]}`.toUpperCase() + '-alternativo';
      } else {
        turma = `${matches[3]}-${matches[4]}`.toUpperCase();
      }

      const stringFinal = `Desafios-M${modulo}-${turma}`;

      return stringFinal;
    }
  
    return null;
}

function retornarRegEx(urlDesafio) {
  let regex = "";
  if (urlDesafio.includes("alternativo")) {
    regex = /desafio-backend-modulo-(\d+)-alternativo-(\w+)(?:-(\w+))?(?:-(\w+))?(?:-(t\d+))?/;
  } else {
    regex = /desafio-backend-modulo-(\d+)-sistema-(\w+)(?:-(\w+))?(?:-(\w+))?(?:-(t\d+))?/;
  }

  return regex;
}
module.exports = {
    gerarNomenclaturaDiretorio
}
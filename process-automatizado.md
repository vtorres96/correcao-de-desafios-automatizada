## Passo 1

criar um diretório para centralizar os projetos dos alunos, por exemplo `Desafios-M02-Turma`.

```
mkdir Desafios-M02-Turma
```

## Passo 2

Ingressar no diretório `Desafios-M02-Turma`

```
cd Desafios-M02-Turma
```

## Passo 3

Clonar esse repositório

```
git clone git@github.com:cubos-academy/correcao-automatizada-modulo-02-sistema-bancario.git
```

## Passo 4

Clonar e instalar os pacotes necessários em todos os projetos dos alunos.
Para isso pode executar a sequência de comandos abaixo para cada repositório.

```
mkdir nome-do-aluno && cd nome-do-aluno && git clone url-do-repositorio && cd diretorio-repositorio && npm install && cd ../../
```

## Passo 5

Ainda na raíz do diretório `Desafio-M02` será necessário executar o script `obter-diretorios.js`.

```
node correcao-automatizada-modulo-02-sistema-bancario/obter-diretorios.js
```

Este script criará um arquivo entitulado `subdiretorios.json` dentro do diretório `correcao-automatizada-modulo-02-sistema-bancario`, contendo todos sub-diretórios que no caso serão os diretórios com os nomes dos alunos, para que no momento da execução do script de teste automatizado, não ocorra falha na execução por erro de nomenclatura de diretório.

## Passo 6 (melhorar processo para executar em massa, atualmente só executa de 1 em 1 manualmente)

Executar o script `iniciar-servidor.js` para iniciar o servidor

```
node correcao-automatizada-modulo-02-sistema-bancario/iniciar-servidor.js
```

## Passo 7

Após iniciar o servidor basta abrir outro terminal executar o script `executar-collection.js` para executar a coleção de testes automatizados e depois analisar o arquivo `log.txt` que será gerado em cada projeto para cada aluno.

```
node correcao-automatizada-modulo-02-sistema-bancario/executar-collection.js
```
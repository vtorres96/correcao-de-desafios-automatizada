# correcao-automatizada-modulo-02-sistema-bancario

Esse projeto tem propósito automatizar o processo de correção dos desafios de backend do módulo 02. De maneira que visa automatizar as etapas abaixo:

- Clonar o repositório do aluno no GitHub
- Ingressar no diretório clonado
- Instalar as dependências
- Iniciar o servidor
- Executar a coleção para analisar os endpoints

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

Clonar repositórios de todos os alunos através das Pull Requests

Para concluir esse passo de uma maneira eficiente temos o script `obter-projetos-alunos.js`, mas, antes de executá-lo, temos algumas orientações abaixo, para que tenha êxito

- Alterar no seu arquivo `.env` a variável de ambiente `REPOSITORIO_DESAFIO`.

    De modo que para a variável `REPOSITORIO_DESAFIO` será necessário adicionar o repositório do desafio, por exemplo:
    Para o repositório https://github.com/cubos-academy/desafio-backend-modulo-02-sistema-bancario-dbe-t02
    deve ser atribuído `desafio-backend-modulo-02-sistema-bancario-dbe-t02` como valor da minha variável `REPOSITORIO_DESAFIO`, resultando em:

    ```
    REPOSITORIO_DESAFIO=desafio-backend-modulo-02-sistema-bancario-dbe-t02
    ```

- Alterar no seu arquivo `.env` a variável de ambiente `ACCESS_TOKEN_GITHUB`.

    Para gerar o `ACCESS_TOKEN_GITHUB` pode conferir uma documentação de apoio em `docs/gerar-access-token.md` e seguir o passo a passo.

Por fim, executar o script `obter-projetos-alunos.js`.

```
node obter-projetos-alunos.js
```

## Passo 4

Registrar os diretórios contendo o nome dos alunos em um arquivo JSON para que no momento da execução do script de teste automatizado, não ocorra falha na execução por erro de nomenclatura de diretório.

Para isso temos o script `obter-diretorios.js`, que criará um arquivo entitulado `subdiretorios.json` dentro do diretório `correcao-automatizada-modulo-02-sistema-bancario`, contendo todos sub-diretórios que no caso serão os diretórios com os nomes dos alunos.

```
node obter-diretorios.js
```

## Passo 5 (melhorar processo para executar em massa, atualmente só executa de 1 em 1 manualmente)

Executar o script `iniciar-servidor.js` para iniciar o servidor

```
node correcao-automatizada-modulo-02-sistema-bancario/iniciar-servidor.js
```

## Passo 6

Após iniciar o servidor basta abrir outro terminal executar o script `executar-collection.js` para executar a coleção de testes automatizados e depois analisar o arquivo `log.txt` que será gerado em cada projeto para cada aluno.

```
node correcao-automatizada-modulo-02-sistema-bancario/executar-collection.js
```
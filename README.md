# correcao-de-desafios-automatizada

Esse projeto tem como propósito automatizar o processo de correção dos desafios de backend do módulo 02. De maneira que visa automatizar as etapas abaixo:

- Clonar o repositório do aluno no GitHub
- Ingressar no diretório clonado
- Instalar as dependências
- Iniciar o servidor
- Executar a coleção para analisar os endpoints
- Gerar um arquivo de log retornando quais foram os erros obtidos ao executar a coleção

## Passo 1

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
node src/obter-projetos-alunos.js
```

## Passo 2

Efetuar a correção dos projetos aplicando os testes da coleção.

Para essa etapa também temos um script preparado para lidar com as correções, portanto, basta executar o script `executar-correcoes.js` para iniciar o processo automatizado de correção

```
node src/iniciar-correcoes.js
```
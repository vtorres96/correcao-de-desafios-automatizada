## Guia detalhado de apoio para correção dos desafios do módulo 02 alternativo - sistema consultório

Este guia tem o propósito de auxiliar o monitor que estiver efetuando a correção, de maneira, que
servirá para mensurar quais critérios devemos analisar caso o projeto analisado tenha sido aprovado em grande parte dos testes automatizados, portanto, vamos aos critérios detalhados em cada enpoint.

## Criar consulta médica

- Verificar se propriedades no corpo da requisição `tipoConsulta, valorConsulta, usuario` foram informadas
- Verifica se o valor da consulta é numérico
- Verificar se o CPF informado já não está vinculado a nenhuma consulta que não foi finalizada
- Verificar se foi implementada validação para analisar se o tipo da consulta informado consta nas especialidade dos médicos na base
- Verificar se o identificador do médico especializado que irá atender a consulta foi vinculado corretamente ao gerar a consulta
Definir finalizada como false


## Atualizar os dados de uma consulta

- Verificar se parâmetro de rota `identificadorConsulta` foi informado
- Analisar se aplicou validação para quando a consulta não for encontrada
- Verificar se propriedades no corpo da requisição `nome, cpf, dataNascimento, celular, email, senha` foram informadas
- Analisar se implementou condição para quando CPF for informado verificar se já existe outro registro com o mesmo CPF
- Analisar se implementou condição para quando e-mail for informado verificar se já existe outro registro com o mesmo e-mail
- Verifica se a consulta não está finalizada

## Excluir uma consulta médica

- Verificar se parâmetro de rota `identificadorConsulta` foi informado
- Analisar se aplicou validação para quando a consulta não for encontrada
- Analisar se aplicou condição para verificar se a propriedade `finalizada` está com valor `false` atribuído para que não ocorra exclusão de consulta finalizada.

## Finalizar uma consulta médica

- Verificar se propriedades no corpo da requisição `identificadorConsulta, textoMedico` foram informadas
- Analisar se aplicou validação para quando a consulta não for encontrada
- Verificar se a consulta já esta finalizada
- Verificar se o texto do médico possui um tamanho > 0 e <= 200 carácteres
- Verificar se registrou laudo
- Verificar se marcou a propriedade `finalizada` da consulta com valor atribuído como `true`

## Listar o laudo de uma consulta

- Verificar se parâmetro de query `identificador_consulta, senha` foram informados
- Analisar se aplicou validação para quando a consulta não for encontrada
- Verificar se a senha informada é uma senha válida
- Analisar se aplicou validação para caso não exista laudo para consulta informada

## Listar consultas médicas

- Verificar se os parâmetros de query `cnes_consultorio, senha_consultorio` foram informados
- Verificar se os parâmetros de query `cnes_consultorio, senha_consultorio` são válidos

## Listar as consultas que um médico atendeu

- Verificar se parâmetro de query `identificador_medico` foi informado
- Analisar se aplicou validação para quando o médico não for encontrado
- Analisar se está retornando apenas as consultas vinculadas ao médico informado.
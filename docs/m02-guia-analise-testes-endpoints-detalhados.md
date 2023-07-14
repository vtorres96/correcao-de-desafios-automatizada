## Guia detalhado de apoio para correção dos desafios do módulo 02 - sistema bancário

Este guia tem o propósito de auxiliar o monitor que estiver efetuando a correção, de maneira, que
servirá para mensurar quais critérios devemos analisar caso o projeto analisado tenha sido aprovado em grande parte dos testes automatizados, portanto, vamos aos critérios detalhados em cada enpoint.

## Listagem de contas bancárias

- Verificar se o parâmetro de query `senha_banco` foi informado
- Verificar se o parâmetro de query `senha_banco` informado é válido

## Criar conta bancária

- Verificar se propriedades no corpo da requisição `nome, cpf, data_nascimento, telefone,  email, senha,` foram informadas
- Verificar se CPF informado já não pertence a outra conta
- Verificar se e-mail informado já não pertence a outra conta

## Atualizar os dados do usuário da conta bancária

- Verificar se parâmetro de rota `numeroConta` foi informado
- Analisar se aplicou validação para quando a conta não for encontrada
- Verificar se parâmetros no corpo da requisição `nome, cpf, data_nascimento, telefone,  email, senha,` foram informadas
- Verificar se CPF informado já não pertence a outra conta
- Verificar se e-mail informado já não pertence a outra conta

## Excluir uma conta bancária

- Verificar se parâmetro de rota `numeroConta` foi informado
- Analisar se aplicou validação para quando a conta não for encontrada
- Verificar se o saldo da conta está com valor 0 atribuído

## Depositar em uma conta bancária

- Verificar parâmetros no corpo da requisição `numero_conta, valor` foram informados
- Analisar se aplicou validação para quando a conta não for encontrada
- Verificar se o valor de depósito é superior a zero
- Verificar se registrou o depósito

## Sacar de uma conta bancária

- Verificar parâmetros no corpo da requisição `numero_conta, valor, senha` foram informados
- Analisar se aplicou validação para quando a conta não for encontrada
- Verificar se a senha informada confere com a senha que pertence ao usuário
- Verificar se o valor de saque é superior a zero
- Verificar se permitiu efetuar saque mesmo informando valor de saque superior ao saldo que usuário tem em conta
- Verificar se registrou o saque

## Transferir valores entre contas bancárias
- Verificar parâmetros no corpo da requisição `numero_conta_origem, numero_conta_destino, valor, senha` foram informados
- Analisar se aplicou validação para quando a conta de origem não for encontrada
- Analisar se aplicou validação para quando a conta de destino não for encontrada
- Verificar se a senha informada confere com a senha que pertence ao usuário
- Verificar se o valor informado para transferência é superior a zero
- Verificar se permitiu efetuar transferência mesmo informando valor superior ao saldo que usuário tem em conta
- Verificar se registrou transferência

## Consultar saldo da conta bancária
- Verificar parâmetros no corpo da requisição `numero_conta, senha` foram informados
- Verificar se a senha informada confere com a senha que pertence ao usuário

## Emitir extrato bancário
- Verificar parâmetros no corpo da requisição `numero_conta, senha` foram informados
- Verificar se a senha informada confere com a senha que pertence ao usuário
- Verificar se o corpo da resposta possui as propriedades `saques, depositos, transferenciasEnviadas, transferenciasRecebidas`
# Integração Frontend

## Objetivo

Este documento descreve todas as rotas que deverão ser consumidas pelo frontend.

Servidor:

http://localhost:3000

---

# Login

## POST /auth/login

Body

```json
{
    "email": "",
    "senha": ""
}
```

Retorna

- Token JWT
- Dados do usuário

Após o login o token deve ser armazenado e enviado em todas as requisições protegidas.

---

# Usuário Logado

GET /users/me

Retorna os dados do usuário autenticado.

---

# Dashboard RH

GET /admin/dashboard

Apenas administradores.

---

# Funcionários

## Cadastrar Funcionário

POST /employees

Body

```json
{
    "nome": "",
    "email": "",
    "senha": ""
}
```

---

## Listar Funcionários

GET /employees

---

## Buscar Funcionário

GET /employees/:id

---

## Atualizar Funcionário

PUT /employees/:id

Body

```json
{
    "nome": "",
    "email": ""
}
```

---

## Remover Funcionário

DELETE /employees/:id

---

# Registro de Ponto

## Registrar Entrada/Saída

POST /time-records

Sem Body.

---

## Histórico de Pontos

GET /time-records/history

Retorna todos os registros do usuário autenticado.

---

## Registros Gerais

GET /time-records/all

Disponível apenas para RH.

---

## Filtrar por Data

GET /time-records/all?date=DD/MM/AAAA

Exemplo:

GET /time-records/all?date=16/07/2026

---

# Cabeçalho de Autenticação

Todas as rotas protegidas exigem:

Authorization: Bearer <TOKEN>

---

# Fluxo da Aplicação

## Funcionário

1. Login.
2. Registrar ponto.
3. Consultar histórico.
4. Consultar horas trabalhadas (futuro).

---

## RH

1. Login.
2. Dashboard.
3. Cadastrar funcionários.
4. Editar funcionários.
5. Excluir funcionários.
6. Visualizar registros de ponto.
7. Filtrar registros por data.

---

# Observações

- O frontend deverá armazenar o JWT após o login.
- Todas as rotas protegidas devem enviar o token no cabeçalho Authorization.
- Em caso de erro 401, redirecionar para a tela de login.
- Em caso de erro 403, exibir mensagem de acesso negado.
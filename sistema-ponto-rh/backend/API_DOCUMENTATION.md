# API - Sistema de Ponto RH

## Visão Geral

Esta API foi desenvolvida para o Sistema de Ponto RH, permitindo autenticação de usuários, gerenciamento de funcionários e controle de registros de ponto.

Base URL:

http://localhost:3000

---

# Autenticação

A maioria das rotas exige autenticação utilizando JWT.

Enviar o token no cabeçalho da requisição:

Authorization: Bearer <TOKEN>

---

# 1. Login

## POST /auth/login

Realiza a autenticação de um usuário.

### Body

```json
{
    "email": "admin@empresa.com",
    "senha": "123456"
}
```

### Resposta (200)

```json
{
    "status": 200,
    "message": "Login realizado com sucesso.",
    "token": "<JWT>",
    "usuario": {
        "id": 1,
        "nome": "Administrador",
        "email": "admin@empresa.com",
        "perfil": "RH"
    }
}
```

---

# 2. Usuário autenticado

## GET /users/me

Retorna as informações do usuário autenticado.

### Autenticação

Bearer Token

### Resposta

```json
{
    "message": "Usuário autenticado.",
    "usuario": {
        "id": 1,
        "perfil": "RH"
    }
}
```

---

# 3. Dashboard do RH

## GET /admin/dashboard

Retorna informações do painel administrativo.

### Permissão

RH

### Resposta

```json
{
    "message": "Bem-vindo ao painel do RH.",
    "usuario": {
        "id": 1,
        "perfil": "RH"
    }
}
```

---

# Funcionários

## 4. Cadastrar Funcionário

POST /employees

### Permissão

RH

### Body

```json
{
    "nome": "Maria Oliveira",
    "email": "maria@empresa.com",
    "senha": "123456"
}
```

### Resposta

```json
{
    "status": 201,
    "message": "Funcionário cadastrado com sucesso.",
    "funcionario": {
        "id": 3,
        "nome": "Maria Oliveira",
        "email": "maria@empresa.com",
        "perfil": "FUNCIONARIO"
    }
}
```

---

## 5. Listar Funcionários

GET /employees

### Permissão

RH

### Resposta

```json
[
    {
        "id": 1,
        "nome": "Administrador",
        "email": "admin@empresa.com",
        "perfil": "RH"
    },
    {
        "id": 2,
        "nome": "João Silva",
        "email": "joao@empresa.com",
        "perfil": "FUNCIONARIO"
    }
]
```

---

## 6. Buscar Funcionário

GET /employees/:id

### Permissão

RH

### Exemplo

GET /employees/2

### Resposta

```json
{
    "status": 200,
    "funcionario": {
        "id": 2,
        "nome": "João Silva",
        "email": "joao@empresa.com",
        "perfil": "FUNCIONARIO"
    }
}
```

---

## 7. Atualizar Funcionário

PUT /employees/:id

### Permissão

RH

### Body

```json
{
    "nome": "João da Silva",
    "email": "joao.silva@empresa.com"
}
```

### Resposta

```json
{
    "status": 200,
    "message": "Funcionário atualizado com sucesso."
}
```

---

## 8. Remover Funcionário

DELETE /employees/:id

### Permissão

RH

### Resposta

```json
{
    "status": 200,
    "message": "Funcionário removido com sucesso."
}
```

---

# Registro de Ponto

## 9. Registrar Ponto

POST /time-records

### Permissão

Funcionário ou RH

### Body

Nenhum.

### Resposta

```json
{
    "message": "Ponto registrado com sucesso.",
    "registro": {
        "userId": 2,
        "date": "16/07/2026",
        "time": "08:00:00"
    }
}
```

---

## 10. Histórico do Funcionário

GET /time-records/history

### Permissão

Usuário autenticado

### Resposta

```json
[
    {
        "userId": 2,
        "date": "16/07/2026",
        "time": "08:00:00"
    }
]
```

---

## 11. Registros de Todos os Funcionários

GET /time-records/all

### Permissão

RH

### Resposta

```json
[
    {
        "userId": 2,
        "nome": "João Silva",
        "date": "16/07/2026",
        "time": "08:00:00"
    }
]
```

---

## 12. Filtrar Registros por Data

GET /time-records/all?date=16/07/2026

### Permissão

RH

### Resposta

```json
[
    {
        "userId": 2,
        "nome": "João Silva",
        "date": "16/07/2026",
        "time": "08:00:00"
    }
]
```

---

# Códigos HTTP Utilizados

| Código | Significado |
|---------|-------------|
| 200 | Sucesso |
| 201 | Recurso criado |
| 400 | Dados inválidos |
| 401 | Não autenticado |
| 403 | Acesso negado |
| 404 | Recurso não encontrado |
| 409 | Conflito (e-mail já cadastrado) |
| 500 | Erro interno do servidor |
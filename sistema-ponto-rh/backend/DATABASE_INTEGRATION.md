# Integração do Banco de Dados

## Objetivo

Este documento descreve como o backend espera acessar o banco de dados.

Atualmente os dados estão armazenados em memória (Mock). A implementação definitiva deverá substituir apenas os Models.

---

# Banco de Dados

MySQL

---

# Tabela users

| Campo | Tipo |
|--------|------|
| id | INT AUTO_INCREMENT |
| nome | VARCHAR(100) |
| email | VARCHAR(100) UNIQUE |
| senha | VARCHAR(255) |
| perfil | ENUM('RH','FUNCIONARIO') |

---

# Tabela time_records

| Campo | Tipo |
|--------|------|
| id | INT AUTO_INCREMENT |
| user_id | INT |
| date | DATE |
| time | TIME |

Relacionamento

users.id → time_records.user_id

---

# Models Esperados

## userModel

Deve implementar os métodos:

- findAll()
- findById(id)
- findByEmail(email)
- create(user)
- update(id, data)
- remove(id)

---

## timeRecordModel

Deve implementar os métodos:

- create(record)
- findByUser(userId)
- findAll()

---

# Observações

A assinatura dos métodos não deve ser alterada.

Controllers e Services já estão implementados e dependem desses métodos.

A integração deve ocorrer apenas na camada de Model.

---

# Fluxo Esperado

Controller

↓

Service

↓

Model (MySQL)

↓

Banco de Dados

---

# Boas práticas

- Utilizar Prepared Statements.
- Utilizar mysql2.
- Evitar SQL Injection.
- Retornar Promises.
- Utilizar async/await.
- Criar conexão única com o banco.

---

# Arquivos esperados

database.js

userModel.js

timeRecordModel.js

.env

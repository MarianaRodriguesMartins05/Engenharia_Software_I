# Sistema de Ponto para RH

## Escopo do sistema

O sistema tem como objetivo auxiliar o setor de Recursos Humanos no controle de ponto dos funcionários, permitindo gerenciar colaboradores, registrar entradas e saídas e consultar o histórico de registros. A aplicação contará com dois perfis de usuário, RH e Funcionário, com funcionalidades específicas para cada um. O sistema registrará automaticamente data e horário dos pontos e permitirá acompanhar a jornada de trabalho de forma simples e organizada. A proposta é desenvolver um protótipo funcional, intuitivo e focado nas principais necessidades do controle de ponto.

---

## Membros da equipe e papéis

- Mariana — DBA (Administrador de banco de dados)
- Guilherme — Backend Developer
- Daniel — Frontend Developer

---

## Tecnologias

Frontend: HTML, CSS e JavaScript
Backend: Node.js
Framework Backend: Express.js
Banco de Dados: MySQL
Versionamento: GitHub

---

## Backlog do Produto

1. Como funcionário, eu gostaria de realizar o login de colaborador no sistema.
2. Como funcionário, eu gostaria de registrar meu horário de entrada e saída.
3. Como funcionário, eu gostaria de visualizar meu histórico de pontos registrados.
4. Como funcionário, eu gostaria de visualizar minhas horas trabalhadas no mês.
5. Como funcionário, eu gostaria de justificar atrasos ou faltas.
6. Como administrador (RH), eu gostaria de realizar o login de administrador/gestor no sistema.
7. Como administrador (RH), eu gostaria de cadastrar, editar ou remover funcionários cadastrados.
8. Como administrador (RH), eu gostaria de visualizar os registros de ponto de todos os funcionários.
9. Como administrador (RH), eu gostaria de aprovar ou rejeitar justificativas de faltas e atrasos.
10. Como administrador (RH), eu gostaria de gerar relatórios mensais de horas trabalhadas.  

---

## Backlog da Sprint

### História 1 — Como funcionário, eu gostaria de realizar o login de colaborador no sistema.

Tarefas e responsáveis:

Criar estrutura inicial do projeto com Node.js e Express [Guilherme]
Configurar banco de dados MySQL [Mariana]
Criar tabela de usuários no banco [Mariana]
Desenvolver tela de login em HTML e CSS [Daniel]
Implementar autenticação no backend [Guilherme]
Integrar frontend com backend no login [Daniel, Guilherme e Mariana]

---

### História 2 — Como funcionário, eu gostaria de registrar meu horário de entrada e saída.

Tarefas e responsáveis:
Criar tabela de registros de ponto [Mariana]
Desenvolver tela de registro de ponto [Daniel]
Implementar rota para registrar ponto [Guilherme, Mariana]
Validar horário e usuário autenticado [Guilherme]
Exibir confirmação de registro realizado [Daniel]
Integrar frontend com backend do registro de ponto [Daniel, Guilherme e Mariana]

---

### História 3 — Como administrador (RH), eu gostaria de realizar o login de administrador/gestor no sistema.

Tarefas e responsáveis:

Criar estrutura inicial do projeto com Node.js e Express [Guilherme]
Configurar banco de dados MySQL [Mariana]
Criar tabela de usuários no banco [Mariana]
Desenvolver tela de login em HTML e CSS [Daniel]
Implementar autenticação no backend [Guilherme]
Integrar frontend com backend no login [Daniel, Guilherme e Mariana]

---

### História 4 — Como administrador (RH), eu gostaria de cadastrar funcionários no sistema.

Tarefas e responsáveis:

Criar formulário de cadastro de funcionários [Daniel]
Implementar rota para cadastro de funcionários [Guilherme, Mariana]
Validar dados do formulário [Guilherme]
Salvar funcionários no banco de dados [Mariana]
Criar listagem de funcionários cadastrados [Mariana]
Estilizar interface da área administrativa [Daniel]

---

### História 5 — Como administrador (RH), eu gostaria de visualizar os registros de ponto dos funcionários.

Tarefas e responsáveis:

Criar página de listagem de registros [Daniel]
Implementar consulta de registros no MySQL [Mariana]
Exibir registros por funcionário [Daniel]
Adicionar filtro por data [Guilherme e Daniel]
Integrar backend e frontend da listagem [Daniel, Guilherme e Mariana]
Ajustar layout e responsividade da página [Daniel]

---

## Diagramas UML

### 1. Diagramas de Casos de Uso

<img src="imagens/DiagramaCasosUso.png" alt="Diagrama de Casos de Uso" width="700">

---

### 2. Diagramas de Atividade

#### 2.1. Login de funcionário/colaborador

<img src="imagens/diagramasAtividades_part01/hu01.PNG" alt="Login de funcionário" width="700">

#### 2.2. Registro de ponto

<img src="imagens/diagramasAtividades_part01/hu02.PNG" alt="Registro de ponto" width="700">

#### 2.3. Histórico de ponto

<img src="imagens/diagramasAtividades_part01/hu03.PNG" alt="Histórico de ponto" width="700">

#### 2.4. Visualizar horas trabalhadas

<img src="imagens/diagramasAtividades_part01/hu04.PNG" alt="Visualizar horas trabalhadas" width="700">

#### 2.5. Justificar atrasos e faltas

<img src="imagens/diagramasAtividades_part01/hu05.PNG" alt="Justificar atrasos e faltas" width="700">

#### 2.6. Realizar Login

<img src="imagens/diagramasAtividades_part02/Atividades06.png" alt="Realizar Login" width="700">

#### 2.7. CRUD

<img src="imagens/diagramasAtividades_part02/Atividades07.png" alt="CRUD" width="700">

#### 2.8. Visualizar Registro de Ponto

<img src="imagens/diagramasAtividades_part02/Atividades08.png" alt="Visualizar Registro de Ponto" width="700">

#### 2.9. Avaliar Justificativas

<img src="imagens/diagramasAtividades_part02/Atividades09.png" alt="Avaliar Justificativas" width="700">

#### 2.10. Relatório Mensal

<img src="imagens/diagramasAtividades_part02/Atividades10.png" alt="Relatório Mensal" width="700">

---

### 3. Diagramas de Classes

<img src="imagens/DiagramaClasses.png" alt="Diagrama de Classes" width="700">

-------

## Protótipos de Telas

As telas abaixo representam o protótipo do Sistema de Ponto para RH, desenvolvido no Figma.

### 1. Tela de Login

<img src="imagens/TrabalhoEngSoft/Login.png" alt="Tela de Login" width="700">

### 2. Painel do Funcionário

<img src="imagens/TrabalhoEngSoft/tela2.png" alt="Painel do Funcionário" width="700">

### 3. Histórico de Pontos

<img src="imagens/TrabalhoEngSoft/tela3.png" alt="Histórico de Pontos" width="700">

### 4. Justificativa de Falta ou Atraso

<img src="imagens/TrabalhoEngSoft/tela4.png" alt="Justificativa de Falta ou Atraso" width="700">

### 5. Painel do RH

<img src="imagens/TrabalhoEngSoft/tela5.png" alt="Painel do RH" width="700">

### 6. Cadastro de Funcionários

<img src="imagens/TrabalhoEngSoft/tela6.png" alt="Cadastro de Funcionários" width="700">

### 7. Registros de Ponto

<img src="imagens/TrabalhoEngSoft/tela7.png" alt="Registros de Ponto" width="700">

### 8. Justificativas e Relatórios

<img src="imagens/TrabalhoEngSoft/tela8.png" alt="Tela de Justificativas ou Relatórios" width="700">

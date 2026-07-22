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

## Versão Revisada do Backlog da Sprint

Esta versão revisada apresenta as histórias e as tarefas que foram efetivamente realizadas durante o desenvolvimento do Sistema de Ponto para RH. Algumas tarefas inicialmente planejadas foram reorganizadas e detalhadas de acordo com as necessidades identificadas durante a implementação e a integração entre o frontend, o backend e o banco de dados.

### História 1 — Autenticação dos usuários

**Como funcionário ou administrador do RH, eu gostaria de realizar login no sistema para acessar as funcionalidades correspondentes ao meu perfil.**

#### Tarefas realizadas e responsáveis

- Criar a estrutura inicial do backend utilizando Node.js e Express.js [Guilherme]
- Configurar a conexão da aplicação com o banco de dados MySQL [Mariana]
- Criar e configurar a tabela de usuários [Mariana]
- Criar usuários iniciais para os perfis de RH e funcionário [Mariana]
- Implementar a rota `POST /auth/login` [Guilherme]
- Implementar autenticação utilizando JSON Web Token — JWT [Guilherme]
- Criar middleware para verificar a autenticação do usuário [Guilherme]
- Criar middleware para controlar o acesso de acordo com o perfil do usuário [Guilherme]
- Implementar a rota `GET /users/me` para consultar o usuário autenticado [Guilherme]
- Desenvolver e estilizar a tela de login [Daniel]
- Integrar a tela de login com a API [Daniel e Guilherme]
- Redirecionar o usuário para o painel correspondente ao seu perfil [Daniel]
- Realizar testes de login com os perfis de RH e funcionário [Mariana e Guilherme]

**Status:** Concluída.

---

### História 2 — Registro e consulta do ponto pelo funcionário

**Como funcionário, eu gostaria de registrar meus horários de entrada e saída e consultar meu histórico de pontos.**

#### Tarefas realizadas e responsáveis

- Criar a estrutura de armazenamento dos registros de ponto [Mariana]
- Relacionar os registros de ponto aos usuários cadastrados [Mariana]
- Implementar a rota `POST /time-records` para registrar um novo ponto [Guilherme]
- Registrar automaticamente a data e o horário do ponto [Guilherme]
- Validar se o usuário está autenticado antes de registrar o ponto [Guilherme]
- Implementar a rota `GET /time-records/history` [Guilherme]
- Fazer com que cada funcionário visualize apenas seus próprios registros [Guilherme]
- Desenvolver o painel do funcionário [Daniel]
- Criar o botão para registrar o ponto [Daniel]
- Criar a tela de histórico de pontos do funcionário [Daniel]
- Integrar o painel e o histórico do funcionário com a API [Daniel e Guilherme]
- Exibir mensagens de confirmação e de erro durante o registro [Daniel]
- Testar o registro de entrada, saída e a consulta do histórico [Mariana, Guilherme e Daniel]

**Status:** Concluída.

---

### História 3 — Acesso ao painel administrativo do RH

**Como administrador do RH, eu gostaria de acessar uma área administrativa exclusiva para gerenciar os funcionários e os registros de ponto.**

#### Tarefas realizadas e responsáveis

- Implementar a rota `GET /admin/dashboard` [Guilherme]
- Restringir o acesso ao painel administrativo aos usuários com perfil de RH [Guilherme]
- Validar tentativas de acesso realizadas por funcionários [Guilherme]
- Desenvolver a interface principal do painel do RH [Daniel]
- Criar a navegação entre as funcionalidades administrativas [Daniel]
- Integrar o painel administrativo com os dados do usuário autenticado [Daniel e Guilherme]
- Testar o acesso ao painel utilizando os dois perfis do sistema [Mariana e Guilherme]

**Status:** Concluída.

---

### História 4 — Gerenciamento de funcionários

**Como administrador do RH, eu gostaria de cadastrar, visualizar, editar e remover funcionários para manter os colaboradores do sistema atualizados.**

#### Tarefas realizadas e responsáveis

- Definir os campos e as regras de armazenamento dos funcionários [Mariana]
- Implementar a rota `POST /employees` para cadastrar funcionários [Guilherme]
- Implementar a rota `GET /employees` para listar funcionários [Guilherme]
- Implementar a rota `GET /employees/:id` para buscar um funcionário [Guilherme]
- Implementar a rota `PUT /employees/:id` para atualizar um funcionário [Guilherme]
- Implementar a rota `DELETE /employees/:id` para remover um funcionário [Guilherme]
- Validar os dados enviados no cadastro e na edição [Guilherme]
- Validar e impedir o cadastro de e-mails duplicados [Guilherme e Mariana]
- Garantir que apenas usuários do RH utilizem as rotas de gerenciamento [Guilherme]
- Desenvolver o formulário de cadastro de funcionários [Daniel]
- Desenvolver a listagem dos funcionários cadastrados [Daniel]
- Implementar as ações de edição e exclusão na interface [Daniel]
- Integrar as telas de gerenciamento de funcionários com a API [Daniel e Guilherme]
- Realizar testes das operações de cadastro, consulta, edição e remoção [Mariana, Guilherme e Daniel]

**Status:** Concluída.

---

### História 5 — Consulta dos registros de ponto pelo RH

**Como administrador do RH, eu gostaria de visualizar os registros de ponto dos funcionários e filtrá-los por data para acompanhar a jornada de trabalho.**

#### Tarefas realizadas e responsáveis

- Criar a consulta dos registros de ponto relacionados aos funcionários [Mariana]
- Implementar a rota `GET /time-records/all` [Guilherme]
- Restringir a consulta de todos os registros ao perfil de RH [Guilherme]
- Adicionar o filtro de registros por data utilizando o parâmetro `date` [Guilherme]
- Retornar o nome do funcionário junto ao registro de ponto [Guilherme e Mariana]
- Desenvolver a página de visualização dos registros de ponto [Daniel]
- Criar o campo de filtro por data [Daniel]
- Exibir os registros organizados por funcionário, data e horário [Daniel]
- Integrar a página de registros com a API [Daniel e Guilherme]
- Ajustar o layout e a responsividade da página [Daniel]
- Testar a listagem completa e a consulta com filtro por data [Mariana, Guilherme e Daniel]

**Status:** Concluída.

---

### Atividades complementares realizadas durante a Sprint

Além das tarefas diretamente relacionadas às histórias, também foram realizadas as seguintes atividades:

- Organização do projeto em pastas separadas para frontend e backend [Equipe]
- Configuração das dependências do backend [Guilherme]
- Configuração das variáveis necessárias para conexão com o banco de dados [Mariana e Guilherme]
- Criação da documentação das rotas da API [Guilherme]
- Criação de orientações para integração entre frontend e backend [Guilherme e Daniel]
- Criação de orientações para integração e configuração do banco de dados [Mariana]
- Criação de uma coleção de testes para as rotas da API [Guilherme]
- Realização de testes de autenticação, autorização e validação de dados [Equipe]
- Correção de problemas encontrados durante a integração entre frontend, backend e banco de dados [Equipe]
- Ajustes finais nas interfaces e na navegação do sistema [Daniel]
- Atualização da documentação e dos diagramas do projeto [Equipe]

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

const nomeUsuario = document.querySelector('#nome-usuario');
const formFuncionario = document.querySelector('#form-funcionario');

const campoId = document.querySelector('#funcionario-id');
const campoNome = document.querySelector('#nome');
const campoEmail = document.querySelector('#email');
const campoSenha = document.querySelector('#senha');

const grupoSenha = document.querySelector('#grupo-senha');
const tituloFormulario = document.querySelector('#titulo-formulario');
const mensagemFormulario = document.querySelector(
    '#mensagem-formulario'
);

const botaoSalvar = document.querySelector('#botao-salvar');
const botaoCancelar = document.querySelector('#botao-cancelar');
const botaoAtualizar = document.querySelector('#botao-atualizar');
const botaoSair = document.querySelector('#botao-sair');

const tabelaFuncionarios = document.querySelector(
    '#tabela-funcionarios'
);

const quantidadeFuncionarios = document.querySelector(
    '#quantidade-funcionarios'
);

const token = localStorage.getItem('token');
const usuarioSalvo = localStorage.getItem('usuario');

let funcionarios = [];

if (!token || !usuarioSalvo) {
    window.location.href = '/index.html';
} else {
    iniciarPagina();
}

function iniciarPagina() {
    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.perfil !== 'RH') {
        window.location.href = '/pages/funcionario/ponto.html';
        return;
    }

    nomeUsuario.textContent = `Olá, ${usuario.nome}`;

    carregarFuncionarios();
}

formFuncionario.addEventListener('submit', async event => {
    event.preventDefault();

    limparMensagem();

    const id = campoId.value;
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    if (!nome || !email) {
        exibirMensagem(
            'Preencha o nome e o e-mail.',
            'erro'
        );
        return;
    }

    if (!id && !senha) {
        exibirMensagem(
            'Informe uma senha para o funcionário.',
            'erro'
        );
        return;
    }

    bloquearFormulario(true);

    try {
        if (id) {
            await atualizarFuncionario(id, {
                nome,
                email
            });

            exibirMensagem(
                'Funcionário atualizado com sucesso.',
                'sucesso'
            );
        } else {
            await cadastrarFuncionario({
                nome,
                email,
                senha
            });

            exibirMensagem(
                'Funcionário cadastrado com sucesso.',
                'sucesso'
            );
        }

        limparFormulario();
        await carregarFuncionarios();
    } catch (error) {
        exibirMensagem(error.message, 'erro');
    } finally {
        bloquearFormulario(false);
    }
});

botaoCancelar.addEventListener('click', () => {
    limparFormulario();
    limparMensagem();
});

botaoAtualizar.addEventListener('click', () => {
    carregarFuncionarios();
});

botaoSair.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    window.location.href = '/index.html';
});

async function cadastrarFuncionario(funcionario) {
    return apiRequest('/employees', {
        method: 'POST',
        body: JSON.stringify(funcionario)
    });
}

async function atualizarFuncionario(id, funcionario) {
    return apiRequest(`/employees/${id}`, {
        method: 'PUT',
        body: JSON.stringify(funcionario)
    });
}

async function carregarFuncionarios() {
    tabelaFuncionarios.innerHTML = `
        <tr>
            <td colspan="4" class="sem-registros">
                Carregando funcionários...
            </td>
        </tr>
    `;

    try {
        const resposta = await apiRequest('/employees');

        funcionarios = resposta.filter(
            usuario => usuario.perfil === 'FUNCIONARIO'
        );

        quantidadeFuncionarios.textContent =
            `${funcionarios.length} funcionário(s)`;

        exibirFuncionarios();
    } catch (error) {
        tabelaFuncionarios.innerHTML = `
            <tr>
                <td colspan="4" class="sem-registros">
                    ${error.message}
                </td>
            </tr>
        `;
    }
}

function exibirFuncionarios() {
    if (funcionarios.length === 0) {
        tabelaFuncionarios.innerHTML = `
            <tr>
                <td colspan="4" class="sem-registros">
                    Nenhum funcionário cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    tabelaFuncionarios.innerHTML = funcionarios
        .map(funcionario => {
            return `
                <tr>
                    <td>${funcionario.nome}</td>
                    <td>${funcionario.email}</td>
                    <td>Funcionário</td>
                    <td>
                        <div class="acoes-tabela">
                            <button
                                class="botao-editar"
                                type="button"
                                data-id="${funcionario.id}"
                            >
                                Editar
                            </button>

                            <button
                                class="botao-excluir"
                                type="button"
                                data-id="${funcionario.id}"
                            >
                                Excluir
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        })
        .join('');

    adicionarEventosTabela();
}

function adicionarEventosTabela() {
    document
        .querySelectorAll('.botao-editar')
        .forEach(botao => {
            botao.addEventListener('click', () => {
                editarFuncionario(botao.dataset.id);
            });
        });

    document
        .querySelectorAll('.botao-excluir')
        .forEach(botao => {
            botao.addEventListener('click', () => {
                excluirFuncionario(botao.dataset.id);
            });
        });
}

function editarFuncionario(id) {
    const funcionario = funcionarios.find(
        item => String(item.id) === String(id)
    );

    if (!funcionario) {
        return;
    }

    campoId.value = funcionario.id;
    campoNome.value = funcionario.nome;
    campoEmail.value = funcionario.email;

    campoSenha.value = '';
    grupoSenha.hidden = true;

    tituloFormulario.textContent = 'Editar funcionário';
    botaoSalvar.textContent = 'Salvar alterações';
    botaoCancelar.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

async function excluirFuncionario(id) {
    const funcionario = funcionarios.find(
        item => String(item.id) === String(id)
    );

    const confirmar = window.confirm(
        `Deseja excluir o funcionário ${funcionario.nome}?`
    );

    if (!confirmar) {
        return;
    }

    try {
        await apiRequest(`/employees/${id}`, {
            method: 'DELETE'
        });

        await carregarFuncionarios();
    } catch (error) {
        window.alert(error.message);
    }
}

function limparFormulario() {
    formFuncionario.reset();

    campoId.value = '';
    grupoSenha.hidden = false;

    tituloFormulario.textContent =
        'Cadastrar funcionário';

    botaoSalvar.textContent =
        'Cadastrar funcionário';

    botaoCancelar.hidden = true;
}

function bloquearFormulario(bloqueado) {
    campoNome.disabled = bloqueado;
    campoEmail.disabled = bloqueado;
    campoSenha.disabled = bloqueado;
    botaoSalvar.disabled = bloqueado;

    botaoSalvar.textContent = bloqueado
        ? 'Salvando...'
        : campoId.value
            ? 'Salvar alterações'
            : 'Cadastrar funcionário';
}

function exibirMensagem(texto, tipo) {
    mensagemFormulario.textContent = texto;

    mensagemFormulario.className =
        tipo === 'sucesso'
            ? 'mensagem mensagem-sucesso'
            : 'mensagem mensagem-erro';
}

function limparMensagem() {
    mensagemFormulario.textContent = '';
    mensagemFormulario.className = 'mensagem';
}
const formLogin = document.querySelector('#form-login');
const campoEmail = document.querySelector('#email');
const campoSenha = document.querySelector('#senha');
const mensagemLogin = document.querySelector('#mensagem-login');
const botaoLogin = document.querySelector('#botao-login');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    limparMensagem();

    if (!email || !senha) {
        exibirMensagem('Preencha o e-mail e a senha.', 'erro');
        return;
    }

    bloquearFormulario(true);

    try {
        const dados = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                senha
            })
        });

        localStorage.setItem('token', dados.token);
        localStorage.setItem(
            'usuario',
            JSON.stringify(dados.usuario)
        );

        exibirMensagem(
            'Login realizado com sucesso.',
            'sucesso'
        );

        redirecionarUsuario(dados.usuario);
    } catch (error) {
        exibirMensagem(error.message, 'erro');
    } finally {
        bloquearFormulario(false);
    }
});

function redirecionarUsuario(usuario) {
    if (usuario.perfil === 'RH') {
        window.location.href = './pages/rh/dashboard.html';
        return;
    }

    if (usuario.perfil === 'FUNCIONARIO') {
        window.location.href = './pages/funcionario/ponto.html';
        return;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    exibirMensagem(
        'Perfil de usuário não reconhecido.',
        'erro'
    );
}

function bloquearFormulario(bloqueado) {
    campoEmail.disabled = bloqueado;
    campoSenha.disabled = bloqueado;
    botaoLogin.disabled = bloqueado;

    botaoLogin.textContent = bloqueado
        ? 'Entrando...'
        : 'Entrar';
}

function exibirMensagem(texto, tipo) {
    mensagemLogin.textContent = texto;

    mensagemLogin.className = tipo === 'sucesso'
        ? 'mensagem mensagem-sucesso'
        : 'mensagem mensagem-erro';
}

function limparMensagem() {
    mensagemLogin.textContent = '';
    mensagemLogin.className = 'mensagem';
}
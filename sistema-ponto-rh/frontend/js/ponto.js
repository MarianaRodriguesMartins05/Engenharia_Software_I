const nomeUsuario = document.querySelector('#nome-usuario');
const dataAtual = document.querySelector('#data-atual');
const horarioAtual = document.querySelector('#horario-atual');
const ultimoRegistro = document.querySelector('#ultimo-registro');

const botaoEntrada = document.querySelector('#botao-entrada');
const botaoSaida = document.querySelector('#botao-saida');
const botaoSair = document.querySelector('#botao-sair');

const mensagemPonto = document.querySelector('#mensagem-ponto');

const token = localStorage.getItem('token');
const usuarioSalvo = localStorage.getItem('usuario');

if (!token || !usuarioSalvo) {
    window.location.href = '/index.html';
} else {
    iniciarPainel();
}

function iniciarPainel() {
    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.perfil !== 'FUNCIONARIO') {
        window.location.href = '/pages/rh/dashboard.html';
        return;
    }

    nomeUsuario.textContent = `Olá, ${usuario.nome}`;

    atualizarDataHora();
    setInterval(atualizarDataHora, 1000);

    atualizarSituacaoDoPonto();
}

function atualizarDataHora() {
    const agora = new Date();

    dataAtual.textContent = agora.toLocaleDateString('pt-BR');

    horarioAtual.textContent = agora.toLocaleTimeString('pt-BR');
}

botaoEntrada.addEventListener('click', () => {
    registrarPonto('entrada');
});

botaoSaida.addEventListener('click', () => {
    registrarPonto('saida');
});

botaoSair.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    window.location.href = '/index.html';
});

async function registrarPonto(tipo) {
    limparMensagem();
    bloquearBotoes(true);

    try {
        const resposta = await apiRequest('/time-records', {
            method: 'POST'
        });

        exibirMensagem(
            resposta.message ||
            `${capitalizar(tipo)} registrada com sucesso.`,
            'sucesso'
        );

        await atualizarSituacaoDoPonto();
    } catch (error) {
        exibirMensagem(error.message, 'erro');
    } finally {
        bloquearBotoes(false);
    }
}

async function atualizarSituacaoDoPonto() {
    try {
        const resposta = await apiRequest('/time-records/history');

        const registros = extrairRegistros(resposta);
        const registrosHoje = filtrarRegistrosDeHoje(registros);

        configurarBotoes(registrosHoje);
        mostrarUltimoRegistro(registrosHoje);
    } catch (error) {
        ultimoRegistro.textContent =
            'Não foi possível consultar os registros.';

        exibirMensagem(error.message, 'erro');
    }
}

function extrairRegistros(resposta) {
    if (Array.isArray(resposta)) {
        return resposta;
    }

    if (Array.isArray(resposta.registros)) {
        return resposta.registros;
    }

    if (Array.isArray(resposta.records)) {
        return resposta.records;
    }

    if (Array.isArray(resposta.historico)) {
        return resposta.historico;
    }

    if (Array.isArray(resposta.data)) {
        return resposta.data;
    }

    return [];
}

function filtrarRegistrosDeHoje(registros) {
    const hoje = obterDataLocal();

    return registros
        .filter((registro) => {
            const dataRegistro =
                registro.date ?? registro.data;

            return normalizarData(dataRegistro) === hoje;
        })
        .sort((a, b) => {
            const horarioA = a.time ?? a.hora ?? '';
            const horarioB = b.time ?? b.hora ?? '';

            return horarioA.localeCompare(horarioB);
        });
}

function configurarBotoes(registrosHoje) {
    const quantidade = registrosHoje.length;

    const proximoRegistroEhEntrada = quantidade % 2 === 0;

    botaoEntrada.disabled = !proximoRegistroEhEntrada;
    botaoSaida.disabled = proximoRegistroEhEntrada;
}

function mostrarUltimoRegistro(registrosHoje) {
    if (registrosHoje.length === 0) {
        ultimoRegistro.textContent =
            'Nenhum ponto registrado hoje.';

        return;
    }

    const ultimo = registrosHoje[registrosHoje.length - 1];

    const horario = ultimo.time ?? ultimo.hora ?? '--:--:--';

    const tipo = registrosHoje.length % 2 === 1
        ? 'Entrada'
        : 'Saída';

    ultimoRegistro.textContent =
        `${tipo} registrada às ${String(horario).slice(0, 8)}.`;
}

function obterDataLocal() {
    const agora = new Date();

    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
}

function normalizarData(data) {
    if (!data) {
        return '';
    }

    return String(data).slice(0, 10);
}

function bloquearBotoes(bloqueado) {
    if (bloqueado) {
        botaoEntrada.disabled = true;
        botaoSaida.disabled = true;
    }
}

function exibirMensagem(texto, tipo) {
    mensagemPonto.textContent = texto;

    mensagemPonto.className = tipo === 'sucesso'
        ? 'mensagem mensagem-sucesso'
        : 'mensagem mensagem-erro';
}

function limparMensagem() {
    mensagemPonto.textContent = '';
    mensagemPonto.className = 'mensagem';
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
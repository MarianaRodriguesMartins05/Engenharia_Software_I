const nomeUsuario = document.querySelector('#nome-usuario');
const formFiltro = document.querySelector('#form-filtro');
const campoData = document.querySelector('#data-filtro');

const botaoLimpar = document.querySelector('#botao-limpar');
const botaoAtualizar = document.querySelector(
    '#botao-atualizar-registros'
);
const botaoSair = document.querySelector('#botao-sair');

const tabelaRegistros = document.querySelector(
    '#tabela-registros'
);
const quantidadeRegistros = document.querySelector(
    '#quantidade-registros'
);
const mensagemRegistros = document.querySelector(
    '#mensagem-registros'
);

const token = localStorage.getItem('token');
const usuarioSalvo = localStorage.getItem('usuario');

let registrosAtuais = [];

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

    carregarRegistros();
}

formFiltro.addEventListener('submit', event => {
    event.preventDefault();

    const data = campoData.value;

    if (!data) {
        exibirMensagem(
            'Selecione uma data para realizar o filtro.',
            'erro'
        );
        return;
    }

    limparMensagem();
    carregarRegistros(data);
});

botaoLimpar.addEventListener('click', () => {
    campoData.value = '';
    limparMensagem();
    carregarRegistros();
});

botaoAtualizar.addEventListener('click', () => {
    limparMensagem();
    carregarRegistros(campoData.value);
});

botaoSair.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    window.location.href = '/index.html';
});

async function carregarRegistros(data = '') {
    tabelaRegistros.innerHTML = `
        <tr>
            <td colspan="4" class="sem-registros">
                Carregando registros...
            </td>
        </tr>
    `;

    try {
        let rota = '/time-records/all';

        /*
         * O input type="date" já retorna a data no formato:
         * AAAA-MM-DD
         *
         * Exemplo:
         * 2026-07-21
         *
         * Esse é o formato utilizado pela coluna DATE do MySQL.
         */
        if (data) {
            rota += `?date=${encodeURIComponent(data)}`;
        }

        const resposta = await apiRequest(rota);

        registrosAtuais = Array.isArray(resposta)
            ? resposta
            : [];

        quantidadeRegistros.textContent =
            `${registrosAtuais.length} registro(s)`;

        exibirRegistros(registrosAtuais);
    } catch (error) {
        registrosAtuais = [];

        quantidadeRegistros.textContent = '0 registro(s)';

        tabelaRegistros.innerHTML = `
            <tr>
                <td colspan="4" class="sem-registros">
                    ${escaparHTML(error.message)}
                </td>
            </tr>
        `;
    }
}

function exibirRegistros(registros) {
    if (registros.length === 0) {
        tabelaRegistros.innerHTML = `
            <tr>
                <td colspan="4" class="sem-registros">
                    Nenhum registro encontrado.
                </td>
            </tr>
        `;

        return;
    }

    /*
     * Primeiro ordenamos do mais antigo para o mais recente
     * para descobrir corretamente quais registros são
     * entrada e saída.
     */
    const registrosCronologicos = [...registros].sort(
        (a, b) => obterTimestamp(a) - obterTimestamp(b)
    );

    const quantidadePorFuncionarioData = {};

    const registrosComTipo = registrosCronologicos.map(registro => {
        const data = normalizarData(registro.date);
        const userId = registro.userId ?? registro.user_id;

        const chave = `${userId}-${data}`;

        quantidadePorFuncionarioData[chave] =
            (quantidadePorFuncionarioData[chave] || 0) + 1;

        const quantidade = quantidadePorFuncionarioData[chave];

        /*
         * Como o banco não possui uma coluna de tipo:
         * 1º registro = Entrada
         * 2º registro = Saída
         * 3º registro = Entrada
         * 4º registro = Saída
         */
        const tipo = quantidade % 2 === 1
            ? 'Entrada'
            : 'Saída';

        return {
            ...registro,
            tipo
        };
    });

    /*
     * Exibe os registros mais recentes primeiro,
     * sem perder a classificação correta.
     */
    registrosComTipo.reverse();

    tabelaRegistros.innerHTML = registrosComTipo
        .map(registro => {
            const data = normalizarData(registro.date);
            const horario = formatarHorario(registro.time);

            const classeTipo = registro.tipo === 'Entrada'
                ? 'tipo-entrada'
                : 'tipo-saida';

            return `
                <tr>
                    <td>${escaparHTML(registro.nome)}</td>
                    <td>${formatarData(data)}</td>
                    <td>${horario}</td>
                    <td class="${classeTipo}">
                        ${registro.tipo}
                    </td>
                </tr>
            `;
        })
        .join('');
}

function normalizarData(data) {
    if (!data) {
        return '';
    }

    return String(data).slice(0, 10);
}

function formatarData(data) {
    if (!data) {
        return '-';
    }

    const [ano, mes, dia] = data.split('-');

    return `${dia}/${mes}/${ano}`;
}

function formatarHorario(horario) {
    if (!horario) {
        return '-';
    }

    return String(horario).slice(0, 8);
}

function obterTimestamp(registro) {
    const data = normalizarData(registro.date);
    const horario = registro.time || '00:00:00';

    if (!data) {
        return 0;
    }

    return new Date(`${data}T${horario}`).getTime();
}

function exibirMensagem(texto, tipo) {
    mensagemRegistros.textContent = texto;

    mensagemRegistros.className =
        tipo === 'sucesso'
            ? 'mensagem mensagem-sucesso'
            : 'mensagem mensagem-erro';
}

function limparMensagem() {
    mensagemRegistros.textContent = '';
    mensagemRegistros.className = 'mensagem';
}

function escaparHTML(valor) {
    const elemento = document.createElement('div');

    elemento.textContent = valor ?? '-';

    return elemento.innerHTML;
}
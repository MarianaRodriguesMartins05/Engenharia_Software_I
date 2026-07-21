const nomeUsuario = document.querySelector('#nome-usuario');
const totalFuncionarios = document.querySelector('#total-funcionarios');
const totalPontosHoje = document.querySelector('#total-pontos-hoje');
const tabelaAtividades = document.querySelector('#tabela-atividades');
const botaoSair = document.querySelector('#botao-sair');

const token = localStorage.getItem('token');
const usuarioSalvo = localStorage.getItem('usuario');

if (!token || !usuarioSalvo) {
    window.location.href = '/index.html';
} else {
    iniciarDashboard();
}

async function iniciarDashboard() {
    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.perfil !== 'RH') {
        window.location.href = '/pages/funcionario/ponto.html';
        return;
    }

    nomeUsuario.textContent = `Olá, ${usuario.nome}`;

    try {
        await apiRequest('/admin/dashboard');

        const [usuarios, registros] = await Promise.all([
            apiRequest('/employees'),
            apiRequest('/time-records/all')
        ]);

        atualizarIndicadores(usuarios, registros);
        exibirAtividadesRecentes(registros);
    } catch (error) {
        tabelaAtividades.innerHTML = `
            <tr>
                <td colspan="4" class="sem-registros">
                    ${error.message}
                </td>
            </tr>
        `;
    }
}

function atualizarIndicadores(usuarios, registros) {
    const funcionarios = usuarios.filter(
        usuario => usuario.perfil === 'FUNCIONARIO'
    );

    const hoje = obterDataLocal();

    const registrosHoje = registros.filter(
        registro => normalizarData(registro.date) === hoje
    );

    totalFuncionarios.textContent = funcionarios.length;
    totalPontosHoje.textContent = registrosHoje.length;
}

function exibirAtividadesRecentes(registros) {
    if (!Array.isArray(registros) || registros.length === 0) {
        tabelaAtividades.innerHTML = `
            <tr>
                <td colspan="4" class="sem-registros">
                    Nenhuma atividade registrada.
                </td>
            </tr>
        `;

        return;
    }

    const registrosOrdenados = [...registros]
        .sort((a, b) => {
            return obterTimestamp(b) - obterTimestamp(a);
        })
        .slice(0, 5);

    tabelaAtividades.innerHTML = registrosOrdenados
        .map(registro => {
            return `
                <tr>
                    <td>${registro.nome}</td>
                    <td>Registrou ponto</td>
                    <td>
                        ${formatarData(registro.date)}
                        ${formatarHorario(registro.time)}
                    </td>
                    <td class="status-normal">Normal</td>
                </tr>
            `;
        })
        .join('');
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

function formatarData(data) {
    const dataNormalizada = normalizarData(data);

    if (!dataNormalizada) {
        return '-';
    }

    const [ano, mes, dia] = dataNormalizada.split('-');

    return `${dia}/${mes}/${ano}`;
}

function formatarHorario(horario) {
    if (!horario) {
        return '';
    }

    return String(horario).slice(0, 8);
}

function obterTimestamp(registro) {
    const data = normalizarData(registro.date);
    const horario = registro.time || '00:00:00';

    return new Date(`${data}T${horario}`).getTime();
}

botaoSair.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    window.location.href = '/index.html';
});
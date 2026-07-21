// frontend/js/api.js

const API_URL = 'http://localhost:3000';

async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    let data;

    try {
        data = await response.json();
    } catch {
        data = {
            message: 'O servidor retornou uma resposta inválida.'
        };
    }

    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        window.location.href = '/frontend/index.html';

        throw new Error('Sua sessão expirou. Faça login novamente.');
    }

    if (response.status === 403) {
        throw new Error('Você não possui permissão para acessar esta página.');
    }

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar a solicitação.');
    }

    return data;
}
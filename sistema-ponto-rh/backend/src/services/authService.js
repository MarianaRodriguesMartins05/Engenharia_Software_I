const userModel = require("../models/userModel");
const jwt = require("../utils/jwt");

async function login(email, senha) {

    const user = userModel.findByEmail(email);

    if (!user) {
        return {
            status: 404,
            message: "Usuário não encontrado."
        };
    }

    if (user.senha !== senha) {
        return {
            status: 401,
            message: "Senha inválida."
        };
    }

    const token = jwt.generateToken(user);
    return {
        status: 200,
        message: "Login realizado com sucesso.",
        token,
        usuario: {
            id: user.id,
            nome: user.nome,
            email: user.email,
            perfil: user.perfil
        }
    };
}

module.exports = {
    login
};
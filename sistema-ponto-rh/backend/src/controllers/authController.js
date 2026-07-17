const authService = require("../services/authService");

async function login(req, res) {

    const { email, senha } = req.body;

    const response = await authService.login(email, senha);

    return res.status(response.status).json(response);
}

module.exports = {
    login
};
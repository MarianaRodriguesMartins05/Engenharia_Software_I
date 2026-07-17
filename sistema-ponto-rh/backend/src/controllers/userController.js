function profile(req, res) {

    return res.json({
        message: "Usuário autenticado.",
        usuario: req.user
    });

}

module.exports = {
    profile
};
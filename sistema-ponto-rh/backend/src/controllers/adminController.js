function dashboard(req, res) {

    return res.json({

        message: "Bem-vindo ao painel do RH.",

        usuario: req.user

    });

}

module.exports = {
    dashboard
};
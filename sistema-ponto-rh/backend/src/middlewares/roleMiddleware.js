function roleMiddleware(...rolesPermitidos) {

    return (req, res, next) => {

        if (!rolesPermitidos.includes(req.user.perfil)) {

            return res.status(403).json({
                message: "Acesso negado."
            });

        }

        next();

    };

}

module.exports = roleMiddleware;
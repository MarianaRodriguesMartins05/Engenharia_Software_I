const jwt = require("jsonwebtoken");

function generateToken(user) {

    return jwt.sign(
        {
            id: user.id,
            perfil: user.perfil
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );

}

module.exports = {
    generateToken
};
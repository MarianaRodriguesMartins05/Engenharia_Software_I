const database = require("../database");

async function findAll() {
    const [users] = await database.execute(
        "SELECT id, nome, email, perfil FROM users"
    );

    return users;
}

async function findById(id) {
    const [users] = await database.execute(
        "SELECT id, nome, email, senha, perfil FROM users WHERE id = ?",
        [id]
    );

    return users[0] || null;
}

async function findByEmail(email) {
    const [users] = await database.execute(
        "SELECT id, nome, email, senha, perfil FROM users WHERE email = ?",
        [email]
    );

    return users[0] || null;
}

async function create(user) {
    const { nome, email, senha, perfil } = user;

    const [result] = await database.execute(
        "INSERT INTO users (nome, email, senha, perfil) VALUES (?, ?, ?, ?)",
        [nome, email, senha, perfil]
    );

    return findById(result.insertId);
}

async function update(id, data) {
    const user = await findById(id);

    if (!user) {
        return null;
    }

    const nome = data.nome ?? user.nome;
    const email = data.email ?? user.email;
    const senha = data.senha ?? user.senha;
    const perfil = data.perfil ?? user.perfil;

    await database.execute(
        "UPDATE users SET nome = ?, email = ?, senha = ?, perfil = ? WHERE id = ?",
        [nome, email, senha, perfil, id]
    );

    return findById(id);
}

async function remove(id) {
    const [result] = await database.execute(
        "DELETE FROM users WHERE id = ?",
        [id]
    );

    return result.affectedRows > 0;
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    create,
    update,
    remove
};

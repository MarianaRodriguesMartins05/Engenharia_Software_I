const users = [
    {
        id: 1,
        nome: "Administrador",
        email: "admin@empresa.com",
        senha: "123456",
        perfil: "RH"
    },
    {
        id: 2,
        nome: "João Silva",
        email: "joao@empresa.com",
        senha: "123456",
        perfil: "FUNCIONARIO"
    }
];

function findAll() {
    return users;
}

function findById(id) {
    console.log("ID recebido:", id);
    console.log("Usuários:", users);
    return users.find(user => user.id === Number(id));
}

function findByEmail(email) {
    return users.find(user => user.email === email);
}

function create(user) {

    const novoUsuario = {

        id: users.length + 1,

        ...user

    };

    users.push(novoUsuario);

    return novoUsuario;

}

function update(id, data) {

    const user = users.find(user => user.id === Number(id));

    if (!user) {
        return null;
    }

    Object.assign(user, data);

    return user;
}

function remove(id) {

    const index = users.findIndex(user => user.id === Number(id));

    if (index === -1) {
        return false;
    }

    users.splice(index, 1);

    return true;
}

module.exports = {

    findAll,

    findById,

    findByEmail,

    create,

    update,

    remove

};
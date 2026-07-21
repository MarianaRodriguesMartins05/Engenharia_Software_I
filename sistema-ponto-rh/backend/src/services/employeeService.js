const userModel = require("../models/userModel");

async function createEmployee(data) {

    const { nome, email, senha } = data;

    if (!nome || !email || !senha) {

        return {

            status: 400,

            message: "Todos os campos são obrigatórios."

        };

    }

    const exists = await userModel.findByEmail(email);

    if (exists) {

        return {

            status: 409,

            message: "E-mail já cadastrado."

        };

    }

    const employee = await userModel.create({

        nome,

        email,

        senha,

        perfil: "FUNCIONARIO"

    });

    return {

        status: 201,

        message: "Funcionário cadastrado com sucesso.",

        funcionario: employee

    };

}

async function listEmployees() {

    const users = await userModel.findAll();

    return users.map(user => ({
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil
    }));

}

async function getEmployee(id) {

    const user = await userModel.findById(id);

    if (!user) {

        return {
            status: 404,
            message: "Funcionário não encontrado."
        };

    }

    return {

        status: 200,

        funcionario: {

            id: user.id,

            nome: user.nome,

            email: user.email,

            perfil: user.perfil

        }

    };

}

async function updateEmployee(id, data) {

    const updated = await userModel.update(id, data);

    if (!updated) {

        return {

            status: 404,

            message: "Funcionário não encontrado."

        };

    }

    return {

        status: 200,

        message: "Funcionário atualizado com sucesso.",

        funcionario: {

            id: updated.id,

            nome: updated.nome,

            email: updated.email,

            perfil: updated.perfil

        }

    };

}

async function deleteEmployee(id) {

    const deleted = await userModel.remove(id);

    if (!deleted) {

        return {

            status: 404,

            message: "Funcionário não encontrado."

        };

    }

    return {

        status: 200,

        message: "Funcionário removido com sucesso."

    };

}

module.exports = {

    createEmployee,

    listEmployees,

    getEmployee,

    updateEmployee,

    deleteEmployee

};

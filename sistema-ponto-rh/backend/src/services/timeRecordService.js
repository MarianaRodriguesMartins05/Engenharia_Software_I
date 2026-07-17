const timeRecordModel = require("../models/timeRecordModel");
const userModel = require("../models/userModel");

async function register(user) {

    const record = {

        userId: user.id,

        date: new Date().toLocaleDateString("pt-BR"),

        time: new Date().toLocaleTimeString("pt-BR")

    };

    return timeRecordModel.create(record);

}

async function history(userId) {

    return timeRecordModel.findByUser(userId);

}

module.exports = {

    register,

    history

}

async function listAll(date) {

    let records = timeRecordModel.findAll();

    if (date) {
        records = records.filter(record => record.date === date);
    }

    return records.map(record => {

        const user = userModel.findById(record.userId);

        return {

            userId: record.userId,

            nome: user ? user.nome : "Usuário não encontrado",

            date: record.date,

            time: record.time

        };

    });

}

module.exports = {

    register,

    history,

    listAll

};
const timeRecordService = require("../services/timeRecordService");

async function register(req, res) {

    const record = await timeRecordService.register(req.user);

    return res.status(201).json({

        message: "Ponto registrado com sucesso.",

        registro: record

    });

}

async function history(req, res) {

    const records = await timeRecordService.history(req.user.id);

    return res.json(records);

}

async function list(req, res) {

    const records = await timeRecordService.listAll(
        req.query.date
    );

    return res.json(records);

}

module.exports = {

    register,

    history,

    list

};
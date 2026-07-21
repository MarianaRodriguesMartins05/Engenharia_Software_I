const database = require("../database");

async function create(record) {
    const [result] = await database.execute(
        "INSERT INTO time_records (user_id, date, time) VALUES (?, CURDATE(), CURTIME())",
        [record.userId]
    );

    const [records] = await database.execute(
        `SELECT id, user_id AS userId,
                DATE_FORMAT(date, '%Y-%m-%d') AS date,
                TIME_FORMAT(time, '%H:%i:%s') AS time
         FROM time_records
         WHERE id = ?`,
        [result.insertId]
    );

    return records[0];
}

async function findByUser(userId) {
    const [records] = await database.execute(
        `SELECT id, user_id AS userId,
                DATE_FORMAT(date, '%Y-%m-%d') AS date,
                TIME_FORMAT(time, '%H:%i:%s') AS time
         FROM time_records
         WHERE user_id = ?
         ORDER BY date DESC, time DESC`,
        [userId]
    );

    return records;
}

async function findAll() {
    const [records] = await database.execute(
        `SELECT id, user_id AS userId,
                DATE_FORMAT(date, '%Y-%m-%d') AS date,
                TIME_FORMAT(time, '%H:%i:%s') AS time
         FROM time_records
         ORDER BY date DESC, time DESC`
    );

    return records;
}

module.exports = {
    create,
    findByUser,
    findAll
};

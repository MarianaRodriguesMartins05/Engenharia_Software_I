const records = [];

function create(record) {
    records.push(record);
    return record;
}

function findByUser(userId) {
    return records.filter(record => record.userId === userId);
}

function findAll() {
    return records;
}

module.exports = {
    create,
    findByUser,
    findAll
};
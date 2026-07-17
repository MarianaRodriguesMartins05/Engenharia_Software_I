const employeeService = require("../services/employeeService");

async function create(req, res) {

    const response = await employeeService.createEmployee(req.body);

    return res
        .status(response.status)
        .json(response);

}

async function list(req, res) {

    const employees = await employeeService.listEmployees();

    return res.json(employees);

}

async function get(req, res) {

    const response = await employeeService.getEmployee(req.params.id);

    return res.status(response.status).json(response);

}

async function update(req, res) {

    const response = await employeeService.updateEmployee(
        req.params.id,
        req.body
    );

    return res.status(response.status).json(response);

}

async function remove(req, res) {

    const response = await employeeService.deleteEmployee(
        req.params.id
    );

    return res.status(response.status).json(response);

}

module.exports = {

    create,

    list,

    get,

    update,

    remove

};
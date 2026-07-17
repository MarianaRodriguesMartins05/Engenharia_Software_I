const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("./routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Sistema de Ponto RH API",
        version: "1.0.0",
        status: "online"
    });
});

module.exports = app;
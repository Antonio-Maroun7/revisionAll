const express = require("express");
const clientRoutes = require("./routes/client.routes");
const departmentRoutes = require("./routes/department.routes");

const app = express();

app.use(express.json());
app.use("/api/clients", clientRoutes);
app.use("/api/dep", departmentRoutes);

module.exports = app;

const express = require("express");
const clientRoutes = require("./routes/client.routes");
const clientRoutesV2 = require("./routes/client.routes.v2");
const departmentRoutes = require("./routes/department.routes");

const app = express();

app.use(express.json());
app.use("/api/clients", clientRoutes);
app.use("/api/v2/clients", clientRoutesV2);
app.use("/api/dep", departmentRoutes);

module.exports = app;

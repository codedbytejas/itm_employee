const express = require('express');
const db = require("./config/db");
const employeeRouter = require("./router/employeeRouter");

const app = express();

app.use(express.json());
app.use("/employees", employeeRouter);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});ls -R
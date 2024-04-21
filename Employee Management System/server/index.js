require("dotenv").config();
const express = require("express");
const cors = require("cors");
const confiq = require("./config");
const employeroute = require("./employee/employee");
const Userroute = require("./auth/auth");
const port = confiq.port;
const app = express();
app.use(express.json());
app.use(cors({ origin: true })); //to allow all origins
app.use("/employe", employeroute);
app.use("/user", Userroute);
app.listen(port, () => {
  console.log("Server is running on port ", port);
});

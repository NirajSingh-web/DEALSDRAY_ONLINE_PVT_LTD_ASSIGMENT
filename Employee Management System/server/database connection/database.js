const mongoose = require("mongoose");
const config = require("./../config");
const dburl = config.mongodburl;
const db_Connection = async () => {
  try {
    const dbconnection = await mongoose.connect(
      "mongodb+srv://nirajsingh:Nirajsingh123@cluster0.t64wrli.mongodb.net/Employe_management",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("database connected");
    return dbconnection;
  } catch (e) {
    console.log("database connected");
  }
};
module.exports = db_Connection;

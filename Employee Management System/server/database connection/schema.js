const mongoose = require("mongoose");
const db_Connection = require("./database");
const employe_schema = async () => {
  const db = await db_Connection();
  const schema = new db.Schema({
    userid: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    employeID: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    destination: {
      type: String,
      enum: ["HR", "Manager", "Sales"],
      default: "HR",
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
    course: {
      type: String,
      enum: ["MCA", "BCA", "BSC"],
      default: "MCA",
    },
    file: {
      type: Object,
      required: true,
    },
  });
  const employe_collection =
    db.models["employes"] || db.model("employes", schema);
  return employe_collection;
};
const userschema = async () => {
  const db = await db_Connection();
  const adminSchema = new db.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const user_collection = db.models["users"] || db.model("users", adminSchema);
  return user_collection;
};
module.exports = { employe_schema, userschema };

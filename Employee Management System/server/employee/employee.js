const { employe_schema } = require("./../database connection/schema");
const express = require("express");
const router = express.Router();
const upload = require("./../multer/upload");
const { fetchuser } = require("./../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function generateEmployeid() {
  const randomString = generateRandomString(6);
  return `EM${randomString}`.toUpperCase();
}
const validateData = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("mobile").notEmpty().withMessage("Invalid mobile number"),
  body("destination").notEmpty().withMessage("Destination is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("course").notEmpty().withMessage("Course is required"),
  // For file validation
  body("file").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("File is required");
    }
    return true;
  }),
];
router.get("/get", fetchuser, async (req, res) => {
  try {
    const userid = req.users._id;
    const employe_data = await (
      await employe_schema()
    ).find({ userid: userid });
    res.send(employe_data);
  } catch (e) {
    console.log(e.message);
  }
});
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => {
      return error.msg;
    });
    return res.status(400).json(errorMessages);
  }
  next();
};
router.post(
  "/add",
  [fetchuser, upload.single("file"), validateData, handleValidationErrors],
  async (req, res) => {
    try {
      const employe_Collection = await employe_schema();
      const employe_data = new employe_Collection({
        userid: req.users._id,
        employeID: generateEmployeid(),
        file: req.file,
        ...req.body,
      });
      const save = await employe_data.save();
      if (save) {
        res.status(200).json("employe added successfully");
      } else {
        res.status(449).json("employe not added Retry 449");
      }
    } catch (e) {
      res.status(404).json("server not found 404");
      console.log(e);
    }
  }
);
router.put("/update", [upload.single("file"), validateData, handleValidationErrors], async (req, res) => {
  try {
    const usercollection = await employe_schema();
    const update = await usercollection.updateOne(
      { _id: req.body._id },
      {
        $set: req.body,
      }
    );
    if (update["acknowledged"]) {
      res.status(201).json("employe Updated Successfully");
    } else {
      res.status(201).json("Not Updated Try After Some time");
    }
  } catch (e) {
    res.status(401).json("Server Issue");
  }
});
router.delete("/delete", async (req, res) => {
  try {
    const deleteData = await (await employe_schema()).deleteOne(req.body);
    console.log(req.body);
    if (deleteData["deletedCount"] != 0) {
      res.status(200).json("Deleted Successfully!");
    } else {
      res.status(449).json("something went wrong");
    }
  } catch (e) {
    console.log("error in deleting data==>", e);
  }
});
module.exports = router;

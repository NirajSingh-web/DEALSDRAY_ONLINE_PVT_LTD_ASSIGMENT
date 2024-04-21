const multer = require("multer");
try {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./multer/uploadfile/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  module.exports = upload;
} catch (e) {
  console.log(e.message);
}
